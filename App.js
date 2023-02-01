import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bpm, setBpm] = useState(60)

  useEffect(() => {
    const timer =
      setTimeout(() => isTicking && setSeconds(seconds + 1), handleTimer()) &&
      playSound();
    return () => clearTimeout(timer);
  }, [seconds, isTicking]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/AccessGranted.m4a")
    );
    await sound.playAsync();
  }

  function handleTimer() {
    const oneBitPerSecond = 60
    const oneBitPerOneSecondAndThree = 80
    const oneBitPerOneSecondAndSix = 100
    const twoBitPerSecond = 120 

    if (bpm === oneBitPerSecond) {
      return 1000
    } else if (bpm === oneBitPerOneSecondAndThree) { 
      return 750
    } else if (bpm === oneBitPerOneSecondAndSix) {
      return 600
    } else if (bpm === twoBitPerSecond) {
      return 500
    } else {
      throw new Error('Something went wrong')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Text>Number of seconds is {seconds}</Text>
      <Button onPress={() => playSound()} title="Click me" />
      <Button onPress={() => setIsTicking(false)} title="Pause" />
      <Button onPress={() => setIsTicking(true)} title="Resume" />
      <View>
        <Text>Choose the number of BPM you want:</Text>
        <Text>This actual number of BPM is: {bpm} BPM</Text>
        <Button onPress={() => setBpm(60)} title="60 BPM"></Button>
        <Button onPress={() => setBpm(80)} title="80 BPM"></Button>
        <Button onPress={() => setBpm(100)} title="100 BPM"></Button>
        <Button onPress={() => setBpm(120)} title="120 BPM"></Button>
      </View>
      <View>
        <Button onPress={() => handleTimer()} title="Timer info" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
