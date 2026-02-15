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
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

const SOUND_MAP = {
  wellDone: require("@/assets/sound/baayee_gaari.mp3"),
  tryAgain: require("@/assets/sound/ammas_yaali.mp3"),
  click: require("@/assets/sound/1.mp3"), // Added a feedback sound for selection
};

const SENSE_DATA = [
  {
    id: 1,
    name: "Ija",
    img: require("@/assets/images/eye.png"),
    color: "#FF7675",
  },
  {
    id: 2,
    name: "Gurra",
    img: require("@/assets/images/ear.png"),
    color: "#74B9FF",
  },
  {
    id: 3,
    name: "Funyaan",
    img: require("@/assets/images/nose.png"),
    color: "#55E6C1",
  },
  {
    id: 4,
    name: "Arraba",
    img: require("@/assets/images/tongue.png"),
    color: "#F39C12",
  },
  {
    id: 5,
    name: "Gogaa",
    img: require("@/assets/images/skin.png"),
    color: "#9B59B6",
  },
];

const SenseMatch = () => {
  const router = useRouter();
  const [selectedOrgan, setSelectedOrgan] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [errorId, setErrorId] = useState(null);

  const slideAnim = useRef(new Animated.Value(400)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  async function playSound(type) {
    try {
      const { sound } = await Audio.Sound.createAsync(SOUND_MAP[type]);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (matchedIds.length === SENSE_DATA.length) {
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }).start();
    }
  }, [matchedIds]);

  const handleMatch = (objectId) => {
    if (!selectedOrgan) return;

    if (selectedOrgan.id === objectId) {
      setMatchedIds([...matchedIds, objectId]);
      setSelectedOrgan(null);
      Vibration.vibrate(100);
      playSound("wellDone");

      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.4,
          useNativeDriver: true,
          friction: 3,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 3,
        }),
      ]).start();
    } else {
      setErrorId(objectId);
      Vibration.vibrate([0, 50, 50, 50]);
      playSound("tryAgain");
      setTimeout(() => {
        setErrorId(null);
        setSelectedOrgan(null);
      }, 600);
    }
  };

  const renderCard = (item, side) => {
    const isMatched = matchedIds.includes(item.id);
    const isSelected = selectedOrgan?.id === item.id;
    const isError = errorId === item.id;

    return (
      <Pressable
        key={`${side}-${item.id}`}
        style={({ pressed }) => [
          styles.card,
          { borderColor: item.color },
          isSelected && styles.selectedCard,
          isMatched && [styles.matchedCard, { backgroundColor: item.color }],
          isError && styles.errorCard,
          pressed && !isMatched && { transform: [{ scale: 0.95 }] },
        ]}
        onPress={() => {
          if (side === "left") {
            if (!isMatched) {
              setSelectedOrgan(item);
              playSound("click");
            }
          } else {
            if (!isMatched) handleMatch(item.id);
          }
        }}
      >
        <Animated.View
          style={isMatched && { transform: [{ scale: scaleAnim }] }}
        >
          <Image
            source={item.img}
            style={[styles.organImage, isMatched && { tintColor: "#FFF" }]}
          />
        </Animated.View>

        {isMatched && (
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>✔️</Text>
          </View>
        )}
        {isError && (
          <View style={[styles.badge, { backgroundColor: "#FF7675" }]}>
            <Text style={styles.badgeIcon}>❌</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Qaamolee Miiraa</Text>
        <Text style={styles.subtitle}>Firoomsi!</Text>
      </View>

      <View style={styles.gameArea}>
        <View style={styles.column}>
          {SENSE_DATA.map((item) => renderCard(item, "left"))}
        </View>
        <View style={styles.column}>
          {[...SENSE_DATA].reverse().map((item) => renderCard(item, "right"))}
        </View>
      </View>

      {matchedIds.length === SENSE_DATA.length && (
        <Animated.View
          style={[
            styles.finishOverlay,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          <Text style={styles.winEmoji}>🏆</Text>
          <Text style={styles.winText}>Qaxalee!</Text>
          <Pressable
            style={styles.deebiiBtn}
            onPress={() => router.replace("/")}
          >
            <Text style={styles.deebiiText}>🏠 MANA</Text>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#EBF2FA" },
  header: {
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    color: "#2D3436",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#00B894",
    marginTop: -10,
  },
  gameArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  column: { width: "46%", justifyContent: "space-around" },
  card: {
    backgroundColor: "#FFF",
    height: width * 0.28,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    borderWidth: 6,
    borderColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  selectedCard: {
    borderColor: "#FDCB6E",
    borderStyle: "dashed",
    backgroundColor: "#FFF9E1",
  },
  matchedCard: {
    borderColor: "#FFF",
    elevation: 0,
  },
  errorCard: {
    borderColor: "#FF7675",
    backgroundColor: "#FFF5F5",
  },
  organImage: {
    width: width * 0.18,
    height: width * 0.18,
    resizeMode: "contain",
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#00B894",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  badgeIcon: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  finishOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    elevation: 40,
    borderWidth: 5,
    borderColor: "#00B894",
  },
  winEmoji: { fontSize: 80, marginBottom: 10 },
  winText: {
    fontSize: 45,
    fontWeight: "900",
    color: "#2D3436",
    marginBottom: 20,
  },
  deebiiBtn: {
    backgroundColor: "#00B894",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 35,
    borderBottomWidth: 5,
    borderBottomColor: "#00876C",
  },
  deebiiText: { color: "#FFF", fontSize: 26, fontWeight: "900" },
});

export default SenseMatch;
