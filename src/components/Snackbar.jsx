import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { hideSnackbar } from "../redux/actions/snackbar";
import Icon from "react-native-vector-icons/FontAwesome";

export default function CustomSnackbar() {
  const dispatch = useDispatch();
  const snackbarState = useSelector((state) => state.snackbarState);

  const opacity = new Animated.Value(0);

  React.useEffect(() => {
    if (snackbarState.isOpen) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => dispatch(hideSnackbar()));
      }, snackbarState.duration);

      return () => clearTimeout(timeout);
    }
  }, [snackbarState.isOpen, snackbarState.duration, dispatch, opacity]);

  if (!snackbarState.isOpen) return null;

  let icon;
  if (snackbarState.variant === "error") {
    icon = <Icon name="close" size={20} color="#ffffff" />;
  } else if (snackbarState.variant === "success") {
    icon = <Icon name="check" size={20} color="#ffffff" />;
  } else if (snackbarState.variant === "info") {
    icon = <Icon name="exclamation" size={20} color="#ffffff" />;
  } else if (snackbarState.variant === "warning") {
    icon = <Icon name="warning" size={20} color="#ffffff" />;
  }

  return (
    <Animated.View
      style={[
        styles.snackbarContainer,
        { backgroundColor: snackbarState.color, opacity },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.snackbarText}>{snackbarState.message}</Text>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  snackbarContainer: {
    position: "absolute",
    bottom: 8,
    left: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  iconContainer: {
    marginLeft: 8,
  },
  snackbarText: {
    color: "#ffffff",
    fontSize: 14,
    textAlign: "right",
  },
});
