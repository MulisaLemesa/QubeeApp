import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  SafeAreaView,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

const GUYYOOTA_DATA = [
  {
    id: "1",
    maqaa: "Wiixata",
    emoji: "🌕",
    color: "#FF7675",
    snd: require("@/assets/sound/Monday.mp3"),
  },
  {
    id: "2",
    maqaa: "Kibxata",
    emoji: "🔥",
    color: "#F9A825",
    snd: require("@/assets/sound/Tuesday.mp3"),
  },
  {
    id: "3",
    maqaa: "Roobii",
    emoji: "💦",
    color: "#45AAF2",
    snd: require("@/assets/sound/Wednesday.mp3"),
  },
  {
    id: "4",
    maqaa: "Kamisa",
    emoji: "🌾",
    color: "#26DE81",
    snd: require("@/assets/sound/Thursday.mp3"),
  },
  {
    id: "5",
    maqaa: "Jimaata",
    emoji: "🌸",
    color: "#A55EEA",
    snd: require("@/assets/sound/Friday.mp3"),
  },
  {
    id: "6",
    maqaa: "Sanbata",
    emoji: "🐝",
    color: "#FED330",
    snd: require("@/assets/sound/Saturday.mp3"),
  },
  {
    id: "7",
    maqaa: "Dilbata",
    emoji: "☀️",
    color: "#EB4D4B",
    snd: require("@/assets/sound/Sunday.mp3"),
  },
];

const Guyyaa = () => {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(null);
  const soundRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  // 1. Setup Audio Category so it plays even on Silent Mode
  useEffect(() => {
    const initAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true, // Critical for iOS
          shouldDuckAndroid: true,
          staysActiveInBackground: false,
        });
      } catch (e) {
        console.log("Audio Setup Error:", e);
      }
    };
    initAudio();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // 2. Optimized Sound Player
  async function playSound(itemSnd) {
    try {
      // Unload previous sound if it exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(itemSnd, {
        shouldPlay: true,
      });
      soundRef.current = sound;
      // Unload sound when finished to save memory
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      console.log("Audio Play Error:", error);
    }
  }
  const handlePress = (item) => {
    setSelectedDay(item);

    // Play sound immediately
    playSound(item.snd);

    // Modal Animation
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const closeMaximize = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
      }
    } catch (e) {
      console.log("Stop Error:", e);
    } finally {
      setSelectedDay(null);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🗓️ Guyyoota Torbee </Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {GUYYOOTA_DATA.map((item) => (
              <Pressable
                key={item.id}
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => handlePress(item)}
              >
                <View style={styles.emojiContainer}>
                  <Text style={styles.emojiThumbnail}>{item.emoji}</Text>
                </View>
                <Text style={styles.cardText}>{item.maqaa}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Modal
          visible={selectedDay !== null}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            {selectedDay && (
              <Animated.View
                style={[
                  styles.actionWrapper,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <View
                  style={[
                    styles.modalCircle,
                    { backgroundColor: selectedDay.color },
                  ]}
                >
                  <Text style={styles.maxEmoji}>{selectedDay.emoji}</Text>
                </View>
                <Text
                  style={[styles.maxTitleText, { color: selectedDay.color }]}
                >
                  {selectedDay.maqaa}
                </Text>
                <View style={styles.divider} />
                <Pressable
                  style={[
                    styles.closeBtn,
                    { backgroundColor: selectedDay.color },
                  ]}
                  onPress={closeMaximize}
                >
                  <Text style={styles.closeBtnText}>DEEBI'I ↩️</Text>
                </Pressable>
              </Animated.View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F9FF" },
  safeArea: { flex: 1 },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  headerTitle: { fontSize: 50, fontWeight: "900", color: "#2D3436" },
  headerSub: {
    fontSize: 16,
    color: "#636E72",
    fontWeight: "700",
    marginTop: 5,
  },
  scrollContent: { padding: 20, paddingBottom: 100 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: width * 0.42,
    height: 160,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  emojiContainer: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 50,
    padding: 12,
    marginBottom: 8,
  },
  emojiThumbnail: { fontSize: 44 },
  cardText: { color: "#FFF", fontWeight: "900", fontSize: 35 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionWrapper: {
    backgroundColor: "#FFF",
    padding: 40,
    borderRadius: 50,
    width: width * 0.85,
    alignItems: "center",
    elevation: 20,
  },
  modalCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  maxEmoji: { fontSize: 120 },
  maxTitleText: { fontSize: 48, fontWeight: "900" },
  divider: {
    width: "80%",
    height: 8,
    backgroundColor: "#F0F2F5",
    marginVertical: 25,
  },
  closeBtn: {
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 35,
    elevation: 8,
  },
  closeBtnText: { color: "#FFF", fontWeight: "900", fontSize: 24 },
});

export default Guyyaa;
