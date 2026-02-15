import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Animated,
  Vibration,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const HALLUU_DATA = [
  {
    id: "1",
    name: "Diimaa",
    emoji: "🍎",
    code: "#FF5252",
    sound: require("@/assets/sound/diimaa.mp3"),
  },
  {
    id: "2",
    name: "Magariisa",
    emoji: "🌳",
    code: "#4CD137",
    sound: require("@/assets/sound/magariisa.mp3"),
  },
  {
    id: "3",
    name: "Cuquliisa",
    emoji: "🌊",
    code: "#00A8FF",
    sound: require("@/assets/sound/cuqullisa.mp3"),
  },
  {
    id: "4",
    name: "Keelloo",
    emoji: "🍋",
    code: "#FFD32A",
    sound: require("@/assets/sound/keelloo.mp3"),
  },
  {
    id: "5",
    name: "Adii",
    emoji: "☁️",
    code: "#FFFFFF",
    sound: require("@/assets/sound/adii.mp3"),
  },
  {
    id: "6",
    name: "Gurraacha",
    emoji: "🕶️",
    code: "#2F3640",
    sound: require("@/assets/sound/gurraacha.mp3"),
  },
  {
    id: "7",
    name: "Daalacha",
    emoji: "🐘",
    code: "#95a5a6",
    sound: require("@/assets/sound/daalachaa.mp3"),
  }, // Added
  {
    id: "8",
    name: "Siddisa",
    emoji: "💜",
    code: "#9b59b6",
    sound: require("@/assets/sound/siddisa.mp3"),
  }, // Added
];

const HalluuApp = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState(null);
  const [bgColor, setBgColor] = useState("#F5F6FA");
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // Helper to determine text color based on background brightness
  const getTextColor = (hex) => {
    const lightColors = ["#FFFFFF", "#FFD32A", "#F5F6FA"];
    return lightColors.includes(hex.toUpperCase()) ? "#2D3436" : "#FFF";
  };

  async function handlePress(item) {
    Vibration.vibrate(50);
    setSelectedColor(item);
    setBgColor(item.code);

    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    try {
      const { sound } = await Audio.Sound.createAsync(item.sound);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (error) {
      console.log("Audio Error:", error);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: "#2D3436" }]}>
          Gosa Halluuwwaan 🎨
        </Text>
        <Text style={[styles.title, { color: "#2D3436" }]}>
          Gosoota Halluuwwaan Addaa Baasuu🎨
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {HALLUU_DATA.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.colorCard,
                {
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                  borderColor: item.code,
                },
              ]}
              onPress={() => handlePress(item)}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <View style={[styles.nameTag, { backgroundColor: item.code }]}>
                <Text
                  style={[styles.nameText, { color: getTextColor(item.code) }]}
                >
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.homeBtn} onPress={() => router.back()}>
          <Text style={styles.homeBtnText}>🏠 DEEBI'I</Text>
        </Pressable>
      </ScrollView>

      <Modal
        visible={selectedColor !== null}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          {selectedColor && (
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ scale: scaleAnim }],
                  backgroundColor: selectedColor.code,
                  borderColor: "#FFF",
                  borderWidth: 8,
                },
              ]}
            >
              <Text style={styles.maxEmoji}>{selectedColor.emoji}</Text>
              <Text
                style={[
                  styles.maxText,
                  { color: getTextColor(selectedColor.code) },
                ]}
              >
                {selectedColor.name}
              </Text>

              <Pressable
                style={styles.closeBtn}
                onPress={() => setSelectedColor(null)}
              >
                <Text style={styles.closeBtnText}>DEEBI'I</Text>
              </Pressable>
            </Animated.View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, transition: "background-color 0.3s" },
  header: {
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 25,
    marginHorizontal: 20,
    marginTop: 5,
    elevation: 4,
  },
  title: { fontSize: 35, fontWeight: "900" },
  scrollContainer: { padding: 20, alignItems: "center", paddingBottom: 50 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  colorCard: {
    backgroundColor: "#FFF",
    width: "45%",
    height: 200,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 10,
    marginBottom: 25,
    elevation: 5,
  },
  emoji: { fontSize: 100 },
  nameTag: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
  },
  nameText: { fontWeight: "900", fontSize: 50 },
  homeBtn: {
    marginTop: 30,
    backgroundColor: "#2D3436",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  homeBtnText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.85,
    height: height * 0.6,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  maxEmoji: { fontSize: 120 },
  maxText: {
    fontSize: 45,
    fontWeight: "900",
    marginTop: 10,
    textTransform: "uppercase",
  },
  closeBtn: {
    marginTop: 40,
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  closeBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 20 },
});

export default HalluuApp;
