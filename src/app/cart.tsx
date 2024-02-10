import { useState } from "react";
import { View, Text, ScrollView, Alert, Linking } from "react-native";
import Header from "../components/header";
import { ProductCartProps, useCartStore } from "../stores/cart-store";
import { Product } from "../components/product";
import { LinkButton } from "../components/link-button";
import { formatCurrency } from "../utils/functions/format-currency";
import { Input } from "../components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "../components/button";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

const PHONE_NUMBER = "351967188220";

export default function Cart() {
  const cartStore = useCartStore();
  const [address, setAddress] = useState("");
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert(
      "Remover produto",
      `Deseja remover ${product.title} do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          onPress: () => cartStore.removeProduct(product.id),
        },
      ]
    );
  }

  function handleFinishOrder() {
    if (address.trim() === "") {
      Alert.alert(
        "Endereço de entrega",
        "Digite o endereço de entrega para finalizar o pedido"
      );
      return;
    }

    const products = cartStore.products
      .map((product) => `\n -${product.quantity}: ${product.title}`)
      .join("");

    const message = `NOVO PEDIDO\n\nProdutos:${products}\n\nTotal: ${total}\n\nEndereço de entrega: ${address}`;

    Linking.openURL(
      `http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`
    );

    cartStore.clearCart();
    navigation.goBack();
  }

  return (
    <View className="flex-1 ">
      <Header title={"Carrinho"} cartQuantity={0} />

      <KeyboardAwareScrollView>
        <ScrollView className="flex-1">
          <View className="px-4 py-6">
            {cartStore.products.length > 0 ? (
              <View className="border-b border-slate-400">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="text-slate-400 text-center text-base font-body my-6">
                Carrinho vazio
              </Text>
            )}

            <View className="flex-row gap-2 py-5 pb-4">
              <Text className="text-slate-200 text-xl font-heading">
                Total:
              </Text>
              <Text className="text-lime-400 text-xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Digite o endereço de entrega"
              onChangeText={setAddress}
              blurOnSubmit
              onSubmitEditing={handleFinishOrder}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="mx-4 pb-4">
        <Button
          onPress={handleFinishOrder}
          disabled={cartStore.products.length === 0}
        >
          <Button.Text>Finalizar Pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={24} color="black" />
          </Button.Icon>
        </Button>
        <LinkButton href="/" title="Voltar ao Cardápio" />
      </View>
    </View>
  );
}
