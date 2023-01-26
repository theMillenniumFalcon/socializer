import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { connect, ConnectedProps } from "react-redux"

import { AppState } from "../store"
import Signup from "../screens/auth/Signup"
import Signin from "../screens/auth/Signin"
import SplashScreen from "../screens/auth/SplashScreen"
import HomeRoute from "./HomeRoute"

const Stack = createStackNavigator()

interface Props extends ReduxProps { }

const BaseRoute = ({ auth }: Props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {auth ? (
                    <>
                        <Stack.Screen name="home" component={HomeRoute} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="splash" component={SplashScreen} />
                        <Stack.Screen name="signup" component={Signup} />
                        <Stack.Screen name="signin" component={Signin} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapState = (state: AppState) => ({
    auth: state.auth.isAuth,
})

const connector = connect(mapState)
type ReduxProps = ConnectedProps<typeof connector>

export default connector(BaseRoute)