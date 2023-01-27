import React, { useState, useEffect } from "react"
import { TouchableOpacity, Platform } from "react-native"
import { View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import DateTimePicker from "@react-native-community/datetimepicker"
import { Feather } from "@expo/vector-icons"
import { Modal } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { ProfileEditCon, Header, DialogWrap, UploadWrap, UploadButton, DialogActions } from "../../styles/profile.stc"
import { TextSTC, InputSTC } from "../../styles/global.stc"
import { ButtonsContainer, NavButton } from "../../styles/profile.stc"
import { AppState } from "../../store"
import { UserType } from "../../types/auth-reducer-types"
import { updateUser, uploadBanner, uploadDP } from "../../store/actions/auth-actions"

interface Props extends RXProps { }

const ProfileEdit = ({ user, updateData, token }: Props) => {

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!')
                }
            }
        })()
    }, [])

    const [inputs, setInputs] = useState({
        first: user?.name.first,
        last: user?.name.last,
        dob: user?.date_of_birth ? new Date(user.date_of_birth) : new Date(),
    })

    const [pickerShow, setShow] = useState(false)

    const [isDisabled, setisDisabled] = useState(
        inputs.last != user?.name.last ||
        inputs.first != user?.name.first ||
        inputs.dob != new Date(user?.date_of_birth as any)
    )

    const [photoModalVisible, setPModalVisible] = useState<boolean>(false)
    const [bannerModalVisible, setBModalVisible] = useState<boolean>(false)

    const [dp, setDp] = useState('')
    const [banner, setBanner] = useState('')

    const pickImage = async (type: string) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: type == 'dp' ? [4, 3] : [21, 9],
            quality: 1,
        })

        if (!result.canceled) {
            if (type == 'dp') {
                setDp(result.assets[0].uri)
            } else {
                setBanner(result.assets[0].uri)
            }
        }
    }

    // PROFILE IMAGE
    const saveDP = async () => {
        const result = await uploadDP({
            id: user?.id,
            image_uri: dp
        }, token)

        if (result) {
            updateData(result)
            setPModalVisible(false)
        } else {
            console.log('ERROR DP', result)
        }
    }

    // BANNER IMAGE
    const saveBanner = async () => {
        const result = await uploadBanner({
            id: user?.id,
            image_uri: banner
        }, token)

        if (result) {
            updateData(result)
            setBModalVisible(false)
        } else {
            console.log('ERROR BANNER', result)
        }
    }

    const handleSave = async () => {
        try {
            const result = await updateUser({ ...inputs, id: user?.id }, token)
            if (result) {
                updateData(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const renderPhotoModal = (visibility: boolean, setvibility: any, type: string, onSave: any) => (
        <Modal
            animationType='slide'
            visible={visibility}
            transparent={true}
        >
            <DialogWrap>
                <UploadWrap>
                    {/* <UploadButton>
            <Feather color='#002d57' name='camera' size={30} />
            <TextSTC style={{ marginTop: 15 }} family='med'>
              Take Picture
            </TextSTC>
          </UploadButton> */}
                    <UploadButton onPress={() => pickImage(type)}>
                        <Feather color='#002d57' name='image' size={30} />
                        <TextSTC style={{ marginTop: 15 }} family='med'>
                            Select Picture
                        </TextSTC>
                    </UploadButton>
                </UploadWrap>
                <DialogActions>
                    <TouchableOpacity onPress={() => setvibility(false)}>
                        <TextSTC style={{ marginLeft: 15, marginRight: 60 }} family='med'>
                            Close
                        </TextSTC>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onSave()}>
                        <TextSTC style={{ marginLeft: 60, marginRight: 15 }} family='med'>
                            Save
                        </TextSTC>
                    </TouchableOpacity>
                </DialogActions>
            </DialogWrap>
        </Modal>
    )
    return (
        <ProfileEditCon>
            <Header>
                <TextSTC size="24px" family="semi">
                    Update Profile
                </TextSTC>
                <TouchableOpacity
                    disabled={!isDisabled}
                    onPress={async () => await handleSave()}
                >
                    <TextSTC color="#ff2d55" family="bold">
                        Save
                    </TextSTC>
                </TouchableOpacity>
            </Header>
            <ButtonsContainer>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <TextSTC family="med">Email</TextSTC>
                    <TextSTC>{user?.email}</TextSTC>
                </View>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <TextSTC family="med">Username</TextSTC>
                    <TextSTC>#{user?.username}</TextSTC>
                </View>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <TextSTC family="med">First Name</TextSTC>
                    <InputSTC
                        style={{ width: "45%" }}
                        value={inputs.first}
                        onChangeText={(text) => setInputs({ ...inputs, first: text })}
                    />
                </View>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <TextSTC family="med">Last Name</TextSTC>
                    <InputSTC
                        style={{ width: "45%" }}
                        value={inputs.last}
                        onChangeText={(text) => setInputs({ ...inputs, last: text })}
                    />
                </View>
                <View
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        padding: 20,
                        justifyContent: "space-between",
                    }}
                >
                    <TextSTC family="med">Birth Day</TextSTC>
                    {pickerShow && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={inputs.dob}
                            mode="date"
                            is24Hour={true}
                            display="calendar"
                            onChange={(event, selectedDate) => {
                                const currentDate = selectedDate || inputs.dob
                                setShow(false)
                                setInputs({ ...inputs, dob: currentDate })
                            }}
                        />
                    )}
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <TextSTC>{inputs.dob.toISOString().substring(0, 10)}</TextSTC>
                    </TouchableOpacity>
                </View>
            </ButtonsContainer>
            <ButtonsContainer style={{ marginTop: 15 }}>
                <NavButton onPress={() => setPModalVisible(true)}>
                    <TextSTC family='med'>
                        {user?.profile_picture ? 'Update Profile Picture' : 'Add Profile Picture'}
                    </TextSTC>
                    <Feather name='chevron-right' size={24} color='#272729' />
                </NavButton>
                <NavButton onPress={() => setBModalVisible(true)}>
                    <TextSTC family='med'>
                        {user?.profile_banner ? 'Update Banner Picture' : 'Add Banner Picture'}
                    </TextSTC>
                    <Feather name='chevron-right' size={24} color='#272729' />
                </NavButton>
            </ButtonsContainer>
            {renderPhotoModal(photoModalVisible, setPModalVisible, 'dp', saveDP)}
            {renderPhotoModal(bannerModalVisible, setBModalVisible, 'banner', saveBanner)}
        </ProfileEditCon>
    )
}

const mapState = (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token,
})

const mapDispatch = {
    updateData: (data: UserType) => ({
        type: "update_user",
        payload: data,
    }),
}
const connector = connect(mapState, mapDispatch)

type RXProps = ConnectedProps<typeof connector>

export default connector(ProfileEdit)