
import styled from "styled-components/native"

export const EditPostWrap = styled.SafeAreaView`
  width: 100%
  height: 100%
  background-color: #fff
`

export const Header = styled.View`
  width: 100%
  height: 60px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  background-color: #fff
`

export const LargeInput = styled.TextInput`
  width: 100%
  background-color: #fff
  padding: 15px 20px
  color: #272729
  font-family: "med"
  font-size: 18px
`

export const ButtonWrap = styled.View`
  width: 100%
  padding: 20px 25px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: flex-start
`
export const FileUpload = styled.TouchableOpacity`
  width: 50px
  height: 50px
  border-radius: 10px
  background-color: #272729
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
`

export const IMG = styled.Image`
  margin-left: 25px
  margin-top: 20px
  width: 120px
  height: 120px
  border-radius: 10px
`

// POST INDEX

export const FeedWrap = styled.FlatList`
  width: 100%
  height: 100%
  background-color: #fff
`

export const ImageBG = styled.ImageBackground`
  width: 100%
  height: 800px
  position: relative
`

export const UserInfo = styled.View`
  position: absolute
  top: 30px
  left: 5%
  background-color: #272729
  opacity: 0.8
  height: 80px
  border-radius: 500px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  padding: 15px
`
export const UserDP = styled.Image`
  width: 60px
  height: 60px
  border-radius: 80px
  margin-right: 20px
`
export const ActionButtonWrap = styled.View`
  position: absolute
  bottom: 5%
  right: 5%
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
  background-color: #000
  opacity: 0.8
  padding: 10px
  width: 60px
  height: 200px
  border-radius: 100px
`

export const BodyWrap = styled.View`
  position: absolute
  bottom: 5%
  left: 5%
  padding: 20px 15px
  background-color: #000
  opacity: 0.8
  width: 60%
  border-radius: 10px
`

export const CommentWrap = styled.View`
  width: 100%
  height: 100%
  background-color: #f7f7f7
`

export const CommentHeader = styled.View`
  width: 100%
  height: 60px
  padding: 10px 5%
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
`

export const CommentBox = styled.View`
  width: 100%
  padding: 0 5%
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
`

export const CommentList = styled.FlatList`
  width: 100%
`

export const Comment = styled.View`
  width: 70%
  margin: 10px 5%
  background-color: #fefefe
  border-radius: 10px
  padding: 15px
`

export const CommentInput = styled.TextInput`
  width: 70%
  padding: 25px 15px
  font-family: "med"
  color: #272729
`

// Post Grid

export const PostIMG = styled.Image`
  /* flex: 1 */
  margin: 5px
  min-width: 120px
  max-width: 150px
  height: 120px
  max-height: 125px
  border-radius: 10px
`