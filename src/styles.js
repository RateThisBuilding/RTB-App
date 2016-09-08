import { StyleSheet, Dimensions } from 'react-native';

const fullWidth = Dimensions.get('window').width;
const fullHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop : 64,
    marginBottom : 50
  },
  tabItem: {
  },
  tabItemSelected: {
    color: '#ff0000',
  },
  tabItemSelectedIcon: {
    borderBottomWidth:2,
    borderBottomColor:'#ff0000'
  },
  buildingComponent:{
    width: fullWidth*.5,
    height: fullHeight*.25,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  buildingImage: {
    width:fullWidth*.45,
    height:fullHeight*.20
  }
})
