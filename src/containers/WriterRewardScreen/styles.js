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
    paddingBottom:80
  },
  headerContainer2:{
    width: '100%',
    height: Platform.OS != 'ios'?100:120,
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
  imageStyle2:{
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  headerText:{
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    marginRight: 55,
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    marginTop: -15,
    backgroundColor: colors.circleColor,
  },
  rowContainer:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointTxt:{
    fontSize: resonsiveText(14),
    color: colors.rewardColor,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  slashTxt:{
    fontSize: resonsiveText(14),
    color: colors.primary,
    fontWeight: 'bold',
    marginHorizontal: 5,
    fontFamily:'Quicksand-Regular'
  },
  alineCenter:{
    alignSelf: 'center',
  },
  subTxt:{
    fontSize: resonsiveText(8),
    color: colors.grayColor,
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontFamily:'Quicksand-Regular'
  },
  howTxt:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: '600',
  },
  descTxtView:{
    width: ScreenWidth/1.3,
    alignSelf: 'center',
    marginTop: 10,
  },
  descTxt:{
    fontSize: resonsiveText(9),
    color: colors.grayColor83,
    fontWeight: '600',
    lineHeight: 15,
    textAlign: 'center',
    fontFamily:'Quicksand-Regular'
  },
  boxStyle:{
    width: '100%',
    padding: 20,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 20,
    shadowOffset:{
      height: 0,
      width: 0
    },
    shadowColor: colors.showColor1f,
    backgroundColor: colors.circleColor,
    elevation: 5,
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  secondColoumn:{
    marginLeft: 50
  },
  tabContainer:{
    marginTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabStyle:{
    padding: 5,
    paddingRight: 15,
    marginRight: 10,
    borderBottomColor: colors.submitColor,
  },
  tabTxt:{
    fontSize: resonsiveText(10),
    fontWeight: '600',
    fontFamily:'Quicksand-Regular'
  },
  opTxt:{
    fontSize: resonsiveText(9),
    fontWeight: '600',
    color: colors.grayColor83,
    fontFamily:'Quicksand-Regular'
  },
  opt2View:{
    marginLeft: 2
  },
  opTxt2:{
    fontSize: resonsiveText(9),
    fontWeight: '600',
    color: colors.submitColor,
    fontFamily:'Quicksand-Regular'
  },
  historyStyle:{
    marginTop: 40,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.submitColor,
    borderBottomWidth: 2,
    paddingBottom: 2,
  },
  historyTxt:{
    fontSize: resonsiveText(8),
    fontWeight: '600',
    color: colors.submitColor,
    fontFamily:'Quicksand-Regular'
  },
  iconStyle:{
    width: 10,
    height: 10
  },
  button:{
    width:150,
    height:40,
    display:'flex',
    backgroundColor:colors.submitColor,
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center'
  },
  buttontext:{
    fontSize:15,
    color:colors.primary
  },
  rewardtext:{
    fontSize:20,
    color:"white",
    marginRight:20
  },
  cancel:{
    width:150,
    height:30,
    backgroundColor:colors.redColor,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center'
  },
  buyreward:{
    width:150,
    height:30,
    backgroundColor:colors.submitColor33,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:20
  },
  input:{
    fontSize:20,
    borderColor:"white",
    width:100,
    height:40,
    borderWidth:1,
    color:'white'
  },

  modalInnerView: {
    width: ScreenWidth,
    height: ScreenHeight,
    marginLeft: -21,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'transparent'
},
headOpacity: {
    flex: 1,
    backgroundColor: colors.circleColor,
    opacity: 0.8,
},
footerView: {
    flex: 1,
    backgroundColor: colors.circleColor
},
gradientContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 2
},
swiperContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.secondry,
    paddingHorizontal: 20,
    justifyContent:'center',
    alignItems:'center'
},
nextTxt: {
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
},
cancelButton:{
  width: '30%',
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
  backgroundColor: "red",
  marginLeft:'auto',
  marginRight:'auto'
},
submitButton: {
    width: '30%',
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
    backgroundColor: colors.submitColor,
    marginRight:'auto'
},
submitText: {
    fontSize: resonsiveText(14),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
},
rowpopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
},
buttonContainer: {
    paddingBottom: 1,
    borderBottomColor: colors.greenColor33,
    borderBottomWidth: 1,
},
buttonText: {
    fontSize: resonsiveText(12),
    color: colors.greenColor33,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
},
dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 50,
},
dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 7,
},
})