import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/splash");
  }, [router]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0D47A1" }}>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
