import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import { Audio } from "expo-av";

export default function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [bpm, setBpm] = useState(60);
  const [sound, setSound] = useState(null);
  const [noteValue, setNoteValue] = useState("noire");

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

  console.log("======");
  console.log(noteValue);
  console.log("======");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{seconds} / 4</Text>
      <Button onPress={() => playSound()} title="Play Sound" />
      <Button onPress={() => setIsTicking(false)} title="Stop" />
      <Button onPress={() => setIsTicking(true)} title="Start" />
      <View style={styles.bpmContainer}>
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
        <Text style={styles.subtitle}>Figures de notes</Text>
        <View style={styles.noteValuesContainer}>
          <TouchableOpacity onPress={() => setNoteValue('noire')}>
            <Image source={require('./assets/noire.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setNoteValue('croche')}>
            <Image source={require('./assets/croche.png')} />
          </TouchableOpacity>
        </View>
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
  bpmContainer: {
    borderBottomColor: "#333",
    borderBottomWidth: 2,
    marginBottom: 8,
  },
  title: {
    color: "#333",
    fontSize: 24,
  },
  subtitle: {
    color: "#333",
    fontSize: 16,
  },
  noteValuesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
