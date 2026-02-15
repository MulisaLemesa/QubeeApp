import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Svg, { Path, Defs, Mask, Text as SvgText } from "react-native-svg";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

// --- 🔊 SOUND MAP FOR OROMO NUMBERS ---
const numberSounds = {
  0: require("@/assets/sound/0.mp3"),
  1: require("@/assets/sound/1.mp3"),
  2: require("@/assets/sound/2.mp3"),
  3: require("@/assets/sound/3.mp3"),
  4: require("@/assets/sound/4.mp3"),
  5: require("@/assets/sound/5.mp3"),
  6: require("@/assets/sound/6.mp3"),
  7: require("@/assets/sound/7.mp3"),
  8: require("@/assets/sound/8.mp3"),
  9: require("@/assets/sound/9.mp3"),
  10: require("@/assets/sound/10.mp3"),
  11: require("@/assets/sound/11.mp3"),
  12: require("@/assets/sound/12.mp3"),
  13: require("@/assets/sound/13.mp3"),
  14: require("@/assets/sound/14.mp3"),
  15: require("@/assets/sound/15.mp3"),
  16: require("@/assets/sound/16.mp3"),
  17: require("@/assets/sound/17.mp3"),
  18: require("@/assets/sound/18.mp3"),
  19: require("@/assets/sound/19.mp3"),
  20: require("@/assets/sound/20.mp3"),
  21: require("@/assets/sound/21.mp3"),
  22: require("@/assets/sound/22.mp3"),
  23: require("@/assets/sound/23.mp3"),
  24: require("@/assets/sound/24.mp3"),
  25: require("@/assets/sound/25.mp3"),
  26: require("@/assets/sound/26.mp3"),
  27: require("@/assets/sound/27.mp3"),
  28: require("@/assets/sound/28.mp3"),
  29: require("@/assets/sound/29.mp3"),
  30: require("@/assets/sound/30.mp3"),
};

const ManualStepTrace = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedNum, setSelectedNum] = useState(
    Math.floor(Math.random() * 31),
  );
  const [status, setStatus] = useState("Sarara hordofi! ✍️");

  const svgWidth = width * 0.9;
  const svgHeight = height * 0.45;

  useEffect(() => {
    playNumberSound(selectedNum);
  }, [selectedNum]);

  async function playNumberSound(num) {
    try {
      const { sound } = await Audio.Sound.createAsync(numberSounds[num]);
      await sound.playAsync();
    } catch (error) {
      console.log(`Sound file for ${num} not found.`);
    }
  }

  // --- 🔊 UPDATED FEEDBACK WITH MORAL.MP3 ---
  async function playFeedbackSound(type) {
    try {
      if (type === "success") {
        // First play "Baayee Gaarii"
        const { sound: goodJob } = await Audio.Sound.createAsync(require("@/assets/sound/baayee_gaari.mp3"));
        await goodJob.playAsync();
        
        // Then play clapping/moral sound after a small delay
        setTimeout(async () => {
          const { sound: moral } = await Audio.Sound.createAsync(require("@/assets/sound/moral.mp3"));
          await moral.playAsync();
        }, 600);
      } else {
        const { sound: tryAgain } = await Audio.Sound.createAsync(require("@/assets/sound/ammas_yaali.mp3"));
        await tryAgain.playAsync();
      }
    } catch (error) {
      console.log("Feedback sound error");
    }
  }

  const handleMove = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    const newPoint = `${locationX.toFixed(0)},${locationY.toFixed(0)}`;
    setCurrentPath((prev) => [...prev, newPoint]);
  };

  const handleRelease = () => {
    if (currentPath.length > 2) {
      setPaths([...paths, { points: currentPath }]);
    }
    setCurrentPath([]);
  };

  const checkProgress = () => {
    const midPoint = svgWidth / 2;
    let leftSidePoints = 0;
    let rightSidePoints = 0;

    paths.forEach((path) => {
      path.points.forEach((point) => {
        const x = parseFloat(point.split(",")[0]);
        x < midPoint ? leftSidePoints++ : rightSidePoints++;
      });
    });

    const totalPoints = leftSidePoints + rightSidePoints;
    const isDoubleDigit = selectedNum >= 10;
    const threshold = 25;

    if (isDoubleDigit) {
      if (leftSidePoints >= threshold && rightSidePoints >= threshold) {
        setStatus("Baay'ee Gaarii! 🎉");
        playFeedbackSound("success");
      } else {
        setStatus("Lameenuu barreessi! ✍️");
        playFeedbackSound("fail");
      }
    } else {
      if (totalPoints >= 65) {
        setStatus("Baay'ee Gaarii! 🎉");
        playFeedbackSound("success");
      } else {
        setStatus("Ammas yaali! 🔄");
        playFeedbackSound("fail");
      }
    }
  };

  const nextNumber = () => {
    setSelectedNum(Math.floor(Math.random() * 31));
    setPaths([]);
    setStatus("Sarara hordofi! ✍️");
  };

  const maskId = `mask-num-${selectedNum}`;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Barreessuu 0-30</Text>

      <Text
        style={[
          styles.statusText,
          { color: status.includes("Gaarii") ? "#4CAF50" : "#D32F2F" },
        ]}
      >
        {status}
      </Text>

      <View
        style={styles.canvas}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderMove={handleMove}
        onResponderRelease={handleRelease}
      >
        <Svg key={`svg-num-${selectedNum}`} width={svgWidth} height={svgHeight}>
          <Defs>
            <Mask id={maskId}>
              <SvgText
                x="50%"
                y="55%"
                fontSize={selectedNum >= 10 ? "200" : "280"}
                fontWeight="900"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="white"
              >
                {selectedNum}
              </SvgText>
            </Mask>
          </Defs>

          <SvgText
            x="50%"
            y="55%"
            fontSize={selectedNum >= 10 ? "200" : "280"}
            fontWeight="900"
            textAnchor="middle"
            alignmentBaseline="middle"
            fill="#F0F0F0"
          >
            {selectedNum}
          </SvgText>

          <Path
            mask={`url(#${maskId})`}
            d={paths.map((p) => `M${p.points.join(" L")}`).join(" ")}
            stroke="#4DB6AC"
            strokeWidth="80"
            fill="none"
            strokeLinecap="round"
            strokeJoin="round"
          />

          {currentPath.length > 0 && (
            <Path
              mask={`url(#${maskId})`}
              d={`M${currentPath.join(" L")}`}
              stroke="#FF8A65"
              strokeWidth="80"
              fill="none"
              strokeLinecap="round"
            />
          )}
        </Svg>
      </View>

      <View style={styles.btnRow}>
        <Pressable style={styles.checkBtn} onPress={checkProgress}>
          <Text style={styles.btnText}>MIRKANEESSI ✅</Text>
        </Pressable>
        <Pressable style={styles.nextBtn} onPress={nextNumber}>
          <Text style={styles.btnText}>ITTI FUFI ➡️</Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.clearBtn}
        onPress={() => {
          setPaths([]);
          setStatus("Sarara hordofi! ✍️");
        }}
      >
        <Text style={styles.clearText}>HAQII 🗑️</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#E0F2F1", alignItems: "center" },
  title: { fontSize: 26, fontWeight: "900", marginTop: 25, color: "#00695C" },
  statusText: { fontSize: 22, fontWeight: "bold", marginVertical: 10, height: 35 },
  canvas: {
    width: width * 0.9,
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