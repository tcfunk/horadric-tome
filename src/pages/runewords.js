import * as React from 'react'
import { graphql } from "gatsby";

import Layout from '../components/layout'
import Runeword from '../components/runeword'
import TextInput from '../components/style-elements/text-input'

class Page extends React.Component {

  constructor(props) {
    super(props)

    let allRunewords = props.data.allContentfulRuneWord.nodes
    this.state = {
      runewords: allRunewords,
      visible: allRunewords,
      search: "",
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

  setSearch(e) {
    this.setState({search: e.target.value})
  }

  render() {
    const searchValue = this.state.search

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
              stats={runeword.stats.raw} />
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

export default Page
