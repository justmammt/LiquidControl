import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function PlayerScreen() {
  const { user } = useLocalSearchParams();
  let colors = useColorScheme();
  return (
    <View className="h-full bg-slate-200 dark:bg-zinc-950">
      <SafeAreaView>
        <View className="h-10 w-screen flex flex-row"></View>
      </SafeAreaView>
    </View>
  );
}
