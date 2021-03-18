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

class IndexPage extends React.Component {

  constructor(props) {
    super(props)

    let allRunewords = props.data.allContentfulRuneWord.nodes
    this.state = {
      runewords: allRunewords,
      visibleRunewords: allRunewords,
      search: "",
      favorites: [],
    }

    this.setSearch = this.setSearch.bind(this)
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

  filterRunewords(searchVal) {
    let visible = this.state.runewords

    if (searchVal !== "") {
      visible = this.state.runewords.filter((runeword) => {
        let match = false

        match = this.searchLowerCase(searchVal, runeword.title)
        if (!match)
        {
          var runeMatch = runeword.runes.filter((rune) => this.searchLowerCase(searchVal, rune.title))
          match = runeMatch.length > 0
        }

        return match
      })
    }

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
  }

  persistFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs))
  }

  setSearch(e) {
    let searchVal = e.target.value
    this.setState({search: searchVal})
    this.filterRunewords(searchVal)
  }


  render() {
    const searchValue = this.state.searchValue

    return (
      <Layout>
        <div className="container mx-auto mt-8">
          <TextInput value={searchValue} onChange={this.setSearch} placeholder="Search by rune or runeword" />
        </div>
        <div className="container mx-auto grid grid-cols-4 gap-4 mt-8">
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
