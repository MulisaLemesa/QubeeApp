import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Vibration,
  Animated,
  BackHandler,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const SOUND_MAP = {
  wellDone: require("@/assets/sound/baayee_gaari.mp3"),
  tryAgain: require("@/assets/sound/ammas_yaali.mp3"),
  click: require("@/assets/sound/1.mp3"),
};

// Data Lakkoofsaa (1-5)
const NUMBER_DATA = [
  { id: 1, val: "1" },
  { id: 2, val: "2" },
  { id: 3, val: "3" },
  { id: 4, val: "4" },
  { id: 5, val: "5" },
];

const LakkoofsaWalittiFiroomsu = () => {
  const router = useRouter();
  const [selectedNum, setSelectedNum] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);

  const slideAnim = useRef(new Animated.Value(300)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  async function playSound(type) {
    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_MAP[type]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(
        (s) => s.didJustFinish && sound.unloadAsync(),
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (matchedIds.length === NUMBER_DATA.length) {
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }).start();
    }
  }, [matchedIds]);

  const handleMatch = (id) => {
    if (!selectedNum) return;

    if (selectedNum.id === id) {
      // ✅ SIRRII
      setMatchedIds([...matchedIds, id]);
      setSelectedNum(null);
      Vibration.vibrate(100);
      playSound("wellDone");

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.6,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // ❌ DOGOGGORA
      setErrorId(id);
      Vibration.vibrate([0, 40, 40, 40]);
      playSound("tryAgain");
      setTimeout(() => {
        setErrorId(null);
        setSelectedNum(null);
      }, 800);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Lakkoofsota Walii Fakkaatan Walitti Firoomsi
      </Text>

      <View style={styles.gameArea}>
        {/* Sarada Bitaa */}
        <View style={styles.column}>
          {NUMBER_DATA.map((item) => (
            <Pressable
              key={`left-${item.id}`}
              style={[
                styles.card,
                selectedNum?.id === item.id && styles.selectedCard,
                matchedIds.includes(item.id) && styles.matchedCard,
              ]}
              onPress={() =>
                !matchedIds.includes(item.id) &&
                (setSelectedNum(item), playSound("click"))
              }
            >
              <Animated.Text
                style={[
                  styles.numText,
                  matchedIds.includes(item.id) && {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                {item.val}
              </Animated.Text>
              {matchedIds.includes(item.id) && (
                <Text style={styles.icon}>✅</Text>
              )}
            </Pressable>
          ))}
        </View>

        {/* Sarada Mirgaa (Lakkoofsa bifa addaatiin tartiiba jijjiirame) */}
        <View style={styles.column}>
          {[...NUMBER_DATA].reverse().map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isError = errorId === item.id;
            return (
              <Pressable
                key={`right-${item.id}`}
                style={[
                  styles.card,
                  isMatched && styles.matchedCard,
                  isError && styles.errorCard,
                ]}
                onPress={() => !isMatched && handleMatch(item.id)}
              >
                <Animated.Text
                  style={[
                    styles.numText,
                    isMatched && { transform: [{ scale: scaleAnim }] },
                  ]}
                >
                  {item.val}
                </Animated.Text>
                {isMatched && <Text style={styles.icon}>✅</Text>}
                {isError && <Text style={styles.icon}>❌</Text>}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* XUMURA: DEEBI'I */}
      {matchedIds.length === NUMBER_DATA.length && (
        <Animated.View
          style={[styles.overlay, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.winText}>✨ Qaxalee! ✨</Text>
          <Text style={styles.flower}>🌸 🌹 🌻</Text>
          <Pressable style={styles.btn} onPress={() => router.replace("/")}>
            <Text style={styles.btnText}> DEEBI'I</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC", padding: 20 },
  title: {
    fontSize: 50,
    fontWeight: "900",
    textAlign: "center",
    marginTop: 20,
    color: "#2D3436",
  },
  gameArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 30,
  },
  column: { width: "40%", justifyContent: "space-around" },
  card: {
    backgroundColor: "#FFF",
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    borderWidth: 4,
    borderColor: "#EDF2F7",
  },
  selectedCard: { borderColor: "#FFD32A", backgroundColor: "#FFFDE7" },
  matchedCard: { backgroundColor: "#E6FFFA", borderColor: "#38B2AC" },
  errorCard: { borderColor: "#FEB2B2", backgroundColor: "#FFF5F5" },
  numText: { fontSize: 45, fontWeight: "bold", color: "#4A5568" },
  icon: {
    position: "absolute",
    top: -10,
    right: -10,
    fontSize: 24,
    backgroundColor: "#FFF",
    borderRadius: 12,
    overflow: "hidden",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    elevation: 30,
  },
  winText: { fontSize: 45, fontWeight: "900", color: "#2D3436" },
  flower: { fontSize: 30, marginVertical: 10 },
  btn: {
    backgroundColor: "#38B2AC",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 10,
  },
  btnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
});

export default LakkoofsaWalittiFiroomsu;
