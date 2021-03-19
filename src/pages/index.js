import * as React from 'react'
import { graphql } from "gatsby";
import { FiHeart, FiTrash } from 'react-icons/fi'
import styled from "styled-components"

import Layout from '../components/layout'
import Runeword from '../components/runeword'
import TextInput from '../components/style-elements/text-input'
import Checkbox from '../components/style-elements/checkbox'


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

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    let allRunewords = props.data.allContentfulRuneWord.nodes
    this.state = {
      runewords: allRunewords,
      visibleRunewords: allRunewords,
      search: "",
      favorites: [],
      showOnlyFavorites: false,
    }

    this.setSearch = this.setSearch.bind(this)
    this.toggleShowFavorites = this.toggleShowFavorites.bind(this)
  }

  componentDidMount() {
    let storedFavorites = JSON.parse(localStorage.getItem('favorites'))
    if (storedFavorites === null) {
      storedFavorites = []
    }
    this.setState({favorites: storedFavorites})
  }

  searchLowerCase(needle, haystack) {
    let lowerNeedle = needle.toLowerCase()
    let lowerHaystack = haystack.toLowerCase()
    return lowerHaystack.search(lowerNeedle) !== -1
  }

  filterRunewords(searchVal, onlyFavs) {
    let visible = this.state.runewords
    let favs = this.state.favorites

    visible = this.state.runewords.filter((runeword) => {

      // Check if in favorites, if needed
      if (onlyFavs && favs.indexOf(runeword.id) === -1) return false

      // Filter by search, but skip if no search text
      if (searchVal !== "") {
        let match = this.searchLowerCase(searchVal, runeword.title)
        if (!match)
        {
          var runeMatch = runeword.runes.filter((rune) => this.searchLowerCase(searchVal, rune.title))
          match = runeMatch.length > 0
        }

        return match
      }

      return true
    })

    this.setState({visibleRunewords: visible})
  }

  isFavorited(id) {
    return this.state.favorites?.indexOf(id) !== -1
  }

  favoriteTooltip(id) {
    return this.isFavorited(id) ? 
      "Remove from collection" :
      "Add to collection"
  }

  toggleFavorite(id) {
    let favs = this.state.favorites
    const idx = favs.indexOf(id)

    if (idx === -1) {
      favs.push(id)
    } else {
      favs.splice(idx, 1)
    }

    this.setState({favorites: favs})
    this.persistFavorites(favs)
    this.filterRunewords(this.state.search, this.state.showOnlyFavorites)
  }

  persistFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs))
  }

  setSearch(e) {
    let searchVal = e.target.value
    this.setState({search: searchVal})
    this.filterRunewords(searchVal, this.state.showOnlyFavorites)
  }

  toggleShowFavorites() {
    const onlyFavs = !this.state.showOnlyFavorites
    this.setState({showOnlyFavorites: onlyFavs})
    this.filterRunewords(this.state.search, onlyFavs)
  }

  render() {
    const searchValue = this.state.searchValue

    return (
      <Layout>
        <div className="container mx-auto mt-8 p-2 flex justify-start space-x-4 space-y-4 flex-wrap">
          <TextInput value={searchValue} onChange={this.setSearch} placeholder="Search by rune or runeword" />
          <Checkbox onChange={this.toggleShowFavorites}>
            Show only favorites
          </Checkbox>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {this.state.visibleRunewords.map((runeword) =>
              <Runeword
                favorite={false}
                key={runeword.id}
                title={runeword.title}
                runes={runeword.runes}
                itemTypes={runeword.itemTypes}
                sockets={runeword.sockets}
                stats={runeword.stats.raw}>

                <FavButton onClick={() => this.toggleFavorite(runeword.id)} title={this.favoriteTooltip(runeword.id)} favorite={this.isFavorited(runeword.id)}>
                  {this.isFavorited(runeword.id) ? <FiTrash /> : <FiHeart />}
                </FavButton>
              </Runeword>
          )}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
query {
  allContentfulRuneWord(sort: {order: ASC, fields: title}) {
    nodes {
      id
      title
      itemTypes
      sockets
      stats {
        raw
      }
      runes {
        title
        icon {
          resize(width: 28) {
            base64
          }
        }
      }
    }
  }
}
`

export default IndexPage
