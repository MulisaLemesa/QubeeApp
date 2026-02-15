import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
  SafeAreaView,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const VIDEO_DATA = [
  {
    title: "Leenca",
    en: "Lion",
    src: require("../../assets/videos/lion_1.mp4"),
    emoji: "🦁",
  },
  {
    title: "Qeerrensa",
    en: "Tiger",
    src: require("../../assets/videos/tiger.mp4"),
    emoji: "🐅",
  },
  {
    title: "Arba",
    en: "Elephant",
    src: require("../../assets/videos/elephant1.mp4"),
    emoji: "🐘",
  },
  {
    title: "Giraafii",
    en: "Giraffe",
    src: require("../../assets/videos/giraffe2.mp4"),
    emoji: "🦒",
  },
  {
    title: "Bofa",
    en: "Snake",
    src: require("../../assets/videos/snakel.mp4"),
    emoji: "🐍",
  },
  {
    id: "6",
    title: "Waraabessa",
    en: "Hyena",
    src: require("../../assets/videos/hyena.mp4"),
    emoji: "🐆",
  },
  {
    title: "Gafarsa",
    en: "Bison",
    src: require("../../assets/videos/bisonl.mp4"),
    emoji: "🦬",
  },
  {
    title: "Qamalee",
    en: "Monkey",
    src: require("../../assets/videos/monkeyl.mp4"),
    emoji: "🐒",
  },
];

const VideoGallery = () => {
  const [maximizedVideo, setMaximizedVideo] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}> Sagalee Bineensota Bosonaa 📺</Text>

        <View style={styles.videoGrid}>
          {VIDEO_DATA.map((item) => (
            <View key={item.id} style={styles.videoCard}>
              {/* Afan Oromo Number Badge */}
              <View style={styles.idBadge}>
                <Text style={styles.idText}>{item.oromoId}</Text>
              </View>

              {/* Preview Video */}
              <Video
                source={item.src}
                style={styles.thumbnailPlayer}
                resizeMode="cover"
                shouldPlay={false}
                isMuted={true}
              />

              {/* Info Area */}
              <View style={styles.infoRow}>
                <View>
                  <Text style={styles.videoTitle}>{item.title}</Text>
                  <Text style={styles.videoTitleEn}>{item.en}</Text>
                </View>

                <Pressable
                  onPress={() => setMaximizedVideo(item)}
                  style={styles.expandBtn}
                >
                  <Ionicons name="expand" size={24} color="#FFF" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FULL SCREEN MODAL */}
      <Modal
        visible={maximizedVideo !== null}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.fullScreenBg}>
          {/* Close Button */}
          <Pressable
            style={styles.closeBtn}
            onPress={() => setMaximizedVideo(null)}
          >
            <Ionicons name="close-circle" size={60} color="#FF7675" />
            <Text style={styles.closeLabel}>Cufi</Text>
          </Pressable>

          {maximizedVideo && (
            <View style={styles.maxContent}>
              {/* Animal Emoji */}
              <Text style={styles.maxEmoji}>{maximizedVideo.emoji}</Text>

              <Video
                source={maximizedVideo.src}
                style={styles.maxVideo}
                useNativeControls
                resizeMode="contain"
                shouldPlay={true}
              />

              <View style={styles.maxTextContainer}>
                <Text style={styles.maxTitleText}>{maximizedVideo.title}</Text>
                <Text style={styles.maxSubTextEn}>{maximizedVideo.en}</Text>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  scrollContainer: { padding: 10, alignItems: "center" },
  mainTitle: {
    fontSize: 45,
    fontWeight: "900",
    marginVertical: 20,
    color: "#2D3436",
    textAlign: "center",
  },
  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  videoCard: {
    width: width * 0.46,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: "hidden",
  },
  idBadge: {
    backgroundColor: "#00CEC9",
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  idText: { color: "#FFF", fontWeight: "900", fontSize: 40 },
  thumbnailPlayer: { width: "100%", height: 120, backgroundColor: "#000" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  videoTitle: { fontWeight: "900", fontSize: 30, color: "#2D3436" },
  videoTitleEn: { fontSize: 25, color: "#636E72", fontWeight: "600" },
  expandBtn: {
    backgroundColor: "#00CEC9",
    padding: 8,
    borderRadius: 12,
  },

  // Modal Styles
  fullScreenBg: {
    flex: 1,
    backgroundColor: "#2D3436",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    alignItems: "center",
    zIndex: 10,
  },
  closeLabel: { color: "#FFF", fontWeight: "800", marginTop: -5 },
  maxContent: { alignItems: "center", width: "100%" },
  maxEmoji: { fontSize: 80, marginBottom: 10 },
  maxVideo: {
    width: width,
    height: height * 0.6,
  },
  maxTextContainer: {
    marginTop: 30,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 20,
    borderRadius: 25,
    width: "85%",
  },
  maxTitleText: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "900",
  },
  maxSubTextEn: {
    color: "#00CEC9",
    fontSize: 25,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});

export default VideoGallery;
