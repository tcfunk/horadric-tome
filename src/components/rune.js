import * as React from 'react';


class Rune extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.icon} />
        <p>{this.props.title}</p>
      </div>
    )
  }
}

export default Rune
