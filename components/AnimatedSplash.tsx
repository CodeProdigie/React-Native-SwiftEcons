import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedSplash = ({ onSkip }: { onSkip: () => void }) => {
    const router = useRouter();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();
        const timer = setTimeout(() => {
            onSkip();
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-[#0D47A1] justify-center items-center">
            <Animated.View style={{ opacity: fadeAnim }} className="w-full items-center">
                <Image source={require('../assets/logo.png')} style={{ width: 120, height: 120 }} />
                <Text className="text-white text-2xl font-bold mt-6 mb-2 text-center">Welcome to SwiftEcons AL</Text>
                <Text className="text-white text-base text-center px-8 mb-8">
                    Practice past Advanced Level Economics questions. Explore Paper 1, Paper 2, and more. Switch between light and dark mode for your comfort.
                </Text>
            </Animated.View>
            <TouchableOpacity
                className="absolute bottom-8 right-8 bg-white px-5 py-2 rounded-full shadow"
                onPress={onSkip}
                activeOpacity={0.7}
            >
                <Text className="text-[#0D47A1] font-semibold">Skip</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AnimatedSplash;
