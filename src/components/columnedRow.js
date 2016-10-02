import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class ColumnedRow extends Component {
  static propTypes = {
    leftText: React.PropTypes.string,
    rightText: React.PropTypes.string,
    alt: React.PropTypes.bool
  }

  render () {
    return (
      <View style={[styles.container,{backgroundColor: this.props.alt? '#ACD7FF' : 'white'}]}>
        <View style={styles.leftAligned}>
          <Text>{this.props.leftText}</Text>
        </View>
        <View style={styles.blankSpace} />
        <View style={styles.rightAligned}>
          <Text>{this.props.rightText}</Text>
        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  leftAligned: {
    flex: 3,
    flexGrow: 4
  },
  rightAligned: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'

  }
})
