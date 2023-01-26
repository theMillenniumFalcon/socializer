import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ProfileEdit from "../screens/profile/ProfileEdit"

const Stack = createStackNavigator()

const ProfileEditRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile_edit_index" component={ProfileEdit} />
            <Stack.Screen name="profile_edit_dp" component={ProfileEdit} />
            <Stack.Screen name="profile_edit_banner" component={ProfileEdit} />
        </Stack.Navigator>
    )
}

export default ProfileEditRoute