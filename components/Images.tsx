import {Image, ImageRequireSource, StyleSheet} from 'react-native';


const charPath = {
    killa: require(`../assets/images/killa.png`),
};



const Character: React.FC<{source: ImageRequireSource}> = ({source}) => <Image style={styles.char} source={source} />;

export const Killa = () => <Character source={charPath.killa} />;

const styles = StyleSheet.create({
    char: {
        width: 200,
        height: 200,
    }
});
