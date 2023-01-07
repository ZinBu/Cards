import React, {useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import {Killa} from "../components/Images";

export const Main = () => {
  const [labelText, setlabelText] = useState('');

  return (
          <View style={styles.container}>
            <View style={styles.grid}>
              <Text style={styles.text}>{labelText}</Text>
            </View>
            <Killa />
            <View style={styles.buttonGrid}>
              <Button
                onPress={() => setlabelText('Пидр')}
                title={'Выше'}
              />
              <Button
                onPress={() => setlabelText('Гнида')}
                title={'Ниже'}
              />
            </View>
            <StatusBar style="auto"/>
          </View>
          );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgb(34,41,45)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 48,
    color: '#fff',
    fontFamily: 'Monospace'
  },
  grid: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'space-between',
    flexDirection: "row"
  },
  buttonGrid: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: "row"
  }
});
