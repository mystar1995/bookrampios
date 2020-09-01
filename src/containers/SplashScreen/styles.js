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

//=== design ===
export default StyleSheet.create({
	screenContainer:{
		flex: 1,
		backgroundColor: colors.secondry,
  },
  mainContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage:{
    height: ScreenHeight/4,
    width: ScreenHeight/4
  },
  imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})