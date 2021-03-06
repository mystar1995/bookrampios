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
        height: '100%',
        backgroundColor: colors.circleColor,
    },
    headerContainer2: {
        height: Platform.OS === 'ios' ? 120:100,
        width: '100%',
        marginTop:30
    },
    icon:{
        fontSize:ScreenWidth/30,
        color:'white'
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
    boxStyle2: {
        width: ScreenWidth / 10,
        height: ScreenWidth / 8,
        borderRadius: 2,
        marginBottom: 2,
        overflow: 'hidden',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    headerText: {
        fontSize: resonsiveText(20),
        color: colors.primary,
        fontWeight: 'bold',
        marginRight: 20,
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
    },
    container:{
        paddingHorizontal: 20,
        paddingVertical:20, 
        marginVertical: 10,
        backgroundColor:'white',
        height:500
    },
    imageStyle2: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },
    cloumnStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 8,
    },
    bookName: {
        fontSize: resonsiveText(12),
        color: colors.primary,
        fontFamily:'Quicksand-Regular'
    },
    subheadingText: {
        fontSize: resonsiveText(8),
        color: colors.primary,
        fontWeight : 'bold',
        marginTop : 2,
        fontFamily:'Quicksand-Regular'
    },
    headingText2: {
        fontSize: resonsiveText(8),
        color: colors.lightGray,
        marginTop: 2,
        fontFamily:'Quicksand-Regular'
    },
    textContainer: {
        borderBottomWidth: 1,
        paddingBottom: 1,
        borderBottomColor: colors.lightGray,
        marginTop: 4,
    },
    ratingView : {
        alignItems :'flex-end'
    },
    buttonsContainer: {
        width: '100%',
        height: ScreenWidth / 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconButtonContainer: {
        width: ScreenWidth / 6,
        alignItems: 'center',
        alignContent: 'center',
    },
    iconContainer: {
        width: ScreenWidth / 24,
        height: ScreenWidth / 24,
    },
    pageNOContainer: {
        backgroundColor: colors.grayColor3b,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: resonsiveText(10),
        fontFamily:'Quicksand-Regular'
    },
    descText: {
        width: '100%',
        fontSize: resonsiveText(10),
        color: 'black',
        fontWeight: 'normal',
        lineHeight: 15,
        marginTop: 5,
        alignSelf: 'center',
        fontFamily:'Quicksand-Regular'
    },
    headText: {
        fontSize: resonsiveText(15),
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily:'Quicksand-Regular'
    },
    pageProgressText: {
        color: colors.lightGray,
        alignSelf: 'center',
        fontSize: resonsiveText(8),
        marginTop: 8,
        fontFamily:'Quicksand-Regular'
    },
    //=== modal ===
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
        height: 350,
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
    },
    nextTxt: {
        fontSize: resonsiveText(8),
        color: colors.primary,
        fontWeight: 'normal',
        fontFamily:'Quicksand-Regular'
    },
    submitButton: {
        width: '60%',
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
        backgroundColor: colors.submitColor
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