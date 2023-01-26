import { UserType } from "./auth-reducer-types"
import { PostType } from "./post-reducer-types"

export type BaseRouteType = {
    home: undefined
    splash: undefined
    signup: undefined
    signin: undefined
}

export type HomeRouteType = {
    feed: undefined
    search: undefined
    post: undefined
    noti: undefined
    profile: undefined
}

export type ProfileRouteType = {
    profile_index: undefined
    profile_edit: undefined
    settings: undefined
    single_post: {
        post: PostType
        user: UserType | null
    }
    store: undefined
}

export type SettingRouteType = {
    settings_index: undefined
}

export type StoreRouteType = {
    store_index: undefined
    add_product: undefined
}