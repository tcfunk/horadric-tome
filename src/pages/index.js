import * as React from 'react'
import { graphql } from "gatsby";
import { FiHeart, FiTrash } from 'react-icons/fi'
import styled from "styled-components"

import Layout from '../components/layout'
import Runeword from '../components/runeword'
import TextInput from '../components/style-elements/text-input'


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

class Page extends React.Component {

  constructor(props) {
    super(props)

    // const userFavorites = React.useState(JSON.parse(localStorage.getItem('favorited-runewords')))

    let allRunewords = props.data.allContentfulRuneWord.nodes
    this.state = {
      runewords: allRunewords,
      visible: allRunewords,
      search: "",
      favorites: [],
    }

    this.setSearch = this.setSearch.bind(this)
  }

  searchLowerCase(needle, haystack) {
    let lowerNeedle = needle.toLowerCase()
    let lowerHaystack = haystack.toLowerCase()
    return lowerHaystack.search(lowerNeedle) !== -1
  }

  filteredRunewords() {
    if (this.state.search === "") return this.state.runewords

    return this.state.runewords.filter((runeword) => {
      let match = false

      match = this.searchLowerCase(this.state.search, runeword.title)
      if (!match)
      {
        var runeMatch = runeword.runes.filter((rune) => this.searchLowerCase(this.state.search, rune.title))
        match = runeMatch.length > 0
      }

      return match
    })
  }

  isFavorited(id) {
    return this.state.favorites.indexOf(id) !== -1
  }

  setSearch(e) {
    this.setState({search: e.target.value})
  }

  toggleFavorite(id) {
    const pos = this.state.favorites.indexOf(id)
    let favorites = this.state.favorites

    if (pos === -1) {
      favorites.push(id)
    } else {
      favorites.splice(pos, 1)
    }

    this.setState({favorites: favorites})
  }

  favoriteTooltip(id) {
    return this.isFavorited(id) ?
      "Remove from collection" :
      "Add to collection"
  }

  render() {
    return (
      <Layout>
        <div className="container mx-auto mt-8">
          <TextInput value={searchValue} onChange={this.setSearch} placeholder="Search by rune or runeword" />
        </div>
        <div className="container mx-auto grid grid-cols-4 gap-4 mt-8">
          {this.filteredRunewords().map((runeword) =>
              <Runeword
                favorite={false}
                key={runeword.id}
                title={runeword.title}
                runes={runeword.runes}
                itemTypes={runeword.itemTypes}
                sockets={runeword.sockets}
                stats={runeword.stats.raw}>

                <FavButton onClick={() => this.toggleFavorite(runeword.id)} title={this.favoriteTooltip(runeword.id)} favorite={this.isFavorited(runeword.id)}>
                  {this.state.favorite ? <FiTrash /> : <FiHeart />}
                </FavButton>
              </Runeword>
          )}
        </div>
      </Layout>
    )
  }
}

export default IndexPage
