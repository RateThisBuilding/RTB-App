import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native'
import { Select, Option, OptionList, updatePosition } from 'react-native-dropdown'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'

import { Title } from '../components/typography'
import { FormLabelText } from '../components/formItems'
import Styles, { COLORS } from '../styles'

// TODO: Grab these programmatically using API
const ALL_AVAILABLE_LOCATIONS = [
  'Downtown - Chinatown',
  'Downtown - City Center',
  'Downtown - Coal Harbour',
  'Downtown - Gastown',
  'Downtown - West End',
  'Downtown - Yaletown',
  'Coquitlam - City Center',
  'Vancouver East - Fraserview',
  'Vancouver West - Broadway Cambie',
  'Vancouver West - Olympic Village',
  'Vancouver West - South Granville',
  'Burnaby - Brentwood',
  'Burnaby - Metrotown',
  'Burnaby - Lougheed',
  'Richmond - Brighouse',
  'Richmond - West Cambie'
]

export default class BuildingSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      category: 1,
      address: '',
      location: ''
    }
  }

  componentWillMount(){

  }
  componentDidMount(){
    updatePosition(this.refs['SELECT_CATEGORY']);
    updatePosition(this.refs['SELECT_LOCATION']);
    updatePosition(this.refs['OPTIONLIST']);
  }

  _getOptionList() {
    return this.refs['OPTIONLIST']
  }

  _createLocationOptions() {
    return ALL_AVAILABLE_LOCATIONS.map((location)=><Option key={location}>{location}</Option>)
  }

  render() {
    return (
      <View style={[Styles.container]}>
        <Title text="Search for building..." />
        <FormLabelText text="Building Category" />
        {/* <Picker
          selectedValue={this.state.category}
          onValueChange={(type) => this.setState({category: type})}
          itemStyle={{fontSize: 25, color: 'red', textAlign: 'left', fontWeight: 'bold'}}
          style={{}}>
          <Picker.Item label="Apartments/Condos" value="1" />
          <Picker.Item label="Townhome" value="2" />
        </Picker> */}
        <Select
          ref="SELECT_CATEGORY"
          optionListRef={this._getOptionList.bind(this)}
          onSelect={(item) => {this.setState({category:item})}}
        >
          <Option>Apartments/Condo</Option>
          <Option>Townhome</Option>
        </Select>

        <FormLabelText text="Address" />
        <MKTextField
          tintColor={MKColor.Lime}
          textInputStyle={{color: MKColor.Orange}}
          placeholder=""
        />
        <FormLabelText text="Location" />
        <Select
          ref="SELECT_LOCATION"
          optionListRef={this._getOptionList.bind(this)}
          onSelect={(location) => {this.setState({location:location})}}
          width={300}
        >
          {ALL_AVAILABLE_LOCATIONS.map((location)=><Option key={location}>{location}</Option>)}
        </Select>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <MKButton
            backgroundColor={COLORS.THEME}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 10,  }}
            onPress={() => {
              // Alert.alert('Review added', 'Your review has been successfully added.')
              Actions.pop()
            }}
          >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              Search
            </Text>
          </MKButton>
        </View>

        {/* This needs to be the last element since otherwise it will be covered by other components */}
        <OptionList ref="OPTIONLIST" style={{height:100}} />
      </View>
    )
  }
}
