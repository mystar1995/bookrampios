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
    backgroundColor: Platform.OS==='ios'? colors.circleColor : colors.supportHeaderColor,
    paddingBottom:30
  },
  headerContainer2:{
    height: Platform.OS != 'ios'?140:160,
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
  },
  plusIcon:{
    height: 33,
    width: 33,
    borderRadius: 20,
    padding: 3,
  },
  scrollViewStyle:{
    flex: 1,
    marginTop: 0,
    paddingTop: 10,
    height:'100%',
    position:'relative'
  },
  onlyAndroid:{
    height: 40,
    zIndex:-100,
    position:'relative'
  },
  mainContainer:{
    flex: 1,
    paddingLeft: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.circleColor
  },
  gradientStyle:{
    padding: 1,
    marginTop: -10,
    borderRadius: 10,
    position:'relative'
  },
  supportView:{
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.circleColor,
  },
  threeCol:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonView:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  countView:{
    padding: 10,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleText:{
    fontSize: resonsiveText(12),
    color: colors.yellowColorfb,
    fontWeight: 'bold',
  },
  subView:{
    width: ScreenWidth/4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTitleText:{
    fontSize: resonsiveText(8),
    color: colors.primaryf3,
    fontWeight: '300',
    marginBottom: 3,
    textAlign:'center'
  },
  ratingContainer:{
    width: 80,
  },
  starStyles:{
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 1
  },
  headingView:{
    flexDirection: 'row',
    width: '100%',
    paddingRight: 20,
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingText:{
    fontSize: resonsiveText(12),
    color: colors.primaryf3,
    fontWeight: 'bold',
  },
  headingText2:{
    fontSize: resonsiveText(10),
    color: colors.submitColor,
    fontWeight: 'normal',
  },
  listContainer:{
    marginTop: 10
  },
  textContainer:{
    borderBottomWidth: 1,
    paddingBottom: 1,
    borderBottomColor: colors.submitColor
  },
  boxStyle:{
    width: ScreenWidth/3.3,
    height: ScreenWidth/2.5,
    marginBottom: 5,
    overflow: 'hidden',
  },
  boxContainer:{
    marginRight: 20,
    borderRadius: 5,
    overflow: 'hidden',
    width: ScreenWidth/3.3,
  },
  bookTxtView:{
    marginTop: 5,
  },
  readingBook:{
    fontSize: resonsiveText(8),
    color: colors.grayColor83,
    fontWeight: 'normal',
  },
  //=== modal  ===
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