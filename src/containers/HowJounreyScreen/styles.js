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
    height: 300,
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
  mainContainer:{
    flex: 1,
    padding: 20,
    backgroundColor: colors.circleColor,
  },
  mainList:{
    marginTop: 20,
    paddingTop: 20
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.listColor,
    borderBottomColor: colors.lineColor,
    width: '100%',
  },
  headingText:{
    fontSize: resonsiveText(16),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  listOptionTxt:{
    fontSize: resonsiveText(13),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  imageContainer:{
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.circleColor19,
    overflow: 'hidden',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton:{
    width: '60%',
    height: 50,
    paddingVertical: 2,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: 25,
    backgroundColor: colors.submitColor
  },
  closeText:{
    fontSize: resonsiveText(14),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  //=== modal ===
  modalInnerView:{
    width: ScreenWidth,
    height: ScreenHeight,
    marginLeft: -21,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headOpacity:{
    flex: 1,
    backgroundColor: colors.circleColor,
    opacity: 0.8,
  },
  footerView:{
    flex: 1,
    backgroundColor: colors.circleColor
  },
  gradientContainer:{
    width: '100%',
    height: 350,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 2
  },
  swiperContainer:{
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.secondry,
    paddingHorizontal: 20,
  },
  nextTxt:{
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  submitButton:{
    width: '60%',
    height: 50,
    paddingVertical: 2,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    marginTop: -25,
    backgroundColor: colors.submitColor
  },
  submitText:{
    fontSize: resonsiveText(14),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  rowpopContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  buttonContainer:{
    paddingBottom: 1,
    borderBottomColor: colors.greenColor33,
    borderBottomWidth: 1,
  },
  buttonText:{
    fontSize: resonsiveText(12),
    color: colors.greenColor33,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  dotsContainer:{
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  dotStyle:{
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 7,
  },
})