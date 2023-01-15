import React from 'react';
import {Animated, ImageRequireSource, StyleSheet, TouchableHighlight} from 'react-native';
import {animationSpeed, images} from '../tools/constants';


export const CharacterImage: React.FC<{ source: ImageRequireSource, onPress: () => void, hide: boolean}> = ({source, onPress, hide}) => {
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
