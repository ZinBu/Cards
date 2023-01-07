import React from "react";
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

type Props = {
    title: string,
    onPress: () => void;
};

const Button: React.FC<Props> = ({title, onPress}) => (
    <TouchableOpacity
        onPress={onPress}
        style={styles.buttonContainer}
    >
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    buttonContainer: {
        elevation: 8,
        backgroundColor: "rgb(46,116,76)",
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});

export default Button;
