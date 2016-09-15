import React, { Component } from 'react';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { COLORS } from '../styles'

const ICONSIZE = 25
const ICONCOLORDEFAULT = COLORS.BLACK
const ICONCOLORSELECTED = COLORS.THEME


export default class TabIcon extends Component {
  render(){
    return (
      <Text style={{color: this.props.selected ? ICONCOLORSELECTED :ICONCOLORDEFAULT}}>{this.props.title}</Text>
    );
  }
}

export class Tab_HomeIcon extends Component {
  render() {
    return (
      <Ionicons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="md-home" size={ICONSIZE} />
    );
  }
}
export class Tab_MessageIcon extends Component {
  render() {
    return (
      <MaterialIcons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="message" size={ICONSIZE} />
    );
  }
}

export class Tab_NewListingIcon extends Component {
  render() {
    return (
      <Ionicons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="md-add" size={ICONSIZE} />
    );
  }
}

export class Tab_ProfileIcon extends Component {
  render() {
    return (
      <MaterialIcons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="person" size={ICONSIZE} />
    );
  }
}
