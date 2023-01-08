import React from "react";
import {StyleSheet, View, Text} from "react-native";

export const MainView: React.FC<React.ComponentProps<any>> = props => (
    <View style={styles.container}>
        {props.children}
    </View>
);

export const InfoBlock: React.FC<React.ComponentProps<any>> = props => (
    <View style={styles.info}>
        <Text style={styles.text}>{props.labelText}</Text>
    </View>
);

export const Playground: React.FC<React.ComponentProps<any>> = props => (
    <View style={styles.flexContainer}>
        {props.children}
    </View>
);

export const Footer: React.FC<React.ComponentProps<any>> = props => (
    <View style={styles.footer}>
        {props.children}
    </View>
);


const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxHeight: '100%',
        fontFamily: 'Monospace',
        backgroundColor: 'rgb(34,41,45)',
        flex: 1,
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'column'
    },
    info: {
        maxHeight: '10%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    flexContainer: {
        maxWidth: '100%',
        maxHeight: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    footer: {
        padding: 15,
        maxWidth: '100%',
        maxHeight: '10%',
        fontFamily: 'Monospace',
        backgroundColor: 'rgb(34,41,45)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
        flexDirection: 'row'
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Monospace',
    }
});
