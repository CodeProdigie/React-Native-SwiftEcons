import { useAuth } from "@/components/AuthContext";
import { useDarkMode } from "@/components/DarkModeContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, TextInput, ScrollView, Linking, Alert } from "react-native";
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
              <Text className="text-white/70 text-sm mb-1">Account Settings</Text>
              <Text className="text-white text-3xl font-bold">My Profile</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View className={darkMode ? "bg-gradient-to-br bg-gray-800 rounded-3xl p-6 mb-6 shadow-lg" : "bg-white rounded-3xl p-6 mb-6 shadow-lg"}>
          <View className="items-center">
            {/* Avatar with gradient border effect */}
            <View className="mb-4">
              <View className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-30" />
              <View className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full items-center justify-center shadow-xl">
                <Text
                  className="text-white text-5xl font-bold"
                  style={{ fontFamily: "Inconsolata" }}
                >
                  {user?.username?.charAt(0).toUpperCase()}
                </Text>
              </View>
              {/* Status indicator */}
              <View className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white" />
            </View>

            {/* User details */}
            <Text
              className={darkMode ? "text-white text-2xl font-bold mb-1" : "text-gray-900 text-2xl font-bold mb-1"}
              style={{ fontFamily: "Inconsolata" }}
            >
              {user?.username}
            </Text>
            <Text
              className={darkMode ? "text-gray-400 text-base" : "text-gray-600 text-base"}
              style={{ fontFamily: "Inconsolata" }}
            >
              {user?.email}
            </Text>

            {/* Account status badge */}
            <View className={activated ? "bg-green-100 px-4 py-2 rounded-full mt-4" : "bg-amber-100 px-4 py-2 rounded-full mt-4"}>
              <View className="flex-row items-center">
                <Feather 
                  name={activated ? "check-circle" : "alert-circle"} 
                  size={16} 
                  color={activated ? "#059669" : "#D97706"} 
                />
                <Text 
                  className={activated ? "text-green-700 font-semibold ml-2 text-sm" : "text-amber-700 font-semibold ml-2 text-sm"}
                  style={{ fontFamily: "Inconsolata" }}
                >
                  {activated ? "Premium Active" : "Free Account"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Details Section */}
        <View className="mb-6">
          <Text 
            className={darkMode ? "text-white text-lg font-semibold mb-4 px-2" : "text-gray-900 text-lg font-semibold mb-4 px-2"}
            style={{ fontFamily: "Inconsolata" }}
          >
            Account Details
          </Text>
          
          <View className={darkMode ? "bg-gray-800 rounded-2xl overflow-hidden" : "bg-white rounded-2xl overflow-hidden shadow-sm"}>
            {/* Username row */}
            <View className={darkMode ? "flex-row items-center p-4 border-b border-gray-700" : "flex-row items-center p-4 border-b border-gray-100"}>
              <View className="bg-blue-100 p-3 rounded-full mr-4">
                <Feather name="user" size={20} color="#0D47A1" />
              </View>
              <View className="flex-1">
                <Text 
                  className={darkMode ? "text-gray-400 text-xs mb-1" : "text-gray-500 text-xs mb-1"}
                  style={{ fontFamily: "Inconsolata" }}
                >
                  Username
                </Text>
                <Text
                  className={darkMode ? "text-white text-base font-medium" : "text-gray-900 text-base font-medium"}
                  style={{ fontFamily: "Inconsolata" }}
                >
                  {user?.username}
                </Text>
              </View>
            </View>

            {/* Email row */}
            <View className="flex-row items-center p-4">
              <View className="bg-purple-100 p-3 rounded-full mr-4">
                <Feather name="mail" size={20} color="#7C3AED" />
              </View>
              <View className="flex-1">
                <Text 
                  className={darkMode ? "text-gray-400 text-xs mb-1" : "text-gray-500 text-xs mb-1"}
                  style={{ fontFamily: "Inconsolata" }}
                >
                  Email Address
                </Text>
                <Text
                  className={darkMode ? "text-white text-base font-medium" : "text-gray-900 text-base font-medium"}
                  style={{ fontFamily: "Inconsolata" }}
                >
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Activation Section */}
        <View className="mb-6">
          <Text 
            className={darkMode ? "text-white text-lg font-semibold mb-4 px-2" : "text-gray-900 text-lg font-semibold mb-4 px-2"}
            style={{ fontFamily: "Inconsolata" }}
          >
            Premium Access
          </Text>

          <View className={darkMode ? "bg-gray-800 rounded-2xl p-5" : "bg-white rounded-2xl p-5 shadow-sm"}>
            {activated ? (
              <View>
                <View className="bg-green-50 rounded-2xl p-4 mb-4">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-green-100 p-2 rounded-full mr-3">
                      <MaterialIcons name="verified" size={24} color="#059669" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-green-900 font-bold text-lg mb-1" style={{ fontFamily: "Inconsolata" }}>
                        Premium Activated! 🎉
                      </Text>
                      <Text className="text-green-700 text-sm" style={{ fontFamily: "Inconsolata" }}>
                        You have full access to all papers
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Premium features */}
                <View style={{ gap: 8 }}>
                  <View className="flex-row items-center">
                    <Feather name="check" size={18} color="#059669" />
                    <Text className={darkMode ? "text-gray-300 ml-3 text-sm" : "text-gray-700 ml-3 text-sm"} style={{ fontFamily: "Inconsolata" }}>
                      Access to all past papers (2015-2025)
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="check" size={18} color="#059669" />
                    <Text className={darkMode ? "text-gray-300 ml-3 text-sm" : "text-gray-700 ml-3 text-sm"} style={{ fontFamily: "Inconsolata" }}>
                      Unlimited practice questions
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Feather name="check" size={18} color="#059669" />
                    <Text className={darkMode ? "text-gray-300 ml-3 text-sm" : "text-gray-700 ml-3 text-sm"} style={{ fontFamily: "Inconsolata" }}>
                      Track your progress and scores
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View>
                {/* Info banner */}
                <View className="bg-blue-50 rounded-2xl p-4 mb-4">
  <View className="flex-row items-start mb-3">
    <View className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
      <Feather name="key" size={18} color="#0D47A1" />
    </View>
    <View className="flex-1">
      <Text className="text-blue-900 font-semibold mb-1" style={{ fontFamily: "Inconsolata" }}>
        Unlock Premium Features
      </Text>
      <Text className="text-blue-700 text-sm leading-5" style={{ fontFamily: "Inconsolata" }}>
        Enter your activation key to access all past papers from 2015 to 2025
      </Text>
    </View>
  </View>

  {/* WhatsApp contact section */}
  <View className="border-t border-blue-200 pt-3 mt-2">
    <View className="flex-row items-start">
      <View className="bg-green-100 p-2 rounded-full mr-3 mt-1">
        <Feather name="shopping-cart" size={16} color="#059669" />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-sm mb-1" style={{ fontFamily: "Inconsolata" }}>
          Don't have an activation key?
        </Text>
        <Text className="text-gray-700 text-xs leading-5 mb-2" style={{ fontFamily: "Inconsolata" }}>
          Contact admin via WhatsApp to purchase your activation key
        </Text>
        <TouchableOpacity
          onPress={() => {
            const phoneNumber = '650660502';
            const message = 'Hello! I would like to purchase an activation key for SwiftEcons AL.';
            const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
            
            Linking.canOpenURL(url)
              .then((supported) => {
                if (supported) {
                  return Linking.openURL(url);
                } else {
                  Alert.alert('WhatsApp not installed', 'Please install WhatsApp to contact admin');
                }
              })
              .catch((err) => console.error('Failed to open WhatsApp:', err));
          }}
          className="bg-[#25D366] rounded-xl py-2 px-3 flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <Feather name="message-circle" size={16} color="#fff" />
          <Text className="text-white font-semibold text-sm ml-2" style={{ fontFamily: "Inconsolata" }}>
            Contact on WhatsApp
          </Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center mt-2">
          <Feather name="phone" size={12} color="#6B7280" />
          <Text className="text-gray-600 text-xs ml-1" style={{ fontFamily: "Inconsolata" }}>
            674766654
          </Text>
        </View>
      </View>
    </View>
  </View>
</View>

                {/* Input and button */}
                <View style={{ gap: 12 }}>
                  <TextInput
                    className={darkMode ? "bg-gray-700 text-white rounded-xl px-4 py-4 text-base" : "bg-gray-100 text-gray-900 rounded-xl px-4 py-4 text-base"}
                    placeholder="Enter your activation key"
                    placeholderTextColor={darkMode ? "#9CA3AF" : "#6B7280"}
                    value={paperKey}
                    onChangeText={setPaperKey}
                    style={{ fontFamily: "Inconsolata" }}
                  />
                  <TouchableOpacity
                    onPress={handleActivate}
                    className="bg-gradient-to-r bg-[#0D47A1] rounded-xl py-4 flex-row items-center justify-center shadow-md"
                    activeOpacity={0.8}
                  >
                    <MaterialIcons name="vpn-key" size={20} color="#fff" />
                    <Text
                      className="text-white text-base font-semibold ml-2"
                      style={{ fontFamily: "Inconsolata" }}
                    >
                      Activate Premium Access
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          className="bg-red-500 rounded-2xl py-4 flex-row items-center justify-center shadow-md mb-4"
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={22} color="#fff" />
          <Text
            className="text-white text-lg font-semibold ml-2"
            style={{ fontFamily: "Inconsolata" }}
          >
            Logout
          </Text>
        </TouchableOpacity>

        {/* Help text */}
        <View className={darkMode ? "bg-gray-800 rounded-2xl p-4" : "bg-blue-50 rounded-2xl p-4"}>
          <View className="flex-row items-start">
            <Feather name="help-circle" size={18} color="#0D47A1" />
            <Text 
              className={darkMode ? "text-gray-400 text-xs ml-3 flex-1 leading-5" : "text-gray-600 text-xs ml-3 flex-1 leading-5"}
              style={{ fontFamily: "Inconsolata" }}
            >
              Need help with activation? Contact support through the Feedback section in the menu.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}