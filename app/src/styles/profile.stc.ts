import styled from "styled-components/native"

export const MainView = styled.SafeAreaView`
  width: 100%
  height: 100%
  background-color: #fff
`

interface TopSectionProps { }

export const TopSection = styled.ImageBackground`
  width: 100%
  height: 40%
  position: relative
`

export const TopIcons = styled.View`
  width: 180px
  height: 30px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  position: absolute
  top: 7.5%
  right: 4%
`

export const UserInfo = styled.View`
  width: 80%
  height: 70px
  display: flex
  flex-direction: row
  justify-content: flex-start
  position: absolute
  bottom: 35%
  left: 5%
`

export const UserImage = styled.Image`
  width: 70px
  height: 70px
  border-radius: 200px
`

export const NoImage = styled.View`
  width: 70px
  height: 70px
  background-color: #272729
  border-radius: 100px
  border: 2px solid #fff
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
`

export const Counters = styled.View`
  width: 200px
  height: 50px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  position: absolute
  bottom: 10%
  left: 5%
`

export const Counts = styled.View`
  display: flex
  flex-direction: column
  align-items: flex-start
  justify-content: flex-start
`

// SETTINGS SCEREEN

export const SContainer = styled.SafeAreaView`
  width: 100%
  height: 100%
`
export const ButtonsContainer = styled.View`
  width: 100%
  margin-bottom: 10px
  background-color: #fff
  padding-top: 30px
`

export const NavButton = styled.TouchableOpacity`
  width: 100%
  background-color: #fff
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
  padding: 16px 30px
`

// PROFILE EDIT

export const ProfileEditCon = styled.SafeAreaView`
  width: 100%
  height: 100%
`

export const Header = styled.View`
  width: 100%
  padding: 15px 30px
  background-color: aliceblue
  display: flex
  flex-direction: row
  align-items: center
  justify-content: space-between
`

export const DialogWrap = styled.View`
  width: 85%
  height: 250px
  background: #002d57
  position: absolute
  top: 25%
  left: 7.5%
  border-radius: 10px
`

export const UploadWrap = styled.View`
  width: 85%
  margin: 25px auto
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
`

export const UploadButton = styled.TouchableOpacity`
  width: 120px
  height: 120px
  background-color: #fff
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  border-radius: 10px
`

export const DialogActions = styled.View`
  width: 100%
  background-color: #F4D160
  height: 60px
  position: absolute
  bottom: 0
  border-bottom-left-radius: 10px
  border-bottom-right-radius: 10px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
`