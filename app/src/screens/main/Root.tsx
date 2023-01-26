import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import React, { PureComponent } from "react"
import { connect, ConnectedProps } from "react-redux"
import { StatusBar, FlatList } from "react-native"
import { io } from "socket.io-client"

import { FullScreenCol } from "../../styles/global.stc"
import { HomeRouteType } from "../../types/route-types"
import ProfileCompletion from "../../widgets/ProfileCompletion"

import { POST_SERVER } from "../../configs/constants"
import { AppState } from "../../store"
import { PostType } from "../../types/post-reducer-types"
import PostItem from "../../widgets/PostItem"

interface Props extends RXProps {
    navigation: BottomTabNavigationProp<HomeRouteType, "feed">
}
class Root extends PureComponent<Props> {
    socket = io(POST_SERVER, {
        reconnectionAttempts: 15,
    })

    renderItem = ({ item }: { item: PostType }) => (
        <PostItem post={item} user={this.props.user} />
    )

    componentDidMount() {
        this.socket.emit("get-posts")
        this.socket.on("get-posts", (data) => {
            this.props.uppost(data)
        })
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor="#fff" barStyle="dark-content" />
                <FullScreenCol>
                    <ProfileCompletion navigation={this.props.navigation} />
                    <FlatList<PostType>
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#fff",
                        }}
                        data={this.props.posts}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderItem}
                    />
                </FullScreenCol>
            </>
        )
    }
}
const mapDispatch = {
    uppost: (data: PostType[]) => ({
        type: "up-post-list",
        payload: data,
    }),
}
const mapState = (state: AppState) => ({
    posts: state.posts,
    user: state.auth.user,
})
const connector = connect(mapState, mapDispatch)
type RXProps = ConnectedProps<typeof connector>

export default connector(Root)