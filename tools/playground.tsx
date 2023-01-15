import React from "react";
import {AVPlaybackSource} from 'expo-av';
import {Character} from './interfaces';
import {characters} from "../components/Characters";
import {sameCardCount} from "./constants";
import {range, shuffle} from "./tools";

export const fillPlayground = (difficulty: number): { [key: number]: Character } => {
    const field: { [key: number]: Character } = {};
    let shuffledCeils: number[] = shuffle(range(difficulty));
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

export const getRandomOnSuccessSound = (sounds: Generator<AVPlaybackSource>) => sounds.next().value;
