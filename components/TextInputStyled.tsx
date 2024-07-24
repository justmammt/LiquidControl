import React from "react";
import { TextInput, useColorScheme, View } from "react-native";

type Props = {
  placeholder?: string;
  onChangeText?: any;
};

const TextInputStyled: React.FC<Props> = ({ placeholder, onChangeText }) => {
  const colors = useColorScheme();

  return (
    <View
      className={
        "rounded-full bg-slate-200 dark:bg-zinc-950 border-solid border-2 border-zinc-950 dark:border-slate-400 my-2"
      }
    >
      <TextInput
        onChangeText={onChangeText}
        className="text-zinc-950 dark:text-slate-300 py-3 px-6"
        placeholderTextColor={
          colors === "light" ? "rgb(9 9 11);" : "rgb(170, 170, 170)"
        }
        placeholder={placeholder}
      ></TextInput>
    </View>
  );
};

export default TextInputStyled;
