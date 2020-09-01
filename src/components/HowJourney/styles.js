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
  popContainer: {
    flex: 1,
    backgroundColor: colors.secondry,
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  //=== pop 1 design ==
  ratingContainer:{
    marginTop: 20,
    width: '100%',
  },
  starStyles:{
    padding: 0,
    backgroundColor: 'transparent',
    marginRight: 3
  },
  headingText:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  textView:{
    marginTop: 15
  },
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width :'100%',
    marginTop: 30,
    marginBottom: 13
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackIcon:{
    width: 20,
    height: 20,
  },
  optionText:{
    fontSize: resonsiveText(12),
    color: colors.ratingText,
    fontWeight: 'bold',
  },
  //=== pop 2 design ===
  gradientStyle:{
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    height: 125,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    backgroundColor: colors.secondry
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
  },
  inputField:{
    width: '100%',
    height: '100%',
    backgroundColor: colors.secondry,
    borderRadius: 10,
    padding: 10,
    overflow: 'hidden'
  },
})