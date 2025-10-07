import React from "react";
import { View, Image } from "react-native";
import PdfRendererView from "react-native-pdf-renderer";

interface PDFViewerProps {
    pdfPath: number; // require() returns a number for local assets
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath }) => {
    // Convert the asset number to a URI string using Image.resolveAssetSource
    const source = Image.resolveAssetSource(pdfPath);
    const uri = source?.uri || '';

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <PdfRendererView
                style={{ flex: 1 }}
                source={uri}
                distanceBetweenPages={16}
                maxZoom={5}
                onPageChange={(current, total) => {
                    console.log(`Page ${current} of ${total}`);
                }}
            />
        </View>
    );
};

export default PDFViewer;