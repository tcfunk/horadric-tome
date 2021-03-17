import * as React from 'react'
import { graphql } from "gatsby";
import { Container, SimpleGrid } from '@chakra-ui/layout';

import Layout from '../components/layout';
import Rune from '../components/rune';

class Page extends React.Component {
  render() {
    const runes = this.props.data.allContentfulRune.nodes

    return (
      <Layout>
        <Container maxW="8xl">
          <SimpleGrid columns={4} spacing={4}>
            {runes.map((rune) =>
              <Rune
                title={rune.title}
                armorStats={rune.armor_stats.raw}
                weaponStats={rune.weaponStats.raw}
                icon={rune.icon.resize.base64}
              />
            )}
          </SimpleGrid>
        </Container>
      </Layout>
    )
  }
}

export default Page

export const query = graphql`
query {
  allContentfulRune(sort: {fields: title}) {
    nodes {
      icon {
        resize(width: 28) {
          base64
        }
      }
      title
      weaponStats {
        raw
      }
      armor_stats {
        raw
      }
    }
  }
}

`
