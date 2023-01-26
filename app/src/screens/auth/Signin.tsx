import React, { useState } from "react"
import { connect, ConnectedProps } from "react-redux"

import { FullScreenCol, TextSTC, InputSTC, ButtonSTC } from "../../styles/global.stc"
import { UserType } from "../../types/auth-reducer-types"
import { TouchableOpacity } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { BaseRouteType } from "../../types/route-types"
import { signInUser } from "../../store/actions/auth-actions"

interface Props extends RXProps {
    navigation: StackNavigationProp<BaseRouteType, "signin">
}

const Signin = ({ validate, signinError, navigation }: Props) => {
    const [identi, setIdenti] = useState({
        identifier: "",
        password: "",
    })

    const handleSubmit = async () => {
        try {
            const result = await signInUser(identi)
            if (result) {
                validate(result.token, result.user)
            } else {
                signinError()
            }
        } catch (error) {
            signinError()
        }
    }

    return (
        <FullScreenCol>
            <TextSTC color="#272729" size="48px" family="bold">
                SIGN IN
            </TextSTC>
            <InputSTC
                style={{ marginBottom: 15 }}
                placeholder="Email or username"
                placeholderTextColor="#3a3a3b"
                value={identi.identifier}
                onChangeText={(text) => setIdenti({ ...identi, identifier: text })}
            />
            <InputSTC
                style={{ marginBottom: 15 }}
                placeholder="Password"
                placeholderTextColor="#272729"
                value={identi.password}
                onChangeText={(text) => setIdenti({ ...identi, password: text })}
                secureTextEntry={true}
            />
            <ButtonSTC onPress={async () => await handleSubmit()}>
                <TextSTC color="#fff" family="bold">
                    SIGNIN
                </TextSTC>
            </ButtonSTC>
            <TextSTC
                color="#272729"
                size="18px"
                family="norm"
                style={{ marginTop: 15 }}
            >
                Not a member?
            </TextSTC>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
                <TextSTC color="#2929e7" size="18px" family="bold">
                    SIGN UP
                </TextSTC>
            </TouchableOpacity>
        </FullScreenCol>
    )
}

const mapDispatch = {
    validate: (token: string, data: UserType) => ({
        type: "signin",
        payload: {
            token: token,
            user: data,
        },
    }),
    signinError: () => ({
        type: "error",
    }),
}

const connector = connect(null, mapDispatch)

type RXProps = ConnectedProps<typeof connector>

export default connector(Signin)