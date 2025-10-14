import { useDarkMode } from "@/components/DarkModeContext";
import PaperCard from "@/components/PaperCard";
import Sidebar from "@/components/Sidebar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/components/AuthContext";
import { LinearGradient } from 'expo-linear-gradient';

export default function MainScreen() {
    const router = useRouter();
    const { darkMode } = useDarkMode();
    const { user } = useAuth();
    
    const userInitial = user?.username ? user.username.charAt(0).toUpperCase() : '';

    return (
        <SafeAreaView className={darkMode ? "flex-1 bg-black" : "flex-1 bg-[#0D47A1]"}>
            <Sidebar />
            
            <View className="flex-1 relative">
                {/* Enhanced Header with gradient overlay */}
                <View className="relative">
                    {/* Background decorative elements */}
                    <View className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-10" />
                    <View className="absolute top-20 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16" />
                    
                    <View className="px-6 pt-16 pb-8">
                        {/* Top row with logo and profile */}
                        <View className="flex-row items-center justify-between mb-6">
                            <View className="flex-1">
                                <Text 
                                    className="text-white text-3xl font-bold mb-1" 
                                    style={{ fontFamily: 'Inconsolata' }}
                                >
                                    SwiftEcons AL
                                </Text>
                                <Text className="text-white/70 text-sm" style={{ fontFamily: 'Inconsolata' }}>
                                    Master Economics Excellence
                                </Text>
                            </View>
                            
                            <TouchableOpacity 
                                onPress={() => router.push(user ? "./secrets" : "./forms")} 
                                className="relative"
                                activeOpacity={0.8}
                            >
                                <View className="w-14 h-14 rounded-full bg-white items-center justify-center shadow-lg">
                                    {user ? (
                                        <Text style={styles.userInitial}>{userInitial}</Text>
                                    ) : (
                                        <Feather name="user" size={28} color="#0D47A1" />
                                    )}
                                </View>
                                {/* Online indicator for logged-in users */}
                                {user && (
                                    <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Welcome message */}
                        {user && (
                            <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex-row items-center">
                                <View className="bg-white/20 p-3 rounded-full mr-3">
                                    <Feather name="smile" size={20} color="#fff" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-white/70 text-xs" style={{ fontFamily: 'Inconsolata' }}>
                                        Welcome back,
                                    </Text>
                                    <Text className="text-white text-lg font-semibold" style={{ fontFamily: 'Inconsolata' }}>
                                        {user.username}
                                    </Text>
                                </View>
                                <Feather name="chevron-right" size={20} color="#fff" />
                            </View>
                        )}
                    </View>
                </View>

                {/* Main content area */}
                <View className={darkMode ? "flex-1 bg-black rounded-t-[32px]" : "flex-1 bg-gray-50 rounded-t-[32px]"}>
                    {/* Shadow effect at top */}
                    <View className="absolute top-0 left-0 right-0 h-8 bg-black/5 rounded-t-[32px]" />
                    
                    <ScrollView 
                        className="flex-1 px-6 pt-8" 
                        contentContainerStyle={{ paddingBottom: 100 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Section header */}
                        <View className="flex-row items-center justify-between mb-6">
                            <View>
                                <Text 
                                    className={darkMode ? "text-white text-2xl font-bold mb-1" : "text-gray-900 text-2xl font-bold mb-1"} 
                                    style={{ fontFamily: 'Inconsolata' }}
                                >
                                    Exam Papers
                                </Text>
                                <Text 
                                    className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"} 
                                    style={{ fontFamily: 'Inconsolata' }}
                                >
                                    Choose a paper to get started
                                </Text>
                            </View>
                            <View className={darkMode ? "bg-white/10 px-3 py-1 rounded-full" : "bg-blue-100 px-3 py-1 rounded-full"}>
                                <Text 
                                    className={darkMode ? "text-white text-xs font-semibold" : "text-[#0D47A1] text-xs font-semibold"} 
                                    style={{ fontFamily: 'Inconsolata' }}
                                >
                                    2015-2025
                                </Text>
                            </View>
                        </View>

                        {/* Paper cards */}
                        <View className="space-y-4">
                            <PaperCard
                                title="Economics Paper 1"
                                description="Multiple Choice Questions & Objectives"
                                onPress={() => router.push("/paper1")}
                            />
                            <PaperCard
                                title="Economics Paper 2"
                                description="Essays & Structured Questions"
                                onPress={() => router.push("/coming-soon")}
                            />
                            <PaperCard
                                title="Economics Paper 3"
                                description="Data Response & Case Studies"
                                onPress={() => router.push("/coming-soon")}
                            />
                        </View>

                      

                        {/* Tips section */}
                        <View className={darkMode ? "mt-6 bg-blue-900/20 rounded-2xl p-5 border border-blue-800/30" : "mt-6 bg-blue-50 rounded-2xl p-5"}>
                            <View className="flex-row items-start">
                                <View className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                                    <Feather name="info" size={18} color="#0D47A1" />
                                </View>
                                <View className="flex-1">
                                    <Text 
                                        className={darkMode ? "text-white font-semibold mb-1" : "text-gray-900 font-semibold mb-1"} 
                                        style={{ fontFamily: 'Inconsolata' }}
                                    >
                                        Study Tip
                                    </Text>
                                    <Text 
                                        className={darkMode ? "text-gray-300 text-sm leading-5" : "text-gray-700 text-sm leading-5"} 
                                        style={{ fontFamily: 'Inconsolata' }}
                                    >
                                        Practice regularly with past questions to identify patterns and improve your exam technique.
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                {/* Enhanced footer */}
                <View className="absolute left-0 right-0 bottom-0">
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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    userInitial: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0D47A1',
        fontFamily: 'Inconsolata',
    }
});