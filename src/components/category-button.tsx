import React from "react";
import { View, Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

export default function CategoryButton({
  title,
  isSelected = false,
  ...props
}: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        "justify-center h-10 rounded-lg mt-2 px-4 bg-slate-800",
        isSelected ? "border-2 border-lime-300" : "bg-slate-800"
      )}
      {...props}
    >
      <Text className="text-white font-bold text-lg">{title}</Text>
    </Pressable>
  );
}
