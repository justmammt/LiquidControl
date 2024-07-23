import { Stack } from "expo-router";
import { Platform } from "react-native";
import Index from "./(tabs)";

export default function RootLayout() {

    return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    );
  
}
