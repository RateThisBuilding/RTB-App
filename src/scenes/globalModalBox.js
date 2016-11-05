import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Modal from 'react-native-modalbox'

import { FULLWIDTH, FULLHEIGHT, NAVBARHEIGHT, TABMENUBARHEIGHT } from '../styles'
import { closeGlobalModal } from '../actions/ui'


class GlobalModalBox extends Component{

  static propTypes = {
    globalModal: React.PropTypes.bool,
    error: React.PropTypes.string,
    closeGlobalModal: React.PropTypes.func
  }

  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.globalModal){
      this.refs.globalModalBox.open()
    }
  }

  componentWillMount(){
  }

  componentWillReceiveProps(nProps){
    if(nProps.globalModal){
      this.refs.globalModalBox.open()
    }else{
      this.refs.globalModalBox.close()
    }
  }

  _onClosed(){
    this.props.closeGlobalModal()
  }

  render(){
    let content
    if(this.props.error){
      // console.log(this.props.error);
      content = (
        <Text>{this.props.error}</Text>
      )
    }else{
      content = (
        <View>
          <Text>Loading...</Text>
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
          />
        </View>
      )
    }
    return(
      <Modal
        style={styles.modalContainer}
        position={'center'}
        ref={'globalModalBox'}
        swipeToClose={false}
        onClosed={this._onClosed.bind(this)}
        backdropPressToClose={this.props.error? true: false}
      >
        {content}

      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    width: FULLWIDTH*0.4,
    height: (FULLHEIGHT*0.4)-NAVBARHEIGHT-TABMENUBARHEIGHT,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    globalModal: state.ui.globalModal,
    error: state.ui.error
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    closeGlobalModal
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(GlobalModalBox)
