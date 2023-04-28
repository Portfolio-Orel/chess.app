import { StyleSheet, View } from "react-native";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import { Provider as PaperProvider } from "react-native-paper";

import Register from "./src/screens/Register";
import { configureAmplify } from "./amplify";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  configureAmplify();

  return (
    <Provider store={store}>
      <PaperProvider>
        <View style={styles.container}>
          <Register />
        </View>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
