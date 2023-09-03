import React from "react";
import { userInputSettings } from "../tools/interfaces";
import {
  cardsSettings,
  musicSettings,
  phrasesAndSymbols,
} from "../content/common";
import { GameCreator } from "./GameCreator";
import { charactersData } from "../content/characters";

export const GameLauncher = () => {
  const gameSettings: userInputSettings = {
    characters: charactersData,
    musicSettings: musicSettings,
    cardsSettings: cardsSettings,
    phrases: phrasesAndSymbols
  };
  return <GameCreator gameSettings={gameSettings} />;
};

