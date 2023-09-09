import {GameLauncher, userInputSettings} from '@zinbu/cards-game-launcher';
import { charactersData } from '../content/characters';
import {cardsSettings, musicSettings, phrasesAndSymbols } from '../content/common';

export const GameCreator = () => {
  const gameSettings: userInputSettings = {
    characters: charactersData,
    musicSettings: musicSettings,
    cardsSettings: cardsSettings,
    phrases: phrasesAndSymbols
  };
  return <GameLauncher gameSettings={gameSettings} />;
};
