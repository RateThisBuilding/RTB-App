import { StyleSheet, Dimensions } from 'react-native';

const FULLWIDTH = Dimensions.get('window').width;
const FULLHEIGHT = Dimensions.get('window').height;

const NAVBARHEIGHT = 64;
const TABMENUBARHEIGHT = 50;

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    margin: 10,
    marginTop : NAVBARHEIGHT,
    marginBottom : TABMENUBARHEIGHT
  },
  tabMenuBarStyles: {
    backgroundColor: '#ffffff',
    shadowOpacity: 0.2,
    shadowOffset: { height: -1 }
  },
  tabIconSelected: {
    borderBottomWidth:2,
    borderBottomColor:'#FF0000'
  },
  buildingsListStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'center'
  },
  buildingComponent:{
    width: FULLWIDTH*.43,
    height: FULLHEIGHT*.30,
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding: 5,

    // Material card styling
    borderRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowColor: '#000000'
  },
  buildingImage: {
    width:FULLWIDTH*.40,
    height:FULLHEIGHT*.20
  },
  buildingComponentButtons: {
    width: FULLWIDTH*.40,
    height: 10,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
  }
})
