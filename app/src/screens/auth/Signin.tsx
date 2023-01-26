import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

import { UserType } from "../../types/auth-reducer-types"

const Signin = () => {
    return (
        <></>
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