export interface ProductType {
    id: string
    name: string
    description: string
    price: number
    uid: string
    image_url: string
}

const ADD_PROD = "add-product"
const UPDATE_PROD = "update-prod"
const GET_PROD = "get-prod"
const DELETE_PROD = "delete-prod"

interface ADDPRODACTION {
    type: typeof ADD_PROD
    paylaod: ProductType
}

interface UPPRODACTION {
    type: typeof UPDATE_PROD
    payload: ProductType
}

interface DLPRODACTION {
    type: typeof DELETE_PROD
    payload: string
}

interface GETPRODACTION {
    type: typeof GET_PROD
    payload: ProductType[]
}

export type ProductActions =
    | ADDPRODACTION
    | UPPRODACTION
    | DLPRODACTION
    | GETPRODACTION