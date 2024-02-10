import React, { useState, useRef } from "react";
import { View, Text, FlatList, SectionList } from "react-native";
import { Link } from "expo-router";
import Header from "../components/header";
import CategoryButton from "../components/category-button";
import { CATEGORIES, MENU, ProductProps } from "../utils/data/products";
import { Product } from "../components/product";
import { useCartStore } from "../stores/cart-store";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const sectionListRef = useRef<SectionList<ProductProps>>(null);
  const cartStore = useCartStore();

  const cartQuantityItems = cartStore.products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );

  function handleCategoryPress(category: string) {
    setSelectedCategory(category);
    const index = CATEGORIES.indexOf(category);

    sectionListRef.current?.scrollToLocation({
      sectionIndex: index,
      itemIndex: 0,
      animated: true,
    });
  }
  return (
    <View className="flex-1 pt-8">
      <Header title={"Cardápio"} cartQuantity={cartQuantityItems} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={selectedCategory === item}
            onPress={() => handleCategoryPress(item)}
          />
        )}
        horizontal
        className="max-h-12 mt-2 "
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl  font-heading mt-8 mb-3 ">
            {title}
          </Text>
        )}
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
