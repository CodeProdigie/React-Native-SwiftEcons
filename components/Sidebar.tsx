import React, { useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useDarkMode } from "@/components/DarkModeContext"; // ✅ import context

const menuItems = [
  { label: "Dark Mode", icon: <Feather name="moon" size={22} color="#0D47A1" />, route: null },
  { label: "About", icon: <FontAwesome name="info-circle" size={22} color="#0D47A1" />, route: "/about" as const },
  { label: "Rate Us", icon: <MaterialIcons name="star-rate" size={22} color="#0D47A1" />, route: "/rateus" as const },
  { label: "Feedback", icon: <MaterialIcons name="feedback" size={22} color="#0D47A1" />, route: "/feedback" as const },
  { label: "Support Us", icon: <MaterialIcons name="support" size={22} color="#0D47A1" />, route: "/supportus" as const },
];

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-320)).current;
  const router = useRouter();

  const { darkMode, toggleDarkMode } = useDarkMode(); // ✅ get from context

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
      toggleDarkMode(); // ✅ trigger global dark mode
    } else if (route) {
      toggleSidebar();
      router.push(route as any);
    }
  };

  return (
    <>
      {/* Overlay */}
      {visible && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 39
          }}
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}

      {/* Hamburger icon */}
      <View className="flex-row items-center absolute left-4 top-12">
        <TouchableOpacity onPress={toggleSidebar} activeOpacity={0.7}>
          <Feather name="menu" size={32} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          backgroundColor: darkMode ? "#121212" : "#FFFFFF",
        }}
        className="absolute top-0 left-0 h-full w-80 z-40 shadow-2xl rounded-r-3xl overflow-hidden"
      >
        {/* Gradient Header */}
        <LinearGradient
          colors={['#0D47A1', '#1976D2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center justify-between py-10 px-6 rounded-tr-3xl rounded-br-3xl shadow-lg"
        >
          <TouchableOpacity
            onPress={toggleSidebar}
            activeOpacity={0.7}
            style={{
              padding: 8,
              borderRadius: 999,
              backgroundColor: 'rgba(255,255,255,0.2)'
            }}
          >
            <Feather name="x" size={24} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-2xl font-bold tracking-wide">
            SwiftEcons AL
          </Text>
        </LinearGradient>

        {/* Menu Items */}
        <View className="flex-1 py-10 px-8">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => handleMenuClick(item.label, item.route)}
              activeOpacity={0.85}
              className={`flex-row items-center mb-6 p-3 rounded-2xl ${
                darkMode ? "bg-[#1e1e1e]" : "bg-[#F6F9FE]"
              }`}
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View className="mr-4">{item.icon}</View>
              <Text
                className={`text-lg font-medium ${
                  darkMode ? "text-white" : "text-[#0D47A1]"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </>
  );
};

export default Sidebar;
