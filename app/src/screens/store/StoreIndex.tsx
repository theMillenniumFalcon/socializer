import React from "react"
import { StatusBar } from "react-native"
import { Feather } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"

import { AddButton, StoreCon } from "../../styles/store.stc"
import { StoreRouteType } from "../../types/route-types"

interface Props {
    navigation: StackNavigationProp<StoreRouteType, 'store_index'>
}

const StoreIndex = ({ navigation }: Props) => {
    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <StoreCon>
                <AddButton onPress={() => navigation.navigate('add_product')}>
                    <Feather name="plus" color="#fff" size={30} />
                </AddButton>
            </StoreCon>
        </>
    )
}

export default StoreIndex