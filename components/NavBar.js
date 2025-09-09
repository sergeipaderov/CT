import { View, StyleSheet } from "react-native";

import NavButton from "./NavButton";

const NavBar = ({ currentScreen, onChangeScreen }) => {
  return (
    <View style={styles.navBarWrapper}>
      <View style={styles.navBar}>
        <NavButton
          name="paw"
          active={currentScreen === "home"}
          onPress={() => onChangeScreen("home")}
        />
        <NavButton
          name="chatbubbles"
          active={currentScreen === "chat"}
          onPress={() => onChangeScreen("chat")}
        />
        <NavButton
          name="person"
          active={currentScreen === "profile"}
          onPress={() => onChangeScreen("profile")}
        />
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  navBarWrapper: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    bottom: 36,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 44,
    borderRadius: 35,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
    width: 156,
  },
});
