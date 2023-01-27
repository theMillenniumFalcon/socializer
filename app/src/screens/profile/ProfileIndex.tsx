import React, { useEffect, useState } from "react"
import { StatusBar, TouchableOpacity, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { Entypo, Feather } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"

import { AppState } from "../../store"
import { MainView, TopSection, TopIcons, UserInfo, UserImage, NoImage, Counters, Counts } from "../../styles/profile.stc"
import { TextSTC } from "../../styles/global.stc"
import { ProfileRouteType } from "../../types/route-types"
import ProfileCompletion from "../../widgets/ProfileCompletion"
import { PostType } from "../../types/post-reducer-types"
import { getUserPost } from "../../store/actions/post-action"
import { calculateLikes, formatNumbers } from "../../utils/utils"
import PostGrid from "../../widgets/PostGrid"

interface Props extends RXProps {
    navigation: StackNavigationProp<ProfileRouteType, "profile_index">
}

const ProfileIndex = ({
    navigation,
    user,
    updateUserPost,
    posts,
    token,
}: Props) => {
    const [likesCount, setLCount] = useState(0)

    useEffect(() => {
        (async () => {
            const result = await getUserPost(user?.id, token)
            if (result) {
                updateUserPost(result)
                setLCount(formatNumbers(calculateLikes(result)))
            } else {
                alert("No post found")
            }
        })()
    }, [])

    return (
        <>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <MainView>
                <ProfileCompletion navigation={navigation} />
                <TopSection
                    source={
                        user && user.profile_banner
                            ? { uri: user.profile_banner }
                            : require("../../images/profile-banner.jpg")
                    }
                >
                    <TopIcons>
                        <TouchableOpacity onPress={() => navigation.navigate("store")}>
                            <Entypo name="shop" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="message-circle" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("profile_edit")}
                        >
                            <Feather name="edit" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("settings")}>
                            <Feather name="settings" size={24} color="#fff" />
                        </TouchableOpacity>
                    </TopIcons>

                    <UserInfo>
                        {user && user.profile_picture ? (
                            <UserImage source={{ uri: user.profile_picture }} />
                        ) : (
                            <TouchableOpacity>
                                <NoImage>
                                    <Feather name="user" size={30} color="#fff" />
                                </NoImage>
                            </TouchableOpacity>
                        )}
                        <View
                            style={{
                                marginLeft: 20,
                            }}
                        >
                            <TextSTC color="#fff" size="20px" family="bold">
                                {user?.name.first} {user?.name.last}
                            </TextSTC>
                            <TextSTC color="#fff" size="20px" family="bold">
                                #{user?.username}
                            </TextSTC>
                        </View>
                    </UserInfo>
                    <Counters>
                        <Counts>
                            <TextSTC color="#fff" size="20px" family="semi">
                                0
                            </TextSTC>
                            <TextSTC color="#fff">Following</TextSTC>
                        </Counts>
                        <Counts>
                            <TextSTC color="#fff" size="20px" family="semi">
                                0
                            </TextSTC>
                            <TextSTC color="#fff">Follower</TextSTC>
                        </Counts>
                        <Counts>
                            <TextSTC color="#fff" size="20px" family="semi">
                                {likesCount}
                            </TextSTC>
                            <TextSTC color="#fff">Likes</TextSTC>
                        </Counts>
                    </Counters>
                </TopSection>
                {posts && <PostGrid navigation={navigation} posts={posts} />}
            </MainView>
        </>
    )
}

const mapSatte = (state: AppState) => ({
    user: state.auth.user,
    token: state.auth.token,
    posts: state.user_posts,
})

const mapDispatch = {
    updateUserPost: (data: PostType[]) => ({
        type: "get-user-post",
        payload: data,
    }),
}
const connector = connect(mapSatte, mapDispatch)

type RXProps = ConnectedProps<typeof connector>

export default connector(ProfileIndex)