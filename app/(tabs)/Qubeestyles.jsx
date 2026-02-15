import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F9FC" },
  header: {
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    elevation: 2,
  },
  headerTitle: { fontSize: 50, fontWeight: "900", color: "#2D3436" },
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 2,
    elevation: 4,
  },
  letter: { fontSize: 120, fontWeight: "bold" }, // Fixed 1200 weight to bold for compatibility
  word: { fontSize: 60, fontWeight: "bold", color: "#2D3436" },
  emojiSmall: { fontSize: 60 },

  // Dachaa Specific Styles
  dachaaSection: { marginTop: 15, marginBottom: 30},
  divider: {
    height: 1,
    backgroundColor: "#DFE6E9",
    borderRadius: 2,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    textAlign: "center",
    color: "#2D3436",
    marginBottom: 15,
  },
  dachaaGrid: { flexDirection: "row", flexWrap: "wrap" },
  dachaaCardExtra: { backgroundColor: "#F1F2F6" },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  maxCard: {
    width: width * 0.4,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 10,
  },
  maxEmoji: { fontSize: 120 },
  maxLetter: { fontSize: 180, fontWeight: "900" },
  maxWord: { fontSize: 80, fontWeight: "bold", color: "#2D3436" },
  maxMeaning: { fontSize: 50, color: "#636E72", marginBottom: 20 },
  closeBtn: {
    backgroundColor: "#FF7675",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 25,
  },
  closeText: { color: "white", fontWeight: "900", fontSize: 20 },
});