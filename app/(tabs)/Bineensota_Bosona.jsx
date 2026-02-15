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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const ANIMAL_DATA = [
  {
    id: "1",
    name: "Leenca",
    code: "#F39C12",
    img: require("@/assets/images/leenca.png"),
    sound: require("@/assets/sound/leenca.mp3"),
  },
  {
    id: "2",
    name: "Qeerransa",
    code: "#E67E22",
    img: require("@/assets/images/qerrensa.png"),
    sound: require("@/assets/sound/qerrensa.mp3"),
  },
  {
    id: "3",
    name: "Gafarsa",
    code: "#34495E",
    img: require("@/assets/images/gafarsa.png"),
    sound: require("@/assets/sound/gafarsa.mp3"),
  },
  {
    id: "4",
    name: "Gadamsa",
    code: "#D35400",
    img: require("@/assets/images/gadamsa.png"),
    sound: require("@/assets/sound/gadamsa.mp3"),
  },
  {
    id: "5",
    name: "Harree-diidoo",
    code: "#BDC3C7",
    img: require("@/assets/images/harreed.png"),
    sound: require("@/assets/sound/harreed.mp3"),
  },
  {
    id: "6",
    name: "Weennii",
    code: "#A04000",
    img: require("@/assets/images/weennii.png"),
    sound: require("@/assets/sound/weennii.mp3"),
  },
  {
    id: "7",
    name: "Arba",
    code: "#95A5A6",
    img: require("@/assets/images/arba.png"),
    sound: require("@/assets/sound/arba.mp3"),
  },
  {
    id: "8",
    name: "Jeeldala",
    code: "#2C3E50",
    img: require("@/assets/images/jeeldala.png"),
    sound: require("@/assets/sound/jeeldala.mp3"),
  },
];

const AnimalApp = () => {
  const router = useRouter();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [bgColor, setBgColor] = useState("#F5F6FA");
  const scaleAnim = useRef(new Animated.Value(0)).current;

  const getTextColor = (hex) => {
    const lightColors = ["#FFFFFF", "#BDC3C7", "#F5F6FA"];
    return lightColors.includes(hex.toUpperCase()) ? "#2D3436" : "#FFF";
  };

  async function handlePress(item) {
    Vibration.vibrate(60);
    setSelectedAnimal(item);
    setBgColor(item.code);

    scaleAnim.setValue(0);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
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
        <Text style={styles.title}>Bineensota Bosonaa 🐾</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {ANIMAL_DATA.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.card,
                {
                  transform: [{ scale: pressed ? 0.9 : 1 }],
                  borderColor: item.code,
                },
              ]}
              onPress={() => handlePress(item)}
            >
              <Image
                source={item.img}
                style={styles.cardImg}
                resizeMode="contain"
              />
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
          <Text style={styles.homeBtnText}>🏠 Deebi'i</Text>
        </Pressable>
      </ScrollView>

      <Modal visible={selectedAnimal !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          {selectedAnimal && (
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ scale: scaleAnim }],
                  backgroundColor: selectedAnimal.code,
                  borderColor: "#FFF",
                  borderWidth: 10,
                },
              ]}
            >
              <Image
                source={selectedAnimal.img}
                style={styles.maxImg}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.maxText,
                  { color: getTextColor(selectedAnimal.code) },
                ]}
              >
                {selectedAnimal.name}
              </Text>

              <Pressable
                style={styles.closeBtn}
                onPress={() => setSelectedAnimal(null)}
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
  container: { flex: 1 },
  header: {
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 30,
    marginHorizontal: 15,
    marginTop: 10,
    elevation: 10,
  },
  title: { fontSize: 45, fontWeight: "900", color: "#2D3436" },
  scrollContainer: { padding: 15, alignItems: "center", paddingBottom: 60 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    backgroundColor: "#FFF",
    width: "25%",
    height: 240, // Taller cards for bigger images
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 8,
    marginBottom: 20,
    elevation: 8,
    padding: 10,
    overflow: "hidden",
  },
  cardImg: { width: "120%", height: "90%" }, // Maximized image
  nameTag: {
    marginTop: 5,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 10,
    width: "90%",
  },
  nameText: { fontWeight: "900", fontSize: 25, textAlign: "center" },
  homeBtn: {
    marginTop: 20,
    backgroundColor: "#2D3436",
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 40,
    elevation: 5,
  },
  homeBtnText: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.7, // Larger modal for kids
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  maxImg: { width: "80%", height: "45%" }, // Huge image in modal
  maxText: {
    fontSize: 30,
    fontWeight: "900",
    marginTop: 10,
    textTransform: "uppercase",
    textAlign: "center",
  },
  closeBtn: {
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  closeBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 24 },
});

export default AnimalApp;
