import { StyleSheet, View, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ScreenWrapper = ({ children, width, height }) => {
  return <View style={styles.screensWrapper}>{children}</View>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  screensWrapper: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
});
