import React, { useState, useEffect, useRef } from "react"; // Added useRef
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Modal,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Animated, // Added Animated
  Easing, // Added Easing for smooth motion
} from "react-native";
// ... (your other imports)

const { width, height } = Dimensions.get("window");

const Qubee = () => {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);

  // --- ANIMATION LOGIC START ---
  const scrollX = useRef(new Animated.Value(width)).current; // Start off-screen to the right

  useEffect(() => {
    const startAnimation = () => {
      scrollX.setValue(width); // Reset to right side
      Animated.timing(scrollX, {
        toValue: -width * 1.5, // Move to the far left
        duration: 10000, // Time in ms (10 seconds) - adjust for speed
        easing: Easing.linear, // Keep constant speed
        useNativeDriver: true,
      }).start(() => startAnimation()); // Loop forever
    };

    startAnimation();
  }, [scrollX]);
  // --- ANIMATION LOGIC END ---

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* MOVING HEADER */}
          <View style={styles.header}>
            <Animated.Text
              style={[
                styles.headerText,
                { transform: [{ translateX: scrollX }] }, // This makes it move
              ]}
              numberOfLines={1}
            >
              Qubee Afaan Oromoo Dubbisuu — Barumsi Hundee Guddinatti —
              Baradhaa!
            </Animated.Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* ... rest of your grid code stays the same ... */}
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};
