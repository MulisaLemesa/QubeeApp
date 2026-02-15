import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  Easing,
  FlatList,
  Modal,
  Vibration,
} from "react-native";
import { Audio } from "expo-av";

const { width } = Dimensions.get("window");

const SENSORY_DATA = [
  {
    id: "1",
    name: "Ija",
    desc: "Sight / Argituu",
    img: require("@/assets/images/eye.png"),
    snd: require("@/assets/sound/iji.mp3"),
  },
  {
    id: "2",
    name: "Gurra",
    desc: "Hearing / Dhageettii",
    img: require("@/assets/images/ear.png"),
    snd: require("@/assets/sound/gurri.mp3"),
  },
  {
    id: "3",
    name: "Funyaan",
    desc: "Smell / Funfataa",
    img: require("@/assets/images/nose.png"),
    snd: require("@/assets/sound/funyaani.mp3"),
  },
  {
    id: "4",
    name: "Arraba",
    desc: "Taste / Dhandhammi",
    img: require("@/assets/images/tongue.png"),
    snd: require("@/assets/sound/arrabi.mp3"),
  },
  {
    id: "5",
    name: "Harka/Gogaa",
    desc: "Touch / Tuqaa",
    img: require("@/assets/images/skin.png"),
    snd: require("@/assets/sound/harki.mp3"),
  },
];

const QaamoleeMiiraa = () => {
  const scrollX = useRef(new Animated.Value(width)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  // --- MARQUEE ---
  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width * 3,
        duration: 15000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  // --- AUDIO LOGIC ---
  async function playSound(audioFile) {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  // --- FAARUU (SONG) LOGIC ---
  const startFaaruu = async () => {
    setIsSongPlaying(true);
    for (const item of SENSORY_DATA) {
      setSelectedItem(item);
      Vibration.vibrate(40);

      // Scale up animation
      scaleAnim.setValue(0);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }).start();

      await playSound(item.snd);
      // Wait 2 seconds for each part (rhythm)
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    setSelectedItem(null);
    setIsSongPlaying(false);
  };

  const handleManualPress = (item) => {
    if (isSongPlaying) return; // Disable manual taps during song
    setSelectedItem(item);
    playSound(item.snd);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 6,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Marquee Header */}
      <View style={styles.marqueeContainer}>
        <Animated.Text
          style={[styles.marqueeText, { transform: [{ translateX: scrollX }] }]}
        >
          Qaamolee Miiraa Shanan — Ija, Gurra, Funyaan, Arraba, Gogaa —
          Baradhaa!
        </Animated.Text>
      </View>

      {/* SONG BUTTON */}
      <Pressable
        style={styles.songBtn}
        onPress={startFaaruu}
        disabled={isSongPlaying}
      >
        <Text style={styles.songBtnText}>
          {isSongPlaying ? "Faaruun Jira..." : "🎵 Faaruu Jalqabi"}
        </Text>
      </Pressable>

      <FlatList
        data={SENSORY_DATA}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => handleManualPress(item)}
          >
            <Image source={item.img} style={styles.image} />
            <Text style={styles.organText}>{item.name}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listPadding}
      />

      {/* MAXIMIZE MODAL */}
      <Modal visible={selectedItem !== null} transparent animationType="fade">
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.maxCard, { transform: [{ scale: scaleAnim }] }]}
          >
            {selectedItem && (
              <>
                <Image source={selectedItem.img} style={styles.maxImage} />
                <Text style={styles.maxTitle}>{selectedItem.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.maxDesc}>{selectedItem.desc}</Text>
                </View>
                {!isSongPlaying && (
                  <Pressable onPress={() => setSelectedItem(null)}>
                    <Text style={styles.closeBtn}>CUFI</Text>
                  </Pressable>
                )}
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  marqueeContainer: {
    height: 35,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    overflow: "hidden",
  },
  marqueeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    width: width * 4,
  },
  songBtn: {
    backgroundColor: "#3498db",
    margin: 15,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  songBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  listPadding: { padding: 10 },
  card: {
    flex: 1,
    margin: 8,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  image: { width: 60, height: 60, resizeMode: "contain" },
  organText: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  maxCard: {
    backgroundColor: "#fff",
    width: width * 0.8,
    padding: 25,
    borderRadius: 25,
    alignItems: "center",
  },
  maxImage: { width: 150, height: 150, resizeMode: "contain" },
  maxTitle: { fontSize: 35, fontWeight: "900", marginTop: 15 },
  badge: {
    backgroundColor: "#2ecc71",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  maxDesc: { color: "#fff", fontWeight: "bold" },
  closeBtn: {
    marginTop: 20,
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QaamoleeMiiraa;
