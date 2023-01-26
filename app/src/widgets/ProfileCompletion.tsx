import React from "react"
import { connect, ConnectedProps } from "react-redux"
import { TouchableOpacity } from "react-native-gesture-handler"

import { AppState } from "../store"
import { BarContainer } from "../styles/profile-completion.stc"
import { TextSTC } from "../styles/global.stc"

interface Props extends RXProps {
    navigation: any
}

const ProfileCompletion = ({ navigation, user }: Props) => {
    if (user && !user.profile_picture) {
        return (
            <BarContainer>
                <TouchableOpacity onPress={() => navigation.navigate("profile")}>
                    <TextSTC color="#fff" family="med">
                        Please complete your profile here
                    </TextSTC>
                </TouchableOpacity>
            </BarContainer>
        )
    } else {
        return <></>
    }
}
const mapState = (state: AppState) => ({
    user: state.auth.user,
})

const connector = connect(mapState)

type RXProps = ConnectedProps<typeof connector>

export default connector(ProfileCompletion)