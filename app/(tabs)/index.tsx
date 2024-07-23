import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Index() {
  const [logStatus, SetLogStatus] = useState("false");
  async function checkLogStatus() {
    const value = await AsyncStorage.getItem("isLoggedIn");
    // @ts-ignore
    SetLogStatus(value);
  }

  if (logStatus === "true") {
    return (
      <SafeAreaView className="h-screen bg-slate-200 dark:bg-zinc-950">
        <Text className="text-slate-200">
          Edit app/index.tsx to edit this screen.
        </Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="h-screen bg-slate-200 dark:bg-zinc-950">
        <Text className="text-slate-200">not logged in</Text>

      </SafeAreaView>
    );
  }
}
