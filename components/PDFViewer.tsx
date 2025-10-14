import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Dimensions, Text, StyleSheet } from "react-native";
import Pdf from "react-native-pdf";
import { Asset } from "expo-asset";
import { MaterialIcons } from "@expo/vector-icons";

interface PDFViewerProps {
  pdfPath: number;
  darkMode?: boolean;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfPath, darkMode = false }) => {
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);
        setError("");

        const asset = Asset.fromModule(pdfPath);
        await asset.downloadAsync();

        if (!asset.localUri && !asset.uri) {
          throw new Error("Failed to load PDF asset");
        }

        setPdfUri(asset.localUri || asset.uri || null);
      } catch (err) {
        console.error("Error loading PDF:", err);
        setError("Unable to load the PDF document. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [pdfPath]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, darkMode ? styles.darkBg : styles.lightBg]}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#0D47A1" />
          <Text style={[styles.loadingText, darkMode && styles.darkText]}>
            Loading Document...
          </Text>
          <Text style={styles.loadingSubtext}>
            Preparing your PDF for viewing
          </Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centerContainer, darkMode ? styles.darkBg : styles.lightBg]}>
        <View style={styles.errorCard}>
          <MaterialIcons name="error-outline" size={56} color="#d32f2f" />
          <Text style={styles.errorTitle}>Unable to Load PDF</Text>
          <Text style={styles.errorMessage}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!pdfUri) return null;

  return (
    <View style={styles.pdfContainer}>
      {pageCount > 0 && (
        <View style={[styles.pageIndicator, darkMode ? styles.darkIndicator : styles.lightIndicator]}>
          <MaterialIcons name="description" size={18} color={darkMode ? "#fff" : "#0D47A1"} />
          <Text style={[styles.pageText, darkMode && styles.darkText]}>
            Page {currentPage} of {pageCount}
          </Text>
        </View>
      )}
      <Pdf
        source={{ uri: pdfUri }}
        onLoadComplete={(numberOfPages) => {
          setPageCount(numberOfPages);
          console.log(`PDF loaded: ${numberOfPages} pages`);
        }}
        onPageChanged={(page) => {
          setCurrentPage(page);
          console.log(`Current page: ${page}`);
        }}
        onError={(err) => {
          console.error("PDF render error:", err);
          setError("Error rendering PDF document");
        }}
        style={styles.pdf}
        trustAllCerts={false}
        enablePaging
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  lightBg: {
    backgroundColor: "#f5f7fa",
  },
  darkBg: {
    backgroundColor: "#0a0a0a",
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    minWidth: 240,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "Inconsolata",
  },
  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
    fontFamily: "Inconsolata",
  },
  errorCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    maxWidth: 320,
  },
  errorTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    fontFamily: "Inconsolata",
  },
  errorMessage: {
    marginTop: 12,
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "Inconsolata",
  },
  pdfContainer: {
    flex: 1,
    position: "relative",
  },
  pageIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lightIndicator: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  darkIndicator: {
    backgroundColor: "rgba(30, 30, 30, 0.95)",
  },
  pageText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#0D47A1",
    fontFamily: "Inconsolata",
  },
  darkText: {
    color: "#ffffff",
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
});

export default PDFViewer;