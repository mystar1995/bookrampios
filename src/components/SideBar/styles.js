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
  sideBarContainer: {
    flex: 1,
    backgroundColor: colors.secondry,
    padding: 20
  },
  mainContainer:{
    flex: 1
  },
  userImage:{
    height: 60,
    width: 60,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: colors.primary,
    overflow:'hidden'
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  nameContainer:{
    marginLeft: 5,
  },
  nameText:{
    fontSize: resonsiveText(12),
    color: colors.grayColor,
    fontWeight: 'bold',
  },
  sideIcon:{
    height: 18,
    width: 18,
  },
  mainList:{
    marginBottom: ScreenHeight/5,
    marginTop:60
  },
  listContainer:{
    marginLeft: 10
  },
  listText:{
    fontSize: resonsiveText(11),
    color: colors.primary,
    fontWeight: 'normal',
  },
  rowContainer3:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
  },
  circleView:{
    height: 20,
    width: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.submitColor,
  },
  listText2:{
    fontSize: resonsiveText(10),
    color: colors.primary,
    fontWeight: 'normal',
  },
})