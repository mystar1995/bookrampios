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
    height: 120,
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

  gradientinputStyle:{
    borderRadius: 25,
    overflow: 'hidden',
    height: 50,
    marginBottom: 10,
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
    fontFamily:'Quicksand-Regular'
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
    marginRight: 20,
  },
  mainContainer:{
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: colors.circleColor,
  },
  listContainer:{
    flex: 1,
    paddingBottom: 20,
  },
  contentView:{
    width :'100%',
    paddingHorizontal: 20,
    marginTop: 20,
    zIndex:100
  },
  inputField:{
    width: '90%',
    height: '100%',
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
  rowContainer1:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    height: '100%',
    width :'100%',
    paddingHorizontal: 20,
    backgroundColor: colors.secondry
  } ,
  rowContainer:{
    width: '99%',
    marginHorizontal: 1,
    marginTop: 4,
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  mailIcon:{
    height: 18,
    width: 18,
    marginRight:5
  },

  closeicon:{
    color:'white',
    fontSize:18
  },
  bookImage:{
    height: 110,
    width: ScreenWidth/2.5,
  },
  textBookStyle:{
    marginLeft: 10,
    width:ScreenWidth/2
  },
  textBook:{
    fontSize: resonsiveText(15),
    color: colors.primary,
    fontWeight: 'bold',
  },
  textDesc:{
    fontSize:resonsiveText(11),
    color:colors.grayColor,
    marginTop:5,
    marginBottom:5
  },
  rowContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightArrow:{
    width: 30,
    height: 30,
    marginRight:10
  },
  footerContainer:{
    width: '100%',
    height: 140,
    borderRadius: 20
  },
  footerBox:{
    flex: 1,
    paddingLeft: 30,
    padding: 20,
    paddingBottom: 0,
  },
  bookText:{
    fontSize: resonsiveText(12),
    color: colors.primary,
    fontWeight: 'bold',
  },
  descText:{
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: '600',
    lineHeight: 15
  },
  descView:{
    marginTop: 5,
  },
  row:{
    flexDirection: 'row',
  },
  footerImage:{
    flex: 1,
  },
  readButton:{
    paddingVertical: 4,
    width: '50%',
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: colors.submitColor
  },
  readText:{
    fontSize: resonsiveText(8),
    color: colors.primary,
    fontWeight: 'bold',
  },
})