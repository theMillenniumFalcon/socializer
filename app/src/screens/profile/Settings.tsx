import React from "react"
import { Feather } from "@expo/vector-icons"
import { connect, ConnectedProps } from "react-redux"
import { StackNavigationProp } from "@react-navigation/stack"
import { StatusBar } from "react-native"

import { SContainer, ButtonsContainer, NavButton } from "../../styles/profile.stc"
import { TextSTC } from "../../styles/global.stc"
import { SettingRouteType } from "../../types/route-types"

interface Props extends RXProps {
    navigation: StackNavigationProp<SettingRouteType, "settings_index">
}

const Settings = ({ navigation, logout }: Props) => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <SContainer>
                <ButtonsContainer>
                    <NavButton>
                        <TextSTC family="med">Community Guideline</TextSTC>
                        <Feather name="chevron-right" size={24} color="#272729" />
                    </NavButton>
                    <NavButton>
                        <TextSTC family="med">Terms Of Use</TextSTC>
                        <Feather name="chevron-right" size={24} color="#272729" />
                    </NavButton>
                    <NavButton>
                        <TextSTC family="med">Privacy Policy</TextSTC>
                        <Feather name="chevron-right" size={24} color="#272729" />
                    </NavButton>
                    <NavButton>
                        <TextSTC family="med">Copyright Policy</TextSTC>
                        <Feather name="chevron-right" size={24} color="#272729" />
                    </NavButton>
                </ButtonsContainer>
                <ButtonsContainer style={{ paddingTop: 0 }}>
                    <NavButton onPress={() => logout()}>
                        <TextSTC family="med">Logout</TextSTC>
                        <Feather name="log-out" size={24} color="#272729" />
                    </NavButton>
                </ButtonsContainer>
            </SContainer>
        </>
    )
}

const mapDispatch = {
    logout: () => ({
        type: "logout",
    }),
}

const connector = connect(null, mapDispatch)

type RXProps = ConnectedProps<typeof connector>

export default connector(Settings)