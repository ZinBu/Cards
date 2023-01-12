import React from "react";
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type Props = {
    title: string,
    onPress: () => void;
    width: number;
};

const Button: React.FC<Props> = ({title, onPress, width = 150}) => (
    <TouchableOpacity
        onPress={onPress}
        style={{...styles.buttonContainer, width: width ? width : 150}}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonContainer: {
        width: 150,
        margin: 5,
        elevation: 8,
        backgroundColor: "rgb(46,116,76)",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    buttonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
        fontFamily: 'Monospace'
    }
});

export default Button;
