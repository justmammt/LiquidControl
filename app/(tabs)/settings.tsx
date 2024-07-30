import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { publish } from "@/events";

export default function Settings() {
  const colors = useColorScheme();

  const [URL, SetURL] = React.useState("");
  const [ShowUserModal, SetShowUserModal] = React.useState(false);
  const [User, SetUser] = React.useState("");
  const [ShowPassModal, SetShowPassModal] = React.useState(false);
  const [Pass, SetPass] = React.useState("");

  async function main() {
    // @ts-expect-error
    SetURL(await AsyncStorage.getItem("url"));
  }

  async function toggleUserModal() {
    if (!ShowUserModal) {
      if (await LocalAuthentication.isEnrolledAsync()) {
        LocalAuthentication.authenticateAsync().then(
          (LocalAuthenticationResult) => {
            if (LocalAuthenticationResult.success) {
              // @ts-expect-error
              SetUser(SecureStore.getItem("user"));
              SetShowUserModal(!ShowUserModal);
            }
          }
        );
      } else {
        // @ts-expect-error
        SetUser(SecureStore.getItem("user"));
        SetShowUserModal(!ShowUserModal);
      }
    } else {
      SetShowUserModal(!ShowUserModal);
    }
  }

  async function togglePassModal() {
    if (!ShowPassModal) {
      if (await LocalAuthentication.isEnrolledAsync()) {
        LocalAuthentication.authenticateAsync().then(
          (LocalAuthenticationResult) => {
            if (LocalAuthenticationResult.success) {
              // @ts-expect-error
              SetPass(SecureStore.getItem("pass"));
              SetShowPassModal(!ShowPassModal);
            }
          }
        );
      } else {
        // @ts-expect-error
        SetPass(SecureStore.getItem("pass"));
        SetShowPassModal(!ShowPassModal);
      }
    } else {
      SetShowPassModal(!ShowPassModal);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync("user");
    await SecureStore.deleteItemAsync("pass");
    await SecureStore.deleteItemAsync("url");
    SetShowUserModal(false);
    SetShowPassModal(false);
    SetURL("");
    AsyncStorage.setItem("isLoggedIn", "false");
    publish("logout");
  }

  main();
  return (
    <View className="h-full bg-slate-200 dark:bg-zinc-950">
      <SafeAreaView className=" z-0 h-screen bg-slate-200 dark:bg-zinc-950">
        <View className="p-4 mx-auto justify-center align-center text-center">
          <View className="pb-3">
            <Text className="pb-3 text-xl font-bold dark:text-white">
              Logged into:
            </Text>
            <View className="w-[325] h-16 bg-zinc-950 dark:bg-slate-200 rounded-2xl border-zinc-950 dark:border-slate-200 border-2 ">
              <Text className="m-auto text-xl font-bold text-slate-200 dark:text-zinc-950">
                {URL}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => toggleUserModal()}
            className="w-[325] mb-3 h-8 bg-zinc-950 dark:bg-slate-200 active:dark:bg-slate-300 rounded-2xl"
          >
            <View className="flex flex-row my-auto">
              <Text className="m-auto font-bold text-slate-200 dark:text-zinc-950 ">
                Username: {ShowUserModal ? User : "***"}
              </Text>
              <View className="right-2">
                <Feather
                  name={ShowUserModal ? "eye-off" : "eye"}
                  size={18}
                  color={
                    colors === "light" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
                  }
                />
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => togglePassModal()}
            className="w-[325] h-8 bg-zinc-950 dark:bg-slate-200 active:dark:bg-slate-300 rounded-2xl"
          >
            <View className="flex flex-row my-auto">
              <Text className="m-auto font-bold text-slate-200 dark:text-zinc-950 ">
                Password: {ShowPassModal ? Pass : "***"}
              </Text>
              <View className="right-2">
                <Feather
                  name={ShowPassModal ? "eye-off" : "eye"}
                  size={18}
                  color={
                    colors === "light" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)"
                  }
                />
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => logout()}
            className="w-[325] mt-3 h-16 bg-red-600 active:bg-red-700 rounded-2xl"
          >
            <View className="flex flex-row my-auto">
              <View className="left-2">
                <MaterialIcons name="logout" size={35} color="black" />
              </View>
              <Text className="m-auto font-bold text-2xl text-slate-200 dark:text-zinc-950 ">
                Logout
              </Text>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}
