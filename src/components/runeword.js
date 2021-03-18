import * as React from "react"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

import { FiHeart, FiTrash } from 'react-icons/fi'

import GridItem from '../components/style-elements/grid-item'
import styled from "styled-components"


const FavButton = styled.a.attrs({
  className: `
    absolute
    top-4
    right-4
    text-white
    transition
    duration-300
    opacity-0
    group-hover:opacity-100
  `
})``


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

  favoriteTooltip() {
    return this.state.favorite ?
      "Remove from collection" :
      "Add to collection"
  }

  render() {

    return (
      <GridItem onMouseEnter={this.onOpen} onMouseLeave={this.onClose} className="group">
        <p className="text-yellow-300 text-2xl">{this.props.title}</p>
        <p className="text-gray-200 text-md">{this.props.sockets} Socket {this.state.itemTypes}</p>
        <p className="text-yellow-300 text-lg">{this.state.runes}</p>

        <FavButton onClick={this.toggleFavorite} title={this.favoriteTooltip()} favorite={this.state.favorite}>
          {this.state.favorite ? <FiTrash /> : <FiHeart />}
        </FavButton>

        {this.state.isOpen && <div className="absolute w-full left-0 bg-gray-800 p-4 rounded-b border-r-2 border-b-2 border-l-2">
          <p className="text-blue-400 whitespace-pre-line" dangerouslySetInnerHTML={{__html: this.state.stats}}></p>
        </div>}
      </GridItem>
    )
  }
} 

export default Runeword
