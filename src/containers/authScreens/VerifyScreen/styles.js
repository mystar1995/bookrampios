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
import colors from '../../../utils/colors';
//=== resonsiveText ===
import resonsiveText from '../../../utils/fontResponsive';

//=== design ===
export default StyleSheet.create({
	screenContainer:{
		flex: 1,
		backgroundColor: colors.secondry,
  },
  topImage:{
    width: ScreenWidth,
    height: ScreenHeight/6,
  },
  imageStyle2:{
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    marginTop: 0
  },
  imageStyle:{
    height: '100%',
    width: '100%',
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    paddingTop: 0
  },
  logoStyle:{
    height: 100,
    width: 150,
    alignSelf: 'center',
    backgroundColor: colors.secondry
  },
  textView:{
    marginTop: '1%',
    marginBottom: ScreenHeight/17
  },
  appNameView:{
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameText:{
    color: colors.primary,
    fontSize: resonsiveText(20),
    fontWeight: 'bold',
    textTransform:'uppercase',
    fontFamily:'Quicksand-Regular'
  },
  form:{
    flex:1
  },
  descView:{
    width: ScreenWidth/2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    lineHeight: 20,
    letterSpacing: 1
  },
  descText:{
    color: colors.primary,
    fontSize: resonsiveText(13),
    fontWeight: '600',
    textAlign : 'center',
    fontFamily:'Quicksand-Regular'
  },
  gradientStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: resonsiveText(15),
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  inputField:{
    width: '90%',
    height: '100%',
  },
  formContainers:{
    marginTop: 20,
    paddingHorizontal: 5
  },
  mailIcon:{
    height: 18,
    width: 18,
  },
  rowContainer2:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  forgetButton:{
    padding: 10,
    borderBottomColor: colors.primary,
  },
  forgetText:{
    color: colors.primary,
    fontSize: resonsiveText(10),
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  bottonLine:{
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  submitButton:{
    height: 50,
    marginTop: 20,
    width: ScreenWidth/2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor,
  },
  submitText:{
    color: colors.primary,
    fontSize: resonsiveText(15),
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
})