import { SafeAreaView, View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const [URL, SetURL] = React.useState("");
  async function main() {
    // @ts-expect-error
    SetURL(await AsyncStorage.getItem("url"));
  }
  main();
  return (
    <SafeAreaView className=" h-screen bg-slate-200 dark:bg-zinc-950">
      <View className="p-4 mx-auto justify-center align-center text-center">

        <View className="pb-3">
          <Text className="pb-3 text-xl font-bold dark:text-white">
            Logged into:
          </Text>
          <View className="w-[325] h-16 bg-zinc-950 dark:bg-slate-200 rounded-2xl border-zinc-950 dark:border-slate-200 border-2 ">
            <Text className="m-auto font-bold text-slate-200 dark:text-zinc-950">
              {URL}
            </Text>
          </View>
        </View>

        <View>
            
        </View>

      </View>
    </SafeAreaView>
  );
}
