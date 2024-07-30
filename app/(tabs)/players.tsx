import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link } from "expo-router";

export default function Players() {
  const [players, setPlayers] = useState([]);
  let a = 1;
  async function main() {
    await axios
      .get((await AsyncStorage.getItem("url")) + "server/player/list", {
        auth: {
          // @ts-expect-error
          username: await SecureStore.getItemAsync("user"),
          // @ts-expect-error
          password: await SecureStore.getItemAsync("pass"),
        },
      })
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  setTimeout(() => {
    main();
  }, 5000);
  return (
    <View className="h-full bg-slate-200 dark:bg-zinc-950">
      <SafeAreaView className="h-screen bg-slate-200 dark:bg-zinc-950">
        <View className="h-screen w-screen">
          <Text className="text-zinc-950 dark:text-slate-200 text-center font-bold text-2xl">
            Players
          </Text>
          <ScrollView>
            {players.length === 0 ? (
              <Text className="text-zinc-950 dark:text-slate-200 mx-auto text-xl">
                No players online
              </Text>
            ) : (
              <View className="border border-zinc-400 rounded-full dark:border-zinc-600 w-11/12 mx-auto my-4" />
            )}

            {players.map((player) => (
              <View>
                <Link
                  href={{
                    pathname: "/player/[user]",
                    params: { user: player },
                  }}
                  asChild
                >
                  <Pressable>
                    <View className="w-11/12 mx-auto h-16 flex flex-row my-auto">
                      <Image
                        source={{
                          uri: `https://mc-heads.net/avatar/${player}`,
                        }}
                        className="w-16 h-16 rounded-full "
                      />
                      <Text className="text-zinc-950 m-auto dark:text-slate-200 text-xl">
                        {player}
                      </Text>
                    </View>
                    <View className="border border-zinc-400 rounded-full dark:border-zinc-600 w-11/12 mx-auto my-4" />
                  </Pressable>
                </Link>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
