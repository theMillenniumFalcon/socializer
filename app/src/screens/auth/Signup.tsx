import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { UserType } from "../../types/auth-reducer-types"

const Signup = () => {
    return (
        <></>
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