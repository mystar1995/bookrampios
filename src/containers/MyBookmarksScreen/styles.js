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
    height: Platform.OS==='ios'?200: 180,
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
  rowContainer5:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
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
    backgroundColor: colors.submitColor,
    height:'auto',
    marginLeft:'auto'
  },
  readMoreText:{
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily:'Quicksand-Regular'
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
})