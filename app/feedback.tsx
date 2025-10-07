// app/feedback.tsx
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

const Feedback = () => {
    const router = useRouter();
    const phoneNumber = '674766654';

    const handleWhatsAppPress = () => {
        const message = 'Hello SwiftEcons AL team! I would like to provide some feedback:';
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
        
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    alert('WhatsApp is not installed on this device');
                }
            })
            .catch((err) => console.error('Failed to open WhatsApp:', err));
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
                    <Text className="text-white text-3xl font-bold tracking-wide">Feedback</Text>
                </View>
            </View>

            <View className="flex-1 justify-center items-center px-6">
                {/* Main Card */}
                <View className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md">
                    {/* Icon */}
                    <View className="items-center mb-6">
                        <View className="bg-green-50 p-6 rounded-full mb-4">
                            <MaterialIcons name="feedback" size={64} color="#25D366" />
                        </View>
                        <Text className="text-2xl font-bold text-[#0D47A1] text-center mb-2">
                            We Value Your Feedback!
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            Your thoughts and suggestions help us make SwiftEcons AL better for everyone. We'd love to hear from you!
                        </Text>
                    </View>

                    {/* Features List */}
                    <View className="bg-blue-50 rounded-2xl p-4 mb-6">
                        <View className="flex-row items-center mb-3">
                            <Feather name="message-circle" size={20} color="#0D47A1" />
                            <Text className="text-gray-700 ml-3 flex-1">Share your experience</Text>
                        </View>
                        <View className="flex-row items-center mb-3">
                            <Feather name="alert-circle" size={20} color="#0D47A1" />
                            <Text className="text-gray-700 ml-3 flex-1">Report any issues</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Feather name="zap" size={20} color="#0D47A1" />
                            <Text className="text-gray-700 ml-3 flex-1">Suggest new features</Text>
                        </View>
                    </View>

                    {/* WhatsApp Button */}
                    <TouchableOpacity 
                        onPress={handleWhatsAppPress}
                        activeOpacity={0.8}
                        className="bg-[#25D366] rounded-2xl py-4 px-6 shadow-md flex-row items-center justify-center mb-4"
                    >
                        <Feather name="message-circle" size={24} color="#fff" />
                        <Text className="text-white text-center text-lg font-semibold ml-3">
                            Contact Us on WhatsApp
                        </Text>
                    </TouchableOpacity>

                    {/* Phone Number Display */}
                    <View className="flex-row items-center justify-center">
                        <Feather name="phone" size={16} color="#666" />
                        <Text className="text-gray-600 text-center text-sm ml-2">
                            {phoneNumber}
                        </Text>
                    </View>

                    {/* Info Text */}
                    <Text className="text-gray-500 text-center text-sm leading-5 mt-4">
                        We typically respond within 24 hours ❤️
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Feedback;