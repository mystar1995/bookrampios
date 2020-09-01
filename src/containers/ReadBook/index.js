import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Share,
    TouchableHighlight
} from 'react-native';

import style from './styles';
import darkmode from './darkmode';
import { descData } from './data';
import colors from '../../utils/colors';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import config from '../../config/config';
//=== star ====
import {
    AirbnbRating,
} from 'react-native-elements';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
//=== pops === 
import * as Animatable from 'react-native-animatable';
import HowJourneyPop1 from '../../components/HowJourney/Pop1';
import HowJourneyPop2 from '../../components/HowJourney/Pop2';
import HowJourneyPop3 from '../../components/HowJourney/Pop3';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Progress from 'react-native-progress';
import * as actiontype from '../../constant/action-type';
import {DocumentView,RNPdftron,PDFViewCtrl,Config} from 'react-native-pdftron';
import Alert from '../../components/Alert';
import HTML from 'react-native-render-html';
const ScreenWidth = Math.round(Dimensions.get('window').width);
const ScreenHeight = Math.round(Dimensions.get('window').height);

class WordOfAbstarct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descData: descData,
            isModalOpen: false,
            indexSwiper: 0,
            entertain: false,
            timepass: true,
            insightful: false,
            gripping: false,
            animationType: '',
            rating: 2,
            authorrating:2,
            aboutBook: '',
            aboutAuthor: '',
            totalpage:0,
            currentpage:0,
            theme:'dark',
            update:false,
            initialpage:1,
            updaterefresh:false,
            darkmode:false,
            alert:{
                show:false
            },
            updatetheme:false
        };

        RNPdftron.initialize("Insert commercial license key here after purchase");
        RNPdftron.enableJavaScript(true);
        
    }
    shareContent = () => {
        Share.share({
            message: 'This is nice book',
            url: 'http://google.com',
            title: '?'
        })
    }
    //=== rating ==
    handleRating = (rating) => {
        this.setState({
            rating
        })
    }

    componentDidMount()
    {
        //alert();
        let {read} = this.props;
        //this.document.render();
        setTimeout(()=>{
            if(!this.state.update)
            {
                this.setState({
                    update:true
                })
            }
            
        },1000);
        
        // this.document.setDocument
        //OpenFile.openDoc(config.fileurl + read.content_file);
    }

    componentWillReceiveProps()
    {
        let {read} = this.props;
        console.log('bookmark',read);
        //alert();
    }

    //===handle like ===
    handleLike = (like) => {
        this.setState(like)
    }

    searchbookmark = () => {
        let {read,dispatch} = this.props; 
    }

    // === submit ==
    handleSubmit = () => {
        let {read,dispatch,auth} = this.props;
        let data = {
            aboutBook:this.state.aboutBook,
            aboutAuthor:this.state.aboutAuthor,
            rating:this.state.rating,
            entertaining:this.state.entertain,
            timepass:this.state.timepass,
            gripping:this.state.gripping,
            author_rating:this.state.authorrating,
            content_id:read.id
        }

        dispatch({type:actiontype.ADD_RATING,token:auth.token,data:data,next:this.closemodel});
    }

    componentWillMount()
    {
        let {read,dispatch,auth} = this.props;
        console.log('bookmark',read);
        if(read.page)
        {
            this.setState({
                initialpage:Number(read.page)
            })
        }

        if(read.id && !read.content_file)
        {
            this.setState({
                currentpage:1
            })
            dispatch({type:actiontype.EARN_REWARDS,token:auth.token,contentid:read.id,page:1});
        }

        let navigationaction = this.props.navigation.addListener('focus',payload=>{
            setTimeout(()=>{
                if(!this.state.update)
                {
                    this.setState({
                        update:true
                    })
                }
            },1000);
        })

    }

    checkbookmark = () => {
        let {bookmark,read} = this.props;

        for(let item in bookmark)
        {
            if(bookmark[item].content_id == read.id && bookmark[item].page == this.state.currentpage)
            {
                return true;
            }
        }

        return false;
    } 

    addbookmark = () => {
        const {dispatch,auth,read} = this.props;
        let data = {
            page:this.state.currentpage,
            content_id:read.id
        }

        dispatch({type:actiontype.SELECT_BOOK_MARK,token:auth.token,data:data,next:this.alarmbookmark});
    }

    deletebookmark = () => {
        const {dispatch,auth,read} = this.props;
        
        dispatch({type:actiontype.DELETE_BOOK_MARK,token:auth.token,contentid:read.id,page:this.state.currentpage});
    }

    alarmbookmark = () => {
        // this.setState({
        //     alert:{
        //         show:true,
        //         title:"Success",
        //         message:"You have created new bookmark"
        //     }
        // })
    }

    closemodel = () => {
        this.setState({
            isModalOpen: false,
        })
    }
    //=== ===
    onTextChange = (val) => {
        this.setState(val)
    }

    getprogress = () => {
        if(this.state.totalpage == 0)
        {
            return 1;
        }
        else
        {
            return this.state.currentpage / this.state.totalpage;
        }
    }

    getrating = (id) => {
        this.next();
    }

    createfeedback = () => {
        let {rating,auth} = this.props;
        let enable = true;
        console.log('rating',rating.content);
        for(let item in rating.rating)
        {
            if(rating.rating[item].reader == auth.user.id)
            {
                enable = false;
            }
        }

        if(enable)
        {
            this.setState({
                isModalOpen:true
            })
        }
        else
        {
            this.setState({
                alert:{
                    show:true,
                    title:'Error',
                    message:"You have already Review for this book"
                }
            })
        }
    }

    next = () => {
        this.props.navigation.navigate('Review');
        this.setState({
            update:false
        })
    }

    handlepage = (number) => {
        this.setState({
            currentpage:number
        })

        const {dispatch,read,auth} = this.props;
        if(number && number == this.state.totalpage)
        {
            dispatch({type:actiontype.EARN_REWARDS,token:auth.token,contentid:read.id,page:number});
        }
    }

    componentDidUpdate()
    {
        if(this.state.updatetheme)
        {
            this.setState({
                updatetheme:false
            })
        }
    }

    render() {
        let {
            isModalOpen,
            indexSwiper,
            animationType,
            rating,
            entertain,
            timepass,
            insightful,
            gripping,
            aboutBook,
            aboutAuthor
        } = this.state
        
        let {read,auth} = this.props;

        let styles = style;

        if(!this.state.darkmode)
        {
            styles = darkmode;
        }
       
        // return (
        //     <DocumentView document={config.fileurl + read.content_file} style={{width:500,height:300}}></DocumentView>
        // );
        return (
            <ScalingDrawer
                tapToClose={true}
                minimizeFactor={0.5}
                swipeOffset={10}
                scalingFactor={0.8}
                ref={ref => this._drawer = ref}
                content={auth.role == 'reader'?<SideBar navigation={this.props.navigation} />:<WriterSideBar navigation={this.props.navigation}></WriterSideBar>}
            >
                {/* == Main Container == */}
                <View style={styles.screenContainer}>
                    <StatusBar
                        backgroundColor={colors.circleColor}
                        barStyle="light-content"
                        translucent={false}
                    />
                    {/* === header === */}
                    <ImageBackground
                        style={styles.headerContainer2}
                        source={require('../../assets/icons/main-bg.png')}>
                        <SafeAreaView />
                        <View
                            style={styles.headerContainer} >
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={styles.menuIcon}
                                onPress={() => { this._drawer.open() }}
                            >
                                <Image
                                    style={styles.imageStyle}
                                    source={require('../../assets/icons/toggle.png')}
                                />
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headerText}>
                                {read.title}
                            </Text>
                            </View>
                            <View />
                        </View>
                    </ImageBackground>
                    {/* === main content === */}
                    <View style={styles.mainContainer}>
                        {/* === header Book bytes view === */}
                        <View style={styles.headingView}>
                            <View style={styles.boxStyle2}>
                                <Image
                                    source={{uri:config.fileurl + read.cover_image}}
                                    style={styles.imageStyle2}
                                />
                            </View>
                            <View style={styles.cloumnStyle}>
                                <View style={styles.bookView}>
                                    <Text style={styles.bookName}>
                                        {read.title}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.subheadingText}>
                                        {read.description}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.cloumnStyle}>
                                {/* === Rating === */}
                                <View style={styles.ratingView}>
                                    <AirbnbRating
                                        defaultRating={read.rating}
                                        selectedColor={colors.yellowColor}
                                        size={16}
                                        fractions={true}
                                        isDisabled={true}
                                        showRating={false}
                                        starStyle={{
                                            padding: 0,
                                            backgroundColor: 'transparent',
                                            margin: 0,
                                        }}
                                    />
                                </View>
                                <View style={{ width: '100%', alignItems: 'flex-end' }}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={this.createfeedback}
                                    >
                                        <View style={styles.textContainer}>
                                            <Text style={[styles.headingText2, {}]}>
                                                Feedback here
                                            </Text>
                                        </View>

                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                        {/* == Icons View == */}
                        <View style={styles.buttonsContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                {/* == light theme == */}
                                <View style={styles.iconButtonContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={()=>this.setState({darkmode:!this.state.darkmode,updatetheme:true})}
                                    >
                                        <View style={styles.iconButtonContainer}>
                                            <View style={styles.iconContainer}>
                                                <EvilIcons name="gear" style={styles.icon}></EvilIcons>
                                            </View>

                                            <Text style={styles.headingText2}>
                                                {this.state.darkmode?'Light theme':'Dark Theme'} 
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                {/* == feedback == */}
                                <View style={styles.iconButtonContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={() => this.getrating(read.id)}
                                    >
                                        <View style={styles.iconButtonContainer}>
                                            <View style={styles.iconContainer}>
                                                {/* <Image
                                                    style={styles.imageStyle}
                                                    source={require('../../assets/icons/toggle.png')}
                                                /> */}
                                                <FontAwesome name="wechat" style={styles.icon}></FontAwesome>
                                            </View>

                                            <Text style={styles.headingText2}>
                                                Feedback
                                        </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                {/* == rating/review == */}
                                <View style={styles.iconButtonContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={this.createfeedback}
                                    >
                                        <View style={styles.iconButtonContainer}>
                                            <View style={styles.iconContainer}>
                                                {/* <Image
                                                    style={styles.imageStyle}
                                                    source={require('../../assets/icons/toggle.png')}
                                                /> */}
                                                <FontAwesome5 name="clipboard-list" style={styles.icon}></FontAwesome5>
                                            </View>

                                            <Text style={styles.headingText2}>
                                                rating/review
                                        </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                {/* == Share == */}
                                <View style={styles.iconButtonContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={this.shareContent}
                                    >
                                        <View style={styles.iconButtonContainer}>
                                            <View style={styles.iconContainer}>
                                                {/* <Image
                                                    style={styles.imageStyle}
                                                    source={require('../../assets/icons/toggle.png')}
                                                /> */}
                                                <Entypo name="share" style={styles.icon}></Entypo>
                                            </View>

                                            <Text style={styles.headingText2}>
                                                share
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                                <View style={styles.iconButtonContainer}>
                                    <TouchableHighlight
                                        activeOpacity={0.8}
                                        onPress={this.addbookmark}
                                    >
                                        <View style={styles.iconButtonContainer}>
                                            <View style={styles.iconContainer}>
                                                {/* <Image
                                                    style={styles.imageStyle}
                                                    source={require('../../assets/icons/toggle.png')}
                                                /> */}
                                                <FontAwesome name={this.checkbookmark()?"bookmark":"bookmark-o"} style={styles.icon}></FontAwesome>
                                            </View>

                                            <Text style={styles.headingText2}>
                                                Bookmark
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            {/* ==page no == */}
                            <View style={styles.pageNOContainer}>
                                <Text style={styles.pageText}>
                                    Page {this.state.currentpage}
                                </Text>
                            </View>
                        </View>

                        {/* ==De== */}
                        <View style={{ flex: 1, justifyContent: 'space-between'}}>
                            {
                                read.content_file != "" && (
                                    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
                                        {
                                            this.state.update && (
                                                <DocumentView
                                                    ref={(document)=>this.document = document} 
                                                    showLeadingNavButton={true} 
                                                    document={config.fileurl + read.content_file} 
                                                    style={{width:'100%',height:500}}
                                                    onDocumentLoaded={() => {
                                                        this.document.getPageCount().then((pageCount) => {
                                                        this.setState({totalpage:pageCount})
                                                        if(pageCount == 1)
                                                        {
                                                            this.handlepage(pageCount);
                                                        }
                                                    });
                                                    this.document.setToolMode(Config.Tools.annotationCreateEllipse);
                                                    this.setState({
                                                        darkmode:!this.state.darkmode
                                                    })
                                                }}
                                                topToolbarEnabled={false}
                                                bottomToolbarEnabled={false}
                                                readOnly={true}
                                                    onPageChanged={({previousPageNumber, pageNumber})=>{
                                                        if(pageNumber)
                                                        {
                                                            this.handlepage(pageNumber);
                                                            //this.setState({currentpage:pageNumber})
                                                        }
                                                }}
                                                darktheme={this.state.darkmode}
                                                initialPageNumber={this.state.initialpage}
                                                customHeaders={{Foo:"bar"}}
                                                    ></DocumentView>
                                            )
                                        }
                                        {/* <PDF ref={(pdf)=>{this.pdf=pdf}} onLoadComplete={(numberOfPages,filePath)=>this.setState({totalpage:numberOfPages})} onPageChanged={(page)=>{this.setState({currentpage:page})}} style={{width:'100%',height:500}} path={config.fileurl + read.content_file}></PDF> */}
                                    </View>
                                )
                            }
                            {
                                read.content_file == "" && (
                                    <View style={styles.container}>
                                        {
                                            !this.state.updatetheme && (
                                                <HTML html={read.book_content} baseFontStyle={styles.descText} tagsStyles={{h1:styles.headText}}></HTML>
                                            )
                                        }
                                        
                                        {/* <Text style={styles.descText}>{read.book_content}</Text> */}
                                    </View>
                                )
                            }
                            {/* == progras bar == */}
                            <View style={{ flex: 1, paddingVertical: 10,position :'absolute',bottom : 25}}>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <Progress.Bar progress={this.getprogress()}
                                        width={ScreenWidth / 1.12}
                                        color={colors.progresscolor}
                                        borderWidth={0}
                                        height={6}
                                        backgroundColor={colors.progressBackground}
                                    />
                                </View>
                                <View style={{ width: '100%', flex: 1}}>
                                    <Text style={[styles.pageProgressText]}>
                                        Page {this.state.currentpage} of {this.state.totalpage}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* //=== modal === */}
                    <Modal
                        visible={isModalOpen}
                        deviceHeight={ScreenHeight}
                        deviceWidth={ScreenWidth}
                        onDismiss={()=>this.setState({isModalOpen:false})}
                        onBackdropPress={()=>this.setState({isModalOpen:false})}
                    >
                        <View style={styles.modalInnerView}>
                            {/* //=== opcaity === */}
                            <View style={styles.headOpacity} />
                            {/* //=== main pop === */}
                            <LinearGradient
                                start={{ x: 1.0, y: 1.0 }} end={{ x: 1.0, y: 0.1 }}
                                style={styles.gradientContainer}
                                colors={[
                                    colors.borderColor,
                                    colors.borderColor,
                                    colors.borderColor,
                                    colors.inputGradient
                                ]}>
                                <Animatable.View
                                    animation={animationType}
                                    duration={1000}
                                    useNativeDriver={true}
                                    onAnimationEnd={() => { this.setState({ animationType: '' }) }}
                                    style={styles.swiperContainer}>
                                    {indexSwiper === 2 ?
                                        <HowJourneyPop3
                                            rating={this.state.authorrating}
                                            value={aboutAuthor}
                                            onTextChange={(val) => this.onTextChange({ aboutAuthor: val })}
                                            handleRating={(rate)=>this.setState({authorrating:rate})} />
                                        : indexSwiper === 1 ?
                                            <HowJourneyPop2
                                                rating={rating}
                                                value={aboutBook}
                                                onTextChange={(val) => this.onTextChange({ aboutBook: val })}
                                                handleRating={this.handleRating} />
                                            :
                                            <HowJourneyPop1
                                                rating={rating}
                                                entertain={entertain}
                                                timepass={timepass}
                                                insightful={insightful}
                                                gripping={gripping}
                                                handleLike={this.handleLike}
                                                handleRating={this.handleRating} />
                                    }
                                    {/* //=== buttons === */}
                                    <View style={styles.rowpopContainer}>
                                        {indexSwiper > 0 ?
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                    indexSwiper > 0 && this.setState({
                                                        indexSwiper: indexSwiper - 1
                                                    })
                                                }}
                                                style={styles.buttonContainer}>
                                                <Text style={styles.buttonText}>
                                                    Back
                                                </Text>
                                            </TouchableOpacity>
                                            : <View />
                                        }
                                        {indexSwiper < 2 ?
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                onPress={() => {
                                                    indexSwiper < 2 && this.setState({
                                                        indexSwiper: indexSwiper + 1
                                                    })
                                                }}
                                                style={styles.buttonContainer}>
                                                <Text style={styles.buttonText}>
                                                    Next
                                                </Text>
                                            </TouchableOpacity>
                                            : <View />
                                        }
                                    </View>
                                    {/* //=== Dots === */}
                                    <View style={styles.dotsContainer}>
                                        <View style={{
                                            ...styles.dotStyle,
                                            backgroundColor: indexSwiper === 0 ? colors.primary : colors.circleColor45
                                        }} />
                                        <View style={{
                                            ...styles.dotStyle,
                                            backgroundColor: indexSwiper === 1 ? colors.primary : colors.circleColor45
                                        }} />
                                        <View style={{
                                            ...styles.dotStyle,
                                            backgroundColor: indexSwiper === 2 ? colors.primary : colors.circleColor45
                                        }} />
                                    </View>
                                </Animatable.View>
                            </LinearGradient>
                            {/* //=== submit === */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => this.handleSubmit()}
                                style={styles.submitButton}>
                                <Text style={styles.submitText}>
                                    SUBMIT
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.footerView} />
                        </View>
                    </Modal>
                    <Alert alert={this.state.alert} onconfirmpressed={()=>this.setState({alert:{show:false}})}></Alert>
                </View>
            </ScalingDrawer>
        );
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth,
    read:state.read,
    bookmark:state.bookmark,
    rating:state.rating
})

export default connect(mapstatetoprops)(WordOfAbstarct);