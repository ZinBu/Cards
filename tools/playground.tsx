import React from "react";
import {Character} from './interfaces';
import {characters} from "../components/Images";
import { sameCardCount } from "./constants";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

const getRandomCharacter = (array: Character[]) => array[Math.floor(Math.random() * array.length)];

export const fillPlayground = (difficulty: number) => {
    const field: { [key: number]: Character } = {}
    const charCoords: { [key: string]: number[] } = {}
    let shuffledCeils: number[] = shuffle(Array.from(Array(difficulty).keys()))
    characters.forEach(
        (character) => {
            if (shuffledCeils.length === 0) {
                return;
            }
            for (let i = 0; i < sameCardCount; i++) {
                const ceilIndex = shuffledCeils.pop()
                field[ceilIndex] = character;
                if (character.name in charCoords) {
                    charCoords[character.name].push(ceilIndex);
                } else {
                    charCoords[character.name] = [ceilIndex];
                }
            }
        }
    );
    return [field, charCoords]
};
