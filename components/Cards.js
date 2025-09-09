import {
  Text,
  View,
  Image,
  Animated,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const Cards = ({ currentIndex, cats, loading, position, panResponder }) => {
  if (loading) return <ActivityIndicator size="large" color="#FD5068" />;
  if (currentIndex >= cats.length) {
    return (
      <View style={styles.card}>
        <Text style={styles.infoText}>No more cats!</Text>
      </View>
    );
  }

  const getCardStyle = () => {
    const combinedTransform = position.getTranslateTransform();

    return { transform: combinedTransform };
  };

  return cats
    .map((cat, index) => {
      if (index < currentIndex || index > currentIndex + 1) return null;
      if (index === currentIndex) {
        return (
          <Animated.View
            key={cat.id}
            style={[styles.card, getCardStyle()]}
            {...panResponder.panHandlers}
          >
            <Image source={{ uri: cat.url }} style={styles.image} />
            <View style={styles.infoBox}>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>
                  {cat?.breeds[0]?.alt_names || "Unknown Breed"}
                </Text>
                <Text style={styles.origin}>{cat?.breeds[0]?.origin}</Text>
              </View>
              <Text style={styles.details}>{cat.breeds[0]?.vocalisation}</Text>
            </View>
          </Animated.View>
        );
      } else {
        return (
          <Animated.View key={cat.id} style={[styles.card]}>
            <Image source={{ uri: cat.url }} style={styles.image} />
          </Animated.View>
        );
      }
    })
    .reverse();
};

export default Cards;

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    top: 0,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.55,
    borderRadius: 16,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: "hidden",
  },
  infoText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    maxWidth: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  infoBox: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    backgroundColor: "rgba(255, 255, 255, 1)",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 64,
    bottom: -12,
  },
  nameContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    maxWidth: "70%",
  },
  name: { fontSize: 16, fontWeight: "700", color: "#434141" },
  origin: {
    fontSize: 8,
    fontWeight: "700",
    color: "#BFBFC0",
    marginTop: 6,
  },
  details: {
    fontSize: 16,
    fontWeight: "bold",
    color: "700",
  },
});
