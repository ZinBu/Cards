import React, {useRef, useState, useEffect, MutableRefObject} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Audio, AVPlaybackSource} from 'expo-av';
import {Character} from '../tools/interfaces';
import Button from '../components/Button';
import {MainView, InfoBlock, Playground, Footer} from '../components/Placements';
import {fillPlayground, getRandomOnSuccaesSound, separateArrayOnParts} from '../tools/playground';
import {difficultyCeilsMap, cardsShowingTime, labelShowingTime, sounds} from '../tools/constants';

const EMPTY = -1

export const GameMenu = () => {
    const [difficulty, _setDifficulty] = useState<number | null>(null);
    const [keepCardsOpened, setKeepCardsOpened] = useState<boolean>(true);

    const setDifficulty = (difficulty: number, keepCardsOpened: boolean = true) => {
        setKeepCardsOpened(keepCardsOpened);
        _setDifficulty(difficulty);
    };

    return (
        <MainView>
            <StatusBar style='auto'/>
            {
                difficulty
                ? <Game difficulty={difficulty} setDifficulty={setDifficulty} keepCardsOpened={keepCardsOpened}/>
                : <>
                    <Button title={'Легко'} onPress={() => setDifficulty(difficultyCeilsMap.easy)} />
                    <Button title={'Сложно'} onPress={() => setDifficulty(difficultyCeilsMap.hard)} />
                    <Button title={'Кошмар'} onPress={() => setDifficulty(difficultyCeilsMap.hard, false)} />
                </>
            }
        </MainView>
        );
}

export const Game: React.FC<{difficulty: number, setDifficulty: React.Dispatch<any>, keepCardsOpened?: boolean}> = ({difficulty, setDifficulty, keepCardsOpened = true}) => {
    const [labelText, setLabelText] = useState('');
    const [currentCard, setCurrentCard] = useState(EMPTY);
    const [showAllCards, setShowAllCards] = useState(true);
    const [sound, setSound] = useState<Audio.Sound>();
    const [mainSound, setMainSound] = useState<Audio.Sound>();
    const [greatingsSound, setGreatingsSound] = useState<Audio.Sound>();

    // Playground permanent state
    const playfield: MutableRefObject<{ [key: number]: Character }> = useRef(fillPlayground(difficulty));
    // Needs to keep cards opened
    const guessedCeils = useRef({});
    const previousOpenedCard = useRef(EMPTY);

    const playSound = async (
            soundSource: AVPlaybackSource,
            volume: number = 1.0,
            loop: boolean = false,
            setSoundState: React.Dispatch<any> = setSound
            ) => {
        const { sound } = await Audio.Sound.createAsync(soundSource);
        await sound.setVolumeAsync(volume);
        if (loop) {
            await sound.setIsLoopingAsync(true)
        }
        setSoundState(sound);
        await sound.playAsync();
    };

    // Start play the main theme
    useEffect(
        () => {
            playSound(sounds.MAIN, 0.05, true, setMainSound);
        },
        []
    )
    useEffect(
        () => {
            playSound(sounds.ZAPRAVKA, 0.5, false, setGreatingsSound);
        },
        []
    )
    // Prevent memory leak
    useEffect(() => {
        return sound
              ? () => {
                  sound.unloadAsync();
                }
              : undefined;
            },
            [sound]
    );
    useEffect(() => {
        return mainSound
              ? () => {
            mainSound.unloadAsync();
        }
              : undefined;
        },
          [mainSound]
      );
    useEffect(() => {
        return greatingsSound
              ? () => {
            greatingsSound.unloadAsync();
        }
              : undefined;
        },
          [greatingsSound]
      );

    useEffect(
        () => {
            setTimeout(() => setShowAllCards(false), cardsShowingTime);
        },
        [showAllCards],
    );

    const setLabel = (text: string) => {
        setLabelText(text);
        setTimeout(() => setLabelText(''), labelShowingTime)
    };

    const clearCurrentCardPointers = () => {
        previousOpenedCard.current = EMPTY;
        setCurrentCard(EMPTY);
    };

    const resetCardsProgress = (forceRestart: boolean = false) => {
        if (!keepCardsOpened || forceRestart) {
            guessedCeils.current = {};
        }
        clearCurrentCardPointers();
    };

    const restartGame = () => {
        resetCardsProgress(true);
        playfield.current = fillPlayground(difficulty);
        setShowAllCards(true);
        setLabel('На тему сел?');
    };

    const acceptRightChoose = (ceil: number) => {
        const char: Character = playfield.current[ceil];
        // @ts-ignore
        guessedCeils.current[ceil] = true;
        // @ts-ignore
        guessedCeils.current[previousOpenedCard.current] = true;
        clearCurrentCardPointers();
        playSound(getRandomOnSuccaesSound(char.onSuccessSounds));
        setLabel('Ну ты коммерс!');
    };

    const acceptWrongChoose = () => {
        resetCardsProgress();
        setLabel('Ты че буровишь, гандон?!!');
    };

    const setCardAndSavePrevious = (ceil: number) => {
        if (previousOpenedCard.current !== currentCard) {
            previousOpenedCard.current = currentCard;
        }
        if (previousOpenedCard.current !== EMPTY) {
            const previousCard = playfield.current[previousOpenedCard.current];
            const currentCard = playfield.current[ceil];
            if (previousOpenedCard.current === ceil) {
                return;
            }
            if (previousCard.name === currentCard.name) {
                return acceptRightChoose(ceil);
            } else {
                return acceptWrongChoose();
            }
        }
        setCurrentCard(ceil);
    };

    const createField = () => {
        const charImages: React.FC<any>[] = []
        for (const [ceilStr, char] of Object.entries(playfield.current)) {
            const ceil = Number(ceilStr);
            if (showAllCards || ceil in guessedCeils.current || ceil === currentCard) {
                // @ts-ignore
                charImages[ceil] = char.getImageComponent(ceil, () => null, false);
            } else {
                // @ts-ignore
                charImages[ceil] = char.getImageComponent(ceil, () => setCardAndSavePrevious(ceil), true);
            }
        }
        return charImages;
    };

    const field = createField();

    return (
        <>
            <StatusBar style='auto'/>
            <InfoBlock labelText={labelText} />
            { separateArrayOnParts(field, 2).map((val, index) =>  <Playground key={index} >{val}</Playground>) }
            <Footer>
                <Button title={'<-'} onPress={() => setDifficulty(null)} width={50}/>
                <Button title={'↻'} onPress={restartGame} width={50}/>
            </Footer>
        </>
    );
}
