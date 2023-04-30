import { Provider } from "react-redux";
import { store } from "./src/redux/store";

import { Provider as PaperProvider } from "react-native-paper";

import { configureAmplify } from "./amplify";

// import * as Localization from 'expo-localization';
// import i18n from 'i18n-js';
import { I18nManager } from "react-native";

import en from "./src/i18n/en.json";
import he from "./src/i18n/he.json";

import Main from "./src/screens/Main";

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

export default function App() {
  configureAmplify();

  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
      </PaperProvider>
    </Provider>
  );
}
