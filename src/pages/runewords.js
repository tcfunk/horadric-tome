import * as React from 'react'
import { graphql } from "gatsby";
import { Table, Thead, Tbody, Tr, Th, Td, Img } from "@chakra-ui/react"

import Layout from '../components/layout';

class Page extends React.Component {
  render() {
    const runewords = this.props.data.allContentfulRuneWord.nodes

    return (
      <Layout>
        <Table colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Allowed Items</Th>
              <Th>Rune Order</Th>
              <Th>Completed Stats</Th>
            </Tr>
          </Thead>
          <Tbody>
            {runewords.map((runeword) => 
              <Tr>
                <Td>{runeword.title}</Td>
                <Td>{runeword.sockets} socket {runeword.itemTypes?.join('/')}</Td>
                <Td>{runeword.runes.map((rune) => 
                  <Img src={rune.icon.resize.base64} title={rune.title} alt={rune.title} style={{ display: 'inline-block'}} />
                )}</Td>
                <Td>stats</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Layout>
    )
  }
}

export const query = graphql`
query {
  allContentfulRuneWord {
    nodes {
      id
      title
      itemTypes
      sockets
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
