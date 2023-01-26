import { PostType, PostActions } from "../../types/post-reducer-types"

const initState = new Array<PostType>()

export const PostReducer = (
    state = initState,
    action: PostActions
): PostType[] => {
    switch (action.type) {
        case "add-post":
            return [...state, action.payload]
        case "comment-post":
            state.map((item) => {
                if (item.id == action.payload.post_id) {
                    item.comments.push(action.payload.body)
                }
            })

            return state
        case "like-post":
            if (action.payload.type == "add") {
                state.map((item) => {
                    if (item.id == action.payload.post_id) {
                        item.likes.push(action.payload.uid)
                    }
                })
            } else {
                state.map((item) => {
                    item.likes = item.likes.filter((i) => i != action.payload.uid)
                })
            }
            return state

        case "delete-post":
            return state.filter((item) => item.id !== action.payload)

        case "up-post-list":
            return action.payload

        default:
            return state
    }
}