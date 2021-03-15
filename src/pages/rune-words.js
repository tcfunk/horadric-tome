import React from 'react'
import { Button, ChakraProvider } from "@chakra-ui/react"

class Page extends React.Component {
  render() {
    return (
      <ChakraProvider>
        <Button>Press this</Button>
      </ChakraProvider>
    )
  }
}

export default Page