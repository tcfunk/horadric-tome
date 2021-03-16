import * as React from 'react'
import { graphql } from "gatsby";
import { Container, SimpleGrid, FormControl, Input, FormLabel } from "@chakra-ui/react"

import Layout from '../components/layout'
import Runeword from '../components/runeword'

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
        <Container>
          <FormControl paddingY={8}>
            <FormLabel>Search by title, rune:</FormLabel>
            <Input type="text" value={searchValue} onChange={this.setSearch} />
          </FormControl>
        </Container>
        <Container maxW="8xl">
          <SimpleGrid columns={4} spacing={4}>
            {this.filteredRunewords().map((runeword) =>
              <Runeword
                key={runeword.id}
                title={runeword.title}
                runes={runeword.runes}
                itemTypes={runeword.itemTypes}
                sockets={runeword.sockets}
                stats={runeword.stats.raw} />
            )}
          </SimpleGrid>
        </Container>
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
