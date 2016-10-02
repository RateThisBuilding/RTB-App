import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../../styles'

export default class InfoBlock extends Component {

  static propTypes = {
    address: React.PropTypes.string,
    phone: React.PropTypes.string,
    website: React.PropTypes.string
  }

  render() {
    return (
      <View style={styles.infoBlockContainer}>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-home" />
          &nbsp;&nbsp;&nbsp;
          {this.props.address}
        </Text>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-call" />
          &nbsp;&nbsp;&nbsp;
          {this.props.phone || "Not Provided"}
        </Text>
        <Text>
          <Ionicons color={COLORS.BLACK} name="md-globe" />
          &nbsp;&nbsp;&nbsp;
          {this.props.website || "Not Provided"}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  infoBlockContainer: {
    padding: 5
  }
})
