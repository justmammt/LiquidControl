import { Stack } from "expo-router";
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}
import { Platform } from "react-native";
import Index from "./(tabs)";

export default function RootLayout() {

    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  
}
