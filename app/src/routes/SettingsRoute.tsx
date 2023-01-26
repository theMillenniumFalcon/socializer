import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Settings from "../screens/profile/Settings"

const Stack = createStackNavigator()

const SettingsRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="settings_index" component={Settings} />
        </Stack.Navigator>
    )
}

export default SettingsRoute