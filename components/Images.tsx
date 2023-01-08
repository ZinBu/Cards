import {Image, ImageRequireSource, StyleSheet, TouchableHighlight} from 'react-native';
import {Character} from '../tools/interfaces';

const CharacterImage: React.FC<{ source: ImageRequireSource, onPress: Function }> = ({source, onPress}) => {
    return <TouchableHighlight
        onPress={onPress}
        >
        <Image style={styles.char} source={source} />
    </TouchableHighlight
>;
};

const charPath = {
    killa: require(`../assets/images/killa.png`),
    kot: require(`../assets/images/kot.png`),
    oshparenni: require(`../assets/images/oshp.png`),
    rama: require(`../assets/images/rama.png`),
};

const killa: Character = {
    name: 'killa',
    onSuccessSounds: [],
    onFailSounds: [],
    getImageComponent: (key: number, onPress: Function) => <CharacterImage source={charPath.killa} key={key} onPress={onPress} />
}

const kot: Character = {
    name: 'kot',
    onSuccessSounds: [],
    onFailSounds: [],
    getImageComponent: (key: number, onPress: Function) => <CharacterImage source={charPath.kot} key={key} onPress={onPress} />
}

const oshparenni: Character = {
    name: 'oshparenni',
    onSuccessSounds: [],
    onFailSounds: [],
    getImageComponent: (key: number, onPress: Function) => <CharacterImage source={charPath.oshparenni} key={key} onPress={onPress} />
}

const rama: Character = {
    name: 'rama',
    onSuccessSounds: [],
    onFailSounds: [],
    getImageComponent: (key: number, onPress: Function) => <CharacterImage source={charPath.rama} key={key} onPress={onPress} />
}

// todo EmptyImage

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
        backgroundColor: 'rgba(62, 84, 116, 64)'
    }
});
