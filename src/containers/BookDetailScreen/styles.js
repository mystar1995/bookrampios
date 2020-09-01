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
    height: Platform.OS==='ios'? 150 : 130,
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 15,
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
    marginRight: 35,
    fontFamily:'Quicksand-Regular'
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    paddingTop: 0,
    backgroundColor: colors.circleColor,
  },
  scrollView:{
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: -30,
  },
  bookImageStyle:{
    width: ScreenWidth/3-10,
    height: ScreenWidth/3,
    borderRadius: 10,
    overflow: 'hidden'
  },
  centerAlgin:{
    alignSelf: 'center',
    alignItems: 'center'
  },
  ratingContainer:{
    marginTop: 12,
    width: 80,
  },
  starStyles:{
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 1
  },
  bookTextView:{
    width: 150,
    marginTop: 9,
    alignSelf: 'center',
    alignItems: 'center'
  },
  bookNameTxt:{
    fontSize: resonsiveText(12),
    color: colors.bookTitle,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  rowView:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  otherText:{
    fontSize: resonsiveText(9),
    color: colors.grayColor3,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  borderView:{
    marginLeft: 5,
    width: 60,
    borderBottomColor: colors.greenColor15,
    borderBottomWidth: 1,
    paddingBottom: 1,
  },
  greenTxt:{
    fontSize: resonsiveText(9),
    color: colors.greenColor15,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  increaseWidth:{
    width: ScreenWidth/1.6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  descView:{
    width: '100%',
    marginTop: 15,
  },
  descText:{
    fontSize: resonsiveText(11),
    color: colors.bookTitle,
    fontWeight: '600',
    //lineHeight: 20,
    textAlign: 'left',
    fontFamily:'Quicksand-Regular'
  },
  readMoreButton:{
    borderBottomWidth: 1,
    width :85,
    borderBottomColor: colors.greenColor28,
    paddingBottom: 1,
    marginTop: 3,
  },
  readMoreTxt:{
    fontSize: resonsiveText(9),
    color: colors.greenColor28,
    fontWeight: '600',
    fontFamily:'Quicksand-Regular'
  },
  checkBoxContainer:{
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  rowContainer2:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 5,
    paddingVertical: 13,
    borderRadius: 2,
    backgroundColor: colors.listColor
  },
  checkBoxTxt:{
    fontSize: resonsiveText(9),
    color: colors.grayColor45,
    fontWeight: 'normal',
    marginLeft: 5,
    fontFamily:'Quicksand-Regular'
  },
  pointText:{
    fontSize: resonsiveText(9),
    color: colors.primary,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  rowContainer3:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  marginIncrease:{
    marginTop: 30
  },
  totalView:{
    paddingTop: 15,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.grayColor3
  },
  cartButton:{
    width: 180,
    height: 45,
    marginTop: 50,
    paddingVertical: 2,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor,
    marginBottom: 10
  },
  cartText:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
})