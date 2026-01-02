import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YearCard from "@/components/YearCard";
import { paper1Years } from "@/constants/papers";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useDarkMode } from "@/components/DarkModeContext";

export default function Paper1Screen() {
  const router = useRouter();
  const { darkMode } = useDarkMode();
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
    if (isActivated || year === 2015 || year===20016 || year===2017 || year===2018 || year===2019 || year===2020 || year===2021 || year===2022 || year===2023 || year===2024 || year===2025) {
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
    <SafeAreaView className={darkMode ? "flex-1 bg-black" : "flex-1 bg-gray-50"}>
      {/* Header Section */}
      <View className={darkMode ? "bg-[#0D47A1] pb-8 pt-4" : "bg-[#0D47A1] pb-8 pt-4"}>
        {/* Background decorative elements */}
        <View className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-10" />
        <View className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20" />
        
        <View className="px-6">
          {/* Back button and title */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="mr-4 p-2 rounded-full bg-white/20"
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <View className="flex-1">
              <Text className="text-white/70 text-sm mb-1">Advanced Level Economics</Text>
              <Text className="text-white text-3xl font-bold">Paper 1</Text>
            </View>
          </View>

          {/* Info cards */}
          <View className="flex-x-3" style={{ flexDirection: 'row', gap: 12 }}>
            <View className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-4">
              <View className="flex-row items-center mb-2">
                <View className="bg-white/20 p-2 rounded-full mr-2">
                  <MaterialIcons name="quiz" size={20} color="#fff" />
                </View>
                <Text className="text-white font-semibold">Format</Text>
              </View>
              <Text className="text-white/80 text-xs">Multiple Choice Questions</Text>
            </View>
            
            <View className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl p-4">
              <View className="flex-row items-center mb-2">
                <View className="bg-white/20 p-2 rounded-full mr-2">
                  <Feather name="calendar" size={20} color="#fff" />
                </View>
                <Text className="text-white font-semibold">Years</Text>
              </View>
              <Text className="text-white/80 text-xs">2015 - 2025</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView 
        className="flex-1 px-6 pt-6" 
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Section header */}
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className={darkMode ? "text-white text-xl font-bold" : "text-gray-900 text-xl font-bold"}>
              Select a Year
            </Text>
            <Text className={darkMode ? "text-gray-400 text-sm mt-1" : "text-gray-600 text-sm mt-1"}>
              {paper1Years.length} past papers available
            </Text>
          </View>
          
          {/* Filter/Sort button (optional future feature) */}
          <TouchableOpacity 
            className={darkMode ? "bg-white/10 p-3 rounded-full" : "bg-white p-3 rounded-full shadow-sm"}
            activeOpacity={0.7}
          >
            <Feather name="filter" size={20} color={darkMode ? "#fff" : "#0D47A1"} />
          </TouchableOpacity>
        </View>

        {/* Status indicator */}
        {!isActivated && (
          <View className={darkMode ? "bg-amber-900/20 border border-amber-700/30 rounded-2xl p-4 mb-6 flex-row items-start" : "bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex-row items-start"}>
            <View className="bg-amber-100 p-2 rounded-full mr-3">
              <Feather name="lock" size={18} color="#D97706" />
            </View>
            <View className="flex-1">
              <Text className={darkMode ? "text-amber-200 font-semibold mb-1" : "text-amber-900 font-semibold mb-1"}>
                Limited Access
              </Text>
              <Text className={darkMode ? "text-amber-300/80 text-sm leading-5" : "text-amber-800 text-sm leading-5"}>
                Only 2015 is available. {isLoggedIn ? "Activate your account" : "Sign in"} to unlock all years.
              </Text>
            </View>
          </View>
        )}

        {/* Activated status */}
        {isActivated && (
          <View className={darkMode ? "bg-green-900/20 border border-green-700/30 rounded-2xl p-4 mb-6 flex-row items-start" : "bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 flex-row items-start"}>
            <View className="bg-green-100 p-2 rounded-full mr-3">
              <Feather name="check-circle" size={18} color="#059669" />
            </View>
            <View className="flex-1">
              <Text className={darkMode ? "text-green-200 font-semibold mb-1" : "text-green-900 font-semibold mb-1"}>
                Full Access Activated
              </Text>
              <Text className={darkMode ? "text-green-300/80 text-sm" : "text-green-800 text-sm"}>
                You have access to all past papers. Happy studying! 🎉
              </Text>
            </View>
          </View>
        )}

        {/* Year cards grid */}
        <View style={{ gap: 12 }}>
          {paper1Years.map(({ year }) => (
            <YearCard
              key={String(year)}
              year={year}
              onPress={() => handlePress(year)}
            />
          ))}
        </View>

        {/* Bottom info card */}
        <View className={darkMode ? "mt-6 bg-blue-900/20 border border-blue-800/30 rounded-2xl p-5" : "mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5"}>
          <View className="flex-row items-start">
            <View className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
              <Feather name="info" size={18} color="#0D47A1" />
            </View>
            <View className="flex-1">
              <Text className={darkMode ? "text-white font-semibold mb-1" : "text-gray-900 font-semibold mb-1"}>
                Exam Tips
              </Text>
              <Text className={darkMode ? "text-gray-300 text-sm leading-5" : "text-gray-700 text-sm leading-5"}>
                Paper 1 consists of multiple choice questions. Time management is key - don't spend too long on any single question.
              </Text>
            </View>
          </View>
        </View>

        {/* Enhanced footer */}
                       <View className="w-full">
                           <View className={darkMode ? "bg-black border-t border-white/10 px-6 py-4" : "bg-white border-t border-gray-200 px-6 py-4"}>
                               <View className="flex-row items-center justify-center">
                                   <View className="bg-[#0D47A1] w-2 h-2 rounded-full mr-2" />
                                   <Text 
                                       className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"} 
                                       style={{ fontFamily: 'Inconsolata' }}
                                   >
                                       Empowering Advanced Level Students
                                   </Text>
                                   <View className="bg-[#0D47A1] w-2 h-2 rounded-full ml-2" />
                               </View>
                               <Text 
                                   className={darkMode ? "text-gray-500 text-xs text-center mt-1" : "text-gray-500 text-xs text-center mt-1"} 
                                   style={{ fontFamily: 'Inconsolata' }}
                               >
                                   Made with ❤️ for Economics Excellence
                               </Text>
                           </View>
                       </View>
      </ScrollView>
    </SafeAreaView>
  );
}