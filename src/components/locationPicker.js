import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import { MKButton } from 'react-native-material-kit'

import  { COLORS, FULLWIDTH, FULLHEIGHT } from '../styles'
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
        style={{width: FULLWIDTH*0.8, height: FULLHEIGHT*0.8, padding: 20}}
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
          <MKButton
            backgroundColor={COLORS.THEME}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 10,  }}
            onPress={this._onSaveParams.bind(this)}
          >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              OK
            </Text>
          </MKButton>


        </View>
      </Modal>

    )
  }
}
