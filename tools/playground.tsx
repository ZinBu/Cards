import React from "react";
import {Character} from './interfaces';
import {characters} from "../components/Images";
import { sameCardCount } from "./constants";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

export const fillPlayground = (difficulty: number) => {
    const field: { [key: number]: Character } = {}
    let shuffledCeils: number[] = shuffle(Array.from(Array(difficulty).keys()))
    characters.forEach(
        (character) => {
            if (shuffledCeils.length === 0) {
                return;
            }
            for (let i = 0; i < sameCardCount; i++) {
                field[shuffledCeils.pop()] = character;
            }
        }
    );
    return field
};
