import React, { useState, useEffect } from 'react'
import { StatusBar, Modal, TouchableOpacity, Platform } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { io } from 'socket.io-client'

import { EditPostWrap, Header, LargeInput, ButtonWrap, FileUpload, IMG } from '../../styles/post.stc'
import { TextSTC, ButtonSTC } from '../../styles/global.stc'
import { DialogWrap, UploadWrap, UploadButton, DialogActions } from '../../styles/profile.stc'
import { createPost } from '../../store/actions/post-action'
import { AppState } from '../../store'
import { PostType } from '../../types/post-reducer-types'
import { POST_SERVER } from '../../configs/constants'

interface Props extends RXProps { }

const AddPost = ({ user, addPost }: Props) => {
    const socket = io(POST_SERVER, {
        reconnectionAttempts: 15,
    })
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

    const [body, setBody] = useState<string>('')
    const [postType, setPostType] = useState<string>('')
    const [showPModal, setPModal] = useState<boolean>(false)
    const [showVModal, setVModal] = useState<boolean>(false)
    const [filePath, setFIlePath] = useState<string>('')

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        })

        if (!result.canceled) {
            setFIlePath(result.assets[0].uri)
            setPModal(false)
            setPostType('photo')
        }
    }

    const pickVideo = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        })

        if (!result.canceled) {
            setFIlePath(result.assets[0].uri)
            setVModal(false)
            setPostType('video')
        }
    }

    const handleSubmit = async () => {
        const result = await createPost({
            uid: user.user?.id,
            body: body,
            post_type: postType,
            file_uri: filePath
        }, user.token)

        if (result) {
            addPost(result)
            if (socket) {
                socket.emit('create-post', result)
            }
        }
    }

    const renderPhotoModal = (visibility: boolean, setvibility: any, type: string, picker: any) => (
        <Modal
            animationType='slide'
            visible={visibility}
            transparent={true}
        >
            <DialogWrap>
                <UploadWrap>
                    <UploadButton onPress={() => picker()}>
                        <Feather color='#002d57' name={type == 'photo' ? 'image' : 'video'} size={30} />
                        <TextSTC style={{ marginTop: 15 }} family='med' >
                            {type == 'photo' ? 'Select Picture' : 'Select Video'}
                        </TextSTC>
                    </UploadButton>
                </UploadWrap>
                <DialogActions>
                    <TouchableOpacity onPress={() => setvibility(false)}>
                        <TextSTC family='med'>
                            Close
                        </TextSTC>
                    </TouchableOpacity>
                </DialogActions>
            </DialogWrap>
        </Modal>
    )
    return (
        <>
            <StatusBar backgroundColor='#fff' barStyle='dark-content' />
            <EditPostWrap>
                <Header>
                    <TextSTC family='bold' size='18px'>
                        ADD POST
                    </TextSTC>
                </Header>
                <LargeInput
                    multiline
                    placeholder='Whanna say something?'
                    placeholderTextColor='#ff2525' maxLength={320}
                    value={body}
                    onChangeText={(text) => setBody(text)} />
                <ButtonWrap>
                    <FileUpload onPress={() => setPModal(true)}>
                        <Feather name='camera' color='#fff' size={24} />
                    </FileUpload>
                    <FileUpload style={{ marginLeft: 20 }} onPress={() => setVModal(true)}>
                        <Feather name='video' color='#fff' size={24} />
                    </FileUpload>
                </ButtonWrap>
                {
                    filePath.length < 2 ? <IMG source={require('../../images/blank-bg.png')} /> : <IMG source={{ uri: filePath }} />
                }
                {renderPhotoModal(showPModal, setPModal, 'photo', pickImage)}
                {renderPhotoModal(showVModal, setVModal, 'video', pickVideo)}
                <ButtonSTC style={{
                    position: 'absolute',
                    bottom: 15,
                    left: '10%'
                }}
                    onPress={handleSubmit}
                >
                    <TextSTC family='med' color='#fff'>POST</TextSTC>
                </ButtonSTC>
            </EditPostWrap>
        </>
    )
}

const mapState = (state: AppState) => ({
    user: state.auth
})

const mapDispatch = {
    addPost: (data: PostType) => ({
        type: 'add-post',
        payload: data
    })
}
const connector = connect(mapState, mapDispatch)

type RXProps = ConnectedProps<typeof connector>
export default connector(AddPost)