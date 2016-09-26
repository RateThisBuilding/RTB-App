import React, { Component } from 'react'
import { Text } from 'react-native'

import Styles from '../styles'

export class Title extends Component{
  render() {
    return(
      <Text style={[{fontSize: this.props.subTitle? 25: 35, fontFamily: 'Helvetica'}, Styles.headingsMargin]}>{this.props.text}</Text>
    )
  }
}
Title.propTypes = {
  text: React.PropTypes.string,
  subTitle: React.PropTypes.bool
}
