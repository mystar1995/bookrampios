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
    TextInput,
    StyleSheet,
    BackHandler,
    ScrollView
} from 'react-native';

import styles from './styles';
import colors from '../../utils/colors';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import LinearGradient from 'react-native-linear-gradient';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';
//=== star ====

import {connect} from 'react-redux';

//=== pops === 
import Alert from '../../components/Alert';
const ScreenWidth = Math.round(Dimensions.get('window').width);
const ScreenHeight = Math.round(Dimensions.get('window').height);
import * as translate from '../../utils/translate';
import DraftView from 'react-native-draftjs-editor';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import OctIcon from 'react-native-vector-icons/Octicons';
import ConfirmAlert from 'react-native-awesome-alerts';
import  responsiveText from '../../utils/fontResponsive';

class DocumentWriting extends Component {
    document = React.createRef();
    
    constructor(props) {
        super(props);
        this.editor = null; 
        this.state = {
            story:props.route.params?props.route.params.data.book_content:"",
            activestyles:[],
            blocktype:"unstyled",
            editorstate:"",
            update:true,
            alert:{
                show:false
            },
            dataopen:false
        }
    }

    componentDidMount()
    {
        let self = this;
       this._unsubscribe =  this.props.navigation.addListener('blur',function(){
            self.setState({
                update:false
            })
        })

        BackHandler.addEventListener('hardwareBackPress',function(){
            self.setState({
                update:false
            })
        })

        // this.props.navigation.addListener('focus',function(){
        //     self.setState({
        //         update:true
        //     })
        // })
    }

    componentWillUnmount()
    {
        this._unsubscribe();
        BackHandler.removeEventListener('hardwareBackPress');
    }

    componentWillReceiveProps(props)
    {
        if(props.route.params)
        {
            this.setState({
                story:props.route.params.data.book_content,
                update:true
            })
        }
    }
    

    save = () => {
        const {dispatch,auth} = this.props;
        let read = this.props.route.params.data;

        let data = {
            title:read.title,
            language:read.language,
            category:read.category,
            description:read.description,
            story:read.story,
            age_group:read.age_group,
            book_content:this.document.current?this.document.current.getEditorState():""
        }
        
        if(read.id)
        {
            data.id = read.id;
        }

        if(read.cover_image && read.cover_image.type)
        {
            data.cover_image = read.cover_image;
        }

        data.status = "DRAFT";

        dispatch({type:actiontype.NEW_STORY_START,data:data,token:auth.token,next:this.nextaction});
    }

    nextaction = () => {
        this.setState({
            alert:{
                show:true,
                title:'Success',
                message:"You have successfully saved this document."
            }
        })
    }
    
    submit = () => {
        const {dispatch,auth} = this.props;
        let read = this.props.route.params.data;
        
        let data = {
            title:read.title,
            language:read.language,
            category:read.category,
            description:read.description,
            story:read.story,
            age_group:read.age_group,
            book_content:this.document.current?this.document.current.getEditorState():""
        }
        
        if(read.id)
        {
            data.id = read.id;
        }

        if(read.cover_image.type)
        {
            data.cover_image = read.cover_image;
        }
        
        //data.status = "DRAFT";
        dispatch({type:actiontype.NEW_STORY_START,data:data,token:auth.token,next:this.next});
    }


    next = () => {
        this.setState({update:false})
        this.props.navigation.navigate('WriterMain');
    }

    // onEditReady = () => {
    //     this.document.current && this.document.current.focus();
    // }

    setstylechange = (style) => {
        let editorstate = this.document.current?this.document.current.getEditorState():"";
        console.log(style);
        this.setState({
            activestyles:style,
            editorstate:editorstate
        })
    }

    setblocktypechange = (blocktype) => {
        let editorstate = this.document.current?this.document.current.getEditorState():"";
        this.setState({
            blocktype:blocktype,
            editorstate:editorstate
        })
    }

    setstyle = (style) => {
        this.document.current.setStyle(style);
    }

    setblocktype = (style) => {
        this.document.current.setBlockType(style);
    }

    render() {
        let read = this.props.route.params.data;
        let {story} = this.state;
        const {auth} = this.props;
        console.log(read);

        const stylemap = {
            BOLD:{
                fontWeight:'bold'
            },
            ITALIC:{
                fontStyle:'italic'
            },
            DEFAULT:{
                color:'white'
            }
        }
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
                <ScrollView style={styles.screenContainer}>
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
                            <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.backIcon}
                            onPress={()=>{this.props.navigation.goBack()}}
                            >
                            <Image
                            style={styles.imageStyle}
                            source={require('../../assets/icons/backArrow.png')}
                            />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    {/* === main content === */}
                    <View style={styles.mainContainer}>
                        {/* === header Book bytes view === */}
                        <View style={styles.headingView}>
                            <View style={styles.boxStyle2}>
                               <Image
                                    source={read.cover_image?{uri:read.cover_image.uri}:require('../../assets/placeHolder/default.png')}
                                    style={styles.imageStyle2}
                                />
                            </View>
                            <View styles={styles.cloumnStyle}>
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
                        </View>
                        <View style={styles.buttonContainer}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{...styles.iconButtonContainer}}>
                                    <TouchableOpacity style={{...styles.iconContainer,backgroundColor:this.state.activestyles.indexOf('BOLD') > -1?colors.greenColor33:'transparent'}} activeOpacity={0.8} onPress={()=>this.setstyle('BOLD')}>
                                        <FontAwesome5Icon name="bold" style={styles.icon}></FontAwesome5Icon>
                                    </TouchableOpacity>
                                </View>
                                <View style={{...styles.iconButtonContainer}}>
                                    <TouchableOpacity style={{...styles.iconContainer,backgroundColor:this.state.activestyles.indexOf('ITALIC') > -1?colors.greenColor33:'transparent'}} activeOpacity={0.8} onPress={()=>this.setstyle('ITALIC')}>
                                        <FontAwesome5Icon name="italic" style={styles.icon}></FontAwesome5Icon>
                                        {/* <Text style={{...styles.headingText2,fontStyle:'italic',fontWeight:this.state.activestyles.indexOf("ITALIC") > -1?'bold':'normal'}}>I</Text> */}
                                    </TouchableOpacity>
                                </View>
                                <View style={{...styles.iconButtonContainer}}>
                                    <TouchableOpacity style={{...styles.iconContainer,backgroundColor:this.state.blocktype == 'header-one'?colors.greenColor33:'transparent'}} activeOpacity={0.8} onPress={()=>this.setblocktype('header-one')}>
                                        <FontAwesomeIcon name="header" style={styles.icon}></FontAwesomeIcon>
                                    </TouchableOpacity>
                                </View>
                                <View style={{...styles.iconButtonContainer}}>
                                    <TouchableOpacity style={{...styles.iconContainer,backgroundColor:this.state.blocktype == 'unordered-list-item'?colors.greenColor33:'transparent'}} activeOpacity={0.8} onPress={()=>this.setblocktype('unordered-list-item')}>
                                        <OctIcon name="list-unordered" style={styles.icon}></OctIcon>
                                    </TouchableOpacity>
                                </View>
                                <View style={{...styles.iconButtonContainer}}>
                                    <TouchableOpacity style={{...styles.iconContainer,backgroundColor:this.state.blocktype == 'ordered-list-item'?colors.greenColor33:'transparent'}} activeOpacity={0.8} onPress={()=>this.setblocktype('ordered-list-item')}>
                                    <OctIcon name="list-ordered" style={styles.icon}></OctIcon>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* ==De== */}
                        <View style={{ flex: 1,marginBottom:30,padding:10}}>
                            <DraftView
                                editorState={this.state.editorstate}
                                defaultValue={story}
                                style={{width:'100%',height:ScreenHeight - 400,backgroundColor:'transparent',color:'white'}}
                                onStyleChanged={this.setstylechange}
                                onBlockTypeChanged={this.setblocktypechange}
                                onEditorReady={this.onEditReady}
                                ref={this.document}
                                onEditorReady={()=>{
                                    this.setstyle('DEFAULT')
                                }}
                                placeholder="Add text here"
                                backgroundColor="transparent"
                                styleSheet='*{color:white}'
                                styleMap={stylemap}
                            ></DraftView>

                            <View style={{flexDirection:'row',justifyContent:'center',marginTop:50}}>
                                <TouchableOpacity
                                    style={{...styles.startButton,marginRight:100}}
                                    activeOpacity={0.8}
                                    onPress={this.save}
                                    >
                                    <Text style={styles.startText}>
                                        {translate.getlang('SAVE',auth.user.language)}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.startButton}
                                    activeOpacity={0.8}
                                    onPress={()=>this.setState({dataopen:true})}
                                    >
                                    <Text style={styles.startText}>
                                        {translate.getlang('SUBMIT',auth.user.language)}
                                    </Text>
                                </TouchableOpacity> 
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ConfirmAlert 
                show={this.state.dataopen}
                title="Confirm"
                message="Do you want to submit this book for review ? "
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                showCancelButton={true}
                confirmText="YES"
                cancelText="NO"
                contentContainerStyle={{backgroundColor:colors.secondry,width:'80%',borderRadius:20}}
                titleStyle={{color:colors.primary,fontSize:responsiveText(20),fontWeight:'bold',alignSelf:'center'}}
                messageStyle={{color:colors.primary,fontSize:responsiveText(15),textAlign:'center'}}
                confirmButtonTextStyle={styles.payText}
                cancelButtonTextStyle={styles.payText}
                onConfirmPressed={()=>{this.setState({
                    dataopen:false
                }); this.submit()}}
                onCancelPressed={()=>this.setState({
                    dataopen:false
                })}
                confirmButtonStyle={{
                    backgroundColor:colors.submitColor,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center'
                }}
                cancelButtonStyle={{
                    backgroundColor:colors.redColor,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    borderBottomLeftRadius: 25,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}
                ></ConfirmAlert>
                <Alert alert={this.state.alert} onconfirmpressed={()=>this.setState({alert:{show:false}})}></Alert>
            </ScalingDrawer>
        );
    }
}

const mapstatetoprops = (state) => ({
    auth:state.auth,
    read:state.read,
    bookmark:state.bookmark
})


 
export default connect(mapstatetoprops)(DocumentWriting);