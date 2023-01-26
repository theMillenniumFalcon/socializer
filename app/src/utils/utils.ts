import { PostType } from "../types/post-reducer-types"

export const formatNumbers = (value: number): any => {
    let newValue: any = value
    if (value >= 1000) {
        let suffixes = ["", "k", "m", "b", "t"]
        let suffixNum = Math.floor(("" + value).length / 3)
        let shortValue: any = ""
        for (let precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat(
                (suffixNum != 0
                    ? value / Math.pow(1000, suffixNum)
                    : value
                ).toPrecision(precision)
            )
            let dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "")
            if (dotLessShortValue.length <= 2) {
                break
            }
        }
        if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
        newValue = shortValue + " " + suffixes[suffixNum]
    }
    return newValue
}

export const calculateLikes = (data: PostType[]): number => {
    try {
        let total = 0
        data.map((item) => (total = total + item.likes.length))
        return total
    } catch (error) {
        return 0
    }
}