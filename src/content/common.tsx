import {
    CardsSettings,
    MusicSettings,
    PhrasesAndSymbols,
} from "@zinbu/cards-game-launcher";
import { images, sounds } from "./preloads";

export const phrasesAndSymbols: PhrasesAndSymbols = {
    restart: 'На тему сел?',
    rightChocie: 'Ну ты коммерс!',
    wrongChocie: 'Ты че буровишь, гандон?!!',
};


export const musicSettings: MusicSettings ={
    mainThemeBackgroundMusic: sounds.MAIN,
    greetingSoundList: [sounds.V_STOILO, sounds.ZAPRAVKA, sounds.DO_VIESNENIA]
};

export const cardsSettings: CardsSettings = {
    cardBack: images.BOOMER,
    mainActivityBackground: 'rgb(34, 41, 45)',
    cardColor: 'rgb(68, 72, 98)',
    buttonColor: 'rgb(68, 72, 98)',
};
