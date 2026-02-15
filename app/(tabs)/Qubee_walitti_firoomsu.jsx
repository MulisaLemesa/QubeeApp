import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Vibration,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

const SOUND_MAP = {
  wellDone: require("@/assets/sound/baayee_gaari.mp3"),
  tryAgain: require("@/assets/sound/ammas_yaali.mp3"),
  clapping: require("@/assets/sound/moral.mp3"), // Add your clapping sound file here
};

const QUBEE_DATA = [
  { id: 1, val: "A", color: "#FF5733" },
  { id: 2, val: "B", color: "#33FF57" },
  { id: 3, val: "C", color: "#3357FF" },
  { id: 4, val: "D", color: "#F39C12" },
  { id: 5, val: "E", color: "#9B59B6" },
];

// Shuffled version for Column B
const SHUFFLED_DATA = [...QUBEE_DATA].sort(() => Math.random() - 0.5);

const QubeeWalittiFiroomsu = () => {
  const router = useRouter();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);

  const slideAnim = useRef(new Animated.Value(600)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Selection Pulse Animation
  useEffect(() => {
    if (selectedLetter) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [selectedLetter]);

  // Handle Win State & Clapping Sound
  useEffect(() => {
    if (matchedIds.length === QUBEE_DATA.length) {
      // Play Clapping Sound
      playSound("clapping");

      // Animate Overlay
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [matchedIds]);

  async function playSound(type) {
    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_MAP[type]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s) => s.didJustFinish && sound.unloadAsync(),
      );
    } catch (e) {
      console.log("Sound Error:", e);
    }
  }

  const handleTargetPress = (id) => {
    if (!selectedLetter) return;

    if (selectedLetter.id === id) {
      setMatchedIds([...matchedIds, id]);
      setSelectedLetter(null);
      Vibration.vibrate(100);
      // We only play "wellDone" if it's NOT the final match to avoid sound overlap
      if (matchedIds.length + 1 < QUBEE_DATA.length) {
        playSound("wellDone");
      }
    } else {
      setErrorId(id);
      Vibration.vibrate(50);
      playSound("tryAgain");
      setTimeout(() => {
        setErrorId(null);
        setSelectedLetter(null);
      }, 800);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qubee Walitti Firoomsu! 🔡</Text>
        <Text style={styles.subTitle}>
          Qubeewwan Walfakkaatan Walitti Firoomsi
        </Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.column}>
          {QUBEE_DATA.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedLetter?.id === item.id;
            return (
              <Animated.View
                key={`left-${item.id}`}
                style={{ transform: [{ scale: isSelected ? pulseAnim : 1 }] }}
              >
                <Pressable
                  style={[
                    styles.card,
                    { borderColor: item.color },
                    isSelected && styles.selectedCard,
                    isMatched && styles.matchedLeftCard,
                  ]}
                  onPress={() =>
                    !isMatched && (setSelectedLetter(item), playSound("click"))
                  }
                >
                  <Text
                    style={[
                      styles.qubeeText,
                      { color: isMatched ? "#FFF" : item.color },
                    ]}
                  >
                    {item.val}
                  </Text>
                </Pressable>
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.column}>
          {SHUFFLED_DATA.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isError = errorId === item.id;
            return (
              <Pressable
                key={`right-${item.id}`}
                style={[
                  styles.card,
                  { borderColor: item.color },
                  isMatched && {
                    backgroundColor: item.color,
                    borderColor: item.color,
                  },
                  isError && styles.errorCard,
                ]}
                onPress={() => !isMatched && handleTargetPress(item.id)}
              >
                <Text
                  style={[
                    styles.qubeeText,
                    { color: isMatched ? "#FFF" : item.color },
                  ]}
                >
                  {item.val}
                </Text>
                {isMatched && <Text style={styles.icon}>✅</Text>}
                {isError && <Text style={styles.icon}>❌</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* WIN OVERLAY */}
      {matchedIds.length === QUBEE_DATA.length && (
        <Animated.View
          style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.winEmoji}>👏🌟👏</Text>
          <Text style={styles.winText}>Bay’ee Gaari!</Text>
          <Pressable style={styles.btn} onPress={() => router.replace("/")}>
            <Text style={styles.btnText}>Deebi'i 🏠</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F4F8" },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    elevation: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "900",
    color: "#2D3436",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    color: "#636E72",
    fontWeight: "700",
    textAlign: "center",
    marginTop: 5,
  },
  gameArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    paddingVertical: 20,
  },
  column: {
    width: "42%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFF",
    width: width * 0.35,
    height: 80, // Slightly taller for better touch
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderWidth: 4,
    borderColor: "#FFF",
  },
  selectedCard: {
    borderColor: "#FFD700",
    backgroundColor: "#FFF9C4",
    borderStyle: "dashed",
  },
  matchedLeftCard: {
    backgroundColor: "#D1D8E0",
    borderColor: "#D1D8E0",
    opacity: 0.5,
  },
  errorCard: { borderColor: "#FF7675", backgroundColor: "#FFEBEB" },
  qubeeText: { fontSize: 50, fontWeight: "900" },
  icon: { position: "absolute", right: -5, top: -5, fontSize: 24 },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    padding: 40,
    elevation: 50,
  },
  winEmoji: { fontSize: 70, marginBottom: 10 },
  winText: {
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 30,
    color: "#2D3436",
  },
  btn: {
    backgroundColor: "#4CD137",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    borderBottomWidth: 5,
    borderBottomColor: "#3DAE2B",
  },
  btnText: { color: "#FFF", fontSize: 24, fontWeight: "900" },
});

export default QubeeWalittiFiroomsu;
