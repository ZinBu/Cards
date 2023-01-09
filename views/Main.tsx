import React, {useRef, useState, useEffect} from 'react';
import {StatusBar} from 'expo-status-bar';
import {Audio} from 'expo-av';
import Button from '../components/Button';
import {MainView, InfoBlock, Playground, Footer} from '../components/Placements';
import {fillPlayground} from '../tools/playground';
import {difficultyCeilsMap, cardsShowingTime, labelShowingTime} from '../tools/constants';

const EMPTY = -1

export const GameMenu = () => {
    const [startGamePressed, setStartGamePressed] = useState(false);

    return (
        <MainView>
            <StatusBar style='auto'/>
            {startGamePressed ? <Game /> : <Button title={'Старт'} onPress={() => setStartGamePressed(true)}/>}
        </MainView>
        );
}

export const Game = () => {
    const [labelText, setLabelText] = useState('');
    const [difficult, _] = useState(difficultyCeilsMap.easy);
    const [currentCard, setCurrentCard] = useState(EMPTY);
    const [showAllCards, setShowAllCards] = useState(true);
    const [sound, setSound] = useState<Audio.Sound>();

    // Playground permanent state
    const playfield = useRef(fillPlayground(difficult));
    // Needs to keep cards opened
    const guessedCeils = useRef({});
    const previousOpenedCard = useRef(EMPTY);

     const playSound = async () => {
            const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/main.mp3'));
            setSound(sound);
            await sound.playAsync();
    };

    // Start play the main theme
    useEffect(
        () => {
            playSound();
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

    const resetCardsProgress = () => {
        guessedCeils.current = {};
        clearCurrentCardPointers();
    };

    const restartGame = () => {
        resetCardsProgress();
        playfield.current = fillPlayground(difficult);
        setShowAllCards(true);
        setLabel('На тему сел?');
    };

    const acceptRightChoose = (ceil: number) => {
        // @ts-ignore
        guessedCeils.current[ceil] = true
        // @ts-ignore
        guessedCeils.current[previousOpenedCard.current] = true
        clearCurrentCardPointers();
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
            if (showAllCards || ceil in guessedCeils.current) {
                // @ts-ignore
                charImages[ceil] = char.getImageComponent(ceil, () => null, false);
            } else {
                // @ts-ignore
                charImages[ceil] = char.getImageComponent(ceil, () => setCardAndSavePrevious(ceil), true);
            }
        }
        return charImages;
    };

    return (
        <>
            <StatusBar style='auto'/>
            <InfoBlock labelText={labelText} />
            <Playground>
                {createField()}
            </Playground>
            <Footer>
                <Button title={'↻'} onPress={restartGame}/>
            </Footer>
        </>
    );
}
