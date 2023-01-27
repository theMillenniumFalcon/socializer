import { StackNavigationProp } from "@react-navigation/stack"
import axios from "axios"
import React, { useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { TouchableOpacity } from "react-native"

import { API_ENDPOINT } from "../../configs/constants"
import { signUpUser } from "../../store/actions/auth-actions"
import { FullScreenCol, TextSTC, InputSTC, ButtonSTC } from "../../styles/global.stc"
import { UserType } from "../../types/auth-reducer-types"
import { BaseRouteType } from "../../types/route-types"

interface Props extends RXProps {
    navigation: StackNavigationProp<BaseRouteType, "signup">
}
const Signup = ({ navigation, createUser, signupError }: Props) => {
    const [user, setUser] = useState<UserType>({
        username: "",
        email: "",
        password: "",
        role: "USER",
        name: {
            first: "",
            last: "",
        },
    })
    const [step, setStep] = useState<number>(0)

    const fixUsername = (text: string): string => {
        let username = text.toLowerCase()
        let items = username.split(" ")
        username = ""
        items.map((item) => (username = username + item))
        return username
    }

    const validateUsername = async () => {
        setUser({ ...user, username: fixUsername(fixUsername(user.username)) })
        const url = API_ENDPOINT + `auth/validate-username/${user.username}`
        console.log(url)

        try {
            const check = await axios.get(url)

            console.log(check)

            if (!check.data.userExist && user.username.length >= 3) {
                setStep(step + 1)
            }
        } catch (error) {
            throw error
        }
    }

    const renderForm = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <InputSTC
                            gap="20px 0"
                            value={user.username}
                            onChangeText={(text) => setUser({ ...user, username: text })}
                            placeholder="Choose username"
                        />
                        <ButtonSTC onPress={async () => await validateUsername()}>
                            <TextSTC color="#fff" family="bold" size="18px">
                                Next
                            </TextSTC>
                        </ButtonSTC>
                    </>
                )
            case 1:
                return (
                    <>
                        <InputSTC
                            gap="20px 0"
                            value={user.name.first}
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    name: {
                                        ...user.name,
                                        first: text,
                                    },
                                })
                            }
                            placeholder="First Name"
                        />
                        <InputSTC
                            gap="20px 0"
                            value={user.name.last}
                            onChangeText={(text) =>
                                setUser({
                                    ...user,
                                    name: {
                                        ...user.name,
                                        last: text,
                                    },
                                })
                            }
                            placeholder="Last Name"
                        />
                        <ButtonSTC onPress={() => setStep(step + 1)}>
                            <TextSTC color="#fff" family="bold" size="18px">
                                Next
                            </TextSTC>
                        </ButtonSTC>
                    </>
                )
            case 2:
                return (
                    <>
                        <InputSTC
                            gap="20px 0"
                            value={user.email}
                            onChangeText={(text) => setUser({ ...user, email: text })}
                            placeholder="Email"
                        />
                        <InputSTC
                            gap="20px 0"
                            value={user.password}
                            secureTextEntry={true}
                            onChangeText={(text) => setUser({ ...user, password: text })}
                            placeholder="Password"
                        />
                        <ButtonSTC
                            onPress={async () => {
                                const done = await signUpUser(user)
                                if (done) {
                                    createUser(done.token, done.user)
                                } else {
                                    signupError()
                                }
                            }}
                        >
                            <TextSTC color="#fff" family="bold" size="18px">
                                SIGN UP
                            </TextSTC>
                        </ButtonSTC>
                    </>
                )
            default:
                return (
                    <>
                        <InputSTC
                            gap="20px 0"
                            value={user.username}
                            onChangeText={(text) => setUser({ ...user, username: text })}
                            placeholder="Choose username"
                        />
                        <ButtonSTC onPress={async () => await validateUsername()}>
                            <TextSTC color="#fff" family="bold" size="18px">
                                Next
                            </TextSTC>
                        </ButtonSTC>
                    </>
                )
        }
    }

    return (
        <FullScreenCol>
            <TextSTC color="#272729" size="48px" family="bold">
                SIGN UP
            </TextSTC>
            {renderForm()}
            <TextSTC
                color="#272729"
                size="18px"
                family="norm"
                style={{ marginTop: 15 }}
            >
                Already a member?
            </TextSTC>
            <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                <TextSTC color="#2929e7" size="18px" family="bold">
                    SIGN IN
                </TextSTC>
            </TouchableOpacity>
        </FullScreenCol>
    )
}

const mapDispatch = {
    createUser: (token: string, user: UserType) => ({
        type: "signin",
        payload: {
            token: token,
            user: user,
        },
    }),

    signupError: () => ({
        type: "error",
    }),
}
const connector = connect(null, mapDispatch)

type RXProps = ConnectedProps<typeof connector>
export default connector(Signup)