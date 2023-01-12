import React from 'react';
import {ImageRequireSource, StyleSheet, TouchableHighlight, Animated} from 'react-native';
import {images, sounds, animationSpeed} from '../tools/constants';
import {Character} from '../tools/interfaces';


const CharacterImage: React.FC<{ source: ImageRequireSource, onPress: () => void, hide: boolean}> = ({source, onPress, hide}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: animationSpeed,
                    useNativeDriver: true
                }
                ).start();
        }, [fadeAnim])

    return <TouchableHighlight
        onPress={onPress}
        >
        {!hide ? <Animated.Image style={{...styles.char, opacity: fadeAnim}} source={source} /> : <Animated.Image style={styles.char} source={images.BOOMER} />}
        </TouchableHighlight>;
};

const killa: Character = {
    name: 'killa',
    onSuccessSounds: [
            sounds.PODARKOV,
            sounds.PODGON,
            sounds.VLUDI,
        ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.KILLA} key={key} onPress={onPress} hide={hide} />
}

const kot: Character = {
    name: 'kot',
    onSuccessSounds: [
        sounds.KANITEL,
        sounds.ALE,
        sounds.BUHOI,
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
        sounds.NEMI,
        sounds.MOLOKA,
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.RAMA} key={key} onPress={onPress} hide={hide} />
}

const sobachiha: Character = {
    name: 'sobachiha',
    onSuccessSounds: [
        sounds.POUBIVAUT,
        sounds.KATAFALKA,
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.SOBACHIHA} key={key} onPress={onPress} hide={hide} />
}


const eralash: Character = {
    name: 'eralash',
    onSuccessSounds: [
        sounds.SMOTRI,
        sounds.MICHISH,
    ],
    onFailSounds: [],
    // @ts-ignore
    getImageComponent: (key: number, onPress: Function, hide: boolean) => <CharacterImage source={images.ERALASH} key={key} onPress={onPress} hide={hide} />
}


export const characters: Character[] = [
    killa,
    kot,
    oshparenni,
    rama,
    sobachiha,
    eralash,
]

const styles = StyleSheet.create({
    char: {
        margin: 10,
        width: 100,
        height: 100,
        borderRadius: 12,
        borderColor: 'white',
        borderStyle: 'solid',
        border: 3,
        backgroundColor: '#3e8d6c82',
    }
});
