import React, { useState, useEffect } from "react"
import { Feather } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { StatusBar, TouchableOpacity, Platform } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import * as ImagePicker from "expo-image-picker"

import { AppState } from "../../store"
import { ImageSelection, InputWrap, RowFields, SmallInput, StoreCon } from "../../styles/store.stc"
import { StoreRouteType } from "../../types/route-types"
import { InputSTC, ButtonSTC, TextSTC } from "../../styles/global.stc"

interface Props extends RXProps {
    navigation: StackNavigationProp<StoreRouteType, "add_product">
}

const AddProduct = ({ user, token, navigation }: Props) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!")
                }
            }
        })()
    }, [])

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0.0,
        image_url: "",
        uid: user?.id,
    })

    const handleTextChange = (key: string, value: string) => {
        if (key == "price") {
            setProduct({ ...product, price: parseFloat(value) })
        } else {
            setProduct({ ...product, [key]: value })
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setProduct({ ...product, image_url: result.assets[0].uri })
        }
    }

    const handleSubmit = () => { }

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <StoreCon>
                <RowFields>
                    <TouchableOpacity onPress={pickImage}>
                        <ImageSelection
                            source={
                                product.image_url.length < 2
                                    ? require("../../images/image-field.png")
                                    : { uri: product.image_url }
                            }
                            imageStyle={{ borderRadius: 10 }}
                        >
                            <Feather name="plus" size={24} color="#272729" />
                        </ImageSelection>
                    </TouchableOpacity>
                    <SmallInput
                        placeholder="Product Name"
                        placeholderTextColor="#e7e7e7e"
                        value={product.name}
                        onChangeText={(text) => handleTextChange("name", text)}
                    />
                </RowFields>
                <InputWrap>
                    <InputSTC
                        placeholderTextColor="#5a5a5a"
                        placeholder="Price"
                        keyboardType="numeric"
                        value={product.price.toString()}
                        onChangeText={(text) => handleTextChange("price", text)}
                    />
                    <InputSTC
                        multiline
                        style={{ marginTop: 20 }}
                        placeholder="Description"
                        placeholderTextColor="#272729"
                        value={product.description}
                        onChangeText={(text) => handleTextChange("description", text)}
                    />
                </InputWrap>
                <ButtonSTC
                    style={{
                        marginTop: 20,
                    }}
                    onPress={handleSubmit}
                >
                    <TextSTC color="#fff" size="18px" family="semi">
                        ADD PRODUCT
                    </TextSTC>
                </ButtonSTC>
            </StoreCon>
        </>
    )
}

const mapState = (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token,
})

const connector = connect(mapState)

type RXProps = ConnectedProps<typeof connector>

export default connector(AddProduct)