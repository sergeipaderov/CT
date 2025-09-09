import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SelectionButtons = ({ forceSwipe }) => {
  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => forceSwipe("left")}
        >
          <Ionicons name="close" size={32} color="#FD5068" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => forceSwipe("right")}
        >
          <Ionicons name="heart" size={32} color="#2DE1A3" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectionButtons;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  buttonsWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "40%",
    height: 54,
  },
  button: {
    backgroundColor: "white",
    width: 54,
    height: 54,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
