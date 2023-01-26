import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import ProfileIndex from "../screens/profile/ProfileIndex"
import SettingsRoute from "./SettingsRoute"
import ProfileEditRoute from "./ProfileEditRoute"
import SinglePost from "../screens/post/SinglePost"
import StoreRoute from "./StoreRoute"

const Stack = createStackNavigator()

const ProfileRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile_index" component={ProfileIndex} />
            <Stack.Screen name="store" component={StoreRoute} />
            <Stack.Screen name="profile_edit" component={ProfileEditRoute} />
            <Stack.Screen name="settings" component={SettingsRoute} />
            <Stack.Screen name="single_post" component={SinglePost} />
        </Stack.Navigator>
    )
}

export default ProfileRoute