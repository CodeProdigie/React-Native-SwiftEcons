import { Feather } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../components/AuthContext";

const forms = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register, loading } = useAuth();
  const router = useRouter();

  const handleRegister = async () => {
    const success = await register(username, email, password);
    if (success) router.push("/main");
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50 w-full">
      <View className="flex-1 flex-col items-center justify-center gap-6 w-full">
        <View className="size-28 bg-blue-500 rounded-3xl -py-6">
          <Image
            source={require("@/assets/logo.png")}
            className="size-28 -my-2"
          />
        </View>
        <View className="flex-col items-center">
          <Text
            className="text-4xl font-bold"
            style={{ fontFamily: "Inconsolata" }}
          >
            Register on SwiftEcons
          </Text>
          <Text
            className="text-base font-bold"
            style={{ fontFamily: "Inconsolata" }}
          >
            get full access to questions and answers
          </Text>
        </View>
        <View className="w-11/12 flex-col gap-2">
          <View className="flex-row items-center gap-2 w-full border border-gray-600 rounded-xl px-2">
            <Feather name="user" size={20} />
            <TextInput
              placeholder="Enter your username"
              className="flex-1 py-3 text-xl"
              style={{ fontFamily: "Inconsolata" }}
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View className="flex-row items-center gap-2 w-full border border-gray-600 rounded-xl px-2">
            <Feather name="mail" size={20} />
            <TextInput
              placeholder="Enter your Email Address"
              className="flex-1 py-3 text-xl"
              style={{ fontFamily: "Inconsolata" }}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View className="flex-row items-center gap-2 w-full border border-gray-600 rounded-xl px-2">
            <Feather name="lock" size={20} />
            <TextInput
              placeholder="Enter your Password"
              className="flex-1 py-3 text-xl"
              style={{ fontFamily: "Inconsolata" }}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="flex-row items-center ml-3">
            <Text>Already have an account? </Text>
            <Link href="./login" className="text-[#0054a8]">
              <Text className="text-xl" style={{ fontFamily: "Inconsolata" }}>
                login now
              </Text>
            </Link>
          </View>
        </View>
        <TouchableOpacity
          className="w-11/12 bg-[#0054a8] rounded-xl py-3"
          onPress={handleRegister}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text
              className="text-center text-2xl text-white font-semibold"
              style={{ fontFamily: "Inconsolata" }}
            >
              Register Now
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default forms;
