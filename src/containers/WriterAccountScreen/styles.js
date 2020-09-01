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
    height: Platform.OS != 'ios'?150:130,
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  menuIcon:{
    height: 35,
    width: 35,
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
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
    marginRight: 35,
    fontFamily:'Quicksand-Regular'
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 0,
    backgroundColor: colors.circleColor,
  },
  imageCon:{
    marginTop: -50,
  },
  scrollView:{
    flex: 1,
    backgroundColor: 'transparent',
  },
  userImageStyle:{
    width: 100,
    height: 100,
    borderRadius: (ScreenWidth/3)/2,
    backgroundColor: colors.primary,
    overflow: 'hidden'
  },
  centerAlgin:{
    alignSelf: 'center',
    alignItems: 'center'
  },
  nameTextView:{
    marginTop: 8,
  },
  nameTxt:{
    fontSize: resonsiveText(12),
    color: colors.primaryf3,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  listView:{
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 30
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    padding: 20,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointTxt:{
    fontSize: resonsiveText(10),
    color: colors.pointColor,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  iconsStyle:{
    height: 18,
    width: 18,
  },
  rightIcon:{
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTxt:{
    fontSize: resonsiveText(11),
    color: colors.primaryf3,
    fontWeight: '600',
    fontFamily:'Quicksand-Regular'
  },
})