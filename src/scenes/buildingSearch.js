import React, { Component } from 'react'
import { View, Text, ScrollView, ListView } from 'react-native'
// import Picker from 'react-native-picker'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import SceneContainer from '../components/sceneContainer'
import { Title } from '../components/typography'
import { FormLabelText, Button, TextField } from '../components/formItems'
import CategoryPicker from '../components/categoryPicker'
import LocationPicker from '../components/locationPicker'
import { applySearchParams } from '../actions/buildingSearch'
import Styles, { COLORS } from '../styles'

// TODO: Grab these programmatically using API
import LOCATION_DATA from '../../data/locations'

class BuildingSearch extends Component {

  static propTypes = {
    searchParams: React.PropTypes.object,
    tempParams: React.PropTypes.object,
  }

  constructor(props){
    super(props);
    this.state = {
      category: this.props.searchParams.category,
      address: this.props.searchParams.address,
      location: this.props.searchParams.location,
      showCategoryListModal: false,
      showLocationListModal: false,
    }
  }

  componentWillMount(){
  }
  componentDidMount(){
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

  _getAvailableCategories() {
    return [
      {label:"Any", value:"*"},
      {label:"Apartments", value:"2"},
      {label:"Townhome", value:"3"}
    ]
  }

  _getAvailableLocations() {
    return LOCATION_DATA;
  }

  _selectCategory(category){
    this.setState({
      category: category
    })
  }

  _selectLocation(location){
    this.setState({
      location: location
    })
  }

  _buildSearchParams() {
    return {
      category: this.state.category,
      address: this.state.address,
      location: this.state.location
    }
  }

  updateFormVal(key, val){
    this.setState({
      [key] : val
    })
  }


  render() {

    return (
      <SceneContainer>
        <ScrollView>
          <Title text="Search for Building" />
          {/* TODO: Make the following 2 into a form group? */}
          <FormLabelText text="Building Category" />
          <Button
            onPress={() => {
              this._openCategorySelectionModal();
            }}
            theme={2}
            buttonText={"Select Category"}
          />
          <FormLabelText text="Address" />
          <TextField
            defaultText={this.props.searchParams.address}
            onTextChange={this.updateFormVal.bind(this, 'address')}
          />
          <FormLabelText text="Location" />
          <Button
            onPress={() => {
              this._openLocationSelectionModal();
            }}
            theme={2}
            buttonText={"Select Location"}
          />
          <Button
            onPress={() => {
              this.props.applySearchParams(this._buildSearchParams())
              Actions.pop();
            }}
            theme={1}
            buttonText={"Search"}
          />
        </ScrollView>
        {/* Consider Refactoring the pickers into containers instead */}
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
      </SceneContainer>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchParams: state.buildingSearch.searchParams,
    tempParams: state.buildingSearch.tempParams
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    applySearchParams,
   },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingSearch)
