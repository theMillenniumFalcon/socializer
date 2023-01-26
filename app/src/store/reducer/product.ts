import { ProductType, ProductActions } from "../../types/product-reducer-type"

const initState = new Array<ProductType>()

export const ProductReducer = (
    state = initState,
    action: ProductActions
): ProductType[] => {
    switch (action.type) {
        case "get-prod":
            return [...action.payload]

        case "get-prod":
            return [...state, ...action.payload]
        case "update-prod":
            state.map((item) => {
                if (item.id == action.payload.id) {
                    item = action.payload
                }
            })

            return state
        case "delete-prod":
            return state.filter((item) => item.id != action.payload)
        default:
            return state
    }
}