import React, { Component } from 'react'
import { View, Text, Picker, ScrollView, ListView } from 'react-native'
// import Picker from 'react-native-picker'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { applySearchParams, updateTempParams, discardTempParams, updateParams } from '../actions/buildingSearch'
import { Title } from '../components/typography'
import { FormLabelText } from '../components/formItems'
import CategoryPicker from '../components/categoryPicker'
import LocationPicker from '../components/locationPicker'
import Styles, { COLORS } from '../styles'

// TODO: Grab these programmatically using API
import LOCATION_DATA from '../../data/locations'

class BuildingSearch extends Component {

  static propTypes = {
    searchParams: React.PropTypes.object,
    tempParams: React.PropTypes.object,
    discardTempParams: React.PropTypes.func
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


  render() {

    return (
      <View style={[Styles.container]}>
        <ScrollView>
          <Title text="Search for building..." />
          <FormLabelText text="Building Category" />
          <MKButton
            backgroundColor={COLORS.SECONDARY}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 10, alignSelf: 'center' }}
            onPress={() => {
              this._openCategorySelectionModal();
            }}
          >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              Select Category
            </Text>
          </MKButton>



          <FormLabelText text="Address" />
          <MKTextField
            tintColor={MKColor.Lime}
            textInputStyle={{color: MKColor.Orange}}
            placeholder=""
            defaultValue={this.props.searchParams.address}
            onTextChange={(e)=>{this.setState({address:e});}}
          />
          <FormLabelText text="Location" />
          <MKButton
            backgroundColor={COLORS.SECONDARY}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 10, alignSelf: 'center' }}
            onPress={() => {
              this._openLocationSelectionModal();
            }}
          >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              Select Location
            </Text>
          </MKButton>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <MKButton
              backgroundColor={COLORS.THEME}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              style={{ marginTop: 10, padding: 10,  }}
              onPress={() => {
                this.props.applySearchParams(this._buildSearchParams())
                Actions.pop();
              }}
            >
              <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold',}}>
                Search
              </Text>
            </MKButton>
          </View>
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
      </View>
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
    discardTempParams,
    updateTempParams,
    updateParams
   },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingSearch)
