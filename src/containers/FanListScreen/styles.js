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
        resizeMode: 'cover'
    },
    headerText: {
        fontSize: resonsiveText(20),
        color: colors.primary,
        fontWeight: 'bold',
        marginRight: 35,
        marginTop : 4,
        fontFamily:'Quicksand-Regular'
    },
    mainContainer: {
        flex: 1,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        marginTop: -20,
        backgroundColor: colors.circleColor,
    },
    headingView: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.grayColor3b,
        borderBottomWidth: 0.5,
    },
    nameText: {
        fontSize: resonsiveText(12),
        color: colors.primary,
        fontWeight : '400',
        
    },
    mainList: {
        padding: 20,
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
    imageText : {
        color: colors.primary, 
        backgroundColor: colors.headerColor,
        fontSize : resonsiveText(18),
        alignSelf : 'center',
        paddingHorizontal : 14,
        paddingVertical : 6,
    },
    remaingView: {
        marginLeft: 10,
        alignContent: 'center',
        alignSelf: 'center'
    },
   
    noText: {
        fontSize: resonsiveText(8),
        color: colors.bookTitle,
        fontStyle: 'italic',
        marginTop : 1,
    },
    textContainer: {
        borderBottomWidth: 1,
        paddingBottom: 1,
        borderBottomColor: colors.submitColor
    },
    headingText2: {
        fontSize: resonsiveText(10),
        color: colors.submitColor,
        fontWeight: 'normal',
    },
})