import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import { MKTextField, MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-crop-picker'

import { FormLabelText, Button } from '../components/formItems'
import CategoryPicker from '../components/categoryPicker'
import LocationPicker from '../components/locationPicker'
import Styles, { COLORS } from '../styles'

import LOCATION_DATA from '../../data/locations'


export default class AddBuilding extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      category: '*',
      showCategoryListModal: false,
      showLocationListModal: false,
      buildingImage: null

    };
  }
  _getAvailableCategories() {
    return [
      {label:"Any", value:"*"},
      {label:"Apartments", value:"2"},
      {label:"Townhome", value:"3"}
    ]
  }

  _selectCategory(category){
    this.setState({
      category: category
    })
  }

  _openCategorySelectionModal(){
    this.setState({
      showCategoryListModal: true,
      showLocationistModal: false
    })
  }

  _openLocationSelectionModal(){
    this.setState({
      showLocationListModal: true,
      showCategoryListModal: false,

    })
  }
  _getAvailableLocations() {
    return LOCATION_DATA;
  }
  _selectLocation(location){
    this.setState({
      location: location
    })
  }

  openImagePicker() {
    ImagePicker.openPicker({
      multiple: false
    }).then(image => {
      console.log(image);
      this.setState({ buildingImage: image.path })
    }).catch(e => {
      console.log(e);
    })
  }

  render() {
    let buildingImage;
    if (this.state.buildingImage){
      buildingImage = <Image source={{uri:this.state.buildingImage.path}} style={Styles.selectedImageDimensions}/>
    }
    return (
      <View style={[Styles.container]}>
        <ScrollView>
          <FormLabelText text="Building Name" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({name:e})}}
          />
          <FormLabelText text="Category" />
          <Button
            onPress={() => {
              this._openCategorySelectionModal();
            }}
            theme={2}
            buttonText={"Select Category"}
          />
          <FormLabelText text="Location" />
          <Button
            onPress={() => {
              this._openLocationSelectionModal();
            }}
            theme={2}
            buttonText={"Select Location"}
          />
          <FormLabelText text="Address" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({address:e})}}
          />
          <FormLabelText text="Postal Code" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({postalCode:e})}}
          />
          <FormLabelText text="Year Built" />
          <MKTextField
            style={{marginTop: 10, height: 40}}
            onTextChange={(e)=>{this.setState({yearBuilt:e})}}
          />
          <FormLabelText text="Images" />
          <View style={Styles.selectedImagesBarPreview}>{buildingImage}</View>
          <Button
            onPress={() => {
              this.openImagePicker();
            }}
            theme={2}
            buttonText={"Add an image"}
          />
          <Button
            onPress={() => {
              Alert.alert('Building added', 'Your building has been successfully added.')
              Actions.pop()
            }}
            theme={1}
            buttonText={"Submit"}
          />


        </ScrollView>
        <CategoryPicker
          categories={this._getAvailableCategories()}
          onSelectCategory={this._selectCategory.bind(this)}
          triggerCategoryModal={this.state.showCategoryListModal}
          currentlySelectedCategories={this.state.category}
          onClose={()=>{this.setState({showCategoryListModal:false})}}
        />
        <LocationPicker
          locations={this._getAvailableLocations()}
          onSelectLocation={this._selectLocation.bind(this)}
          triggerLocationModal={this.state.showLocationListModal}
          currentlySelectedLocations={this.state.location}
          onClose={()=>{this.setState({showLocationListModal:false})}}
        />
      </View>

    );
  }
}

const style = StyleSheet.create({
  selectedBuildingImage: {

  }
})
