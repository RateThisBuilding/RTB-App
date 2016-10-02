import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import { Button } from './formItems'

import  { COLORS, FULLWIDTH, FULLHEIGHT, NAVBARHEIGHT, TABMENUBARHEIGHT } from '../styles'
import { FormLabelText } from './formItems'
import PickerList from './pickerList'

export default class LocationPicker extends Component {
  constructor(props){
    super(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.triggerLocationModal){
      this.refs.locationModal.open();
    }else{
      this.refs.locationModal.close();
    }
  }

  _onSaveParams(){
    this.refs.locationModal.close();
  }

  render() {
    return (
      <Modal
        style={{width: FULLWIDTH*0.8, height: (FULLHEIGHT*0.9)-NAVBARHEIGHT-TABMENUBARHEIGHT, padding: 20}}
        position={'center'}
        ref={'locationModal'}
        swipeToClose={false}
        onClosed={this.props.onClose}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <FormLabelText text="Building Location" />
          <PickerList
            items={this.props.locations}
            onItemSelect={this.props.onSelectLocation}
            currentlySelected={this.props.currentlySelectedLocations}
          />
          <Button
            theme={1}
            onPress={this._onSaveParams.bind(this)}
            buttonText={"OK"}
          />


        </View>
      </Modal>

    )
  }
}
