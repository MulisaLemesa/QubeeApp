import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  Animated,
  Vibration,
  Modal,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import { styles } from "./AppStyles";
const ANIMALS_DATA = [
  {
    id: "1",
    oromo: "Sa'a",
    english: "Cow",
    color: "#FF7675",
    img: require("@/assets/images/sa'a.png"),
    snd: require("@/assets/sound/cow.mp3"),
  },
  {
    id: "2",
    oromo: "Hoolaa",
    english: "Sheep",
    color: "#74B9FF",
    img: require("@/assets/images/hola.png"),
    snd: require("@/assets/sound/sheep.mp3"),
  },
  {
    id: "3",
    oromo: "Re'ee",
    english: "Goat",
    color: "#55E6C1",
    img: require("@/assets/images/re'ee.png"),
    snd: require("@/assets/sound/goat.mp3"),
  },
  {
    id: "4",
    oromo: "Farda",
    english: "Horse",
    color: "#F7D794",
    img: require("@/assets/images/farda.png"),
    snd: require("@/assets/sound/horse.mp3"),
  },
  {
    id: "5",
    oromo: "Harree",
    english: "Donkey",
    color: "#A29BFE",
    img: require("@/assets/images/harree.png"),
    snd: require("@/assets/sound/donkey.mp3"),
  },
  {
    id: "6",
    oromo: "Sangaa",
    english: "Bull",
    color: "#FF9F43",
    img: require("@/assets/images/bull.png"),
    snd: require("@/assets/sound/kormaa.mp3"),
  },
  {
    id: "7",
    oromo: "Saree",
    english: "Dog",
    color: "#00D2D3",
    img: require("@/assets/images/dog.png"),
    snd: require("@/assets/sound/dog.mp3"),
  },
  {
    id: "8",
    oromo: "Adurree",
    english: "Cat",
    color: "#54A0FF",
    img: require("@/assets/images/cat.png"),
    snd: require("@/assets/sound/cat.mp3"),
  },
  {
    id: "9",
    oromo: "Lukkuu",
    english: "Chicken",
    color: "#FECA57",
    img: require("@/assets/images/lukku.png"),
    snd: require("@/assets/sound/hen.mp3"),
  },
];

const BeeyladamanaApp = () => {
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
    Vibration.vibrate(70);
    playSound(item.snd);
    Animated.spring(zoomAnim, {
      toValue: 1,
      friction: 8,
      tension: 120,
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
  const renderCard = ({ item }) => (
    <Pressable
      style={[
        styles.card,
        {
          borderColor: item.color,
          backgroundColor: item.color + "15", // Halluu laafaa %15 transparency
        },
      ]}
      onPress={() => handleOpen(item)}
    >
      <Image source={item.img} style={styles.imageSmall} resizeMode="contain" />
      <Text style={[styles.oromoTitle, { color: item.color }]}>
        {item.oromo}
      </Text>
    </Pressable>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🐄 Beeylada Mana</Text>
      </View>
      <FlatList
        data={ANIMALS_DATA}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <Modal visible={selectedItem !== null} transparent animationType="none">
        <View style={styles.modalOverlay}>
          <Pressable style={styles.absoluteClose} onPress={handleClose} />

          <Animated.View
            style={[
              styles.maxCard,
              {
                transform: [{ scale: zoomAnim }],
                borderColor: selectedItem?.color,
              },
            ]}
          >
            {selectedItem && (
              <>
                <View style={styles.imageContainer}>
                  <Image
                    source={selectedItem.img}
                    style={styles.maxImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.textContainer}>
                  <Text
                    style={[styles.maxOromo, { color: selectedItem.color }]}
                  >
                    {selectedItem.oromo}
                  </Text>
                  <Text style={styles.maxEnglish}>{selectedItem.english}</Text>
                </View>

                <Pressable
                  style={[
                    styles.closeBtn,
                    { backgroundColor: selectedItem.color },
                  ]}
                  onPress={handleClose}
                >
                  <Text style={styles.closeText}>CUFI</Text>
                </Pressable>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default BeeyladamanaApp;
