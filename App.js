import { Provider, useSelector } from "react-redux";
import { store } from "./src/redux/store";

import { Provider as PaperProvider } from "react-native-paper";

import { configureAmplify } from "./amplify";

import { I18nManager } from "react-native";


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
