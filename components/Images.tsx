import React from 'react';
import {Animated, Easing, ImageRequireSource, StyleSheet, TouchableHighlight} from 'react-native';
import {animationSpeed, fadeInSpeed, images} from '../tools/constants';


export const CharacterImage: React.FC<{ source: ImageRequireSource, onPress: () => void, hide: boolean}> = ({source, onPress, hide}) => {
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleX = React.useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: fadeInSpeed,
            useNativeDriver: true,
        }).start();
    };

    const scaleIn = () => {
        Animated.timing(
            scaleX,
            {
                toValue: 1,
                duration: animationSpeed,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        return scaleX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });
    };

    const scaleOut = () => {
        Animated.timing(
            scaleX,
            {
                toValue: 0,
                duration: animationSpeed,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
        return scaleX.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
        })
    };


    React.useEffect(() => {
        fadeIn();
    }, [true])

    return <TouchableHighlight
        onPress={onPress}
        >
            {
                !hide
                ? <Animated.Image style={{...styles.char, opacity: fadeAnim, transform: [{scaleX: scaleIn()}] }} source={source} />
                : <Animated.Image style={{...styles.char, opacity: fadeAnim, transform: [{scaleX: scaleOut()}] }} source={images.BOOMER} />}
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
