import { StyleSheet, Dimensions } from 'react-native';

export const FULLWIDTH = Dimensions.get('window').width;
export const FULLHEIGHT = Dimensions.get('window').height;

const NAVBARHEIGHT = 64;
const TABMENUBARHEIGHT = 50;

export const COLORS =  {
  THEME: '#FF6822',
  SECONDARY: '#46AEFF',
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  STAR: '#FFE12C'
}

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: "center",
    // alignItems: "center",
    marginTop : NAVBARHEIGHT,
    marginBottom : TABMENUBARHEIGHT,
    marginRight: 5,
    marginLeft: 5
  },
  tabMenuBarStyles: {
    backgroundColor: '#ffffff',
    shadowOpacity: 0.2,
    shadowOffset: { height: -1 }
  },
  tabIconSelected: {
    borderBottomWidth:2,
    borderBottomColor: COLORS.THEME
  },
  buildingsListStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  buildingComponent:{
    width: FULLWIDTH*.47,
    height: FULLHEIGHT*.30,
    margin: 5,
    padding: 5,

    // Material card styling
    borderRadius: 2,
    elevation: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowColor: '#000000'
  },
  buildingComponentTouchable: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buildingThumbnail: {
    width:FULLWIDTH*.40,
    height:FULLHEIGHT*.20,
    marginTop: 2,
    marginBottom: 2,

  },
  buildingBanner: {
    height: FULLHEIGHT*.30
  },
  buildingComponentButtons: {
    width: FULLWIDTH*.40,
    height: 10,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'flex-end',
  },
  formTitle: {
    marginTop: 10,
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold'
  },
  formLabel: {
    marginTop: 10,
    color: 'grey'
  },
  selectedImageDimensions: {
    width: 100,
    height:100,
    borderWidth: 1,
    margin: 5,
  },
  selectedImagesBarPreview: {
    marginTop: 10,
    flexWrap: 'wrap',
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buildingDetailsFloatingButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    flex: 1,
    // width: FULLWIDTH*.48,
    opacity: 0.8
  },
  commentContainer: {
    position: 'relative',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.BLACK
  },





  // misc
  headingsMargin: {
    margin: 5
  },
  boldFont: {
    fontWeight: 'bold'
  }
})
