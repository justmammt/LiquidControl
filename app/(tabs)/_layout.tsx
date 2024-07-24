import { Redirect, Tabs } from "expo-router";
import React, { useState } from "react";

import { SafeAreaView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import LoginPage from "@/components/login";
import axios from "axios";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [logStatus, SetLogStatus] = useState(false);
  const [canLoad, SetCanLoad] = useState(false);

  async function checkLogStatus() {
    const value = await AsyncStorage.getItem("isLoggedIn");
    const url = await AsyncStorage.getItem("url");
    const user = await SecureStore.getItemAsync("user");
    const pass = await SecureStore.getItemAsync("pass", {
      requireAuthentication: true,
    });
    if (value && url != null && user != null && pass != null) {
      setTimeout(async () => {
        if (
          await axios
            .get(url + "app/auth", {
              auth: {
                username: user,
                password: pass,
              },
            })
            .then((response) => {
              if ((response.status = 200)) {
                return true;
              }
            })
        ) {
          SetLogStatus(true);
          AsyncStorage.setItem("isLoggedIn", "true");
          return true;
        } else {
          SetLogStatus(false);
          AsyncStorage.setItem("isLoggedIn", "false");
          return false;
        }
      }, 1000);
    } else {
      SetLogStatus(false);
      AsyncStorage.setItem("isLoggedIn", "false");
      return false;
    }
  }

  checkLogStatus();

  if (logStatus) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarInactiveTintColor: "gray",
          tabBarLabelPosition: "beside-icon",
        
          tabBarItemStyle: {
            backgroundColor:
              colorScheme === "light" ? "rgb(226 232 240)" : "rgb(9 9 11)",

          },
          tabBarStyle: {
            backgroundColor:
              colorScheme === "light" ? "rgb(226 232 240)" : "rgb(9 9 11);",
            borderTopColor:
              colorScheme === "light" ? "rgb(226 232 240)" : "rgb(9 9 11);",
          },
        }}
      >

        <Tabs.Screen
          name="players"
          options={{
            tabBarLabel: () => null,
            tabBarItemStyle: {
              marginTop: 3,
              borderRadius: 100,
              marginHorizontal: 3
            },
            tabBarActiveBackgroundColor: "#383838",
            tabBarIcon: ({ color, focused }) => (
              <FontAwesome6
                name="people-group"
                size={20}
                color={
                  focused === false
                    ? "rgb(120, 120, 120);"
                    : "rgb(190, 190, 190)"
                }
              />
            ),
          }}
        />
                <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarShowLabel: true,
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 6,
              color:
                colorScheme === "light" ? "rgb(254, 255, 254)" : "rgb(9 9 11);",
            },
            tabBarItemStyle: {
              backgroundColor:
                colorScheme === "light" ? "rgb(9 9 11)" : "rgb(254, 255, 254)",
              borderRadius: 20,
              marginTop: 3,
              marginHorizontal: 3
            },
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="home"
                color={
                  colorScheme === "light"
                    ? "rgb(254, 255, 254)"
                    : "rgb(9 9 11);"
                }
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarLabel: () => null,
            tabBarItemStyle: {
              marginTop: 3,
              borderRadius: 100,
              marginHorizontal: 3
            },
            tabBarActiveBackgroundColor: "#383838",
            tabBarIcon: ({ color, focused }) => (
              <Feather
                name="settings"
                size={20}
                color={
                  focused === false
                    ? "rgb(120, 120, 120);"
                    : "rgb(190, 190, 190)"
                }
              />
            ),
          }}
        />
      </Tabs>
    );
  } else {
    return <LoginPage />;
  }
  /*} else {
    return (
      <SafeAreaView className="bg-slate-200 h-screen dark:bg-zinc-950">
        <View className="flex flex-col h-screen justify-center align-center items-center">
          <View className="text-zinc-950 text-center mb-32 align-center dark:text-slate-200">
            <MaterialCommunityIcons
              name="wifi-alert"
              size={64}
              className="mx-32"
              color={
                colorScheme === "light" ? "rgb(9 9 11);" : "rgb(254, 255, 254)"
              }
            />
            <Text className="text-zinc-950 mb-32 dark:text-slate-200 justify-center font-bold text-2xl">
              LiquidControl won't function without internet connection
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }*/
}
