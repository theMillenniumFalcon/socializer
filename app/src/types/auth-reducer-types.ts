export interface UserType {
    id?: string
    username: string
    name: {
        first: string
        last: string
    }
    email: string
    password: string
    role: string
    date_of_birth?: string | undefined
    profile_picture?: string | undefined
    profile_banner?: string | undefined
}

export interface AuthType {
    isAuth: boolean
    token: string | null
    user: UserType | null
}

const SIGNIN = "signin"
const SIGNUP = "signup"
const LOGOUT = "logout"
const ERROR = "error"
const UPDATE_USER = "update_user"

interface SignInAction {
    type: typeof SIGNIN
    payload: AuthType
}

interface SignUpAction {
    type: typeof SIGNUP
    payload: AuthType
}

interface LogoutAction {
    type: typeof LOGOUT
}

interface ERRORACTION {
    type: typeof ERROR
}

interface UPDATEUSER {
    type: typeof UPDATE_USER
    payload: UserType
}
export type AuthActions =
    | SignInAction
    | SignUpAction
    | LogoutAction
    | ERRORACTION
    | UPDATEUSER