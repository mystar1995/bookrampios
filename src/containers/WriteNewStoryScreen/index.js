import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  BackHandler,
  SafeAreaView,
  StatusBar,
  TextInput,
  Platform,
  Keyboard,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//=== star ====
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import config from '../../config/config';
import Alert from '../../components/Alert';
import * as translator from '../../utils/translate';

class WriteNewStoryScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      title: '',
      shortDescription: '',
      ageGroup: '',
      story: '',
      language: '',
      category: '',
      imageData: '',
      error:{},
      alert:{
        show:false
      }
    }
  }

  //=== arrow ===
  renderArrow=()=>{
    return(
      <View style={styles.arrowIcon}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/icons/downArrow.png')}
        />
      </View> 
    )
  }

  // === Image ===
  OpenImagePicker=()=>{
    const _this = this;
    let option = {title:'Select Cover Image'};
    ImagePicker.showImagePicker(option,(response)=>{
      if(!response.didCancel && !response.error && !response.customButton)
      {
        this.setState({
          imageData:{
            path:response.uri,
            mime:response.type
          }
        })
      }
    })
  }

  componentDidMount()
  {
    let {content,dispatch} = this.props;
    console.log("mycontent",content);
    if(content.id)
    {
      this.setState({
        id:content.id,
        title:content.title,
        shortDescription:content.description,
        imageData:content.cover_image?{path:config.fileurl + content.cover_image}:false,
        language:content.language,
        category:content.category,
        story:content.story,
        ageGroup:content.age_group,
        book_content:content.book_content
      })

      dispatch({type:actiontype.EDIT_DRAFT_CONTENT,data:{}});
    }
  }

  startwriting = () => {
    const {dispatch,auth} = this.props;
    if(!this.validate())
    {
      let data = {
        title:this.state.title,
        language:this.state.language,
        category:this.state.category,
        description:this.state.shortDescription,
        story:this.state.story,
        age_group:this.state.ageGroup,
      }

      if(this.state.id)
      {
        data.id = this.state.id;
      }

      if(this.state.imageData.mime)
      {
        data.cover_image = {
          uri:this.state.imageData.path,
          type:this.state.imageData.mime,
          name:this.state.imageData.path.split("/").pop()
        }
      }
      else if(this.state.imageData.path)
      {
        data.cover_image = {
          uri:this.state.imageData.path
        }
      }

      if(!this.state.id && !data.cover_image)
      {
        this.setState({
          alert:{
            show:true,
            title:'Image Picker Error',
            message:"Cover Image is required"
          }
        })
        return;
      }

      data.book_content = this.state.book_content;
      
      this.props.navigation.navigate('DocumentWriting',{data:data});
      //dispatch({type:actiontype.NEW_STORY_START,data:data,token:auth.token,next:this.next});
      // this.setState({
      //   title:"",
      //   language:'',
      //   category:'',
      //   shortDescription:'',
      //   story:'',
      //   imageData:'',
      //   ageGroup:''
      // })
    }
  }

  next =() => {
    this.props.navigation.goBack();
  }

  validate = () => {
    let required_field = ['title','shortDescription','story','category','language'];
    let enable = false; let error = {};
    for(let item in required_field)
    {
      if(!this.state[required_field[item]])
      {
        error[required_field[item]] = "This field is required";
        enable = true;
      }
    }

    this.setState({
      error:error
    })
    return enable;
  }

  getcategorydata = () => {
    let {category} = this.props;
    let categoryitem = [];
    for(let item in category)
    {
      categoryitem.push({label:category[item].category,value:category[item].id});
    }

    return categoryitem
  }

  render() {
    let {
      title,
      shortDescription,
      ageGroup,
      story,
      category,
      language,
      imageData
    } = this.state;

    let categoryData = this.getcategorydata();
    
    let languageData = [{
      label: 'Arabic',value:'ar'
    }, {
      label: 'English',value:'en'
    },{
      label: 'Hindi',value:'hi'
    }];
    let ageGroupData = [{
      value: '5',label:'5+'
    },{
      value: '12',label:'12+'
    },{
      value: '15',label:'15+'
    }, {
      value: '18',label:'18+'
    },{
      value: '30',label:'30+'
    },{
      value: '40',label:'40+'
    },{
      value: '50',label:'50+'
    },{
      value: '60',label:'60+'
    }];
    let {auth} = this.props;
    return (
      <KeyboardAwareScrollView
        scrollEnabled
        bounces={false}
        style={styles.screenContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
      >
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
                style={styles.backIcon}
                onPress={()=>{this.props.navigation.pop()}}
              >
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/backArrow.png')}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerText}>
                  {translator.getlang('New Book',auth.user.language)}
                </Text>
              </View>
              
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.plusIcon}
                onPress={()=>{this.setState({isModalOpen: true})}}
              >
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/plusCircle.png')}
              />
              </TouchableOpacity>
            </View>
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            {/* === book Image === */}
            <View style={styles.boonImageStyle}>
              {imageData != '' && (
                <Image 
                  style={styles.imageStyle2}
                  source={{uri:imageData.path}}
                />
              )
              }
              {
                imageData == '' && (
                  <Image style={styles.imageStyle2} source={require('../../assets/placeHolder/default.png')}></Image>
                )
              }
            </View>
            {/* === change cover === */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>{this.OpenImagePicker()}}
              style={styles.changeCover}
            >
              <Text 
                style={styles.chgTxt}>
                {imageData != ''?translator.getlang('Change cover',auth.user.language):translator.getlang('Add Cover Image',auth.user.language)}
              </Text>
            </TouchableOpacity>
            {/* ===  */}
            <View style={styles.formContainers}>
              {/* === Language  ===*/}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <Dropdown
                    labelHeight={0}
                    data={languageData}
                    placeholder={translator.getlang('Language',auth.user.language)}
                    placeholderTextColor={colors.grayColor}
                    value={language}
                    renderAccessory={this.renderArrow}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={styles.pickerStyles}
                    inputContainerStyle={styles.inputContainerStyles}
                    textColor={colors.primary}
                    itemColor={colors.primary}
                    fontSize={resonsiveText(9)}
                    onChangeText={(val)=>{this.setState({
                      language: val
                    })}}
                    dropdownOffset={{top: 0, left: 0}}
                    rippleOpacity={0}
                  />
                </View>
              </LinearGradient>
              {/* === Category  ===*/}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <Dropdown
                    labelHeight={0}
                    data={categoryData}
                    placeholder={translator.getlang('Select Category',auth.user.language)}
                    placeholderTextColor={colors.grayColor}
                    value={category}
                    renderAccessory={this.renderArrow}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={styles.pickerStyles}
                    inputContainerStyle={styles.inputContainerStyles}
                    textColor={colors.primary}
                    itemColor={colors.primary}
                    fontSize={resonsiveText(9)}
                    onChangeText={(val)=>{this.setState({
                      category: val
                    })}}
                    dropdownOffset={{top: 0, left: 0}}
                    rippleOpacity={0}
                  />
                </View>
              </LinearGradient>
              {/* === Title === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={translator.getlang('Title',auth.user.language)}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      returnKeyType={'done'}
                      value={title}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({title: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                </View>
              </LinearGradient>
              {/* === Short Description === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={translator.getlang('Short Description',auth.user.language)}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      returnKeyType={'done'}
                      value={shortDescription}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({shortDescription: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                </View>
              </LinearGradient>
              {/* === Age === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <Dropdown
                    labelHeight={0}
                    data={ageGroupData}
                    placeholder={translator.getlang('Age Group',auth.user.language)}
                    placeholderTextColor={colors.grayColor}
                    value={ageGroup}
                    renderAccessory={this.renderArrow}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={styles.pickerStyles}
                    inputContainerStyle={styles.inputContainerStyles}
                    textColor={colors.primary}
                    itemColor={colors.primary}
                    fontSize={resonsiveText(9)}
                    onChangeText={(val)=>{this.setState({
                      ageGroup: val
                    })}}
                    dropdownOffset={{top: 0, left: 0}}
                    rippleOpacity={0}
                  />
                </View>
              </LinearGradient>
              {/* === Story === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientTxtAreaStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <View style={{...styles.inputField,marginTop: 10}}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={translator.getlang('Story',auth.user.language)}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      multiline={true}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      returnKeyType={'done'}
                      textAlignVertical="top"
                      value={story}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({story: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                </View>
              </LinearGradient>

              {/* === START WRITING === */}
              <TouchableOpacity
                style={styles.startButton}
                activeOpacity={0.8}
                onPress={this.startwriting}
                >
                  <Text style={styles.startText}>
                    {translator.getlang('START WRITING',auth.user.language)}
                  </Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
        <Modal 
            isVisible={this.state.isModalOpen}
            onBackdropPress={()=>this.setState({
              isModalOpen: false,
            })}
            backdropColor={colors.circleColor}
            backdropOpacity={0.7}
          >
            {/* ===  Write a new book === */}
            <View style={styles.viewContainer}>
              <TouchableOpacity
                onPress={()=>{
                  this.setState({
                    isModalOpen: false,
                  })
                  this.props.navigation.navigate('WriteNewStory')
                }}
                activeOpacity={0.8} 
                style={styles.modalButton}>
                <Text style={styles.modalText}>
                  {translator.getlang('Write a new book',auth.user.language)}
                </Text>
              </TouchableOpacity>
              {/* //==== Upload a book === */}
              <TouchableOpacity
                onPress={()=>{
                  this.setState({
                    isModalOpen: false,
                  })
                  this.props.navigation.navigate('NewStory')
                }}
                activeOpacity={0.8} 
                style={{...styles.modalButton,borderBottomWidth: 0,}}>
                <Text style={styles.modalText}>
                  {translator.getlang('Upload a book',auth.user.language)}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <Alert 
            alert={this.state.alert}
            onconfirmpressed={()=>this.setState({
              alert:{
                show:false
              }
            })}
          ></Alert>
      </KeyboardAwareScrollView>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  home:state.home,
  category:state.category,
  content:state.content.draftcontent
})

//===  make components available outside ===
export default connect(mapstatetoprops)(WriteNewStoryScreen);