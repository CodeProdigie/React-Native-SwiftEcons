import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ComingSoonScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white justify-center items-center">
            <Text className="text-[#0D47A1] text-3xl font-bold mb-4" style={{ fontFamily: 'Inconsolata' }}>Coming Soon</Text>
            <Text className="text-gray-500 text-lg text-center px-8" style={{ fontFamily: 'Inconsolata' }}>Econs Paper 2 & 3 and more features will be available soon. Stay tuned!</Text>
        </SafeAreaView>
    );
}
