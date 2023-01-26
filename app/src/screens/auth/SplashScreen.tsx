import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"

import { FullScreenCol, Img, TextSTC } from "../../styles/global.stc"
import { ButtonSPLASH } from "../../styles/splash-screen.stc"
import { BaseRouteType } from "../../types/route-types"

interface Props {
    navigation: StackNavigationProp<BaseRouteType, "splash">
}

const SplashScreen = ({ navigation }: Props) => {
    return (
        <FullScreenCol>
            <Img source={require("../../images/splash_logo.png")} w="90%" h="209px" />
            <ButtonSPLASH onPress={() => navigation.navigate("signup")}>
                <TextSTC color="#fff" family="bold">
                    GET STARTED
                </TextSTC>
            </ButtonSPLASH>
        </FullScreenCol>
    )
}

export default SplashScreen