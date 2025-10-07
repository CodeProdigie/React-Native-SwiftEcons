import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YearCard from "@/components/YearCard";
import { paper1Years } from "@/constants/papers";

export default function Paper1Screen() {
  const router = useRouter();
  const [isActivated, setIsActivated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkActivationAndUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUserId(parsedUser.id);

          const activation = await AsyncStorage.getItem(`accountActivated_${parsedUser.id}`);
          if (activation === "true") setIsActivated(true);
        }
      } catch (error) {
        console.error("Error checking activation or user status:", error);
      }
    };
    checkActivationAndUser();
  }, []);

  const handlePress = async (year: number) => {
    if (isActivated || year === 2015) {
      router.push({ pathname: "/year/[year]", params: { year: year.toString() } });
    } else {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        router.push("/secrets");
      } else {
        router.push("/forms");
      }
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-8">
        <Text className="text-[#0D47A1] text-2xl font-bold mb-6">Econs Paper 1</Text>

        {paper1Years.map(({ year }) => (
          <YearCard
            key={String(year)}
            year={year}
            onPress={() => handlePress(year)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
