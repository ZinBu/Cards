import {Image, ImageRequireSource, StyleSheet, TouchableHighlight} from 'react-native';
import {images, sounds} from '../tools/constants';
import {Character} from '../tools/interfaces';


const CharacterImage: React.FC<{ source: ImageRequireSource, onPress: () => void, hide: boolean}> = ({source, onPress, hide}) => {
    return <TouchableHighlight
        onPress={onPress}
        >
            {!hide ? <Image style={styles.char} source={source} /> : <Image style={styles.char} source={images.BOOMER} />}
        </TouchableHighlight>;
};

const killa: Character = {
    name: 'killa',
    onSuccessSounds: [
            sounds.PODARKOV,
            sounds.PODGON
        ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.KILLA} key={key} onPress={onPress} hide={hide} />
}

const kot: Character = {
    name: 'kot',
    onSuccessSounds: [
        sounds.KANITEL,
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.KOT} key={key} onPress={onPress} hide={hide} />
}

const oshparenni: Character = {
    name: 'oshparenni',
    onSuccessSounds: [
        sounds.TERPILA,
        sounds.MERC,
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.OSHPARENNI} key={key} onPress={onPress} hide={hide} />
}

const rama: Character = {
    name: 'rama',
    onSuccessSounds: [
        sounds.NEMI
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.RAMA} key={key} onPress={onPress} hide={hide} />
}


export const characters: Character[] = [
    killa,
    kot,
    oshparenni,
    rama
]

const styles = StyleSheet.create({
    char: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderColor: 'white',
        borderStyle: 'solid',
        border: 3,
        backgroundColor: 'rgba(62, 84, 116, 64)',
    }
});
