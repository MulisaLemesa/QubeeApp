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
    color: "#FF7675",
    img: require("@/assets/images/eye.png"),
    snd: require("@/assets/sound/ija.mp3"),
    desc: "Argituu / Sight",
  },
  {
    id: "2",
    name: "Gurra",
    color: "#74B9FF",
    img: require("@/assets/images/ear.png"),
    snd: require("@/assets/sound/gurra.mp3"),
    desc: "Dhageettii / Hearing",
  },
  {
    id: "3",
    name: "Funyaan",
    color: "#55E6C1",
    img: require("@/assets/images/nose.png"),
    snd: require("@/assets/sound/funyaan.mp3"),
    desc: "Funfataa / Smell",
  },
  {
    id: "4",
    name: "Arraba",
    color: "#F7D794",
    img: require("@/assets/images/tongue.png"),
    snd: require("@/assets/sound/arraba.mp3"),
    desc: "Dhandhammi / Taste",
  },
  {
    id: "5",
    name: "Harka/Gogaa",
    color: "#A29BFE",
    img: require("@/assets/images/skin.png"),
    snd: require("@/assets/sound/gogaa.mp3"),
    desc: "Tuqaa / Touch",
  },
];

const QaamoleeMiiraa = () => {
  const scrollX = useRef(new Animated.Value(width)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    Animated.loop(
      Animated.timing(scrollX, {
        toValue: -width * 4,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  async function playSound(audioFile) {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(audioFile);
    setSound(newSound);
    await newSound.playAsync();
  }

  const handlePress = (item) => {
    setSelectedItem(item);
    playSound(item.snd);
    Vibration.vibrate(60);
    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const renderOrgan = ({ item }) => (
    <Pressable
      style={[
        styles.card,
        { borderBottomColor: item.color, borderBottomWidth: 8 },
      ]}
      onPress={() => handlePress(item)}
    >
      <View
        style={[styles.imageCircle, { backgroundColor: item.color + "22" }]}
      >
        <Image source={item.img} style={styles.image} />
      </View>
      <Text style={styles.organText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🎨 Qaamolee Miiraa Shanan</Text>
      </View>

      <View style={styles.marqueeContainer}>
        <Animated.Text
          style={[styles.marqueeText, { transform: [{ translateX: scrollX }] }]}
        >
          👁️ Ija 👂 Gurra 👃 Funyaan 👅 Arraba 🖐️ Gogaa — Baradhaa!
        </Animated.Text>
      </View>

      <FlatList
        data={SENSORY_DATA}
        renderItem={renderOrgan}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listPadding}
      />

      <Modal visible={selectedItem !== null} transparent animationType="none">
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.maxCard, { transform: [{ scale: scaleAnim }] }]}
          >
            {selectedItem && (
              <>
                <Text style={styles.emojiDecor}>✨ 🌟 ✨</Text>
                <Image source={selectedItem.img} style={styles.maxImage} />
                <Text style={[styles.maxTitle, { color: selectedItem.color }]}>
                  {selectedItem.name}
                </Text>
                <Text style={styles.maxDesc}>{selectedItem.desc}</Text>

                <Pressable
                  style={styles.closeBtn}
                  onPress={() => setSelectedItem(null)}
                >
                  <Text style={styles.closeBtnText}>X</Text>
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
  container: { flex: 1, backgroundColor: "#FFF9F1" },
  header: { padding: 15, alignItems: "center" },
  headerTitle: { fontSize: 50, fontWeight: "700", color: "#2d3436" },
  marqueeContainer: {
    height: 25,
    backgroundColor: "#FFD32A",
    justifyContent: "center",
    overflow: "hidden",
  },
  marqueeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2d3436",
    width: width * 4,
  },
  listPadding: { padding: 15 },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  imageCircle: {
    width: 80,
    height: 80,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  image: { width: 90, height: 80, resizeMode: "contain" },
  organText: { fontSize: 60, fontWeight: "700", color: "#2d3436" },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(45, 52, 54, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  maxCard: {
    backgroundColor: "#fff",
    width: width * 0.5,
    padding: 30,
    borderRadius: 50,
    alignItems: "center",
  },
  maxImage: { width: 180, height: 180, resizeMode: "contain" },
  maxTitle: { fontSize: 48, fontWeight: "900", marginVertical: 10 },
  maxDesc: { fontSize: 20, fontWeight: "bold", color: "#636e72" },
  emojiDecor: { fontSize: 30, marginBottom: 10 },
  closeBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#ff4757",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#fff",
  },
  closeBtnText: { color: "#fff", fontSize: 30, fontWeight: "900" },
});

export default QaamoleeMiiraa;
