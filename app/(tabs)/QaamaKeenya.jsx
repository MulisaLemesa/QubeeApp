import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable,
  Modal,
  Animated,
  Vibration,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");
const DEBUG_MODE = false;

const BODY_PARTS_COORDS = [
  {
    id: "1",
    or: "Mataa",
    en: "Head",
    top: "-1%",
    left: "42%",
    w: "16%",
    h: "2%",
    z: 2,
    s: require("@/assets/sound/mataa.mp3"),
    emoji: "👤",
  },
  {
    id: "2",
    or: "Rifeensa",
    en: "Hair",
    top: "0%",
    left: "45%",
    w: "10%",
    h: "2%",
    z: 3,
    s: require("@/assets/sound/rifeensa.mp3"),
    emoji: "💇‍♂️",
  },
  {
    id: "3",
    or: "Nyaara",
    en: "Eyebrow",
    top: "5%",
    left: "45%",
    w: "10%",
    h: "2%",
    z: 3,
    s: require("@/assets/sound/nyaarra.mp3"),
    emoji: "🤨",
  },
  {
    id: "4_I",
    or: "Ijaa",
    en: "Eyes",
    top: "6%",
    left: "44%",
    w: "12%",
    h: "3%",
    z: 4,
    s: require("@/assets/sound/ija.mp3"),
    emoji: "👀",
  },
  {
    id: "5",
    or: "Gurra",
    en: "Ear",
    top: "7%",
    left: "48%",
    w: "12%",
    h: "3%",
    z: 4,
    s: require("@/assets/sound/gurra.mp3"),
    emoji: "👂",
  },
  {
    id: "6",
    or: "Fuunyaan",
    en: "Nose",
    top: "7.5%",
    left: "48%",
    w: "4%",
    h: "2%",
    z: 5,
    s: require("@/assets/sound/funyaan.mp3"),
    emoji: "👃",
  },
  {
    id: "7",
    or: "Afaan",
    en: "Mouth",
    top: "9%",
    left: "45%",
    w: "10%",
    h: "2%",
    z: 4,
    s: require("@/assets/sound/afaan.mp3"),
    emoji: "👄",
  },
  {
    id: "9",
    or: "Morma",
    en: "Neck",
    top: "13%",
    left: "45%",
    w: "10%",
    h: "3%",
    z: 2,
    s: require("@/assets/sound/morma.mp3"),
    emoji: "🦒",
  },
  {
    id: "11",
    or: "Qoma",
    en: "Chest",
    top: "18%",
    left: "43%",
    w: "14%",
    h: "5%",
    z: 1,
    s: require("@/assets/sound/qoma.mp3"),
    emoji: "👕",
  },
  {
    id: "12",
    or: "Gateettii",
    en: "Shoulder",
    top: "15%",
    left: "48%",
    w: "14%",
    h: "5%",
    z: 1,
    s: require("@/assets/sound/gateettii.mp3"),
    emoji: "💪",
  },
  {
    id: "14",
    or: "Garaa",
    en: "Stomach",
    top: "30%",
    left: "43%",
    w: "10%",
    h: "5%",
    z: 1,
    s: require("@/assets/sound/garaa.mp3"),
    emoji: "🤰",
  },
  {
    id: "15",
    or: "Mudhii",
    en: "Waist",
    top: "35%",
    left: "43%",
    w: "10%",
    h: "5%",
    z: 1,
    s: require("@/assets/sound/mudhii.mp3"),
    emoji: "👖",
  },
  {
    id: "L2_H",
    or: "Harka",
    en: "Hand",
    top: "38%",
    left: "48%",
    w: "11%",
    h: "11%",
    z: 20,
    s: require("@/assets/sound/gogaa.mp3"),
    emoji: "✋",
  },
  {
    id: "L2_S",
    or: "Sarbaa",
    en: "Hip",
    top: "50%",
    left: "48%",
    w: "11%",
    h: "11%",
    z: 20,
    s: require("@/assets/sound/sarbaa.mp3"),
    emoji: "🦵",
  },
  {
    id: "20",
    or: "Jilba",
    en: "Knee",
    top: "60%",
    left: "42%",
    w: "16%",
    h: "8%",
    z: 4,
    s: require("@/assets/sound/jilba.mp3"),
    emoji: "🦵",
  },
  {
    id: "23_M",
    or: "Miila",
    en: "Foot",
    top: "70%",
    left: "48%",
    w: "24%",
    h: "5%",
    z: 4,
    s: require("@/assets/sound/miillaa.mp3"),
    emoji: "👣",
  },
  {
    id: "23_Q",
    or: "Qubaa Miila",
    en: "Toes",
    top: "90%",
    left: "48%",
    w: "24%",
    h: "5%",
    z: 4,
    s: require("@/assets/sound/qubaam.mp3"),
    emoji: "🦶",
  },
];

const DiagramLearner = () => {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [sound, setSound] = useState();
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(soundFile) {
    if (!soundFile) return;
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  }

  const handlePress = (part) => {
    setSelected(part);
    Vibration.vibrate(45);
    playSound(part.s);

    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Home Button Top Left */}
      <Pressable style={styles.homeBtn} onPress={() => router.back()}>
        <Text style={styles.homeBtnText}>Deebi'i</Text>
      </Pressable>

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Kutaalee Qaama Namaa</Text>
      </View>

      <View style={styles.diagramContainer}>
        <ImageBackground
          source={require("@/assets/images/body.png")}
          style={styles.diagramBase}
          resizeMode="contain"
        >
          {BODY_PARTS_COORDS.map((part) => (
            <Pressable
              key={part.id}
              onPress={() => handlePress(part)}
              style={[
                styles.hitbox,
                {
                  top: part.top,
                  left: part.left,
                  width: part.w,
                  height: part.h,
                  zIndex: part.z,
                  backgroundColor: DEBUG_MODE
                    ? "rgba(255, 0, 0, 0.3)"
                    : "transparent",
                },
              ]}
            />
          ))}
        </ImageBackground>
      </View>

      <Modal visible={selected !== null} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setSelected(null)}>
          <Animated.View
            style={[styles.maxCard, { transform: [{ scale: scaleAnim }] }]}
          >
            {selected && (
              <>
                {/* Visual Emoji Representation */}
                <Text style={styles.mainEmoji}>{selected.emoji}</Text>

                <View style={styles.iconCircleWrapper}>
                  <Pressable
                    style={styles.iconCircle}
                    onPress={() => playSound(selected.s)}
                  >
                    <Text style={{ fontSize: 40 }}>🔊</Text>
                  </Pressable>
                </View>

                <Text style={styles.maxEn}>{selected.en}</Text>

                <View style={styles.badge}>
                  <Text style={styles.maxOr}>{selected.or}</Text>
                </View>

                <Pressable
                  style={styles.modalBackBtn}
                  onPress={() => setSelected(null)}
                >
                  <Text style={styles.modalBackBtnText}>ITTI FUFI</Text>
                </Pressable>
              </>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    backgroundColor: "#FFF",
    paddingVertical: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: "#2D3436",
  },
  diagramContainer: { flex: 1, justifyContent: "center" },
  diagramBase: { width: width, height: height * 0.8, alignSelf: "center" },
  hitbox: { position: "absolute", borderRadius: 15 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  maxCard: {
    backgroundColor: "#FFF",
    paddingVertical: 40,
    paddingHorizontal: 30,
    borderRadius: 40,
    alignItems: "center",
    width: width * 0.85,
    elevation: 25,
  },
  mainEmoji: { fontSize: 100, marginBottom: 10 },
  iconCircleWrapper: { marginBottom: 15 },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FDCB6E",
    justifyContent: "center",
    alignItems: "center",
  },
  maxEn: {
    fontSize: 28,
    color: "#636E72",
    fontWeight: "600",
    textTransform: "uppercase",
  },
  badge: {
    backgroundColor: "#FFEAA7",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 15,
  },
  maxOr: { fontSize: 45, fontWeight: "900", color: "#2D3436" },
  modalBackBtn: {
    backgroundColor: "#00B894",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  modalBackBtnText: { color: "#FFF", fontWeight: "800", fontSize: 18 },
  homeBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#2D3436",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    zIndex: 100,
    elevation: 5,
  },
  homeBtnText: { color: "#FFF", fontWeight: "bold" },
});

export default DiagramLearner;
