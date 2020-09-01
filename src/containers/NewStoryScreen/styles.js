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
    height: Platform.OS==='ios'?200: 120,
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
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    marginLeft: 13,
    textAlign:'center',
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
  error:{
    color:'red'
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
    borderRadius: 20,
    overflow: 'hidden',
    height: 110,
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
    marginTop: 5
  },
  pickerStyles:{
    backgroundColor: colors.secondry,
  },
  itemTextStyles:{
    fontSize: resonsiveText(9),
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  uploadImage:{
    height: 25,
    width: 25,
    marginRight: 10,
  },
  gradientUploadStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    width: ScreenWidth/2.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 2,
  },
  uploadButton:{
    height: '100%',
    width: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.secondry
  },
  chooseTxt:{
    fontSize: resonsiveText(12),
    fontWeight: '600',
    color: colors.primary,
    fontFamily:'Quicksand-Regular'
  },
  desChooseTxt:{
    fontSize: resonsiveText(9),
    fontWeight: 'normal',
    color: colors.grayColor83
  },
  arrowIcon:{
    height: 18,
    width: 18,
  },
  submitButton:{
    paddingVertical: 13,
    paddingHorizontal: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  submitText:{
    color: colors.primary,
    fontSize: resonsiveText(11),
    fontWeight: 'bold',
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