// app/rateus.tsx
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

const RateUs = () => {
    const router = useRouter();

    const handleRatePress = () => {
        // Replace with your actual Google Play Store URL
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.swifteconsal';
        Linking.openURL(playStoreUrl).catch(err => 
            console.error('Failed to open Play Store:', err)
        );
    };

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
                    <Text className="text-white text-3xl font-bold tracking-wide">Rate Us</Text>
                </View>
            </View>

            <View className="flex-1 justify-center items-center px-6">
                {/* Main Card */}
                <View className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
                    {/* Icon */}
                    <View className="items-center mb-6">
                        <View className="bg-yellow-50 p-6 rounded-full mb-4">
                            <MaterialIcons name="star-rate" size={64} color="#FFA500" />
                        </View>
                        <Text className="text-2xl font-bold text-[#0D47A1] text-center mb-2">
                            Enjoying SwiftEcons AL?
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            Your feedback means the world to us! If you're finding our app helpful, please take a moment to rate us on the Google Play Store.
                        </Text>
                    </View>

                    {/* Stars */}
                    <View className="flex-row justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <MaterialIcons 
                                key={star} 
                                name="star" 
                                size={36} 
                                color="#FFA500" 
                                style={{ marginHorizontal: 4 }}
                            />
                        ))}
                    </View>

                    {/* Rate Button */}
                    <TouchableOpacity 
                        onPress={handleRatePress}
                        activeOpacity={0.8}
                        className="bg-[#0D47A1] rounded-2xl py-4 px-6 shadow-md mb-4"
                    >
                        <Text className="text-white text-center text-lg font-semibold">
                            Rate on Play Store
                        </Text>
                    </TouchableOpacity>

                    {/* Info Text */}
                    <Text className="text-gray-500 text-center text-sm leading-5">
                        Your 5-star rating helps us reach more students and continue improving SwiftEcons AL ❤️
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default RateUs;