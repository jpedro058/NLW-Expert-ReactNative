import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  title: string;
  cartQuantity?: number;
};
export default function Header({ title, cartQuantity = 0 }: HeaderProps) {
  return (
    <View className="items-center flex-row justify-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("../assets/logo.png")} className="w-32 h-6" />

        <Text className="text-white font-heading text-xl mt-2">{title}</Text>
      </View>

      {cartQuantity > 0 && (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative">
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className=" text-xs font-bold text-slate-900">
                {cartQuantity}
              </Text>
            </View>

            <Feather name="shopping-bag" size={24} color={colors.white} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
