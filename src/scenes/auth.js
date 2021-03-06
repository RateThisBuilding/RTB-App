import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'


import SceneContainer from '../components/sceneContainer'
import { FormLabelText, TextField, Button } from '../components/formItems'
import { acquireInitialToken, login, logout } from '../actions/users'
import Styles, { COLORS } from '../styles'


class Auth extends Component{
  static propTypes = {
    acquireInitialToken: React.PropTypes.func,
    login: React.PropTypes.func
  }

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  }
  updateFormVal(key, val){
    this.setState({
      [key]: val
    })
  }
  componentWillReceiveProps(props){
    if(props.user){
      Actions.pop()
    }
  }

  render() {
    const { username, password } = this.state
    return (
      <SceneContainer>
        <FormLabelText text={"Username"} />
        <TextField autoCorrect={false} onTextChange={this.updateFormVal.bind(this,'username')} autoCapitalize={'none'}/>

        <FormLabelText text={"Password"} />
        <TextField onTextChange={this.updateFormVal.bind(this,'password')} password autoCapitalize={'none'} />

        <Button
          onPress={()=>{this.props.login(username, password)}}
          theme={1}
          buttonText={'Login'}

        />
        {/* Debug: Logout */}
        {/* <Button
          onPress={()=>{this.props.logout()}}
          theme={2}
          buttonText={'Logout'}

        /> */}

      </SceneContainer>
    )
  }

}

function mapStateToProps(state) {
  return {
    user: state.users.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ acquireInitialToken, login, logout }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
