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
  StatusBar,
} from "react-native";
import { Audio } from "expo-av";
const { width } = Dimensions.get("window");
const QUBEE_DATA = [
  { id: "1", q: "A", c: "#FF7675", s: require("@/assets/sound/Aa.mp3") },
  { id: "2", q: "B", c: "#74B9FF", s: require("@/assets/sound/Ba.mp3") },
  { id: "3", q: "C", c: "#55E6C1", s: require("@/assets/sound/Ca.mp3") },
  { id: "4", q: "D", c: "#F7D794", s: require("@/assets/sound/Da.mp3") },
  { id: "5", q: "E", c: "#A29BFE", s: require("@/assets/sound/Ea.mp3") },
  { id: "6", q: "F", c: "#FF9F43", s: require("@/assets/sound/Fa.mp3") },
  { id: "7", q: "G", c: "#00D2D3", s: require("@/assets/sound/Ga.mp3") },
  { id: "8", q: "H", c: "#54A0FF", s: require("@/assets/sound/Haa.mp3") },
  { id: "9", q: "I", c: "#FECA57", s: require("@/assets/sound/Ia.mp3") },
  { id: "10", q: "J", c: "#5F27CD", s: require("@/assets/sound/Ja.mp3") },
  { id: "11", q: "K", c: "#48DBFB", s: require("@/assets/sound/ka.mp3") },
  { id: "12", q: "L", c: "#1DD1A1", s: require("@/assets/sound/la.mp3") },
  { id: "13", q: "M", c: "#FF9FF3", s: require("@/assets/sound/ma.mp3") },
  { id: "14", q: "N", c: "#FF6B6B", s: require("@/assets/sound/Naa.mp3") },
  { id: "15", q: "O", c: "#10AC84", s: require("@/assets/sound/oa.mp3") },
  { id: "16", q: "P", c: "#2E86DE", s: require("@/assets/sound/pa.mp3") },
  { id: "17", q: "Q", c: "#8395A7", s: require("@/assets/sound/qa.mp3") },
  { id: "18", q: "R", c: "#EE5253", s: require("@/assets/sound/Ra.mp3") },
  { id: "19", q: "S", c: "#0ABDE3", s: require("@/assets/sound/Sa.mp3") },
  { id: "20", q: "T", c: "#F368E0", s: require("@/assets/sound/Ta.mp3") },
  { id: "21", q: "U", c: "#FF9F43", s: require("@/assets/sound/ua.mp3") },
  { id: "22", q: "V", c: "#00D2D3", s: require("@/assets/sound/Va.mp3") },
  { id: "23", q: "W", c: "#FECA57", s: require("@/assets/sound/Wa.mp3") },
  { id: "24", q: "X", c: "#54A0FF", s: require("@/assets/sound/Xa.mp3") },
  { id: "25", q: "Y", c: "#5F27CD", s: require("@/assets/sound/Ya.mp3") },
  { id: "26", q: "Z", c: "#EE5253", s: require("@/assets/sound/Za.mp3") },
];
const QubeeKidsElite = () => {
  const [selected, setSelected] = useState(null);
  const zoomAnim = useRef(new Animated.Value(0)).current;
  async function playSound(soundFile) {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (e) {
      console.log(e);
    }
  }
  const handleOpen = (item) => {
    setSelected(item);
    Vibration.vibrate(50); // Slightly longer for kid feedback
    playSound(item.s);
    Animated.spring(zoomAnim, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };
  const handleClose = () => {
    Animated.timing(zoomAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setSelected(null));
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>🏫Qubee A-Z Dubbisuu</Text>
        <Text style={styles.subtitle}>
          Qubee tuquun sagalee qubee dhaggeeffaadhu.
        </Text>
      </View>
      <FlatList
        data={QUBEE_DATA}
        numColumns={4}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handleOpen(item)}
            style={({ pressed }) => [
              styles.card,
              {
                borderColor: item.c,
                backgroundColor: item.c + "15",
                transform: [{ scale: pressed ? 0.9 : 1 }],
              },
            ]}
          >
            <Text style={[styles.letter, { color: item.c }]}>{item.q}</Text>
          </Pressable>
        )}
      />
      <Modal visible={selected !== null} transparent animationType="fade">
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalCard,
              { transform: [{ scale: zoomAnim }], borderColor: selected?.c },
            ]}
          >
            {selected && (
              <>
                <View
                  style={[
                    styles.letterCircle,
                    { backgroundColor: selected.c + "20" },
                  ]}
                >
                  <Text style={[styles.modalLetter, { color: selected.c }]}>
                    {selected.q}
                  </Text>
                </View>
                <View style={styles.soundIndicator}>
                  <Text style={styles.soundText}>🔊 Sagalee dhaggeeffadhu</Text>
                </View>
                <Pressable
                  style={[styles.closeBtn, { backgroundColor: selected.c }]}
                  onPress={handleClose}
                >
                  <Text style={styles.closeText}>TOLE</Text>
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
  container: { flex: 1, backgroundColor: "#F0F7FF" },
  header: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 35, fontWeight: "900", color: "#2D3436" },
  subtitle: { fontSize: 16, color: "#636E72", fontWeight: "600" },
  list: { padding: 10, paddingTop: 15 },
  card: {
    flex: 1,
    margin: 6,
    height: 180,
    borderRadius: 22,
    borderWidth: 3,
    borderBottomWidth: 8, // 3D Button Effect
    alignItems: "center",
    justifyContent: "center",
  },
  letter: { fontSize: 160, fontWeight: "1200" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(45, 52, 54, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 60,
    padding: 40,
    alignItems: "center",
    borderWidth: 15,
  },
  letterCircle: {
    width: 250,
    height: 250,
    borderRadius: 180,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  modalLetter: { fontSize: 250, fontWeight: "1200" },
  soundIndicator: { marginBottom: 30 },
  soundText: { fontSize: 30, fontWeight: "700", color: "#636E72" },
  closeBtn: {
    paddingHorizontal: 60,
    paddingVertical: 18,
    borderRadius: 35,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
  },
  closeText: { color: "white", fontWeight: "900", fontSize: 22 },
});
export default QubeeKidsElite;
