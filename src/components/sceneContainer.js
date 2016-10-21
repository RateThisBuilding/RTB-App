import React, { Component } from 'react'
import { View } from 'react-native'

import Styles from '../styles'

export default class SceneContainer extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <View style={[Styles.container]}>
        { this.props.children }
      </View>
    )
  }
}
