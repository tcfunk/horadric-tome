import React from 'react'
import { Link as GatsbyLink } from 'gatsby'

class Header extends React.Component {
  render() {
    return (
      <div>
        <GatsbyLink to="/runes">Runes</GatsbyLink>
        <GatsbyLink to="/runewords">Runewords</GatsbyLink>
      </div>
    )
  }
}

export default Header