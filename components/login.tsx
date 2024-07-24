import * as SecureStore from "expo-secure-store";
import React from "react";
import { SafeAreaView, Text, View, Pressable, Alert } from "react-native";
import TextInputStyled from "@/components/TextInputStyled";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {decode as atob, encode as btoa} from 'base-64'
import TabLayout from "@/app/(tabs)/_layout";

function isValidUrl(string: string) {
    try {
      new URL("https://" + string);
      return true;
    } catch (err) {
      return false;
    }
  }

export async function Login(link: string, user: string, pass: string) {
    if (link.startsWith("http") && !link.endsWith("/")) {
      if (user != "" && pass != "") {
        await axios
          .get("https://" + link + "/app/auth", {
            auth: {
              username: user,
              password: pass,
            },
          })
          .then(function (response) {
            if (response.status === 200) {
              try {
                SecureStore.setItemAsync("pass", pass);
                SecureStore.setItemAsync("user", user);
                AsyncStorage.setItem("url", "https://" + link + "/");

                AsyncStorage.setItem("isLoggedIn", "true");
                console.log("Logged in")

                return true;
              } catch (e) {
                console.log(e);
                return false;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
            return false;
          });
      }
    } else {
      Alert.alert("Error", 'Invalid API URL (it must end with "/")', [
        {
          text: "Ok",
        },
      ]);
      return false;
    }
  }

export default function LoginPage() {
  const [APIUrl, SetAPIUrl] = React.useState("");
  const [User, SetUser] = React.useState("");
  const [Pass, SetPass] = React.useState("");


  
  return (
    <SafeAreaView className=" h-screen bg-slate-200 dark:bg-zinc-950">
      <Text className="text-center text-2xl font-bold text-zinc-950 dark:text-slate-200">
        LiquidREST Login
      </Text>
      <Text></Text>
      <View className="relative h-screen">
        <View className="justify-center mt-48 mx-12">
          <TextInputStyled
            onChangeText={(text: React.SetStateAction<string>) =>
              SetAPIUrl(text)
            }
            placeholder="API ex: api.fanilla.cloud"
          />
          <TextInputStyled
            onChangeText={(text: React.SetStateAction<string>) => SetUser(text)}
            placeholder="Username"
          />
          <TextInputStyled
            onChangeText={(text: React.SetStateAction<string>) => SetPass(text)}
            placeholder="Password"
          />
        </View>
        <View className="text-center justify-center w-64 h-64">
          <Pressable
            onPress={() =>  { Login(APIUrl, User, Pass); console.log("Pressed")}}
            className="left-16 m-auto bg-zinc-950 shadow-lg dark:bg-slate-200 h-16 w-32 bottom-0 rounded-full active:bg-zinc-600 active:dark:bg-slate-300"
          >
            <Text className="text-zinc-950 m-auto font-bold text-lg inset-x-0 text-slate-200 dark:text-zinc-950 ">
              Login
            </Text>
          </Pressable>
          
        </View>
      </View>
    </SafeAreaView>
  );
}

