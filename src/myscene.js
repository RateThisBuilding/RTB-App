import React, { Component } from 'react';
import { View, Text, TouchableHighlight} from 'react-native';

export default class MyScene extends Component {
  static get defaultProps() {
    return {
      title: 'MyScene'
    };
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight style={styles.tappableButtons} onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.tappableButtons} onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = {
  tappableButtons : {
    padding: 20,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: '#000000'
  }
}
