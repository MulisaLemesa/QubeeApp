import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Animated,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// 1. DEFINE DATA FIRST (The app crashed because this was missing or below)
const MONTHS = [
  {
    id: "1",
    or: "Fulbaana",
    en: "September",
    emoji: "🌼",
    color: "#FF7675",
    season: "Birraa",
    sound: require("@/assets/sound/fulb.mp3"),
  },
  {
    id: "2",
    or: "Onkololeessa",
    en: "October",
    emoji: "🍂",
    color: "#FAB1A0",
    season: "Birraa",
    sound: require("@/assets/sound/onk.mp3"),
  },
  {
    id: "3",
    or: "Sadaasa",
    en: "November",
    emoji: "🌾",
    color: "#FFEAA7",
    season: "Birraa",
    sound: require("@/assets/sound/sad.mp3"),
  },
  {
    id: "4",
    or: "Muddee",
    en: "December",
    emoji: "☀️",
    color: "#FD79A8",
    season: "Bona",
    sound: require("@/assets/sound/mud.mp3"),
  },
  {
    id: "5",
    or: "Amajjii",
    en: "January",
    emoji: "🏜️",
    color: "#E17055",
    season: "Bona",
    sound: require("@/assets/sound/am.mp3"),
  },
  {
    id: "6",
    or: "Guraandhala",
    en: "February",
    emoji: "🌬️",
    color: "#D63031",
    season: "Bona",
    sound: require("@/assets/sound/gur.mp3"),
  },
  {
    id: "7",
    or: "Bitootessa",
    en: "March",
    emoji: "🌱",
    color: "#55E6C1",
    season: "Arfaasaa",
    sound: require("@/assets/sound/bit.mp3"),
  },
  {
    id: "8",
    or: "Ebla",
    en: "April",
    emoji: "🌦️",
    color: "#58B19F",
    season: "Arfaasaa",
    sound: require("@/assets/sound/eb.mp3"),
  },
  {
    id: "9",
    or: "Caamsaa",
    en: "May",
    emoji: "🌳",
    color: "#1B9CFC",
    season: "Arfaasaa",
    sound: require("@/assets/sound/cam.mp3"),
  },
  {
    id: "10",
    or: "Waxabajjii",
    en: "June",
    emoji: "🌧️",
    color: "#706FD3",
    season: "Ganna",
    sound: require("@/assets/sound/wax.mp3"),
  },
  {
    id: "11",
    or: "Adoolessa",
    en: "July",
    emoji: "☔",
    color: "#474787",
    season: "Ganna",
    sound: require("@/assets/sound/ad.mp3"),
  },
  {
    id: "12",
    or: "Hagayya",
    en: "August",
    emoji: "🌊",
    color: "#2C3E50",
    season: "Ganna",
    sound: require("@/assets/sound/ha.mp3"),
  },
];

const MonthsKids = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  async function playSound(soundFile) {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s) => s.didJustFinish && sound.unloadAsync(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  const handleOpen = (item) => {
    setSelected(item);
    playSound(item.sound);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>📅Maqaalee Ji'oota Waggaa</Text>

      <FlatList
        data={MONTHS} // This looks for the constant defined above
        numColumns={3}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.card, { backgroundColor: item.color }]}
            onPress={() => handleOpen(item)}
          >
            <Text style={styles.cardEmoji}>{item.emoji}</Text>
            <Text style={styles.cardTextOr} numberOfLines={1}>
              {item.or}
            </Text>
          </Pressable>
        )}
        contentContainerStyle={styles.listContainer}
      />

      <Modal visible={selected !== null} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelected(null)}
        >
          <Animated.View
            style={[styles.modalCard, { transform: [{ scale: scaleAnim }] }]}
          >
            {selected && (
              <>
                <Text style={styles.modalEmoji}>{selected.emoji}</Text>
                <Text style={styles.modalOr}>{selected.or}</Text>
                <Text style={styles.modalEn}>{selected.en}</Text>
                <View style={styles.seasonBadge}>
                  <Text style={styles.seasonText}>
                    Waqtii: {selected.season}
                  </Text>
                </View>
                <Text style={styles.tapBack}>
                  Tuqi gara duubaatti deebi'uuf ✨
                </Text>
              </>
            )}
          </Animated.View>
        </Pressable>
      </Modal>

      <Pressable style={styles.homeBtn} onPress={() => router.back()}>
        <Text style={styles.homeBtnText}>🏠 Deebi'i</Text>
      </Pressable>
    </View>
  );
};

// ... (Use the styles from the previous 3-column response)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F2F5", paddingTop: 60 },
  headerTitle: {
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    color: "#2D3436",
    marginBottom: 10,
  },
  listContainer: { paddingHorizontal: 5, paddingBottom: 100 },
  card: {
    flex: 1 / 3,
    height: 110,
    margin: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  cardEmoji: { fontSize: 40 },
  cardTextOr: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 30,
    alignItems: "center",
  },
  modalEmoji: { fontSize: 80, marginBottom: 10 },
  modalOr: { fontSize: 40, fontWeight: "900", color: "#2D3436" },
  modalEn: { fontSize: 20, color: "#636E72", marginBottom: 20 },
  seasonBadge: {
    backgroundColor: "#00CEC9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  seasonText: { color: "white", fontWeight: "bold", fontSize: 50 },
  tapBack: { marginTop: 30, color: "#B2BEC3", fontSize: 14 },
  homeBtn: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#2D3436",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
  },
  homeBtnText: { color: "white", fontWeight: "bold", fontSize: 18 },
});

export default MonthsKids;
