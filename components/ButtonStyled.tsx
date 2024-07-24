import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  className?: string;
};

const ButtonStyled: React.FC<Props> = ({ text, className }) => {
  return (
    <Pressable className={"left-16 m-auto bg-zinc-950 shadow-lg dark:bg-slate-200 h-16 w-32 bottom-0 rounded-full active:bg-zinc-600 active:dark:bg-slate-300 " + {className}}>
      <Text className="text-zinc-950 m-auto font-bold text-lg inset-x-0 text-slate-200 dark:text-zinc-950 ">{text}</Text>
    </Pressable>
  );
};

export default ButtonStyled;
