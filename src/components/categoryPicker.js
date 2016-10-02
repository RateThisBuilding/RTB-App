import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import { Button } from './formItems'

import  { COLORS, FULLWIDTH, FULLHEIGHT } from '../styles'
import { FormLabelText } from './formItems'
import PickerList from './pickerList'

export default class CategoryPicker extends Component {
  constructor(props){
    super(props)
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.triggerCategoryModal){
      this.refs.categoryModal.open();
    }else{
      this.refs.categoryModal.close();
    }
  }

  _onSaveParams(){
    this.refs.categoryModal.close();
  }

  render() {
    return (
      <Modal
        style={{width: FULLWIDTH*0.7, height: FULLHEIGHT*0.5, padding: 20}}
        position={'center'}
        ref={'categoryModal'}
        swipeToClose={false}
        onClosed={this.props.onClose}
      >
        <View style={{flex: 1, alignItems: 'center'}}>
          <FormLabelText text="Building Category" />
          <PickerList
            items={this.props.categories}
            onItemSelect={this.props.onSelectCategory}
            currentlySelected={this.props.currentlySelectedCategories}
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
