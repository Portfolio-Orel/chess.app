import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import states from "../constants/states";
import Login from "./Login";
import Register from "./Register";
import OTPCodeInput from "../containers/OTPCodeInput";

import screens from "../constants/screens";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { checkAuthState } from "../redux/actions/auth";
import Content from "./Content";
import CustomSnackbar from "../components/Snackbar";

const Stack = createNativeStackNavigator();

export default function Main() {
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.authState);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (authState?.state === states.authorized) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authState]);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <CustomNavigator>
          <Stack.Screen
            name={screens.content.route}
            component={Content}
            options={{
              title: screens.content.title,
              headerTitleAlign: "right",
              headerTitleStyle: {
                writingDirection: "rtl",
              },
            }}
          />
        </CustomNavigator>
      ) : (
        <CustomNavigator>
          <Stack.Screen
            name={screens.login.route}
            component={Login}
            options={{
              title: screens.login.title,
              headerTitleAlign: "right",
              headerTitleStyle: {
                writingDirection: "rtl",
              },
            }}
          />
          <Stack.Screen
            name={screens.register.route}
            component={Register}
            options={{
              title: screens.register.title,
              headerTitleAlign: "right",
              headerTitleStyle: {
                writingDirection: "rtl",
              },
            }}
          />
          <Stack.Screen
            name={screens.otpInput.route}
            component={OTPCodeInput}
            options={{
              title: screens.otpInput.title,
              headerTitleAlign: "right",
              headerTitleStyle: {
                writingDirection: "rtl",
              },
            }}
          />
        </CustomNavigator>
      )}
      <CustomSnackbar />
    </NavigationContainer>
  );
}

const CustomNavigator = ({ children }) => {
  return (
    <RTLView>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {children}
      </Stack.Navigator>
    </RTLView>
  );
};

const RTLView = ({ children }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row-reverse" }}>{children}</View>
  );
};
