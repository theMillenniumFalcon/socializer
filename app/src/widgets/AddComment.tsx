import React, { useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { Modal, TouchableOpacity, FlatList } from "react-native"
import { Feather } from "@expo/vector-icons"
import { io } from "socket.io-client"

import { CommentHeader, CommentWrap, Comment, CommentBox, CommentInput } from "../styles/post.stc"
import { TextSTC } from "../styles/global.stc"
import { formatNumbers } from "../utils/utils"
import { PostType } from "../types/post-reducer-types"
import { AppState } from "../store"
import { addComment } from "../store/actions/post-action"
import { POST_SERVER } from "../configs/constants"

interface Props extends RXProps {
    comments: {
        uid: string
        body: string
    }[]
    visiblity: any
    post: PostType
}

const AddComment = ({
    comments,
    visiblity,
    post,
    user,
    token,
    dispatchComment,
    uppost,
}: Props) => {
    const [body, setBody] = useState("")

    const renderComment = ({
        item,
    }: {
        item: {
            uid: string
            body: string
        }
    }) => (
        <Comment>
            <TextSTC size="14px">{item.body}</TextSTC>
        </Comment>
    )
    const socket = io(POST_SERVER, { reconnectionAttempts: 10 })

    const handleComment = async () => {
        try {
            const result = await addComment(
                {
                    pid: post.id,
                    uid: user?.id,
                    body: body,
                },
                token
            )
            if (result) {
                dispatchComment({
                    post_id: post.id,
                    body: {
                        uid: user?.id,
                        body: body,
                    },
                })
                socket.emit("get-posts")
                socket.on("get-posts", (data) => {
                    uppost(data)
                })
            } else {
                alert("Failed to post comment")
            }
        } catch (error) {
            alert("error from handlecomment")
        }
    }
    return (
        <Modal visible={visiblity.getter} transparent={false} animationType="slide">
            <CommentWrap>
                <CommentHeader>
                    <TextSTC family="med" size="18px">
                        Comments {formatNumbers(comments.length)}
                    </TextSTC>
                    <TouchableOpacity onPress={() => visiblity.setter(false)}>
                        <Feather name="x" size={30} color="#272729" />
                    </TouchableOpacity>
                </CommentHeader>
                <FlatList<{
                    uid: string
                    body: string
                }>
                    style={{ width: "100%" }}
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderComment}
                />
                <CommentBox>
                    <CommentInput
                        multiline
                        value={body}
                        onChangeText={(text: any) => setBody(text)}
                        placeholder="Comment"
                        placeholderTextColor="#272729"
                    />
                    <TouchableOpacity onPress={handleComment}>
                        <Feather name="send" size={30} color="#272729" />
                    </TouchableOpacity>
                </CommentBox>
            </CommentWrap>
        </Modal>
    )
}

const mapDispatch = {
    dispatchComment: (data: {
        post_id: string
        body: {
            uid: string | undefined
            body: string
        }
    }) => ({ type: "comment-post", payload: data }),

    uppost: (data: PostType[]) => ({
        type: "up-post-list",
        payload: data,
    }),
}
const mapState = (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token,
})
const connector = connect(mapState, mapDispatch)

type RXProps = ConnectedProps<typeof connector>

export default connector(AddComment)