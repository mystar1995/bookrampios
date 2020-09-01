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
    backgroundColor: colors.circleColor,
  },
  headerContainer2:{
    width: '100%',
    height: Platform.OS != 'ios'?100:120,
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
    paddingHorizontal: 20,
  },
  backIcon:{
    height: 20,
    width: 20,
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
  plusIcon:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
  },
  headerText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 20,
    fontFamily:'Quicksand-Regular'
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.circleColor,
  },
  boonImageStyle:{
    marginTop: -ScreenWidth/5,
    height: ScreenWidth/3,
    width: ScreenWidth/3.5,
    alignSelf: 'center',
  },
  changeCover:{
    marginTop: 8,
    alignSelf: 'center',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  chgTxt:{
    color: colors.primary,
    fontSize: resonsiveText(12),
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  formContainers:{
    marginTop: 30,
  },
  gradientStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: colors.secondry
  },
  gradientTxtAreaStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 130,
    marginBottom: 10,
    padding: 2,
    backgroundColor: colors.secondry
  },
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    height: '100%',
    width :'100%',
    paddingHorizontal: 20,
    backgroundColor: colors.secondry
  },
  inputStyle:{
    padding: 0,
    width: 0,
    width: '100%',
    height: '100%',
    marginLeft: 5,
    color: colors.primary,
    fontSize: resonsiveText(9),
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  inputField:{
    flex: 1
  },
  dropDownContainer:{
    padding: 0,
    margin: 0,
    width: '100%',
    height: 30,
  },
  inputContainerStyles:{
    borderBottomColor: 'transparent',
    width: '100%',
    height: '100%',
    color: colors.primary,
    fontSize: resonsiveText(9),
    fontWeight: 'normal',
    marginTop: 5,
    fontFamily:'Quicksand-Regular'
  },
  pickerStyles:{
    backgroundColor: colors.secondry,
  },
  itemTextStyles:{
    fontSize: resonsiveText(9),
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  startButton:{
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  startText:{
    color: colors.primary,
    fontSize: resonsiveText(11),
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  arrowIcon:{
    height: 18,
    width: 18,
  },
  imageStyle3:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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
  },
})