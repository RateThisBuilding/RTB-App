import React, { Component } from 'react'
import { View, Text, Picker, ScrollView, ListView } from 'react-native'
// import Picker from 'react-native-picker'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modalbox'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { applySearchParams } from '../actions/buildingList'
import PickerList from '../components/pickerList'
import { Title } from '../components/typography'
import { FormLabelText } from '../components/formItems'
import Styles, { COLORS, FULLWIDTH, FULLHEIGHT } from '../styles'

// TODO: Grab these programmatically using API
import LOCATION_DATA from '../../data/locations'

class BuildingSearch extends Component {
  constructor(props){
    super(props);

    this.state = {
      category: this.props.searchParams.category,
      address: this.props.searchParams.address,
      location: this.props.searchParams.location,
    }
  }

  componentWillMount(){
  }
  componentDidMount(){
  }

  _getOptionList() {
    return this.refs['OPTIONLIST']
  }

  _getAvailableCategories() {
    return [
      {label:"Any", value:"*"},
      {label:"Apartments", value:"2"},
      {label:"Townhome", value:"3"}
    ]
  }

  _selectCategory(category){
    console.log(this);
    // this.setState({category: category})
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
            backgroundColor={COLORS.THEME}
            shadowRadius={2}
            shadowOffset={{width:0, height:2}}
            shadowOpacity={.7}
            shadowColor="black"
            style={{ marginTop: 10, padding: 10,  }}
            onPress={() => {
              this.refs.testModal.open();
            }}
          >
            <Text pointerEvents="none"
              style={{color: 'white', fontWeight: 'bold',}}>
              Open modal
            </Text>
          </MKButton>



          <FormLabelText text="Address" />
          <MKTextField
            tintColor={MKColor.Lime}
            textInputStyle={{color: MKColor.Orange}}
            placeholder=""
            onTextChange={(e)=>{this.setState({address:e});}}
          />
          <FormLabelText text="Location" />
          <Picker
            selectedValue={this.state.location}
            onValueChange={(location) => this.setState({location: location})}
            itemStyle={{fontSize: 15, fontWeight: 'bold'}}
            style={{}}>
            {LOCATION_DATA.map((location)=>
              <Picker.Item label={location.label} key={location.value} value={location.value}/>
            )}
          </Picker>

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
                // Actions.buildingsTab({searchActive: 'active'})
                this.props.applySearchParams(this._buildSearchParams())
                Actions.pop();
                // Actions.buildings({searchActive: 'active'})
              }}
            >
              <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold',}}>
                Search
              </Text>
            </MKButton>
          </View>
        </ScrollView>

        <Modal
          style={{width: FULLWIDTH*0.7, height: FULLHEIGHT*0.5}}
          position={'center'}
          ref={'testModal'}
          swipeToClose={false}
        >
          <View style={{flex: 1, alignItems: 'center'}}>
            <FormLabelText text="Building Category" />
            {/* <Picker
              selectedValue={this.state.category}
              onValueChange={(type) => this.setState({category: type})}
              itemStyle={{fontSize: 15, fontWeight: 'bold'}}
              style={{}}>
              <Picker.Item label="Any" value="*" />
              <Picker.Item label="Apartments/Condos" value="2" />
              <Picker.Item label="Townhome" value="3" />
            </Picker> */}
            <PickerList
              items={this._getAvailableCategories()}
              onItemSelect={this._selectCategory}
            />
            <MKButton
              backgroundColor={COLORS.THEME}
              shadowRadius={2}
              shadowOffset={{width:0, height:2}}
              shadowOpacity={.7}
              shadowColor="black"
              style={{ marginTop: 10, padding: 10,  }}
              onPress={() => {

                this.refs.testModal.close();
              }}
            >
              <Text pointerEvents="none"
                style={{color: 'white', fontWeight: 'bold',}}>
                OK
              </Text>
            </MKButton>


          </View>
        </Modal>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchParams: state.buildingList.searchParams,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ applySearchParams },dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingSearch)
