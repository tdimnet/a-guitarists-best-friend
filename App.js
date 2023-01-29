import { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Audio } from 'expo-av'

export default function App() {
  const [ isTicking, setIsTicking ] = useState(false)
  const [ seconds, setSeconds ] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => isTicking && setSeconds(seconds + 1), 1e3) && playSound()
    return () => clearTimeout(timer)
  }, [seconds, isTicking])

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('./assets/AccessGranted.m4a'))
    await sound.playAsync()
  }


  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Text>Number of seconds is {seconds}</Text>
      <Button onPress={() => playSound()} title="Click me" />
      <Button onPress={() => setIsTicking(false)} title="Pause" />
      <Button onPress={() => setIsTicking(true)} title="Resume" />
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
