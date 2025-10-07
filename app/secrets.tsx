import { useAuth } from "@/components/AuthContext";
import { useDarkMode } from "@/components/DarkModeContext";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SecretsScreen() {
  const { user, logout, activateSecretKey } = useAuth();
  const { darkMode } = useDarkMode();
  const router = useRouter();
  const [paperKey, setPaperKey] = useState("");
  const [activated, setActivated] = useState(false);

 useEffect(() => {
  const checkActivation = async () => {
    if (!user || !user.id) return;
    const stored = await AsyncStorage.getItem(`accountActivated_${user.id}`);
    if (stored === "true") setActivated(true);
  };
  checkActivation();
}, [user]);


  const handleLogout = async () => {
    await logout();
    router.replace("/main");
  };

  const handleActivate = async () => {
    const success = await activateSecretKey(paperKey);
    if (success) {
      setActivated(true);
    }
  };

  return (
    <SafeAreaView
      className={darkMode ? "flex-1 bg-black" : "flex-1 bg-blue-50"}
    >
      <View className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="flex-row items-center mb-8">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Feather
              name="arrow-left"
              size={24}
              color={darkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
          <Text
            className={
              darkMode
                ? "text-white text-3xl font-bold"
                : "text-black text-3xl font-bold"
            }
            style={{ fontFamily: "Inconsolata" }}
          >
            Profile
          </Text>
        </View>

        {/* User Info Card */}
        <View
          className={
            darkMode
              ? "bg-gray-800 rounded-2xl p-6 mb-6"
              : "bg-white rounded-2xl p-6 mb-6"
          }
        >
          <View className="items-center mb-4">
            <View className="size-24 bg-blue-500 rounded-full items-center justify-center mb-4">
              <Text
                className="text-white text-4xl font-bold"
                style={{ fontFamily: "Inconsolata" }}
              >
                {user?.username?.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              className={
                darkMode
                  ? "text-white text-2xl font-bold"
                  : "text-black text-2xl font-bold"
              }
              style={{ fontFamily: "Inconsolata" }}
            >
              {user?.username}
            </Text>
            <Text
              className={
                darkMode ? "text-gray-400 text-base" : "text-gray-600 text-base"
              }
              style={{ fontFamily: "Inconsolata" }}
            >
              {user?.email}
            </Text>
          </View>
        </View>

        {/* Account Info */}
        <View
          className={
            darkMode
              ? "bg-gray-800 rounded-2xl p-4 mb-6"
              : "bg-white rounded-2xl p-4 mb-6"
          }
        >
          <View className="flex-row items-center py-3 border-b border-gray-700">
            <Feather
              name="user"
              size={20}
              color={darkMode ? "#fff" : "#000"}
            />
            <Text
              className={
                darkMode ? "text-white ml-3 text-lg" : "text-black ml-3 text-lg"
              }
              style={{ fontFamily: "Inconsolata" }}
            >
              Username: {user?.username}
            </Text>
          </View>
          <View className="flex-row items-center py-3">
            <Feather
              name="mail"
              size={20}
              color={darkMode ? "#fff" : "#000"}
            />
            <Text
              className={
                darkMode ? "text-white ml-3 text-lg" : "text-black ml-3 text-lg"
              }
              style={{ fontFamily: "Inconsolata" }}
            >
              Email: {user?.email}
            </Text>
          </View>
        </View>

        {/* Paper Key Input + Activate Button */}
        <View
          className={
            darkMode
              ? "bg-gray-800 rounded-2xl p-4 mb-6 flex-row items-center"
              : "bg-white rounded-2xl p-4 mb-6 flex-row items-center"
          }
        >
          {activated ? (
            <Text
              className="text-green-500 text-lg font-semibold flex-1 text-center"
              style={{ fontFamily: "Inconsolata" }}
            >
              Account activated
            </Text>
          ) : (
            <>
              <TextInput
                className={
                  darkMode
                    ? "flex-1 bg-gray-700 text-white rounded-xl px-4 py-3 text-base"
                    : "flex-1 bg-gray-100 text-black rounded-xl px-4 py-3 text-base"
                }
                placeholder="Enter paper key"
                placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                value={paperKey}
                onChangeText={setPaperKey}
                style={{ fontFamily: "Inconsolata" }}
              />
              <TouchableOpacity
                onPress={handleActivate}
                className="bg-blue-500 px-4 py-3 rounded-xl ml-3"
              >
                <Text
                  className="text-white font-semibold"
                  style={{ fontFamily: "Inconsolata" }}
                >
                  Activate account
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-500 rounded-2xl py-4 flex-row items-center justify-center"
          onPress={handleLogout}
        >
          <Feather name="log-out" size={20} color="#fff" />
          <Text
            className="text-white text-xl font-semibold ml-2"
            style={{ fontFamily: "Inconsolata" }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
