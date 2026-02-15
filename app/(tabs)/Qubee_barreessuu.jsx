import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import Svg, { Path, Defs, Mask, Text as SvgText } from "react-native-svg";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

// ... (QUBEE_DATA kee akkuma jirutti itti fufa)
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
  { id: "27", q: "CH", c: "#FF7675", s: require("@/assets/sound/CH.mp3") },
  { id: "28", q: "DH", c: "#74B9FF", s: require("@/assets/sound/DH.mp3") },
  { id: "29", q: "NY", c: "#55E6C1", s: require("@/assets/sound/NY.mp3") },
  { id: "30", q: "PH", c: "#F7D794", s: require("@/assets/sound/PH.mp3") },
  { id: "31", q: "SH", c: "#A29BFE", s: require("@/assets/sound/SH.mp3") },
];

const ManualStepTrace = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [status, setStatus] = useState("Qubee hordofi! ✍️");
  const [showClapping, setShowClapping] = useState(false);

  const currentQubee = QUBEE_DATA[currentIndex];
  const paintColor = currentQubee.c;
  const svgWidth = width * 0.9;
  const svgHeight = height * 0.45;

  useEffect(() => {
    playAudio(currentQubee.s);
    setShowClapping(false);
  }, [currentIndex]);

  async function playAudio(soundFile) {
    try {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (e) { console.log("Audio Error"); }
  }

  async function playFeedbackSound(type) {
    try {
      let soundFile = type === "success"
          ? require("@/assets/sound/baayee_gaari.mp3")
          : require("@/assets/sound/ammas_yaali.mp3");
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();

      if (type === "success") {
        setShowClapping(true);
        setTimeout(async () => {
           const { sound: clap } = await Audio.Sound.createAsync(require("@/assets/sound/moral.mp3"));
           await clap.playAsync();
        }, 500);
      }
    } catch (e) { console.log("Feedback Error"); }
  }

  const handleMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    if (locationX !== undefined && locationY !== undefined) {
      const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)}`;
      setCurrentPath((prev) => [...prev, newPoint]);
    }
  };

  const handleRelease = () => {
    if (currentPath.length > 2) {
      setPaths([...paths, { points: currentPath }]);
    }
    setCurrentPath([]);
  };

  const checkProgress = () => {
    const midPoint = svgWidth / 2;
    let leftSide = 0, rightSide = 0;

    paths.forEach((p) =>
      p.points.forEach((pt) => {
        const x = parseFloat(pt.split(",")[0]);
        x < midPoint ? leftSide++ : rightSide++;
      })
    );

    const isDacha = currentQubee.q.length > 1;
    if (isDacha) {
      if (leftSide >= 25 && rightSide >= 25) {
        setStatus("Baay'ee Gaarii! 🎉");
        playFeedbackSound("success");
      } else {
        setStatus("Lameenuu barreessi! ✍️");
        playFeedbackSound("fail");
      }
    } else {
      if (leftSide + rightSide >= 60) {
        setStatus("Baay'ee Gaarii! 🎉");
        playFeedbackSound("success");
      } else {
        setStatus("Ammas yaali! 🔄");
        playFeedbackSound("fail");
      }
    }
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % QUBEE_DATA.length);
    setPaths([]);
    setStatus("Qubee hordofi! ✍️");
  };

  // Mask ID is unique for each letter to prevent rendering issues
  const currentMaskId = `mask-${currentIndex}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Barreeffama Qubee</Text>

      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: status.includes("Gaarii") ? "#4CAF50" : "#D32F2F" }]}>
          {status}
        </Text>
        {showClapping && <Text style={{fontSize: 30}}>👏</Text>}
      </View>

      <View
        style={[
          styles.canvas,
          Platform.OS === "web" && {
            cursor: "crosshair",
            userSelect: "none",
            touchAction: "none",
          },
        ]}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={handleMove}
        onResponderMove={handleMove}
        onResponderRelease={handleRelease}
      >
        <Svg width={svgWidth} height={svgHeight} style={{ pointerEvents: "none" }}>
          <Defs>
            <Mask id={currentMaskId}>
              <SvgText
                x="50%"
                y="55%"
                fontSize={currentQubee.q.length > 1 ? "180" : "260"}
                fontWeight="900"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="white"
              >
                {currentQubee.q}
              </SvgText>
            </Mask>
          </Defs>

          {/* BACKGROUND GUIDE */}
          <SvgText
            x="50%"
            y="55%"
            fontSize={currentQubee.q.length > 1 ? "180" : "260"}
            fontWeight="900"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#F0F0F0"
          >
            {currentQubee.q}
          </SvgText>

          {/* DRAWN PATHS - These use the mask */}
          <Path
            mask={`url(#${currentMaskId})`}
            d={paths.map((p) => `M${p.points.join(" L")}`).join(" ")}
            stroke={paintColor}
            strokeWidth="120"
            fill="none"
            strokeLinecap="round"
            strokeJoin="round"
          />

          {currentPath.length > 0 && (
            <Path
              mask={`url(#${currentMaskId})`}
              d={`M${currentPath.join(" L")}`}
              stroke={paintColor}
              strokeWidth="120"
              fill="none"
              strokeLinecap="round"
              strokeJoin="round"
            />
          )}
        </Svg>
      </View>

      <View style={styles.btnRow}>
        <Pressable style={styles.checkBtn} onPress={checkProgress}>
          <Text style={styles.btnText}>MIRKANEESSI ✅</Text>
        </Pressable>
        <Pressable style={styles.nextBtn} onPress={nextItem}>
          <Text style={styles.btnText}>ITTI FUFI ➡️</Text>
        </Pressable>
      </View>

      <Pressable style={styles.clearBtn} onPress={() => { setPaths([]); setStatus("Qubee hordofi! ✍️"); setShowClapping(false); }}>
        <Text style={styles.clearText}>HAQII 🗑️</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "900", marginTop: 25, color: "#00695C" },
  statusRow: { flexDirection: 'row', alignItems: 'center', height: 45, marginVertical: 5 },
  statusText: { fontSize: 22, fontWeight: "bold", marginRight: 10 },
  canvas: {
    width: width * 0.9, // Iddoo dibuun itti mul'atu bal'isneera
    height: height * 0.45,
    backgroundColor: "#FFF",
    borderRadius: 35,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#4DB6AC",
  },
  btnRow: { flexDirection: "row", marginTop: 30, gap: 15 },
  checkBtn: { backgroundColor: "#00897B", padding: 18, borderRadius: 20, width: 160, alignItems: "center" },
  nextBtn: { backgroundColor: "#0288D1", padding: 18, borderRadius: 20, width: 140, alignItems: "center" },
  clearBtn: { marginTop: 20 },
  clearText: { color: "#D32F2F", fontWeight: "bold", fontSize: 16 },
  btnText: { color: "#FFF", fontWeight: "bold" },
});

export default ManualStepTrace;