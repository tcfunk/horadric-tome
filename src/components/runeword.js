import * as React from "react"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { Box, Text } from "@chakra-ui/react"


class Runeword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      itemTypes: props.itemTypes?.join('/'),
      runes: props.runes.map((rune) => rune.title).join(' + '),
      stats: documentToHtmlString(JSON.parse(props.stats)),
    }
  }

  render() {
    return (
      <Box backgroundColor="gray.700" textAlign="center" p={4} rounded={4}>
        <Text fontSize="xl" color="orange.200">{this.props.title}</Text>
        <Text fontSize="xl" color="gray.200">{this.props.sockets} Socket {this.state.itemTypes}</Text>
        <Text fontSize="xl" color="orange.200">{this.state.runes}</Text>
        <Text color="blue.400" whiteSpace="pre-line" dangerouslySetInnerHTML={{__html: this.state.stats}}></Text>
      </Box>
    )
  }
} 

export default Runeword