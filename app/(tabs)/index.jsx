import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");
const BG_IMAGE = require("@/assets/images/lakk.png");

const QubeeKG = () => {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Animation Values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const slides = [
    { or: "Ati Jabaadha!", en: "You are Strong!", emoji: "🦁" },
    { or: "Qaruutee koo!", en: "My Clever One!", emoji: "🧠" },
    { or: "Ati Goota!", en: "You are a Hero!", emoji: "🦸" },
  ];

  useEffect(() => {
    const triggerNextSlide = () => {
      // Phase 1: Exit (Fade and Slide Up)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -30,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIndex((prev) => (prev + 1) % slides.length);

        // Phase 2: Reset position (Start from below)
        slideAnim.setValue(30);

        // Phase 3: Entrance (Fade and Slide to Center)
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start();
      });
    };

    const interval = setInterval(triggerNextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = slides[index];

  return (
    <View style={styles.container}>
      <ImageBackground source={BG_IMAGE} style={styles.bg} resizeMode="cover">
        <View style={styles.overlay}>
          {/* TOP WELCOME TEXT */}
          <View style={styles.centerBox}>
            <Text style={styles.welcomeText}>Baga Nagaan Dhufte!</Text>
          </View>

          {/* ANIMATED FLOATING TEXT (No Container) */}
          <Animated.View
            style={[
              styles.textWrapper,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
            ]}
          >
            <Text style={styles.floatingEmoji}>{currentItem.emoji}</Text>
            <Text style={styles.floatingOr}>{currentItem.or}</Text>
            <Text style={styles.floatingEn}>{currentItem.en}</Text>
          </Animated.View>

          {/* HOME BUTTON */}
          <View style={styles.homeSection}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Pressable
                style={styles.homeCircle}
                onPress={() => router.back()}
              >
                <Text style={styles.homeIcon}>🏠</Text>
              </Pressable>
            </Animated.View>
            <Text style={styles.manaText}>MANA</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { width: width, height: height },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)", // Lighter overlay to see background better
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  centerBox: { marginTop: 20 },
  welcomeText: {
    fontSize: 80,
    fontWeight: "900",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  floatingEmoji: {
    fontSize: 140,
    marginBottom: 10,
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  floatingOr: {
    fontSize: 100,
    fontWeight: "900",
    color: "#FFD32A", // Bright Oromo Yellow
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 5,
  },
  floatingEn: {
    fontSize: 22,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 5,
    textShadowColor: "black",
    textShadowRadius: 3,
  },
  homeSection: { alignItems: "center" },
  homeCircle: {
    width: 120,
    height: 100,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#4CD137",
  },
  homeIcon: { fontSize: 45 },
  manaText: { marginTop: 8, fontSize: 20, fontWeight: "900", color: "white" },
});

export default QubeeKG;
