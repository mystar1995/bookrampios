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
    height: Platform.OS==='ios'?100: 80,
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
  headerText:{
    fontSize: resonsiveText(20),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular',
    textAlign:'center'
  },
  plusIcon:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
  },
  mainContainer:{
    flex: 1,
    padding: 20,
    paddingRight: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -22,
    backgroundColor: colors.circleColor,
  },
  rowContainer:{
    flexDirection: 'row',
    width: '100%',
  },
  rectangleContainer:{
    height: 150,
    width: ScreenWidth/1.3,
    marginRight: 10,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    marginTop:10
  },
  bookImageStyle1:{
    height: 130,
    width: 100,
    position: 'absolute',
    right: 20,
    top: 10,
  },
  titleText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 2,
    width:170,
    fontFamily:'Quicksand-Regular'
  },
  subTitleText:{
    fontSize: resonsiveText(13),
    color: colors.primary,
    fontWeight: '300',
    marginBottom: 3
  },
  authorText:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  readmoreButton:{
    width: 60,
    marginTop: 15,
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
  headingView:{
    flexDirection: 'row',
    width: '100%',
    paddingRight: 20,
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
  },
  headingText2:{
    fontSize: resonsiveText(15),
    color: colors.submitColor,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  textContainer:{
    borderBottomWidth: 1,
    paddingBottom: 1,
    borderBottomColor: colors.submitColor
  },
  boxStyle:{
    width: ScreenWidth/5,
    height: ScreenWidth/3.5,
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  boxContainer:{
    marginRight: 15,
    paddingTop: 10,
    width: ScreenWidth/5.5,
  },
  readingBook:{
    fontSize: resonsiveText(12),
    color: colors.grayColor,
    fontWeight: 'normal',
    fontFamily:'Quicksand-Regular'
  },
  boxStyle2:{
    width: ScreenWidth/3.5,
    height: ScreenWidth/3,
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  boxContainer2:{
    marginRight: 15,
    paddingTop: 10,
    width: ScreenWidth/3.5,
  },
  scrollViewStyle:{
    flex: 1
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