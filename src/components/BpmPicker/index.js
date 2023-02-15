import React from "react";
import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { numberRange } from "../../utils/numberRange";

const BPM_VALUES = numberRange(40, 200, 1);

export default function Component({ setBpm, bpm, setIsVisible }) {
  return (
    <View>
      <Text>Choose Language</Text>
      <Picker
        selectedValue={String(bpm)}
        onValueChange={(itemValue) => setBpm(itemValue)}
        style={{ width: 200 }}
      >
        {BPM_VALUES.map((value) => (
          <Picker.Item
            key={value}
            label={String(value)}
            value={String(value)}
          />
        ))}
      </Picker>
      <Button onPress={() => setIsVisible(false)} title="Hide Modal" />
    </View>
  );
}
