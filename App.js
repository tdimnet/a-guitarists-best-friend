import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [bpm, setBpm] = useState(60);
  const [sound, setSound] = useState();

  useEffect(() => {
    if (isTicking) {
      (async () => {
        await playSound();
        const timer = setTimeout(() => setSeconds(seconds + 1), handleTimer());
        return () => clearTimeout(timer);
      })();
    }
  }, [isTicking, seconds]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/AccessGranted.m4a")
    );

    setSound(sound);

    await sound.playAsync();
  }

  function handleTimer() {
    const secondsInMinute = 60;
    const toNumber = Number(bpm)

    return (secondsInMinute / toNumber) * 1000
  }

  return (
    <View style={styles.container}>
      <Text>Hello, World!</Text>
      <Text>Number of seconds is {seconds}</Text>
      <Button onPress={() => playSound()} title="Click me" />
      <Button onPress={() => setIsTicking(false)} title="Stop" />
      <Button onPress={() => setIsTicking(true)} title="Start" />
      <View>
        <Text>Choose the number of BPM you want:</Text>
        <Text>This actual number of BPM is: {bpm} BPM</Text>
        <TextInput style={styles.input} value={bpm} onChangeText={setBpm} keyboardType="numeric" />
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
