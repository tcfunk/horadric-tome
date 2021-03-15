import React from 'react'
import { Container, Divider, ChakraProvider } from "@chakra-ui/react"
import { Link } from 'gatsby'

class Header extends React.Component {
  render() {
    return (
      <ChakraProvider>

        <Container>
          <Link to="/runes">Runes</Link>
          <Link to="/runewords">Runewords</Link>
        </Container>

        <Divider />

      </ChakraProvider>
    )
  }
}

export default Header