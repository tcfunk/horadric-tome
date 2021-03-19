import * as React from "react"

// import Header from './header';

class Layout extends React.Component {
  render(){
    return (
      <div className="px-4">
        {/* <Header maxW="xl" /> */}
        {this.props.children}
      </div>
    )
  }
}

export default Layout
