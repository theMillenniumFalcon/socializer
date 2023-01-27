import "react-native-gesture-handler"
import React, { useState, useEffect, useCallback } from "react"
import { View } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, useFonts } from "@expo-google-fonts/poppins"
import * as SplashScreen from 'expo-splash-screen'
import AppLoading from "expo-app-loading"

import BaseRoute from "./src/routes/BaseRoute"
import { persistor, store } from "./src/store"

export default function App() {
  // const [appIsReady, setAppIsReady] = useState(false)

  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await SplashScreen.preventAutoHideAsync()
  //       await new Promise(resolve => setTimeout(resolve, 2000))
  //     } catch (e) {
  //       console.warn(e)
  //     } finally {
  //       setAppIsReady(true)
  //     }
  //   }

  //   prepare()
  // }, [])

  let [fontloaded] = useFonts({
    norm: Poppins_400Regular,
    semi: Poppins_600SemiBold,
    med: Poppins_500Medium,
    bold: Poppins_700Bold,
  })

  // const onLayoutRootView = useCallback(async () => {
  //   if (appIsReady) {
  //     await SplashScreen.hideAsync()
  //   }
  // }, [appIsReady])

  if (!fontloaded) {
    return <AppLoading />
  } else {
    return (
      // <View onLayout={onLayoutRootView}>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <BaseRoute />
        </PersistGate>
      </Provider>
      // </View>
    )
  }
}