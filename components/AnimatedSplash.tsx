import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const AnimatedSplash = ({ onSkip }: { onSkip: () => void }) => {
    const router = useRouter();
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const slideUpAnim = React.useRef(new Animated.Value(50)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
    const progressAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Parallel animations for smooth entrance
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(slideUpAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();

        // Progress bar animation
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: false,
        }).start();

        const timer = setTimeout(() => {
            onSkip();
        }, 5000);
        
        return () => clearTimeout(timer);
    }, []);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <SafeAreaView className="flex-1 bg-[#0D47A1]">
            {/* Background decoration */}
            <View className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <View className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48" />
            
            {/* Main content */}
            <View className="flex-1 justify-center items-center px-8">
                {/* Logo section with animation */}
                <Animated.View 
                    style={{ 
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateY: slideUpAnim }
                        ]
                    }} 
                    className="items-center mb-12"
                >
                    {/* Logo container with subtle shadow effect */}
                    <View className="bg-blue-600 rounded-3xl p-6 shadow-2xl mb-6">
                        <Image 
                            source={require('../assets/logo.png')} 
                            style={{ width: 120, height: 120 }} 
                            resizeMode="contain"
                        />
                    </View>
                    
                    {/* App name */}
                    <Text className="text-white text-3xl font-bold text-center tracking-wide">
                        SwiftEcons AL
                    </Text>
                    
                    {/* Tagline */}
                    <View className="flex-row items-center mt-2">
                        <View className="h-px w-8 bg-white/40" />
                        <Text className="text-white/80 text-sm mx-3 font-medium">
                            Master Economics Excellence
                        </Text>
                        <View className="h-px w-8 bg-white/40" />
                    </View>
                </Animated.View>

                {/* Features section */}
                <Animated.View 
                    style={{ 
                        opacity: fadeAnim,
                        transform: [{ translateY: slideUpAnim }]
                    }}
                    className="w-full max-w-sm"
                >
                    <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
                        <Text className="text-white text-lg font-semibold mb-4 text-center">
                            What You'll Get
                        </Text>
                        
                        {/* Feature items */}
                        <View className="space-y-3">
                            <View className="flex-row items-center">
                                <View className="bg-white/20 p-2 rounded-full mr-3">
                                    <Feather name="book-open" size={18} color="#fff" />
                                </View>
                                <Text className="text-white/90 flex-1">
                                    Comprehensive Past Questions
                                </Text>
                            </View>
                            
                            <View className="flex-row items-center">
                                <View className="bg-white/20 p-2 rounded-full mr-3">
                                    <Feather name="layers" size={18} color="#fff" />
                                </View>
                                <Text className="text-white/90 flex-1">
                                    Papers 1, 2 & 3 Coverage
                                </Text>
                            </View>
                            
                            <View className="flex-row items-center">
                                <View className="bg-white/20 p-2 rounded-full mr-3">
                                    <Feather name="moon" size={18} color="#fff" />
                                </View>
                                <Text className="text-white/90 flex-1">
                                    Dark & Light Mode Support
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Progress bar */}
                <View className="w-full max-w-sm">
                    <View className="h-1 bg-white/20 rounded-full overflow-hidden">
                        <Animated.View 
                            style={{ width: progressWidth }}
                            className="h-full bg-white rounded-full"
                        />
                    </View>
                </View>
            </View>

            {/* Skip button */}
            <Animated.View 
                style={{ opacity: fadeAnim }}
                className="absolute bottom-8 right-8"
            >
                <TouchableOpacity
                    className="bg-white px-6 py-3 rounded-full shadow-lg flex-row items-center"
                    onPress={onSkip}
                    activeOpacity={0.8}
                >
                    <Text className="text-[#0D47A1] font-semibold text-base mr-2">
                        Skip
                    </Text>
                    <Feather name="arrow-right" size={18} color="#0D47A1" />
                </TouchableOpacity>
            </Animated.View>

            {/* Footer text */}
            <Animated.View 
                style={{ opacity: fadeAnim }}
                className="absolute bottom-8 left-8"
            >
                <Text className="text-white/60 text-xs">
                    &copy; 2025 SwiftEcons
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
};

export default AnimatedSplash;