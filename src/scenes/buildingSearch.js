import React, { Component } from 'react'
import { View, Text, Picker, ScrollView } from 'react-native'
// import Picker from 'react-native-picker'
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit'
import { Actions, ActionConst } from 'react-native-router-flux'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { applySearchParams } from '../actions/buildingList'
import { Title } from '../components/typography'
import { FormLabelText } from '../components/formItems'
import Styles, { COLORS } from '../styles'

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
          <Picker
            selectedValue={this.state.category}
            onValueChange={(type) => this.setState({category: type})}
            itemStyle={{fontSize: 15, fontWeight: 'bold'}}
            style={{}}>
            <Picker.Item label="Apartments/Condos" value="2" />
            <Picker.Item label="Townhome" value="3" />
          </Picker>


          <FormLabelText text="Address" />
          <MKTextField
            tintColor={MKColor.Lime}
            textInputStyle={{color: MKColor.Orange}}
            placeholder=""
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
