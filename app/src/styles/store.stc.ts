import styled from "styled-components/native"

export const StoreCon = styled.SafeAreaView`
  width: 100%
  height: 100%
  background-color: #fff
`

export const AddButton = styled.TouchableOpacity`
  width: 60px
  height: 60px
  background-color: #272729
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  position: absolute
  bottom: 5%
  right: 5%
  border-radius: 10px
`

// ADD PRODUCT

export const RowFields = styled.View`
  width: 85%
  margin: 20px auto
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
`
export const ImageSelection = styled.ImageBackground`
  width: 80px
  height: 80px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  margin-right: 10px
`

export const SmallInput = styled.TextInput`
  width: 60%
  padding: 15px 20px
  font-family: "med"
  font-size: 18px
  color: #272729
`


export const InputWrap = styled.View`
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
`