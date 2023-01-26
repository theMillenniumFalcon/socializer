import styled from "styled-components/native"

interface FullScreenColTypes {
    color?: string
}
export const FullScreenCol = styled.SafeAreaView<FullScreenColTypes>`
  width: 100%
  height: 100%
  background-color: ${(props) => (props.color ? props.color : "#fff")}
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
`

interface ImgType {
    w: string
    h: string
}

export const Img = styled.Image<ImgType>`
  width: ${(props) => props.w}
  height: ${(props) => props.h}
`

interface TypeSTCProps {
    size?: string
    family?: string
    gap?: string
    color?: string
}

export const TextSTC = styled.Text<TypeSTCProps>`
  font-size: ${(props) => (props.size ? props.size : "16px")}
  font-family: ${(props) => (props.family ? props.family : "norm")}
  margin: ${(props) => (props.gap ? props.gap : "0")}
  color: ${(props) => (props.color ? props.color : "#373729")}
`

interface InputType {
    gap?: string
}

export const InputSTC = styled.TextInput<InputType>`
  width: 80%
  padding: 15px 20px
  font-family: "med"
  color: #272739
  margin: ${(props) => (props.gap ? props.gap : "0")}
  background-color: #DAE8FE
  border-radius: 7px
`


export const ButtonSTC = styled.TouchableOpacity`
  width: 80%
  margin: 0 auto
  background-color: #002d57
  padding: 15px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  border-radius: 5px
`