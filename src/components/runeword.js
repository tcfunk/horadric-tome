import * as React from "react"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { AddIcon, DeleteIcon } from "@chakra-ui/icons"
import { Box, Fade, IconButton, Text } from "@chakra-ui/react"


class Runeword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      itemTypes: props.itemTypes?.join('/'),
      runes: props.runes.map((rune) => rune.title).join(' + '),
      stats: documentToHtmlString(JSON.parse(props.stats)),
      favorite: props.favorite || false,
      isOpen: false
    }

    this.toggleFavorite = this.toggleFavorite.bind(this)
    this.onOpen = this.onOpen.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  onOpen() {
    this.setState({isOpen: true})
  }

  onClose() {
    this.setState({isOpen: false})
  }

  toggleFavorite() {
    this.setState({favorite: !this.state.favorite})
  }

  favoriteIcon() {
    return this.state.favorite ? <DeleteIcon /> : <AddIcon />
  }

  favoriteTooltip() {
    return this.state.favorite ?
      "Remove from collection" :
      "Add to collection"
  }

  render() {

    return (
      <Box onMouseEnter={this.onOpen} onMouseLeave={this.onClose} pos="relative" backgroundColor="gray.700" textAlign="center" p={4} rounded={4}>
        <Fade in={this.state.isOpen}>
          <IconButton title={this.favoriteTooltip()} pos="absolute" size="sm" right={4} top={4} icon={this.favoriteIcon()} onClick={this.toggleFavorite}></IconButton>
        </Fade>
        <Text fontSize="xl" color="orange.200">{this.props.title}</Text>
        <Text fontSize="xl" color="gray.200">{this.props.sockets} Socket {this.state.itemTypes}</Text>
        <Text fontSize="xl" color="orange.200">{this.state.runes}</Text>
        <Text color="blue.400" whiteSpace="pre-line" dangerouslySetInnerHTML={{__html: this.state.stats}}></Text>
      </Box>
    )
  }
} 

export default Runeword