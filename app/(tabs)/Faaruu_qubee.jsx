import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  SafeAreaView,
  Dimensions,
  Animated,
  Vibration,
  Modal,
} from "react-native";
import { Audio } from "expo-av";
const { width } = Dimensions.get("window");
// --- SINGLE QUBEE DATA ---
const QUBEE_DATA = [
  {
    id: "1",
    q: "A",
    w: "Abbaa",
    m: "Father",
    c: "#FF7675",
    e: "👨‍🍼",
    s: require("@/assets/sound/A.mp3"),
  },
  {
    id: "2",
    q: "B",
    w: "Barataa",
    m: "Student",
    c: "#74B9FF",
    e: "🧑‍🎓",
    s: require("@/assets/sound/B.mp3"),
  },
  {
    id: "3",
    q: "C",
    w: "Caaccuu",
    m: "cacu",
    c: require("@/assets/images/cacu.png"),
    e: "📿", // Emoji faaya aadaa ibsu
    s: require("@/assets/sound/C.mp3"),
  },
  {
    id: "4",
    q: "D",
    w: "Damma",
    m: "Honey",
    c: "#F7D794",
    e: "🍯",
    s: require("@/assets/sound/D.mp3"),
  },
  {
    id: "5",
    q: "E",
    w: "Eebba",
    m: "Blessing",
    c: "#A29BFE",
    e: "🙏",
    s: require("@/assets/sound/E.mp3"),
  },
  {
    id: "6",
    q: "F",
    w: "Fayyaa",
    m: "Health",
    c: "#FF9F43",
    e: "💪",
    s: require("@/assets/sound/F.mp3"),
  },
  {
    id: "7",
    q: "G",
    w: "Gamna",
    m: "Clever",
    c: "#00D2D3",
    e: "🧠",
    s: require("@/assets/sound/G.mp3"),
  },
  {
    id: "8",
    q: "H",
    w: "Hiriyaa",
    m: "Friend",
    c: "#54A0FF",
    e: "🤝",
    s: require("@/assets/sound/H.mp3"),
  },
  {
    id: "9",
    q: "I",
    w: "Ifa",
    m: "Light",
    c: "#FECA57",
    e: "💡",
    s: require("@/assets/sound/I.mp3"),
  },
  {
    id: "10",
    q: "J",
    w: "Jabaa",
    m: "Strong",
    c: "#5F27CD",
    e: "🏋️",
    s: require("@/assets/sound/J.mp3"),
  },
  {
    id: "11",
    q: "K",
    w: "Kitaaba",
    m: "Book",
    c: "#48DBFB",
    e: "📚",
    s: require("@/assets/sound/K.mp3"),
  },
  {
    id: "12",
    q: "L",
    w: "Lafa",
    m: "Earth",
    c: "#1DD1A1",
    e: "🌍",
    s: require("@/assets/sound/L.mp3"),
  },
  {
    id: "13",
    q: "M",
    w: "Maatii",
    m: "Family",
    c: "#FF9FF3",
    e: "👨‍👩‍👧",
    s: require("@/assets/sound/M.mp3"),
  },
  {
    id: "14",
    q: "N",
    w: "Nafa",
    m: "Body",
    c: "#FF6B6B",
    e: "👤",
    s: require("@/assets/sound/N.mp3"),
  },
  {
    id: "15",
    q: "O",
    w: "Odaa",
    m: "Sycamore",
    c: "#10AC84",
    e: "🌳",
    s: require("@/assets/sound/O.mp3"),
  },
  {
    id: "16",
    q: "P",
    w: "Poolisii",
    m: "Police",
    c: "#2E86DE",
    e: "👮",
    s: require("@/assets/sound/P.mp3"),
  },
  {
    id: "17",
    q: "Q",
    w: "Qalama",
    m: "Pen",
    c: "#8395A7",
    e: "🖋️",
    s: require("@/assets/sound/Q.mp3"),
  },
  {
    id: "18",
    q: "R",
    w: "Re’ee",
    m: "Goat",
    c: "#EE5253",
    e: "🐐",
    s: require("@/assets/sound/R.mp3"),
  },
  {
    id: "19",
    q: "S",
    w: "Seera",
    m: "Law",
    c: "#0ABDE3",
    e: "⚖️",
    s: require("@/assets/sound/S.mp3"),
  },
  {
    id: "20",
    q: "T",
    w: "Tapha",
    m: "Game",
    c: "#F368E0",
    e: "⚽",
    s: require("@/assets/sound/T.mp3"),
  },
  {
    id: "21",
    q: "U",
    w: "Ulee",
    m: "Stick",
    c: "#FF9F43",
    e: "🦯",
    s: require("@/assets/sound/U.mp3"),
  },
  {
    id: "22",
    q: "V",
    w: "Viitamiinii",
    m: "Vitamin",
    c: "#00D2D3",
    e: "💊",
    s: require("@/assets/sound/V.mp3"),
  },
  {
    id: "23",
    q: "W",
    w: "Warqii",
    m: "Gold",
    c: "#FECA57",
    e: "👑",
    s: require("@/assets/sound/W.mp3"),
  },
  {
    id: "24",
    q: "X",
    w: "Xiyyaara",
    m: "Airplane",
    c: "#54A0FF",
    e: "✈️",
    s: require("@/assets/sound/X.mp3"),
  },
  {
    id: "25",
    q: "Y",
    w: "Yeroo",
    m: "Time",
    c: "#5F27CD",
    e: "⏰",
    s: require("@/assets/sound/Y.mp3"),
  },
  {
    id: "26",
    q: "Z",
    w: "Zeeroo",
    m: "Zero",
    c: "#EE5253",
    e: "0️⃣",
    s: require("@/assets/sound/Z.mp3"),
  },
];

// --- QUBEE DACHAA DATA ---
const DACHAA_DATA = [
  {
    id: "d1",
    q: "CH",
    w: "Chappaa",
    m: "Stamp",
    c: "#FF4757",
    e: "🧱",
    s: require("@/assets/sound/CH.mp3"),
  },
  {
    id: "d2",
    q: "DH",
    w: "Dhugaa",
    m: "Truth",
    c: "#2ED573",
    e: "✔️",
    s: require("@/assets/sound/DH.mp3"),
  },
  {
    id: "d3",
    q: "NY",
    w: "Nyaata",
    m: "Food",
    c: "#FFA502",
    e: "🍕",
    s: require("@/assets/sound/NY.mp3"),
  },
  {
    id: "d4",
    q: "PH",
    w: "Phaaphillaa",
    m: "Butterfly",
    c: "#70A1FF",
    e: "🦋",
    s: require("@/assets/sound/PH.mp3"),
  },
  {
    id: "d5",
    q: "SH",
    w: "Shaashii",
    m: "Scarf",
    c: "#ECCC68",
    e: "🧣",
    s: require("@/assets/sound/SH.mp3"),
  },
  {
    id: "d6",
    q: "TS",
    w: "Tsooma",
    m: "Fasting",
    c: "#747D8C",
    e: "🍽️",
    s: require("@/assets/sound/TS.mp3"),
  },
  {
    id: "d7",
    q: "ZY",
    w: "Zayita",
    m: "Cooking Oil",
    c: "#A4B0BE",
    e: "🫗",
    s: require("@/assets/sound/ZY.mp3"),
  },
];

const QubeeApp = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const zoomAnim = useRef(new Animated.Value(0)).current;

  async function playSound(soundFile) {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.log("Sound error:", error);
    }
  }
  const handleOpen = (item) => {
    setSelectedItem(item);
    Vibration.vibrate(50);
    playSound(item.s);
    Animated.spring(zoomAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const handleClose = () => {
    Animated.timing(zoomAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setSelectedItem(null));
  };

  const renderCard = (item, isDachaa = false) => (
    <Pressable
      style={[
        styles.card,
        { borderColor: item.c },
        isDachaa && styles.dachaaCardExtra,
      ]}
      onPress={() => handleOpen(item)}
    >
      <Text style={styles.emojiSmall}>{item.e}</Text>
      <Text
        style={[styles.letter, { color: item.c }, isDachaa && { fontSize: 28 }]}
      >
        {item.q}
      </Text>
      <Text style={styles.word}>{item.w}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          🎨 Qubee Afaan Oromoo fi jechoota qubee kanaan jalqaban
        </Text>
      </View>

      <FlatList
        data={QUBEE_DATA}
        renderItem={({ item }) => renderCard(item)}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => (
          <View style={styles.dachaaSection}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Qubee Dachaa</Text>
            <View style={styles.dachaaGrid}>
              {DACHAA_DATA.map((item) => (
                <View key={item.id} style={{ width: "33.3%" }}>
                  {renderCard(item, true)}
                </View>
              ))}
            </View>
          </View>
        )}
      />
      <Modal visible={selectedItem !== null} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.maxCard,
              {
                transform: [{ scale: zoomAnim }],
                borderColor: selectedItem?.c,
              },
            ]}
          >
            {selectedItem && (
              <>
                <Text style={styles.maxEmoji}>{selectedItem.e}</Text>
                <Text style={[styles.maxLetter, { color: selectedItem.c }]}>
                  {selectedItem.q}
                </Text>
                <Text style={styles.maxWord}>{selectedItem.w}</Text>
                <Text style={styles.maxMeaning}>{selectedItem.m}</Text>
                <Pressable style={styles.closeBtn} onPress={handleClose}>
                  <Text style={styles.closeText}>Cufi</Text>
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
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    elevation: 2,
  },
  headerTitle: { fontSize: 40, fontWeight: "900", color: "#2D3436" },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 2,
    elevation: 4,
  },
  letter: { fontSize: 120, fontWeight: "1200" },
  word: { fontSize: 60, fontWeight: "bold", color: "#2D3436" },
  emojiSmall: { fontSize: 60 },

  // Dachaa Specific Styles
  dachaaSection: { marginTop: 20, marginBottom: 40 },
  divider: {
    height: 2,
    backgroundColor: "#DFE6E9",
    borderRadius: 2,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    color: "#2D3436",
    marginBottom: 15,
  },
  dachaaGrid: { flexDirection: "row", flexWrap: "wrap" },
  dachaaCardExtra: { backgroundColor: "#F1F2F6" },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  maxCard: {
    width: width * 0.5,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 10,
  },
  maxEmoji: { fontSize: 120 },
  maxLetter: { fontSize: 180, fontWeight: "900" },
  maxWord: { fontSize: 80, fontWeight: "bold", color: "#2D3436" },
  maxMeaning: { fontSize: 50, color: "#636E72", marginBottom: 20 },
  closeBtn: {
    backgroundColor: "#FF7675",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 25,
  },
  closeText: { color: "white", fontWeight: "900", fontSize: 20 },
});

export default QubeeApp;
