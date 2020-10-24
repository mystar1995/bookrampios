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
    height: Platform.OS==='ios'?100: 80,
  },
  headerContainer:{
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 5,
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
  backIcon:{
    height: 33,
    width: 33,
    padding: 3,
  },
  imageStyle2:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  gradientStyle:{
    height: 30,
    width: 30,
    borderRadius: 15,
    padding: 1,
  },
  searchIcon:{
    width: '100%',
    height: '100%',
    borderRadius: 15,
    padding: 5,
    overflow: 'hidden',
    backgroundColor: colors.secondry
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
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.circleColor,
  },
  rowContainer:{
    width: '100%',
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 5,
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer3:{
    width :'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cloumnStyle:{
    flex: 1,
  },
  bookImageStyle1:{
    height: 140,
    width: 110,
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
  bookName:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  bookView:{
    width: 100,
    marginBottom: 5,
  },
  greenView:{
    borderBottomColor: colors.greenColor1b,
    borderBottomWidth: 1,
    paddingBottom: 1,
    marginLeft: 8,
  },
  greenText:{
    fontSize: resonsiveText(8),
    color: colors.greenColor1b,
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
  rowHelpView:{
    marginLeft: 8,
  },
  overallRating:{
    marginLeft: 5,
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 5,
    backgroundColor: colors.secondry
  },
  ratingView:{
    width: 50,
    marginVertical: 5
    //marginTop: 20
  },
  iconStyle:{
    width: 20,
    height: 20,
    marginRight: 5,
  },
  circleStyle:{
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor: colors.grayColor4a
  },
  lineStyle:{
    width: '93%',
    height: 1,
    backgroundColor: colors.grayColor4a
  },
  //==
  checkBoxContainer:{
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  rowContainer21:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
    marginLeft:5,
    fontFamily:'Quicksand-Regular'
  },
  rowContainer31:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 5
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
  payButton:{
    marginTop: 50,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor,
    marginBottom: 10
  },
  payText:{
    fontSize: resonsiveText(11),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  // === Payment conform modal ===
  modalView:{
    width: ScreenWidth-40,
    height: 400,
    marginLeft: -3,
    padding: 2,
    shadowOffset:{
      height: 0,
      width: 0
    },
    shadowColor: colors.showColor1f,
    backgroundColor: colors.circleColor,
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer:{
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  txtView:{
    width: '100%',
    textAlign:'center'
  },
  modalText:{
    fontSize: resonsiveText(18),
    color: colors.primary,
    fontWeight: 'bold',
    textAlign:'center',
    fontFamily:'Quicksand-Regular'
  },
  readButton:{
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor,
    marginBottom: 20
  },
  readText:{
    fontSize: resonsiveText(11),
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily:'Quicksand-Regular'
  },
  backText:{
    fontSize: resonsiveText(9),
    color: colors.primary,
    fontWeight: '600',
    alignSelf: 'center',
    fontFamily:'Quicksand-Regular'
  },
}) 