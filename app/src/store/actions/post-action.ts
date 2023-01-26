import axios from "axios"

import { API_ENDPOINT } from "../../configs/constants"

export const createPost = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `post`
    let uri = data.file_uri
    let fileType = uri.split(".")[uri.split(".").length - 1]

    let formData = new FormData()

    formData.append("post_file", {
        uri,
        name: `photo.${fileType}`,
        type: data.post_type == "photo" ? `image/${fileType}` : `video/${fileType}`,
    } as any)

    formData.append("uid", data.uid)
    formData.append("body", data.body)
    formData.append("post_type", data.post_type)

    try {
        const result = await axios({
            url: url,
            method: "POST",
            data: formData,
            headers: {
                Accept: "application/json",
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
        })
        if (result.status === 200) {
            return result.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const addLike = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `post/like/${data.pid}`
    try {
        const result = await axios.post(
            url,
            {
                uid: data.uid,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        return result.status
    } catch (error) {
        return null
    }
}

export const addComment = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `post/comment/${data.pid}`
    try {
        const result = await axios.post(
            url,
            {
                uid: data.uid,
                body: data.body,
            },
            {
                headers: {
                    Authorization: token,
                },
            }
        )
        if (result.status === 200) {
            return true
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const getUserPost = async (uid: string | undefined, token: string | null) => {
    try {
        const url = API_ENDPOINT + `post/user/${uid}`

        const result = await axios.get(url, {
            headers: {
                Authorization: token,
            },
        })

        if (result.status == 200) {
            return result.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}