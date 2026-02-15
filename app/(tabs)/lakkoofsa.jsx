import React, { useState, useRef } from "react";
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
  Vibration,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

// Exact calculation for 5 equal columns
const COLUMN_COUNT = 5;
const MARGIN = 5;
const CARD_SIZE = (width - 40) / COLUMN_COUNT;

// --- 🔊 SOUND MAP FOR OROMO NUMBERS ---
const numberSounds = {
  0: require("@/assets/sound/0.mp3"),
  1: require("@/assets/sound/1.mp3"),
  2: require("@/assets/sound/2.mp3"),
  3: require("@/assets/sound/3.mp3"),
  4: require("@/assets/sound/4.mp3"),
  5: require("@/assets/sound/5.mp3"),
  6: require("@/assets/sound/6.mp3"),
  7: require("@/assets/sound/7.mp3"),
  8: require("@/assets/sound/8.mp3"),
  9: require("@/assets/sound/9.mp3"),
  10: require("@/assets/sound/10.mp3"),
  11: require("@/assets/sound/11.mp3"),
  12: require("@/assets/sound/12.mp3"),
  13: require("@/assets/sound/13.mp3"),
  14: require("@/assets/sound/14.mp3"),
  15: require("@/assets/sound/15.mp3"),
  16: require("@/assets/sound/16.mp3"),
  17: require("@/assets/sound/17.mp3"),
  18: require("@/assets/sound/18.mp3"),
  19: require("@/assets/sound/19.mp3"),
  20: require("@/assets/sound/20.mp3"),
  21: require("@/assets/sound/21.mp3"),
  22: require("@/assets/sound/22.mp3"),
  23: require("@/assets/sound/23.mp3"),
  24: require("@/assets/sound/24.mp3"),
  25: require("@/assets/sound/25.mp3"),
  26: require("@/assets/sound/26.mp3"),
  27: require("@/assets/sound/27.mp3"),
  28: require("@/assets/sound/28.mp3"),
  29: require("@/assets/sound/29.mp3"),
  30: require("@/assets/sound/30.mp3"),
  40: require("@/assets/sound/40.mp3"),
  50: require("@/assets/sound/50.mp3"),
  60: require("@/assets/sound/60.mp3"),
  70: require("@/assets/sound/70.mp3"),
  80: require("@/assets/sound/80.mp3"),
  90: require("@/assets/sound/90.mp3"),
  100: require("@/assets/sound/100.mp3"),
  // Note: Add 40, 50, 60, 70, 80, 90, 100 here if you have those files
};

const OROMO_WORDS = {
  // 0 - 10
  0: "Zeeroo",
  1: "Tokko",
  2: "Lama",
  3: "Sadii",
  4: "Afur",
  5: "Shan",
  6: "Ja'a",
  7: "Torba",
  8: "Saddeet",
  9: "Sagal",
  10: "Kudhan",

  // 11 - 19 (Kudha + Digit)
  11: "Kudha tokko",
  12: "Kudha lama",
  13: "Kudha sadii",
  14: "Kudha afur",
  15: "Kudha shan",
  16: "Kudha ja'a",
  17: "Kudha torba",
  18: "Kudha saddeet",
  19: "Kudha sagal",

  // 20 - 29 (Digdamii + Digit)
  20: "Digdama",
  21: "Digdamii tokko",
  22: "Digdamii lama",
  23: "Digdamii sadii",
  24: "Digdamii afur",
  25: "Digdamii shan",
  26: "Digdamii ja'a",
  27: "Digdamii torba",
  28: "Digdamii saddeet",
  29: "Digdamii sagal",

  // Tens & Hundred
  30: "Soddoma",
  40: "Afurtama",
  50: "Shantama",
  60: "Jaatama",
  70: "Torbaatama",
  80: "Saddeettama",
  90: "Sagaltama",
  100: "Dhibba",
};

const COLORS = [
  "#FF7675",
  "#74B9FF",
  "#55E6C1",
  "#F7D794",
  "#A29BFE",
  "#FD79A8",
];
const LakkoofsaLayout = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const rowOne = [0, 1, 2, 3, 4];
  const rowTwo = [5, 6, 7, 8, 9];
  const higherNumbers = [
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 40, 50, 60, 70, 80, 90, 100,
  ];
  async function playSound(num) {
    try {
      if (numberSounds[num]) {
        const { sound } = await Audio.Sound.createAsync(numberSounds[num]);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((s) => {
          if (s.didJustFinish) sound.unloadAsync();
        });
      }
    } catch (e) {
      console.log("Audio Error:", e);
    }
  }

  const handleOpen = (num, colorIndex) => {
    const item = {
      val: num,
      word: OROMO_WORDS[num] || "",
      color: COLORS[colorIndex % COLORS.length],
    };
    setSelected(item);
    Vibration.vibrate(35);
    playSound(num);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  const renderNumber = (num, index) => {
    const btnColor = COLORS[index % COLORS.length];
    return (
      <Pressable
        key={num}
        onPress={() => handleOpen(num, index)}
        style={({ pressed }) => [
          styles.card,
          {
            borderColor: btnColor,
            backgroundColor: btnColor + "15",
            transform: [{ scale: pressed ? 0.9 : 1 }],
          },
        ]}
      >
        <Text style={[styles.numText, { color: btnColor }]}>{num}</Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔢 Lakkoofsota</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Lakkoofsa 0-9</Text>
        <View style={styles.grid}>
          {rowOne.map((num, idx) => renderNumber(num, idx))}
        </View>
        <View style={styles.grid}>
          {rowTwo.map((num, idx) => renderNumber(num, idx + 5))}
        </View>
        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>Lakkoofsota 10-100</Text>
        <View style={styles.grid}>
          {higherNumbers.map((num, idx) => renderNumber(num, idx + 10))}
        </View>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>🏠 GALMA</Text>
        </Pressable>
      </ScrollView>
      <Modal visible={selected !== null} transparent animationType="fade">
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalBox,
              {
                transform: [{ scale: scaleAnim }],
                borderColor: selected?.color,
              },
            ]}
          >
            {selected && (
              <>
                <Text style={[styles.modalBigNum, { color: selected.color }]}>
                  {selected.val}
                </Text>
                <Text style={styles.modalWord}>{selected.word}</Text>
                <Pressable
                  style={[styles.closeBtn, { backgroundColor: selected.color }]}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.closeBtnText}>TOLE ✅</Text>
                </Pressable>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  title: { fontSize: 50, fontWeight: "900" },
  scrollBody: { padding: 10, paddingBottom: 100 },
  sectionLabel: {
    fontSize: 50,
    fontWeight: "800",
    color: "#636E72",
    marginVertical: 15,
    marginLeft: 5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  card: {
    width: CARD_SIZE - MARGIN * 2,
    height: CARD_SIZE - MARGIN * 2,
    margin: MARGIN,
    borderRadius: 12,
    borderWidth: 2,
    borderBottomWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  numText: { fontSize: 200, fontWeight: "160" }, // Adjusted to fit in card
  divider: { height: 2, backgroundColor: "#F1F2F6", marginVertical: 20 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: width * 0.95,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 4,
  },
  modalBigNum: { fontSize: 120, fontWeight: "900" },
  modalWord: {
    fontSize: 80,
    color: "#333",
    marginVertical: 15,
    fontWeight: "700",
  },
  closeBtn: { paddingHorizontal: 40, paddingVertical: 15, borderRadius: 20 },
  closeBtnText: { color: "#FFF", fontWeight: "900", fontSize: 18 },
  backBtn: {
    marginTop: 40,
    alignSelf: "center",
    backgroundColor: "#2D3436",
    padding: 15,
    borderRadius: 15,
  },
  backBtnText: { color: "#FFF", fontWeight: "800" },
});

export default LakkoofsaLayout;
