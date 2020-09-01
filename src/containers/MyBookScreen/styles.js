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
    backgroundColor: colors.circleColor
  },
  headerContainer2:{
    width: '100%',
    height: Platform.OS==='ios'?120: 100,
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  plusIcon:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
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
    textAlign:'center',
    fontFamily:'Quicksand-Regular'
  },
  contentView:{
    width :'100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -22,
    backgroundColor: colors.circleColor
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
  rowContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    height: '100%',
    width :'100%',
    paddingHorizontal: 20,
    backgroundColor: colors.secondry,
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
    width: '90%',
    height: '100%',
  },
  mailIcon:{
    height: 18,
    width: 18,
  },
  rowContainer4:{
    flexDirection: 'row',
    width: '100%',
  },
  cloumn1:{
    width: '49%',
    marginRight: '2%',
  },
  cloumn2:{
    width: '49%',
    marginRight: 10,
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
  rowContainer2:{
    width: '100%',
    paddingTop: 20
  },
  rectangleContainer:{
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    // backgroundColor: 'red'
  },
  bookImageStyle1:{
    height: 130,
    width: 100,
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  titleText:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
    fontFamily:'Quicksand-Regular'
  },
  greenView:{
    borderBottomColor: colors.greenColor,
    borderBottomWidth: 1,
    paddingBottom: 1,
    marginLeft: 2,
  },
  greenText:{
    fontSize: resonsiveText(8),
    color: colors.greenColor,
    fontWeight: '300',
    fontStyle: 'italic',
    fontFamily:'Quicksand-Regular'
  },
  subheadingText:{
    fontSize: resonsiveText(8),
    color: colors.grayColor,
    fontStyle: 'italic',
    fontFamily:'Quicksand-Regular'
  },
  normalView:{
    paddingBottom: 1,
    marginLeft: 2,
  },
  overallRating:{
    marginLeft: 5,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.secondry
  },
  readmoreButton:{
    width: 60,
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  readMoreText:{
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  ratingView:{
    width: 50,
    marginVertical: 5
    //marginTop: 20
  },
  rowContainer3:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  rowContainer5:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '69%',
    alignItems: 'center',
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