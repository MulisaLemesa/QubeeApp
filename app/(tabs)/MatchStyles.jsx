import { StyleSheet, Dimensions, Platform } from "react-native";
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDF2E9", paddingHorizontal: 12 },
  header: { alignItems: "center", marginTop: 20, marginBottom: 15 },
  title: { fontSize: 34, fontWeight: "900", color: "#6E2C00" },
  subTitle: { fontSize: 15, color: "#D35400", fontWeight: "700", textAlign: "center" },
  gameArea: { flexDirection: "row", justifyContent: "space-between", flex: 1 },
  column: { width: "47%", alignItems: "center" },
  colLabel: { 
    fontSize: 18, fontWeight: "800", color: "#A04000", 
    backgroundColor: "#FAE5D3", paddingHorizontal: 15, 
    paddingVertical: 5, borderRadius: 15, marginBottom: 12 
  },
  card: {
    width: "100%",
    height: 100, // Suuraan akka ifatti mul'atuuf
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: "flex-end", // Maqaa gara jalaa qabsiisuuf
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#F0F0F0",
    overflow: 'hidden', // Suuraa 140% kukkutee qabsisa
    elevation: 4,
  },
  selectedCard: { borderColor: "#3498DB", backgroundColor: "#EBF5FB", transform: [{ scale: 1.05 }] },
  matchedCard: { borderColor: "#2ECC71", backgroundColor: "#EAFAF1", opacity: 0.6 },
  image: { 
    width: "140%", // Suuraan akka baay'ee bal'atu
    height: "140%", 
    position: 'absolute',
    top: -10,
  },
  textOverlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Maqaan akka dubbisamu
    width: "100%",
    paddingVertical: 4,
    alignItems: "center",
  },
  cardName: { fontSize: 13, fontWeight: "900", color: "#5D4037" },
  icon: { position: "absolute", top: 5, right: 5, backgroundColor: '#FFF', borderRadius: 12 },
  winBanner: { 
    position: 'absolute', bottom: 0, width: width, 
    backgroundColor: "#FFF", padding: 30, alignItems: "center",
    borderTopLeftRadius: 40, borderTopRightRadius: 40, elevation: 20
  },
  winText: { fontSize: 28, fontWeight: "900", color: "#27AE60", marginBottom: 15 },
  resetBtn: { backgroundColor: "#D35400", paddingVertical: 14, paddingHorizontal: 50, borderRadius: 30 },
  resetText: { color: "#FFF", fontWeight: "bold", fontSize: 18 }
});