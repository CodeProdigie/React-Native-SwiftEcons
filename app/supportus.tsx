// app/supportus.tsx
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const SupportUs = () => {
    const router = useRouter();
    const phoneNumber = '237650660502';

    const handleSupportPress = () => {
        const message = 'Hello SwiftEcons AL team! I would like to support your amazing work! 💝';
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
                    <Text className="text-white text-3xl font-bold tracking-wide">Support Us</Text>
                </View>
            </View>

            <ScrollView className="flex-1 px-6 py-8">
                {/* Main Card */}
                <View className="bg-white rounded-3xl p-8 shadow-lg mb-6">
                    {/* Icon */}
                    <View className="items-center mb-6">
                        <View className="bg-red-50 p-6 rounded-full mb-4">
                            <MaterialIcons name="favorite" size={64} color="#E91E63" />
                        </View>
                        <Text className="text-2xl font-bold text-[#0D47A1] text-center mb-2">
                            Help Us Keep Going!
                        </Text>
                        <Text className="text-gray-600 text-center text-base leading-6">
                            SwiftEcons AL is a passion project created by dedicated teachers to help students like you succeed. Your support helps us maintain and improve this app!
                        </Text>
                    </View>

                    {/* Why Support Section */}
                    <View className="bg-blue-50 rounded-2xl p-5 mb-6">
                        <Text className="text-lg font-semibold text-[#0D47A1] mb-4">
                            Why Your Support Matters
                        </Text>
                        
                        <View className="flex-row items-start mb-3">
                            <View className="bg-white p-2 rounded-full mr-3 mt-1">
                                <Feather name="server" size={16} color="#0D47A1" />
                            </View>
                            <Text className="text-gray-700 flex-1 leading-6">
                                Keeps our servers running smoothly
                            </Text>
                        </View>

                        <View className="flex-row items-start mb-3">
                            <View className="bg-white p-2 rounded-full mr-3 mt-1">
                                <Feather name="refresh-cw" size={16} color="#0D47A1" />
                            </View>
                            <Text className="text-gray-700 flex-1 leading-6">
                                Enables regular updates with new questions
                            </Text>
                        </View>

                        <View className="flex-row items-start">
                            <View className="bg-white p-2 rounded-full mr-3 mt-1">
                                <Feather name="zap" size={16} color="#0D47A1" />
                            </View>
                            <Text className="text-gray-700 flex-1 leading-6">
                                Helps us add new features you request
                            </Text>
                        </View>
                    </View>

                    {/* Support Button */}
                    <TouchableOpacity 
                        onPress={handleSupportPress}
                        activeOpacity={0.8}
                        className="bg-gradient-to-r bg-[#0D47A1] rounded-2xl py-4 px-6 shadow-md flex-row items-center justify-center mb-4"
                    >
                        <MaterialIcons name="support" size={24} color="#fff" />
                        <Text className="text-white text-center text-lg font-semibold ml-3">
                            Support via WhatsApp
                        </Text>
                    </TouchableOpacity>

                    {/* Phone Number Display */}
                    <View className="bg-gray-50 rounded-xl p-4 mb-4">
                        <View className="flex-row items-center justify-center">
                            <Feather name="smartphone" size={18} color="#666" />
                            <Text className="text-gray-700 font-semibold text-base ml-2">
                                {phoneNumber}
                            </Text>
                        </View>
                        <Text className="text-gray-500 text-center text-xs mt-2">
                            (Mobile Money)
                        </Text>
                    </View>

                    {/* Info Text */}
                    <Text className="text-gray-600 text-center text-sm leading-6 italic">
                        "Every contribution, no matter the size, makes a huge difference and keeps SwiftEcons AL free for all students! ❤️"
                    </Text>
                </View>

                {/* Thank You Card */}
                <View className="bg-gradient-to-r bg-[#0D47A1] rounded-3xl p-6 shadow-md mb-8">
                    <Text className="text-white text-center text-xl font-bold mb-2">
                        Thank You! 🙏
                    </Text>
                    <Text className="text-blue-100 text-center text-base leading-6">
                        Your generosity empowers countless students to achieve their dreams. We're deeply grateful for your support!
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default SupportUs;