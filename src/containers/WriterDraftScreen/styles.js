//=== stylesheet ===
import {
	StyleSheet,
	Dimensions,
	Platform
} from 'react-native';
// === Dimension ===
const ScreenHeight = Math.round(Dimensions.get('window').height);
const ScreenWidth = Math.round(Dimensions.get('window').width);
//=== colors ===
import colors from '../../utils/colors';
//=== resonsiveText ===
import resonsiveText from '../../utils/fontResponsive';

//=== design ===
export default StyleSheet.create({
	screenContainer:{
    flex: 1,
    backgroundColor: Platform.OS==='ios'? colors.circleColor : colors.supportHeaderColor,
  },
  headerContainer2:{
    height: Platform.OS != 'ios'?100:120,
    width: '100%',
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 25,
    paddingTop: 10,
  },
  menuIcon:{
    height: 35,
    width: 35,
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  imageStyle2:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  headerText:{
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  plusIcon:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
  },
  mainContainer:{
    flex: 1,
    paddingLeft: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: Platform.OS==='ios'? -30: -10,
    backgroundColor: colors.circleColor,
    fontFamily:'Quicksand-Regular'
  },
  //=== Top tab ===
  topTabContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingTop: 15,
    paddingBottom: 20,
  },
  tabStyle:{
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 11,
  },
  tabText:{
    fontSize: resonsiveText(11),
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  //== submission style ===
  rowContainer:{
    flexDirection: 'row',
  },
  rowStyle:{
    justifyContent: 'space-between',
    width: '73%',
  },
  paddingStyle:{
    paddingBottom: 10,
    marginBottom: 10,
  },
  listContainer:{
    marginTop: 10
  },
  boxStyle:{
    width: ScreenWidth/5,
    height: ScreenWidth/3.7,
    marginBottom: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  boxContainer:{
    marginRight: 20,
    borderRadius: 5,
    overflow: 'hidden',
    width: ScreenWidth/3.3,
  },
  bookTxtView:{
    width: ScreenWidth/3,
  },
  bookText:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  bookDesc:{
    fontSize: resonsiveText(10),
    color: colors.grayColor,
    fontFamily:'Quicksand-Regular',
    marginBottom:5
  },
  iconStyle:{
    width: 25,
    height: 25,
    marginTop: 10
  },
  marginStyle:{
    marginTop: 5
  },
  updateText:{
    fontSize: resonsiveText(8),
    color: colors.grayColor83,
    fontWeight: '600',
    fontStyle: 'italic',
    fontFamily:'Quicksand-Regular'
  },
  timeText:{
    marginLeft: 2,
    fontSize: resonsiveText(8),
    color: colors.submitColor,
    fontWeight: '600',
    fontStyle: 'italic',
    fontFamily:'Quicksand-Regular'
  },
  iconStyle2:{
    height: 10,
    width: 10,
    marginRight: 8,
  },
  iconStyle3:{
    height: 10,
    width: 10,
    marginRight: 8,
  },
  countText:{
    fontSize: resonsiveText(8),
    color: colors.grayColor83,
    fontWeight: '600',
    fontFamily:'Quicksand-Regular'
  },
  alignCenter:{
    alignItems: 'center',
    marginTop: 20
  },
  // === draft ===
  buttonStyle:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.submitColor
  },
  buttonStyle2:{
    paddingLeft:10,
    paddingRight:10,
    paddingTop:5,
    paddingBottom:5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 15,
    backgroundColor: colors.redColor
  },
  buttonText:{
    color: colors.primary,
    fontSize: resonsiveText(10),
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  viewContainer:{
    shadowOffset:{
      height: 0,
      width: 0
    },
    shadowColor: colors.grayColor83,
    backgroundColor: colors.circleColor,
    elevation: 10,
    shadowOpacity: 1,
    shadowRadius: 5,
    padding: 20,
    width: '100%',
    position: 'absolute',
    top: Platform.OS==='ios'? 80: 30,
    margin: 5
  },
  modalButton:{
    borderBottomColor: colors.grayColor3,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  modalText:{
    fontSize: resonsiveText(10),
    color: colors.primary,
    fontWeight: 'bold',
  }
})