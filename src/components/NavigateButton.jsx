import { StyleSheet, TouchableOpacity, Linking } from "react-native";

import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function NavigateButton() {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(handleFetchGames());
    // dispatch(handleFetchGameFormats());
    // dispatch(handleFetchEvents());
    // dispatch(handleClearGames());
    // dispatch(handleClearGameFormats());
    // dispatch(handleClearEvents());
  }, [dispatch]);

  return (
    <View style={styles.helpContainer}>
      <TouchableOpacity
        onPress={() => {
          const uri = `geo:0,0?q=מועדון ירושחמט`;
          Linking.openURL(uri);
        }}
        style={styles.helpLink}
      >
        <Text style={styles.helpLinkText}>Navigate to club</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  helpLink: {
    paddingVertical: 15,
    backgroundColor: Colors.light.tint,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
