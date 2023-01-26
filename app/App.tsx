import "react-native-gesture-handler"
import React from "react"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "./src/store"
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins"
import AppLoading from "expo-app-loading"
import BaseRoute from "./src/routes/BaseRoute"

export default function App() {
  let [fontloaded] = useFonts({
    norm: Poppins_400Regular,
    semi: Poppins_600SemiBold,
    med: Poppins_500Medium,
    bold: Poppins_700Bold,
  })

  if (!fontloaded) {
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <BaseRoute />
        </PersistGate>
      </Provider>
    )
  }
}