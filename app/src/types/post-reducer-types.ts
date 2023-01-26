import { UserType } from "./auth-reducer-types"

export interface PostType {
    id: string
    uid: UserType
    body: string
    post_type: string
    file_url: string
    likes: string[]
    comments: {
        uid: string
        body: string
    }[]
    product?: null | string
}

export interface PostReducerType {
    posts: [PostType]
}


const ADD_POST = 'add-post'
const DELETE_POST = 'delete-post'
const ADD_LIKE = 'like-post'
const ADD_COMMENT = 'comment-post'
const UPDATE_POST_LIST = 'up-post-list'

interface UPPostAction {
    type: typeof UPDATE_POST_LIST,
    payload: PostType[]
}
interface AddPostAction {
    type: typeof ADD_POST
    payload: PostType
}

interface DeletePostAction {
    type: typeof DELETE_POST
    payload: string
}

interface LikePostAction {
    type: typeof ADD_LIKE
    payload: {
        post_id: string
        uid: string
        type: string
    }
}

interface AddCommentAction {
    type: typeof ADD_COMMENT
    payload: {
        post_id: string
        body: {
            uid: string
            body: string
        }
    }
}


export type PostActions = AddPostAction | DeletePostAction | LikePostAction | AddCommentAction | UPPostAction


// USER POST

const GET_USER_POST = 'get-user-post'

interface GETUSERPOST {
    type: typeof GET_USER_POST
    payload: PostType[]
}

export type USERPOSTACTION = GETUSERPOST