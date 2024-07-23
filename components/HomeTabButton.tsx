import { Feather } from "@expo/vector-icons";
import { useColorScheme, View, Text } from "react-native";

export default function HomeTabButton() {
  let colorScheme = useColorScheme();
  return (
    <View className="flex flex-row">
      <Feather
        name="home"
        color={colorScheme === "light" ? "rgb(254, 255, 254)" : "rgb(9 9 11);"}
        size={26}
      />
     <Text> Home</Text>
    </View>
  );
}
