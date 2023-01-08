import React, {useRef, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import Button from '../components/Button';
import {MainView, InfoBlock, Playground, Footer} from '../components/Placements';
import {fillPlayground} from '../tools/playground';
import {difficultyCeilsMap} from '../tools/constants'

const EMPTY = -1

export const Game = () => {
    const [labelText, setLabelText] = useState('');
    const [difficult, _] = useState(difficultyCeilsMap.easy);
    const [currentCard, setCurrentCard] = useState(EMPTY);

    // Playground permanent state
    const playfield = useRef(fillPlayground(difficult));
    // Needs to keep cards opened
    const guessedCeils = useRef({});
    const previousOpenedCard = useRef(EMPTY);

    const setLabel = (text: string) => {
        setLabelText(text);
        setTimeout(() => setLabelText(''), 1000)
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
        setLabel('На тему сел?');
    };

    const acceptRightChoose = (ceil: number) => {
        guessedCeils.current[ceil] = true
        guessedCeils.current[previousOpenedCard.current] = true
        clearCurrentCardPointers();
        setLabel('Ну ты коммерс!');
    };

    const acceptWrongChoose = (ceil: number) => {
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
                return acceptWrongChoose(ceil);
            }
        }
        setCurrentCard(ceil);
    };

    const createField = () => {
        const charImages: React.FC<any>[] = []
        for (const [ceilStr, char] of Object.entries(playfield.current)) {
            const ceil = Number(ceilStr);
            if (ceil in guessedCeils.current) {
                charImages[ceil] = char.getImageComponent(ceil, () => null, false);
            } else {
                charImages[ceil] = char.getImageComponent(ceil, () => setCardAndSavePrevious(ceil), true);
            }
        }
        return charImages;
    };

    return (
        <MainView>
            <StatusBar style='auto'/>
            <InfoBlock labelText={labelText} />
            <Playground>
                {createField()}
            </Playground>
            <Footer>
                <Button title={'↻'} onPress={restartGame}/>
            </Footer>
        </MainView>
    );
}
