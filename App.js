import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function App() {
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/AccessGranted.m4a'))
    await sound.playAsync()
  }

  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Button onPress={() => playSound()} title="Click me" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
