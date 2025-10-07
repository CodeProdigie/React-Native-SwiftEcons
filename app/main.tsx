import { useDarkMode } from "@/components/DarkModeContext";
import PaperCard from "@/components/PaperCard";
import Sidebar from "@/components/Sidebar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/components/AuthContext";

export default function MainScreen() {
    const router = useRouter();
    const { darkMode } = useDarkMode();
    const { user } = useAuth();
    
    // Get the first letter of username, uppercase
    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : '';

    return (
        <SafeAreaView className={darkMode ? "flex-1 bg-black" : "flex-1 bg-[#1976D2]"}>
            <Sidebar />
            <View className="flex-1 relative">
                {/* Header flex-row */}
                <View className="flex flex-row items-center justify-between px-4 pt-16 pb-4">
                    <Text className={darkMode ? "text-white text-3xl font-bold" : "text-white text-3xl font-bold"} style={{ fontFamily: 'Inconsolata' }}>SwiftEcons AL</Text>
                    <TouchableOpacity 
                        onPress={() => router.push(user ? "./secrets" : "./forms")} 
                        className="size-12 rounded-full bg-white items-center justify-center"
                    >
                        {user ? (
                            <Text style={styles.userInitial}>{userInitial}</Text>
                        ) : (
                            <Feather name="user" size={30} color="#1976D2" />
                        )}
                    </TouchableOpacity>
                </View>
                {/* beginning of paper view */}
                <View className={darkMode ? "flex-1 bg-black rounded-t-[25px]" : "flex-1 bg-white rounded-t-[25px]"}>
                    <ScrollView className={darkMode ? "px-4 py-10 bg-black" : "px-4 py-10 bg-white"} contentContainerStyle={{ flexGrow: 1 }}>
                        <Text className={darkMode ? "text-white text-xl font-semibold mb-4" : "text-black text-xl font-semibold mb-4"} style={{ fontFamily: 'Inconsolata' }}>Papers</Text>
                        <PaperCard
                            title="Econs Paper 1"
                            description="A/L from 2015 to 2025"
                            onPress={() => router.push("/paper1")}
                        />
                        <PaperCard
                            title="Econs Paper 2"
                            description="A/L from 2015 to 2025"
                            onPress={() => router.push("/coming-soon")}
                        />
                    </ScrollView>
                </View>
                {/* end of paper view */}
                {/* Responsive footer absolutely positioned at the bottom */}
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%' }}>
                    <View className={darkMode ? "w-full h-16 bg-black flex-row items-center justify-center" : "w-full h-16 bg-white flex-row items-center justify-center"}>
                        <Text className={darkMode ? "text-white text-base font-semibold" : "text-blue-600 text-base font-semibold"} style={{ fontFamily: 'Inconsolata' }}>Empowering Advanced Level Students • SwiftEcons</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    userInitial: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1976D2',
        fontFamily: 'Inconsolata',
    }
});