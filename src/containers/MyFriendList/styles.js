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
import { Colors } from 'react-native/Libraries/NewAppScreen';

//=== design ===
export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        height : '100%',
        backgroundColor: colors.circleColor,
    },
    headerContainer2: {
        height: Platform.OS === 'ios' ? 115 : 75,
        width: '100%',
    },
    headerContainer: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 10,
    },
    menuIcon: {
        height: 35,
        width: 35,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },

    headerText: {
        fontSize: resonsiveText(15),
        color: colors.primary,
        fontWeight: 'bold',
        marginTop : 4,
        fontFamily:'Quicksand-Regular'
    },
    plusIcon: {
        height: 33,
        width: 33,
        borderRadius: 20,
        padding: 3,
    },
    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        marginTop: -20,
        backgroundColor: colors.circleColor,
    },
    mainList: {
        padding: 20,
    },
    secondList : {
        padding: 20,
        flex:  1,
    },
    listRowView: {
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 10
    },
    reviewerImage: {
        width: 38,
        height: 38,
        borderRadius: 19,
        overflow: 'hidden',
        backgroundColor: colors.primary,
    },
    remaingView: {
        marginLeft: 10,
        alignContent: 'center',
        alignSelf: 'center'
    },
    nameText: {
        fontSize: resonsiveText(12),
        color: colors.primary,
        fontWeight : '400',
        fontFamily:'Quicksand-Regular'
    },
    noText: {
        fontSize: resonsiveText(8),
        color: colors.bookTitle,
        fontStyle: 'italic',
        marginTop : 1,
        fontFamily:'Quicksand-Regular'
    },
    headingText2: {
        fontSize: resonsiveText(10),
        color: colors.submitColor,
        fontWeight: 'normal',
        fontFamily:'Quicksand-Regular'
    },
    headingView: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop : 12,
        paddingBottom : 10,
        marginTop: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.grayColor3b,
        borderBottomWidth: 0.5,
    },

    textContainer: {
        borderBottomWidth: 1,
        paddingBottom: 1,
        borderBottomColor: colors.submitColor
    },
    imageText : {
        color: colors.primary, 
        backgroundColor: colors.headerColor,
        fontSize : resonsiveText(18),
        alignSelf : 'center',
        paddingHorizontal : 14,
        paddingVertical : 6,
        fontFamily:'Quicksand-Regular'
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