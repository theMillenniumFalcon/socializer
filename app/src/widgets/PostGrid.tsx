import React, { useState } from "react"
import { PostType } from "../types/post-reducer-types"
import { FlatList } from "react-native"
import { PostIMG } from "../styles/post.stc"
import { StackNavigationProp } from "@react-navigation/stack"
import { ProfileRouteType } from "../types/route-types"
import { TouchableOpacity } from "react-native"
import { AppState } from "../store"
import { connect, ConnectedProps } from "react-redux"
import { Video, AVPlaybackStatus } from "expo-av"
import { useRef } from "react"
interface Props extends RXProps {
    posts: PostType[]
    navigation: any
}

const PostGrid = ({ posts, navigation, user }: Props) => {
    const [status, setStatus] = useState({})
    const video = useRef(null)

    const renderPost = ({ item }: { item: PostType }) => {
        if (item.post_type == "photo") {
            return (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("single_post", {
                            post: item,
                            user: user,
                        })
                    }
                >
                    <PostIMG source={{ uri: item.file_url }} />
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity>
                    <Video
                        style={{
                            margin: 5,
                            minWidth: 120,
                            maxWidth: 150,
                            height: 120,
                            maxHeight: 125,
                            borderRadius: 10,
                        }}
                        ref={video}
                        source={{ uri: item.file_url }}
                        useNativeControls
                        resizeMode="cover"
                        isLooping
                        onPlaybackStatusUpdate={(status) => setStatus(status)}
                    />
                </TouchableOpacity>
            )
        }
    }

    return (
        <FlatList<PostType>
            style={{
                width: "100%",
                height: "30%",
                marginTop: 20,
                marginLeft: 10,
            }}
            contentContainerStyle={{
                justifyContent: "center",
                flexDirection: "column",
            }}
            numColumns={3}
            data={posts}
            keyExtractor={(item, index) => item.id}
            renderItem={renderPost}
        />
    )
}

const mapState = (state: AppState) => ({
    user: state.auth.user,
})

const connector = connect(mapState)

type RXProps = ConnectedProps<typeof connector>

export default connector(PostGrid)