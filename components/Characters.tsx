import { Character } from '../tools/interfaces';
import { cycle, shuffle } from '../tools/tools';
import { images, sounds } from '../tools/constants';
import { CharacterImage } from './Images'


const charactersData = [
    {
        name: 'killa',
        image: images.KILLA,
        onSuccessSounds: [
            sounds.VLUDI,
            sounds.ZAMERC,
            sounds.PODARKOV,
            sounds.PODGON,
        ],
    },
    {
        name: 'kot',
        image: images.KOT,
        onSuccessSounds: [
            sounds.KANITEL,
            sounds.ALE,
            sounds.BUHOI,
            sounds.SUHAR,
            sounds.NATEME,
        ],
    },
    {
        name: 'oshparenni',
        image: images.OSHPARENNI,
        onSuccessSounds: [
            sounds.TERPILA,
            sounds.MERC,
            sounds.BESPREDEL,
        ],
    },
    {
        name: 'rama',
        image: images.RAMA,
        onSuccessSounds: [
            sounds.NEMI,
            sounds.MOLOKA,
        ],
    },
    {
        name: 'eralash',
        image: images.ERALASH,
        onSuccessSounds: [
            sounds.SMOTRI,
            sounds.MICHISH,
            sounds.GORODISH,
            sounds.OBOSNUEM,
            sounds.PROBLEM,
        ],
    },
    {
        name: 'sobachiha',
        image: images.SOBACHIHA,
        onSuccessSounds: [
            sounds.POUBIVAUT,
            sounds.KATAFALKA,
        ],
    },
    {
        name: 'tractorman',
        image: images.TRACTORMAN,
        onSuccessSounds: [
            sounds.TR_PONYNA,
            sounds.TR_NAZR1,
            sounds.TR_NAZR2,
        ],
    },
];

// @ts-ignore
export const characters: Character[] = charactersData.map(
    (char) => {
        return {
            name: char.name,
            // Randomize an order of phrases for every new play
            onSuccessSounds: cycle(...shuffle(char.onSuccessSounds)),
            getImageComponent: (key: number, onPress: () => void, hide: boolean) => <CharacterImage source={char.image} key={key} onPress={onPress} hide={hide} />
        }
    }
);
