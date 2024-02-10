import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";
import { PRODUCTS } from "@/src/utils/data/products";
import { formatCurrency } from "@/src/utils/functions/format-currency";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/src/components/link-button";
import { useCartStore } from "@/src/stores/cart-store";

export default function Product() {
  const cartStore = useCartStore();
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const product = PRODUCTS.find((product) => product.id === id);

  function handleAddToCart() {
    if (product) {
      cartStore.addProduct(product);
      navigation.goBack();
    }
  }

  if (!product) {
    return <Redirect href="/" />;
  }

  return (
    <View className="flex-1 justify-between">
      <View>
        <Image
          source={product.cover}
          className="w-full h-60"
          resizeMode="cover"
        />

        <View className="px-4 py-6">
          <Text className="text-slate-200 text-2xl font-heading">
            {product.title} -{" "}
            <Text className="text-lime-400 text-2xl font-heading">
              {formatCurrency(product.price)}
            </Text>
          </Text>
          <Text className="text-slate-400 text-sm mt-1">
            {product.description}
          </Text>

          <Text className="text-slate-200 text-lg font-heading mt-6">
            Ingredientes:
          </Text>
          {product.ingredients.map((ingredient, index) => (
            <Text key={index} className="text-slate-400 font-body text-base ">
              {"\u2022"} {ingredient}
            </Text>
          ))}
        </View>
      </View>

      <View className="p-5 pb-4">
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" size={24} color="black" />
          </Button.Icon>
          <Button.Text>Adicionar ao carrinho</Button.Text>
        </Button>

        <LinkButton title="Voltar ao Cardápio" href="/" />
      </View>
    </View>
  );
}

/* <TouchableOpacity
      className="w-full flex-row items-center pb-4"
      onPress={() => {}}
      {...props}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-t-lg" />

      <View className="flex-1 ml-3">
        <View className="flex-row items-center">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </Text>

          {data.quantity && (
            <Text className="text-slate-400 font-subtitle text-sm">
              x {data.quantity}
            </Text>
          )}
        </View>

        <Text className="text-slate-400 text-xs leading-5 mt-0.5">
          {data.description}
        </Text>
      </View>
    </TouchableOpacity> */
