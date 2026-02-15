import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 2, backgroundColor: "#F7F9FC" },

  header: {
    paddingVertical: 15,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    elevation: 3,
  },
  headerTitle: { fontSize: 35, fontWeight: "900", color: "#2D3436" },

  // --- GRID STYLE (Akka suuraa kee sanaatti) ---
  listContainer: { padding: 10 },
  card: {
    flex: 1,
    margin: 4,
    height: 200,
    weight: 80, // Kaardii grid sanaa bal'aa godha
    backgroundColor: "#FFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    elevation: 3,
  },
  imageSmall: { width: 6000, height: 100, resizeMode: "contain" },
  oromoTitle: { fontSize: 60, fontWeight: "600", marginTop: 5 },

  // --- MODAL MAXIMIZED VIEW (BEST FOR KIDS) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.96)",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteClose: { ...StyleSheet.absoluteFillObject },

  maxCard: {
    width: width * 0.95,
    height: height * 0.9,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 12,
  },

  // SAANDUQA SUURAA (Maximized Box)
  imageContainer: {
    width: "48%",
    height: "55%", // Suuraan bakka guddaa qabata
    backgroundColor: "#F9F9F9",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 10, // Suuraan akka saanduqa guutuuf padding xiqqaa
    borderWidth: 2,
    borderColor: "#F0F0F0",
    overflow: "hidden",
  },

  maxImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  // MAX LETTER (ULTRA BIG)
  maxOromo: {
    fontSize: 70, // Qubee baay'ee guddaa
    fontWeight: "900",
    textTransform: "uppercase",
    color: "#2D3436",
    textAlign: "center",
  },

  maxEnglish: {
    fontSize: 60,
    color: "#636E72",
    fontWeight: "800",
    marginTop: -20,
  },

  // CUFI BUTTON (BEST FOR KIDS)
  closeBtn: {
    width: "50%",
    paddingVertical: 20,
    borderRadius: 45,
    alignItems: "center",
    marginBottom: 10,
    elevation: 8,
  },
  closeText: { color: "white", fontWeight: "900", fontSize: 35 },
  canvas: {
    width: width * 0.5,
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
});
