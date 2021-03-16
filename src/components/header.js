import React from 'react'
import { Container, Divider, ChakraProvider, Link } from "@chakra-ui/react"
import { Link as GatsbyLink } from 'gatsby'

class Header extends React.Component {
  render() {
    return (
      <ChakraProvider>

        <Container p={16}>
          <Link as={GatsbyLink} to="/runes">Runes</Link>
          <Link as={GatsbyLink} to="/runewords">Runewords</Link>
        </Container>

        <Divider />

      </ChakraProvider>
    )
  }
}

export default Header