import React, { useRef } from "react";
import {
  Character,
  GameSettings,
  userInputSettings,
} from "../tools/interfaces";
import {
  createCharacters,
  createGreetingSound,
} from "../components/Characters";
import { GameMenu } from "./GameMenu";
import { GameSettingsContext } from "../tools/context";

export const GameCreator: React.FC<{ gameSettings: userInputSettings }> = (
  props
) => {
  const settings = props.gameSettings;
  const greetingSoundsGenerator = createGreetingSound(
    settings.musicSettings.greetingSoundList
  );

  // To avoid unintentional re-rendering
  const gameSettings = useRef<GameSettings>({
    ...settings,
    greetingSoundGen: greetingSoundsGenerator,
  });

  const characters: Character[] = createCharacters(
    settings.characters,
    settings.cardsSettings,
  );

  return (
    <GameSettingsContext.Provider value={gameSettings.current}>
      <GameMenu characters={characters} />
    </GameSettingsContext.Provider>
  );
};
