import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface YearCardProps {
    year: number;
    onPress: () => void;
}

const YearCard: React.FC<YearCardProps> = ({ year, onPress }) => (
    <TouchableOpacity
        className="bg-white rounded-xl shadow flex-row items-center mb-6 p-4"
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View className="bg-[#0D47A1] rounded-lg w-12 h-12 justify-center items-center mr-4">
            <MaterialIcons name="picture-as-pdf" size={28} color="#fff" />
        </View>
        <View className="flex-1">
            <Text className="text-lg font-bold text-[#0D47A1]">Econs {year==725 ? "answers": year}</Text>
            <Text className="text-gray-500 text-sm">A/L Paper 1</Text>
        </View>
        <MaterialIcons name="chevron-right" size={28} color="#0D47A1" />
    </TouchableOpacity>
);

export default YearCard;
