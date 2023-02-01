import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [bpm, setBpm] = useState(60);
  const [sound, setSound] = useState();

  useEffect(() => {
    if (isTicking) {
      (async () => {
        let time = seconds === 4 ? 1 : seconds + 1;
        await playSound();
        const timer = setTimeout(() => setSeconds(time), handleTimer());
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
    const toNumber = Number(bpm);

    return (secondsInMinute / toNumber) * 1000;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{seconds} / 4</Text>
      <Button onPress={() => playSound()} title="Click me" />
      <Button onPress={() => setIsTicking(false)} title="Stop" />
      <Button onPress={() => setIsTicking(true)} title="Start" />
      <View>
        <Text>Choose the number of BPM you want:</Text>
        <Text>This actual number of BPM is: {bpm} BPM</Text>
        <TextInput
          style={styles.input}
          value={bpm}
          onChangeText={setBpm}
          keyboardType="numeric"
        />
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
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
  },
  title: {
    color: "#333",
    fontSize: 24,
  },
});
