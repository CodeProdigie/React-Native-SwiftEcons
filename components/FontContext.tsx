import { useFonts } from 'expo-font';
import React, { createContext, useContext } from 'react';

const FontContext = createContext({ fontLoaded: false });

export const FontProvider = ({ children }: any) => {
    const [fontsLoaded] = useFonts({
        Inconsolata: require('../assets/fonts/static/Inconsolata-Regular.ttf'),
        'Inconsolata-Bold': require('../assets/fonts/static/Inconsolata-Bold.ttf'),
    });
    return (
        <FontContext.Provider value={{ fontLoaded: fontsLoaded }}>
            {children}
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);
