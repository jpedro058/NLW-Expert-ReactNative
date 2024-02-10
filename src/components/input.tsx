import React from "react";
import { TextInput, TextInputProps } from "react-native";
import colors from "tailwindcss/colors";

export function Input({ ...props }: TextInputProps) {
  return (
    <TextInput
      multiline
      textAlignVertical="top"
      placeholderTextColor={colors.slate[400]}
      className="bg-slate-800 text-slate-200 p-4 rounded-lg h-32 "
      {...props}
    />
  );
}
