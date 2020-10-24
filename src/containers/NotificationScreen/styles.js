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
    backgroundColor: colors.darkBackground
  },
  headerContainer2:{
    height: Platform.OS==='ios'?120: 100,
    width: '100%',
    marginTop: -1,
  },
  headerContainer:{
    height: 90,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  menuIcon:{
    height: 35,
    width: 35,
  },
  backIcon:{
    height: 33,
    width: 33,
    padding: 3,
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
    marginTop: -15,
    backgroundColor: colors.darkBackground,
  },
  bookView:{
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleView:{
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary
  },
  optionText:{
    fontSize: resonsiveText(13),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5
  },
  rowContainer2:{
    flexDirection: 'row',
  },
  checkBoxStyle:{
    width: 30,
    height: 30
  },
  textViewRow1:{
    marginLeft: 15
  },
  textViewRow2:{
    marginLeft: 8
  },
  text2View:{
    marginTop: 5,
  },
  timeText:{
    fontSize: resonsiveText(8),
    color: colors.grayColor,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  optionText2:{
    fontSize: resonsiveText(12),
    color: colors.grayColor,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  separatorStyle:{
    height: 1,
    opacity: 0.8,
    backgroundColor: colors.borderColor
  },
})