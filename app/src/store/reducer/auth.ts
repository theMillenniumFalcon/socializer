import { AuthType, AuthActions } from "../../types/auth-reducer-types"

const initState: AuthType = {
    isAuth: false,
    token: null,
    user: null,
}

export const AuthReducer = (
    state = initState,
    action: AuthActions
): AuthType => {
    switch (action.type) {
        case "signin":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case "signup":
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case "logout":
            return {
                ...state,
                isAuth: false,
                token: null,
                user: null,
            }
        case "error":
            return {
                ...state,
                isAuth: false,
                token: null,
                user: null,
            }
        case "update_user":
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state
    }
}