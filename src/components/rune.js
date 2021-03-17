import { Img } from '@chakra-ui/image';
import { Box, Text } from '@chakra-ui/layout';
import * as React from 'react';


class Rune extends React.Component {
  render() {
    return (
      <Box>
        <Img src={this.props.icon} />
        <Text>{this.props.title}</Text>
      </Box>
    )
  }
}

export default Rune
