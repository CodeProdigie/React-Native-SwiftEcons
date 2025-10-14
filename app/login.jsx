import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthContext";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) router.push("/main");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Background decoration */}
      <View className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32" />
      <View className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -ml-48 -mb-48" />

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and branding */}
        <View className="items-center mb-10">
          <View className="w-32 h-32 bg-blue-600 rounded-3xl items-center justify-center shadow-xl mb-6">
            <Image
              source={require("@/assets/logo.png")}
              className="w-28 h-28"
              resizeMode="contain"
            />
          </View>
          
          <Text
            className="text-gray-900 text-4xl font-bold mb-2 text-center"
            style={{ fontFamily: "Inconsolata" }}
          >
            Welcome Back
          </Text>
          <Text
            className="text-gray-600 text-base text-center px-4"
            style={{ fontFamily: "Inconsolata" }}
          >
            Login to continue your Economics journey
          </Text>
        </View>

        {/* Form container */}
        <View className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <View style={{ gap: 16 }}>
            {/* Email input */}
            <View>
              <Text className="text-gray-700 text-sm font-semibold mb-2 ml-1" style={{ fontFamily: "Inconsolata" }}>
                Email Address
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1">
                <Feather name="mail" size={20} color="#6B7280" />
                <TextInput
                  placeholder="your.email@example.com"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 py-3 text-base text-gray-900 ml-3"
                  style={{ fontFamily: "Inconsolata" }}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Password input */}
            <View>
              <Text className="text-gray-700 text-sm font-semibold mb-2 ml-1" style={{ fontFamily: "Inconsolata" }}>
                Password
              </Text>
              <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-1">
                <Feather name="lock" size={20} color="#6B7280" />
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 py-3 text-base text-gray-900 ml-3"
                  style={{ fontFamily: "Inconsolata" }}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} activeOpacity={0.7}>
                  <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot password link */}
            <TouchableOpacity className="self-end" activeOpacity={0.7}>
              <Text className="text-[#0D47A1] text-sm font-semibold" style={{ fontFamily: "Inconsolata" }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login button */}
          <TouchableOpacity
            className="bg-gradient-to-r bg-[#0D47A1] rounded-xl py-4 mt-6 shadow-md"
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <View className="flex-row items-center justify-center">
                <Text
                  className="text-white text-lg font-bold"
                  style={{ fontFamily: "Inconsolata" }}
                >
                  Login to SwiftEcons
                </Text>
                <Feather name="arrow-right" size={20} color="#fff" style={{ marginLeft: 8 }} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Register link */}
        <View className="flex-row items-center justify-center">
          <Text className="text-gray-600 text-base" style={{ fontFamily: "Inconsolata" }}>
            Don't have an account?{" "}
          </Text>
          <Link href="./forms" asChild>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="text-[#0D47A1] text-base font-bold" style={{ fontFamily: "Inconsolata" }}>
                Register Now
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Features preview */}
        <View className="mt-8 bg-blue-50 rounded-2xl p-5">
          <Text className="text-gray-900 font-semibold mb-3 text-center" style={{ fontFamily: "Inconsolata" }}>
            Why SwiftEcons AL?
          </Text>
          <View style={{ gap: 8 }}>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Feather name="check" size={14} color="#0D47A1" />
              </View>
              <Text className="text-gray-700 text-sm flex-1" style={{ fontFamily: "Inconsolata" }}>
                Access past papers from 2015-2025
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Feather name="check" size={14} color="#0D47A1" />
              </View>
              <Text className="text-gray-700 text-sm flex-1" style={{ fontFamily: "Inconsolata" }}>
                Track your progress and performance
              </Text>
            </View>
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-2 rounded-full mr-3">
                <Feather name="check" size={14} color="#0D47A1" />
              </View>
              <Text className="text-gray-700 text-sm flex-1" style={{ fontFamily: "Inconsolata" }}>
                Study anytime, anywhere
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;
