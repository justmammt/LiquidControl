import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
            marginHorizontal: 8,
          },
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="home"
              color={
                colorScheme === "light" ? "rgb(254, 255, 254)" : "rgb(9 9 11);"
              }
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="players"
        
        options={{
          tabBarLabel: () => null,
          tabBarItemStyle: {
            marginTop: 3,
            borderRadius: 100,
            
          },
          tabBarActiveBackgroundColor: "#383838",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name="people-group"
              size={20}
              color={
                focused === false ? "rgb(120, 120, 120);" : "rgb(190, 190, 190)"
              }
            />
          ),
        }}
      />
    </Tabs>
  );

}
