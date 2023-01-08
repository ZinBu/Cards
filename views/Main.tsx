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
    const [field, charCoords] = useRef(fillPlayground(difficult)).current;
    // Needs to keep cards opened
    const guessedPositions = useRef({});
    const previousOpenedCard = useRef(EMPTY);

    const setLabel = (text: string) => {
        setLabelText(text);
        setTimeout(() => setLabelText(''), 1000)
    };

    const setCardAndSavePrevious = (ceil: number) => {
        if (previousOpenedCard.current !== currentCard) {
            previousOpenedCard.current = currentCard;
        }
        setCurrentCard(ceil);
    };

    const createField = () => {
        const charImages: React.FC<any>[] = []
        for (const [ceilStr, char] of Object.entries(field)) {
            const ceil = Number(ceilStr)
            charImages[ceil] = char.getImageComponent(ceil, () => setCardAndSavePrevious(ceil))
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
                <Button title={'?'} onPress={() => setLabel('На тему сел?')}/>
            </Footer>
        </MainView>
    );
}
