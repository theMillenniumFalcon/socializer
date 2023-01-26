import { PostType, USERPOSTACTION } from "../../types/post-reducer-types"

const initState = new Array<PostType>()

export const UserPostReducer = (
    state = initState,
    action: USERPOSTACTION
): PostType[] => {
    switch (action.type) {

        case "get-user-post":
            return action.payload
        default:
            return state
    }
}