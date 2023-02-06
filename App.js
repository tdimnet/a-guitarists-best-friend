import { React, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import { handleBpm, handleNoteValue as handleTimer } from "./src/utils/timer";
import { NOTE_VALUES } from "./src/constants/noteValues";


export default function App() {
  const [isTicking, setIsTicking] = useState(false);
  const [seconds, setSeconds] = useState(1);
  const [bpm, setBpm] = useState(60);
  const [sound, setSound] = useState(null);
  const [noteValue, setNoteValue] = useState(NOTE_VALUES[0]);

  useEffect(() => {
    if (isTicking) {
      (async () => {
        let time = seconds === 4 ? 1 : seconds + 1;
        
        console.log("=====")
        console.log(time)
        console.log("=====")

        await playSound();
        const timer = setTimeout(
          () => setSeconds(time),
          handleTimer(handleBpm(bpm), noteValue.value)
        );
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{seconds} / 4</Text>
      <Button onPress={() => playSound()} title="Play Sound" />
      <Button onPress={() => setIsTicking(true)} title="Start" />
      <Button
        onPress={() => {
          setIsTicking(false);
          setSeconds(1);
        }}
        title="Stop"
      />
      <Button
        onPress={() =>
          console.log(handleTimer(handleBpm(bpm), noteValue.value))
        }
        title="Timer helper"
      />
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
        <Text style={styles.subtitle}>Note Values</Text>
        <Text style={styles.currentNoteValue}>
          Current note value is: {noteValue.name}
        </Text>
        <View style={styles.noteValuesContainer}>
          {NOTE_VALUES.map((noteValue) => (
            <TouchableOpacity
              key={noteValue.name}
              onPress={() => setNoteValue(noteValue)}
            >
              <Image source={noteValue.image} />
            </TouchableOpacity>
          ))}
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
    marginBottom: 16,
  },
  title: {
    color: "#333",
    fontSize: 24,
  },
  subtitle: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  currentNoteValue: {
    marginBottom: 8,
  },
  noteValuesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
