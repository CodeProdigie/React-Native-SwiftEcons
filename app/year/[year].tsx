import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDarkMode } from "../../components/DarkModeContext";
import PDFViewer from "../../components/PDFViewer"; // ✅ Uncomment
import { paper1Years } from "../../constants/papers";

export default function YearScreen() {
    const { year } = useLocalSearchParams();
    const router = useRouter();
    const paper = paper1Years.find(p => p.year === Number(year));
    const { darkMode } = useDarkMode();

    return (
        <SafeAreaView className={darkMode ? "flex-1 bg-black" : "flex-1 bg-white"}>
            <View className="flex-row items-center px-4 pt-6 pb-2">
                <TouchableOpacity onPress={() => router.back()} className="mr-2">
                    <MaterialIcons name="arrow-back" size={28} color={darkMode ? "#fff" : "#0D47A1"} />
                </TouchableOpacity>
                <Text className={darkMode ? "text-white text-2xl font-bold" : "text-[#0D47A1] text-2xl font-bold"} style={{ fontFamily: 'Inconsolata' }}>{paper?.year === 725 ? "Answers": "Questions"}</Text>
            </View>
            <View className="px-4 mt-4 flex-1">
                <Text className={darkMode ? "text-white text-lg font-bold mb-2" : "text-[#0D47A1] text-lg font-bold mb-2"} style={{ fontFamily: 'Inconsolata' }}>{paper?.year === 725 ? "Econs P1 Answers": `Econs ${year} Paper 1`}</Text>
                <Text className={darkMode ? "text-gray-300 mb-4" : "text-gray-600 mb-4"} style={{ fontFamily: 'Inconsolata' }}>Advanced Level Economics Paper 1 {paper?.year === 725 ? "from 2015-2025 all together": `for the year ${year}`}. Below are the questions and solutions in PDF format.</Text>
                <View style={{ flex: 1 }}>
                    {paper && <PDFViewer pdfPath={paper.pdf} />}
                </View>
            </View>
        </SafeAreaView>
    );
}