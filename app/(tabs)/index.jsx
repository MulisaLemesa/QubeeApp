import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

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
      // Phase 1: Exit
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
        slideAnim.setValue(30);

        // Phase 2: Entrance
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
      <View style={styles.overlay}>
        {/* TOP WELCOME TEXT */}
        <View style={styles.centerBox}>
          <Text style={styles.welcomeText}>Baga Nagaan Dhufte!</Text>
        </View>

        {/* ANIMATED FLOATING TEXT */}
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
              onPress={() => router.push("/")}
            >
              <Text style={styles.homeIcon}>🏠</Text>
            </Pressable>
          </Animated.View>
          <Text style={styles.manaText}>Home</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d5a27", // Dark green background instead of image
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  centerBox: { marginTop: 20 },
  welcomeText: {
    fontSize: 40, // Scaled down slightly to fit more screens
    fontWeight: "900",
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  floatingEmoji: {
    fontSize: 100,
    marginBottom: 10,
  },
  floatingOr: {
    fontSize: 60,
    fontWeight: "900",
    color: "#FFD32A",
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
  },
  homeSection: { alignItems: "center" },
  homeCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#4CD137",
    elevation: 5,
  },
  homeIcon: { fontSize: 40 },
  manaText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "900",
    color: "white",
  },
});

export default QubeeKG;
