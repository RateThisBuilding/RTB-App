import React, { Component } from 'react'
import { View, ScrollView, Image, StyleSheet, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'


import SceneContainer from '../components/sceneContainer'
import ColumnedRow from '../components/columnedRow'
import { Title } from '../components/typography'
import { Button } from '../components/formItems'
import { logout } from '../actions/users'
import Styles from '../styles'

class Profile extends Component {
  static propTypes = {
    user: React.PropTypes.object,
    logout: React.PropTypes.func
  }

  constructor(props){
    super(props);
    this.state = {page: 'My Profile'};
  }
  componentWillReceiveProps(newProps){

  }
  render() {
    if (this.props.user){
      return (
        <SceneContainer>
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
            <Button
              onPress={()=>{this.props.logout()}}
              buttonText={'Log Out'}
            />

          </ScrollView>
        </SceneContainer>

      );

    } else{
      return (
        <SceneContainer>
          <Title text="You have not signed in." />
          <Button
            onPress={()=>{Actions.auth()}}
            theme={1}
            buttonText={'Sign in'}
          />
        </SceneContainer>
      )
    }
  }
}

function mapStateToProps(state){
  return {
    user: state.users.user
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({ logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

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
