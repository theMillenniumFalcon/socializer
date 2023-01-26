import styled from "styled-components/native"

interface ButtonType { }

export const ButtonSPLASH = styled.TouchableOpacity<ButtonType>`
  width: 80%
  margin: 0 auto
  background-color: #002d57
  padding: 15px
  display: flex
  flex-direction: row
  align-items: center
  justify-content: center
  border-radius: 5px
  position: absolute
  bottom: 5% 
`