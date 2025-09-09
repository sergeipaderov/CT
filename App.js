// Guys I never used Tinder. So I was need to search for animation and etc. I apologize if I misunderstood anything.

// 1. I didn't have into email API key. So I was need to search for another endpoint (public) for to finish the test
// 2. Into response of used endpoint doesn't exist "votes field" - so I was need to use enother field inside cat's info section for show number.
// 3. I added just UI logic (active/not active) into top buttons (random/favorite) becouse I didn't see noone requirement for that.
// 4. I didn't add routing inside the app for symplecity of the app.
// 5. Didn't have enough time for optimization of code and decomposition.

import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  SafeAreaView,
} from "react-native";

import SelectionButtons from "./components/SelectionButtons";
import NavButton from "./components/NavButton";
import ScreenWrapper from "./components/ScreenWrapper";
import Cards from "./components/Cards";
import NavBar from "./components/NavBar";
import handleLike from "./utils/handleLike";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;

const API_URL_CATS = process.env.EXPO_PUBLIC_API_GET_CATS;
const API_URL_VOTES = process.env.EXPO_PUBLIC_API_POST_VOTES;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [listType, setListType] = useState("random");

  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  useEffect(() => {
    fetchCats();
  }, []);

  const fetchCats = async () => {
    setLoading(true);
    if (API_KEY) {
      try {
        const response = await fetch(
          `${API_URL_CATS}/search?has_breeds=1&limit=10`,
          {
            headers: { "x-api-key": API_KEY },
          }
        );
        const data = await response.json();
        setCats(data);
      } catch (error) {
        console.error("Error fetching cats:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const advanceToNextCard = (direction) => {
    const swipedCat = cats[currentIndex];
    if (direction === "right") {
      handleLike(swipedCat, API_URL_VOTES, API_URL_VOTES);
    }
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      position.setValue({ x: 0, y: 0 });
    }, 250);
  };

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x: x * 1.5, y: 0 },
      duration: 250,
      useNativeDriver: true,
    }).start(() => advanceToNextCard(direction));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const onChangeScreen = (screen) => {
    setCurrentScreen(screen);
  };

  const onSetCats = (cats) => {
    setCats(cats);
  };

  const onSetLoading = (status) => {
    setLoading(status);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === "home" && (
        <ScreenWrapper>
          <View style={styles.header}>
            <View style={styles.toggleContainer}>
              <View style={styles.toggleButtonActive}>
                <NavButton
                  name="flame"
                  active={listType === "random"}
                  onPress={() => setListType("random")}
                />
              </View>
              <View style={styles.toggleButton}>
                <NavButton
                  name="star"
                  active={listType === "favorite"}
                  onPress={() => setListType("favorite")}
                />
              </View>
            </View>
          </View>
          <View style={styles.deckContainer}>
            <Cards
              currentIndex={currentIndex}
              cats={cats}
              loading={loading}
              position={position}
              panResponder={panResponder}
            />
          </View>
          <SelectionButtons forceSwipe={forceSwipe} />
        </ScreenWrapper>
      )}
      {currentScreen === "chat" && (
        <ScreenWrapper>
          <View style={styles.emptyScreenTextContainer}>
            <Text style={styles.emptyScreenText}>02</Text>
          </View>
        </ScreenWrapper>
      )}
      {currentScreen === "profile" && (
        <ScreenWrapper>
          <View style={styles.emptyScreenTextContainer}>
            <Text style={styles.emptyScreenText}>03</Text>
          </View>
        </ScreenWrapper>
      )}
      <NavBar currentScreen={currentScreen} onChangeScreen={onChangeScreen} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 16,
    paddingVertical: 32,
    height: SCREEN_HEIGHT,
    position: "relative",
  },
  header: { height: 60, justifyContent: "center", alignItems: "center" },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#EAEAEA",
    borderRadius: 28,
    height: 28,
    width: 84,
    alignItems: "center",
    padding: 2,
    marginBottom: 32,
  },
  toggleButton: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
  },
  toggleButtonActive: {
    width: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 24,
  },
  deckContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: SCREEN_HEIGHT * 0.6,
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
  emptyScreenTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyScreenText: {
    fontWeight: "700",
    fontSize: 126,
    color: "#BFBFC0",
    marginTop: 120,
  },
});
