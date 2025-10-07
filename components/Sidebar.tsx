// Sidebar.tsx
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from 'expo-router';

const menuItems = [
    { label: "Dark Mode", icon: <Feather name="moon" size={22} color="#0D47A1" />, route: null },
    { label: "About", icon: <FontAwesome name="info-circle" size={22} color="#0D47A1" />, route: "/about" as const },
    { label: "Rate Us", icon: <MaterialIcons name="star-rate" size={22} color="#0D47A1" />, route: "/rateus" as const },
    { label: "Feedback", icon: <MaterialIcons name="feedback" size={22} color="#0D47A1" />, route: "/feedback" as const },
    { label: "Support Us", icon: <MaterialIcons name="support" size={22} color="#0D47A1" />, route: "/supportus" as const },
];

const Sidebar = () => {
    const [visible, setVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const slideAnim = React.useRef(new Animated.Value(-320)).current;
    const router = useRouter();

    const toggleSidebar = () => {
        setVisible(!visible);
        Animated.timing(slideAnim, {
            toValue: visible ? -320 : 0,
            duration: 350,
            useNativeDriver: true,
        }).start();
    };

    const handleMenuClick = (label: string, route: string | null) => {
        if (label === "Dark Mode") {
            setDarkMode(!darkMode);
        } else if (route) {
            toggleSidebar();
            router.push(route as any); // Type assertion to bypass strict typing
        }
    };

    return (
        <>
            {/* Overlay for closing drawer */}
            {visible && (
                <TouchableOpacity
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 39 }}
                    onPress={toggleSidebar}
                    activeOpacity={1}
                />
            )}
            {/* Drawer icon and header flex-row */}
            <View className="flex-row items-center absolute left-4 top-12 ">
                <TouchableOpacity onPress={toggleSidebar} activeOpacity={0.7}>
                    <Feather name="menu" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
            <Animated.View
                style={{
                    transform: [{ translateX: slideAnim }],
                    backgroundColor: darkMode ? "#000" : "#fff",
                }}
                className="absolute top-0 left-0 h-full w-80 z-40 shadow-lg pt-24 px-8"
            >
                <View className='flex-row items-center justify-between absolute top-0 left-0 w-full py-8 px-6 bg-[#0D47A1] rounded-tr-2xl rounded-br-2xl shadow-lg'>
                    <TouchableOpacity onPress={toggleSidebar} activeOpacity={0.7} style={{ padding: 8, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.12)' }}>
                        <Feather name="x" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold tracking-wide">SwiftEcons AL</Text>
                </View>
                <View className="flex-1 py-10">
                    {menuItems.map((item) => (
                        <TouchableOpacity
                            key={item.label}
                            className="flex-row items-center mb-8"
                            onPress={() => handleMenuClick(item.label, item.route)}
                            activeOpacity={0.8}
                        >
                            <View className="mr-4">{item.icon}</View>
                            <Text className={`text-lg ${darkMode ? "text-white" : "text-[#0D47A1]"}`}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </>
    );
};

export default Sidebar;