// app/about.tsx
import { Feather, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const About = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            {/* Header */}
            <View className="bg-[#0D47A1] pt-12 pb-6 px-6 rounded-b-3xl shadow-lg">
                <View className="flex-row items-center">
                    <TouchableOpacity 
                        onPress={() => router.back()} 
                        activeOpacity={0.7}
                        className="mr-4 p-2 rounded-full bg-white/20"
                    >
                        <Feather name="arrow-left" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-white text-3xl font-bold tracking-wide">About Us</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-8">
                {/* Main Card */}
                <View className="bg-white rounded-3xl p-8 shadow-md mb-6">
                    <View className="items-center mb-6">
                        <View className="bg-blue-50 p-5 rounded-full mb-4">
                            <FontAwesome name="graduation-cap" size={48} color="#0D47A1" />
                        </View>
                        <Text className="text-2xl font-bold text-[#0D47A1] text-center">
                            SwiftEcons AL
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">Est. 2025</Text>
                    </View>

                    <View className="border-t border-gray-100 pt-6">
                        <Text className="text-gray-700 text-base leading-7 mb-4">
                            Welcome to <Text className="font-semibold text-[#0D47A1]">SwiftEcons AL</Text>, your trusted companion in mastering Advanced Level Economics! 
                        </Text>
                        <Text className="text-gray-700 text-base leading-7 mb-4">
                            Born in 2025 from the passion and dedication of a team of experienced Economics teachers, SwiftEcons AL was created with one mission in mind: to empower students like you to excel in your examinations.
                        </Text>
                        <Text className="text-gray-700 text-base leading-7 mb-4">
                            We understand the challenges you face, and that's why we've compiled comprehensive past questions covering Paper 1, Paper 2, and Paper 3—all in one intuitive, easy-to-use app.
                        </Text>
                        <Text className="text-gray-700 text-base leading-7">
                            Whether you're preparing for your exams or looking to sharpen your understanding, SwiftEcons AL is here to guide you every step of the way. Study smarter, not harder, and achieve the success you deserve! ❤️
                        </Text>
                    </View>
                </View>

                {/* Features Section */}
                <View className="bg-white rounded-3xl p-6 shadow-md mb-6">
                    <Text className="text-xl font-bold text-[#0D47A1] mb-4">What We Offer</Text>
                    
                    <View className="flex-row items-start mb-4">
                        <View className="bg-blue-50 p-2 rounded-full mr-3 mt-1">
                            <Feather name="check" size={16} color="#0D47A1" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-700 text-base leading-6">
                                Comprehensive past questions for Papers 1, 2, and 3
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-start mb-4">
                        <View className="bg-blue-50 p-2 rounded-full mr-3 mt-1">
                            <Feather name="check" size={16} color="#0D47A1" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-700 text-base leading-6">
                                Created and curated by experienced Economics teachers
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-start">
                        <View className="bg-blue-50 p-2 rounded-full mr-3 mt-1">
                            <Feather name="check" size={16} color="#0D47A1" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-700 text-base leading-6">
                                User-friendly interface for seamless study sessions
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Quote Card */}
                <View className="bg-gradient-to-r bg-[#0D47A1] rounded-3xl p-6 shadow-md mb-8">
                    <Text className="text-white text-center text-lg italic leading-7">
                        "Education is the most powerful weapon which you can use to change the world."
                    </Text>
                    <Text className="text-blue-200 text-center text-sm mt-3">
                        — Nelson Mandela
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default About;