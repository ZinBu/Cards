import React from "react";
import {AVPlaybackSource} from 'expo-av';
import {Character} from './interfaces';
import {characters} from "../components/Images";
import {sameCardCount} from "./constants";

const shuffle = (array: any[]) => array.sort(() => Math.random() - 0.5);

const getRandomElem = (array: any[]) => array[Math.floor(Math.random() * array.length)];

export const fillPlayground = (difficulty: number): { [key: number]: Character } => {
    const field: { [key: number]: Character } = {}
    let shuffledCeils: number[] = shuffle(Array.from(Array(difficulty).keys()))
    characters.forEach(
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
