import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Styles, { COLORS } from '../styles'

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
      <View style={[styles.tabContainer]}>
        <Ionicons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="md-home" size={ICONSIZE} />
        <Text style={[Styles.appFontFamily,{color: this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT}]}>
          All Buildings
        </Text>
      </View>
    );
  }
}
export class Tab_MessageIcon extends Component {
  render() {
    return (
      <View style={[styles.tabContainer]}>
        <MaterialIcons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="message" size={ICONSIZE} />

      </View>
    );
  }
}

export class Tab_NewListingIcon extends Component {
  render() {
    return (
      <View style={[styles.tabContainer]}>
        <Ionicons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="md-add" size={ICONSIZE} />
        <Text style={[Styles.appFontFamily,{color: this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT}]}>
          Add Building
        </Text>
      </View>
    );
  }
}

export class Tab_ProfileIcon extends Component {
  render() {
    return (
      <View style={[styles.tabContainer]}>
        <MaterialIcons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="person" size={ICONSIZE} />
        <Text style={[Styles.appFontFamily,{color: this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT}]}>
          Profile
        </Text>
      </View>
    );
  }
}

export class Tab_Search extends Component {
  render() {
    return (
      <MaterialIcons color={this.props.selected? ICONCOLORSELECTED : ICONCOLORDEFAULT} name="search" size={ICONSIZE} />
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})
