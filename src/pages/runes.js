import * as React from 'react'
import { graphql } from "gatsby";

import Layout from '../components/layout';
import Rune from '../components/rune';

class Page extends React.Component {
  render() {
    const runes = this.props.data.allContentfulRune.nodes

    return (
      <Layout>
        <div>
          <div>
            {runes.map((rune) =>
              <Rune
                title={rune.title}
                armorStats={rune.armor_stats.raw}
                weaponStats={rune.weaponStats.raw}
                icon={rune.icon.resize.base64}
              />
            )}
          </div>
        </div>
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
