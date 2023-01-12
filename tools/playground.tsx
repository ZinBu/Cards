import React from "react";
import {AVPlaybackSource} from 'expo-av';
import {Character} from './interfaces';
import {characters} from "../components/Images";
import {sameCardCount} from "./constants";

const range = (n: number) => Array.from(Array(n).keys());

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

const getRandomElem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const separateArrayOnParts = (array: any[], parts: number = 3) => {
    const sliceLength = Math.ceil(array.length / parts);
    return range(parts).map((val) => array.slice(sliceLength * val, sliceLength * (val + 1)))
};

export const fillPlayground = (difficulty: number): { [key: number]: Character } => {
    const field: { [key: number]: Character } = {}
    let shuffledCeils: number[] = shuffle(range(difficulty))
    shuffle(characters).forEach(
        (character) => {
            if (!shuffledCeils.length) {
                return;
            }
            for (let i = 0; i < sameCardCount; i++) {
                // @ts-ignore
                field[shuffledCeils.pop()] = character;
            }
        }
    );
    return field
};


export const getRandomOnSuccaesSound = (sounds: AVPlaybackSource[]) => getRandomElem(sounds);
