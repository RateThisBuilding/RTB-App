import React, { Component } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';

import ColumnedRow from '../components/columnedRow'
import Styles from '../styles'

export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {page: 'My Profile'};
  }
  render() {
    return (
      <View style={[Styles.container]}>
        <ScrollView >
          <View style={styles.headerRow}>
            <View style={styles.avatarContainer}>
              <Image
                style={styles.avatar}
                source={require('../../img/avatarPlaceholder.png')}
              />
            </View>
            <View style={styles.nameTitleContainer}>
              <ColumnedRow
                leftText={"Display Name"}
                rightText={"Jess"}
              />
              <ColumnedRow
                leftText={"Title"}
                rightText={"Building Expert"}
              />

            </View>
          </View>
          <View style={{flex:1}} />
          <ColumnedRow
            leftText={"Email Address"}
            rightText={"ratethisbuilding@gmail.com"}
          />
          <View style={{flex:1}} />
          <ColumnedRow
            leftText={"User ID"}
            rightText={"rtbd7"}
          />
          <ColumnedRow
            leftText={"Display Name using User ID"}
            rightText={"switch here..."}
            alt={true}
          />
          <View style={{flex:1}} />
          <ColumnedRow
            leftText={"Add a unit for rent"}
            rightText={">"}
          />


        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  headerRow: {
    flex: 6,
    flexDirection: 'row',
    marginTop: 10

  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  nameTitleContainer: {
    flex: 3,
  },

})
