import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"

import Header from './header';

class Layout extends React.Component {
  render(){
    return (
      <ChakraProvider>
        <Header maxW="xl" />
        {this.props.children}
      </ChakraProvider>
    )
  }
}

export default Layout
