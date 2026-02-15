import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
const VIDEO_DATA = [
  {
    id: "1",
    title: "Qotiyyoo",
    src: require("../../assets/videos/oxen.mp4"),
  },
  {
    id: "2",
    title: "Sa'a",
    src: require("../../assets/videos/cow.mp4"),
  },
  {
    id: "3",
    title: "Sarree",
    src: require("../../assets/videos/dog.mp4"),
  },
  {
    id: "4",
    title: "Lukkuu",
    src: require("../../assets/videos/hen.mp4"),
  },
  {
    id: "5",
    title: "Farda",
    src: require("../../assets/videos/horse_2.mp4"),
  },
];

const VideoGallery = () => {
  const [maximizedVideo, setMaximizedVideo] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>Sagalee Beeylada Manaa 📺</Text>

        <View style={styles.videoGrid}>
          {VIDEO_DATA.map((item) => (
            <Pressable
              key={item.id}
              style={styles.videoCard}
              onPress={() => setMaximizedVideo(item)}
            >
              {/* Afan Oromo Number Badge */}
              <View style={styles.idBadge}>
                <Text style={styles.idText}>{item.oromoId}</Text>
              </View>

              <Video
                source={item.src}
                style={styles.thumbnailPlayer}
                resizeMode="cover"
                shouldPlay={false}
                isMuted={true}
              />

              <View style={styles.infoRow}>
                <Text style={styles.videoTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Ionicons name="play-circle" size={24} color="#00CEC9" />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* FULL SCREEN MAXIMIZE VIEW */}
      <Modal visible={maximizedVideo !== null} animationType="fade">
        <View style={styles.fullScreenBg}>
          <Pressable
            style={styles.closeBtn}
            onPress={() => setMaximizedVideo(null)}
          >
            <Ionicons name="close-circle" size={50} color="#FFF" />
            <Text style={styles.closeLabel}>Cufi</Text>
          </Pressable>

          {maximizedVideo && (
            <Video
              source={maximizedVideo.src}
              style={styles.maxVideo}
              useNativeControls
              resizeMode="contain"
              shouldPlay={true}
            />
          )}
          <Text style={styles.maxTitle}>{maximizedVideo?.title}</Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  scrollContainer: { padding: 15, alignItems: "center" },
  mainTitle: {
    fontSize: 45, // Adjusted from 50 for better fit
    fontWeight: "900",
    marginVertical: 20,
    color: "#2D3436",
    textAlign: "center",
  },
  videoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // This creates the two columns
    width: "100%",
  },
  videoCard: {
    width: "48%", // Key change for 2-column layout
    backgroundColor: "#FFF",
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DFE6E9",
  },
  idBadge: {
    backgroundColor: "#00CEC9",
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 2,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 20,
  },
  idText: { color: "#FFF", fontWeight: "bold", fontSize: 40 },
  thumbnailPlayer: {
    width: "100%",
    height: 120, // Taller thumbnail for students
    backgroundColor: "#000",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  videoTitle: {
    fontWeight: "800",
    fontSize: 30, // Reduced from 50 so it fits in the small card
    color: "#2D3436",
    flex: 1,
  },
  fullScreenBg: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  maxVideo: {
    width: width,
    height: height * 0.6,
  },
  maxTitle: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "bold",
    marginTop: 20,
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    alignItems: "center",
    zIndex: 10,
  },
  closeLabel: { color: "#FFF", fontWeight: "bold", marginTop: -5 },
});
export default VideoGallery;
