import axios from "axios"

import { API_ENDPOINT } from "../../configs/constants"
import { UserType } from "../../types/auth-reducer-types"

export const signUpUser = async (data: UserType) => {
    const url = API_ENDPOINT + "auth/signup"
    try {
        const result = await axios.post(url, {
            ...data,
        })

        if (result.status === 200) {
            return result.data
        } else {
            return null
        }
    } catch (error) {
        return false
    }
}

export const signInUser = async (data: {
    identifier: string
    password: string
}) => {
    const url = API_ENDPOINT + "auth/signin"
    try {
        const result = await axios.post(url, {
            ...data,
        })

        if (result.status === 200) {
            return result.data
        } else {
            return null
        }
    } catch (error) {
        return false
    }
}

export const updateUser = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `auth/update/${data.id}`

    try {
        const result = await axios.post(
            url,
            {
                name: {
                    first: data.first,
                    last: data.last,
                },
                date_of_birth: data.dob,
            },
            { headers: { Authorization: token } }
        )
        if (result.status === 200) {

            return result.data
        } else {
            return null
        }
    } catch (error) {
        return null
    }
}

export const uploadDP = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `auth/upload/dp/${data.id}`
    let uri = data.image_uri
    let uriParts = uri.split('.')
    let fileType = uri.split('.')[uri.split('.').length - 1]
    let formData = new FormData()
    formData.append('dp', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    })

    try {
        const result = await axios({
            url: url,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                Authorization: token,
                "Content-Type": "multipart/form-data"
            }
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


export const uploadBanner = async (data: any, token: string | null) => {
    const url = API_ENDPOINT + `auth/upload/banner/${data.id}`
    let uri = data.image_uri
    let fileType = uri.split('.')[uri.split('.').length - 1]
    let formData = new FormData()

    formData.append('banner', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    })

    try {
        const result = await axios({
            url: url,
            method: 'POST',
            data: formData,
            headers: {
                Accept: 'application/json',
                Authorization: token,
                "Content-Type": "multipart/form-data"
            }
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