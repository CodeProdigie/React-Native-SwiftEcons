import { Stack, useRouter, useSegments } from "expo-router";
import { DarkModeProvider } from "../components/DarkModeContext";
import { FontProvider } from "../components/FontContext";
import "../global.css";
import { AuthProvider, useAuth } from "@/components/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

// This component handles the navigation logic based on auth state
function RootLayoutNav() {
  const { user, isInitialized } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    const inAuthGroup = segments[0] === "login" || segments[0] === "forms";

    if (user && inAuthGroup) {
      router.replace("/main");
    } else if (!user && !inAuthGroup && segments[0] !== "splash") {
    }
  }, [user, segments, isInitialized]);

  // Show loading screen while checking auth status
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1976D2" />
      </View>
    );
  }

  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ title: "SwiftEcons AL", headerShown: false }} />
      <Stack.Screen name="paper1" options={{ title: "Econs Paper 1", headerShown: false }} />
      <Stack.Screen name="coming-soon" options={{ title: "Coming Soon", headerShown: false }} />
      <Stack.Screen name="secrets" options={{ title: "Secrets", headerShown: false }} />
      <Stack.Screen name="about" options={{ title: "About", headerShown: false }} />
      <Stack.Screen name="rateus" options={{ title: "RateUs", headerShown: false }} />
      <Stack.Screen name="feedback" options={{ title: "FeedBack", headerShown: false }} />
      <Stack.Screen name="supportus" options={{ title: "SupportUs", headerShown: false }} />
      <Stack.Screen name="forms" options={{ title: "forms", headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "login", headerShown: false }} />
      <Stack.Screen name="year/[year]" options={{ title: "Questions", headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <FontProvider>
        <DarkModeProvider>
          <RootLayoutNav />
        </DarkModeProvider>
      </FontProvider>
    </AuthProvider>
  );
}