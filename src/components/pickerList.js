import React, { Component } from 'react'
import { ScrollView, TouchableHighlight, View, ListView, StyleSheet, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


export default class PickerList extends Component {
  checkerboxIcon(item){
    if(item.value==this.props.currentlySelected) return "check-box"
    else return "check-box-outline-blank"
  }

  renderRow(item){
    return (
      <View style={styles.cellContainer}>
        <TouchableHighlight onPress={()=>{this.props.onItemSelect(item.value)}} underlayColor="transparent">
          <View style={styles.cellWrapper}>
            <View style={styles.leftCol}>
              <Text>{item.label}</Text>
            </View>
            <View style={styles.rightCol}>
              <MaterialIcons
                name={this.checkerboxIcon(item)}
                size={20}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>

    )
  }

  render() {
    const {items} = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2})
    const dataSource = items ? ds.cloneWithRows(items) : ds.cloneWithRows([]);
    return (
      <ListView
        dataSource={dataSource}
        renderRow={this.renderRow.bind(this)}
        style={{alignSelf: 'stretch'}}
        scrollEnabled={true}
      />
    )
  }
}

PickerList.propTypes = {
  items: React.PropTypes.array,
  onItemSelect: React.PropTypes.func,
}

const styles = StyleSheet.create({
  cellContainer: {paddingTop: 5, paddingBottom: 5},
  cellWrapper: {
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    padding:10,
  },
  leftCol: {
    flex: 4
  },
  rightCol: {
  },
  separator: {
    height:1,
    backgroundColor:'#000000',
  }
})
