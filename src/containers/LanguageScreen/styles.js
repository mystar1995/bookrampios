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
  },
  headerContainer2:{
    height: Platform.OS==='ios'?120: 100,
    width: '100%',
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
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
  headingText:{
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
    },
  gradientStyle:{
    height: 40,
    width: 40,
  },
  gradientStyle:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
  },
  searchIcon:{
    height: '100%',
    width: '100%',
    borderRadius: 20,
    padding: 5,
    backgroundColor: colors.secondry
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -22,
    backgroundColor: colors.secondry,
  },
  circleView:{
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: colors.greenColor,
    borderWidth: 1,
  },
  optionText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBoxStyle:{
    width: 30,
    height: 30
  },
  textView:{
    marginLeft: 15
  },
})