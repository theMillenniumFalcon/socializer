import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import StoreIndex from "../screens/store/StoreIndex"
import AddProduct from "../screens/store/AddProduct"

const Stack = createStackNavigator()

const StoreRoute = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="store_index" component={StoreIndex} />
            <Stack.Screen name="add_product" component={AddProduct} />
        </Stack.Navigator>
    )
}

export default StoreRoute