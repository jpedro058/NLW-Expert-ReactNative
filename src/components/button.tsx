import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { TouchableOpacityProps } from "react-native";
import { ReactNode } from "react";

type ButtonProps = TouchableOpacityProps & {
  children: ReactNode;
};

type ButtonTextProps = {
  children: ReactNode;
};

type ButtonIconProps = {
  children: ReactNode;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className="h-12 bg-lime-400 rounded-xl items-center justify-center flex-row"
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <Text className="text-black font-heading text-lg mx-2">{children}</Text>
  );
}

function ButtonIcon({ children }: ButtonTextProps) {
  return <>{children}</>;
}

Button.Text = ButtonText;
Button.Icon = ButtonIcon;

export { Button };
