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
  headerContainer:{
    width: '100%',
    height: Platform.OS==='ios'? 150: 120,
    paddingTop: 5,
    backgroundColor: colors.supportHeaderColor,
  },
  headView:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
  },
  backIcon:{
    height: 20,
    width: 20
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  headerText:{
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 20,
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.circleColor,
    alignItems: 'center',
  },
  supportImage:{
    width: ScreenWidth/1.5,
    height: ScreenWidth/1.5,
    marginTop: -ScreenWidth/3.4
  },
  helpText:{
    fontSize: resonsiveText(13),
    color: colors.primary,
    fontWeight: '600',
    marginTop: 5,
  },
  decView:{
    width: ScreenWidth/1.2,
    marginTop: 10,
  },
  descText:{
    fontSize: resonsiveText(8),
    color: colors.grayColor83,
    fontWeight: 'normal',
    textAlign: 'center',
    lineHeight: 15,
  },
  formView:{
    marginTop: 30,
   paddingHorizontal: 10
  },
  gradientStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    marginBottom: 15,
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
  },
  inputField2:{
    width: '90%',
    height: '100%',
  },
  inputField:{
    flex: 1,
    marginTop: 10
  },
  mailIcon:{
    height: 18,
    width: 18,
  },
  sendButton:{
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  sendText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
  },
})