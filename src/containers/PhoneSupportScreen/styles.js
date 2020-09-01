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
    height: Platform.OS==='ios'? 130: 80,
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
    width: 20,
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
    fontFamily:'Quicksand-Regular'
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
  },
  helpText:{
    fontSize: resonsiveText(13),
    color: colors.primary,
    fontWeight: '600',
    marginTop: 5,
    fontFamily:'Quicksand-Regular'
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
    fontFamily:'Quicksand-Regular'
  },
  callButton:{
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  callText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
})