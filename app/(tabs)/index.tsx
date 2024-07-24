import { Button, Text, TextInput, TextInputComponent, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function Index() {
    return (
      <SafeAreaView className="h-screen bg-slate-200 dark:bg-zinc-950">
        <Text className="text-slate-200">
          Edit app/index.tsx to edit this screen.
        </Text>
      </SafeAreaView>
    );
}
