import { MaterialIcons } from '@expo/vector-icons';
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface PaperCardProps {
    title: string;
    description: string;
    onPress: () => void;
}

const PaperCard: React.FC<PaperCardProps> = ({ title, description, onPress }) => (
    <TouchableOpacity
        className="bg-white rounded-xl shadow flex-row items-center mb-6 p-4"
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View className="bg-[#0D47A1] rounded-lg w-12 h-12 justify-center items-center mr-4">
            <MaterialIcons name="description" size={28} color="#fff" />
        </View>
        <View className="flex-1">
            <Text className="text-2xl font-bold text-[#0D47A1]" style={{ fontFamily: 'Inconsolata' }}>{title}</Text>
            <Text className="text-gray-500 text-xl" style={{ fontFamily: 'Inconsolata' }}>{description}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={28} color="#0D47A1" />
    </TouchableOpacity>
);

export default PaperCard;
