import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import AnimatedSplash from "../components/AnimatedSplash";

export default function SplashScreen() {
    const router = useRouter();
    const handleSkip = useCallback(() => {
        router.replace("/main");
    }, [router]);

    return <AnimatedSplash onSkip={handleSkip} />;
}
