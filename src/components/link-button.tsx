import { Link, LinkProps } from "expo-router";
import React from "react";
import { TouchableOpacityProps } from "react-native";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export function LinkButton({ title, ...props }: LinkButtonProps) {
  return (
    <Link
      className="text-slate-300 text-center text-base font-body pt-6"
      {...props}
    >
      {title}
    </Link>
  );
}
