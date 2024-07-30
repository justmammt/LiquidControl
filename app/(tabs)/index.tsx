import {
  Button,
  Text,
  TextInput,
  TextInputComponent,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";

export default function Index() {
  const [isOnline, SetIsOnline] = useState(false);
  const [Url, SetUrl] = useState("")
  async function main() {

    await axios.get((await AsyncStorage.getItem("url")) || "").then((res) => {
      if ((res.status = 200)) {
        SetIsOnline(true);
      };
    });
    const _url = await AsyncStorage.getItem("url")
    if (_url != null) {
    SetUrl(_url)
    }
  }

  main();
  return (
    <View className="h-full bg-slate-200 dark:bg-zinc-950">
      <SafeAreaView className="h-screen bg-slate-200 dark:bg-zinc-950">
        <View className="flex flex-row h-2/12">
          <Entypo
            name="dot-single"
            size={40}
            color={isOnline ? "green" : "red"}
          />
          <Text className="my-auto font-bold text-zinc-950 dark:text-slate-200">
            {Url}
          </Text>
        </View>
        
        <View className="flex">

        </View>

      </SafeAreaView>
    </View>
  );
}
