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
  Dimensions,
  ScrollView,
  Platform,
  TouchableHighlight
} from 'react-native';

//=== star ====
import {AirbnbRating} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import ImagePicker from 'react-native-image-picker';
import en from 'react-phone-number-input/locale/en.json';
import config from '../../config/config';
import {getCountryCallingCode,getCountries} from 'react-phone-number-input';
import { getcategory } from '../../service/StoryService';
import CountryPicker,{DARK_THEME} from 'react-native-country-picker-modal';
import Alert from 'react-native-awesome-alerts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import * as translator from '../../utils/translate'
class MyProfileScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      name: '',
      gender: '',
      country: '',
      city: '',
      dob: new Date(),
      phone_number: '',
      email: '',
      description: '',
      isEdit: false,
      isDatePickerOpen: false,
      imagedata:null,
      password:"",
      confirmpassword:"",
      alert:{
        show:false
      },
      imageadded:false
    }
  }

  //=== arrow ===
  renderArrow=()=>{
    return(
      <View style={styles.mailIcon}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/icons/downArrow.png')}
        />
      </View> 
    )
  }

  //=== set date of birth ===
  setDate = (event, date) => {
    if (date !== undefined) {
      if(Platform.OS==='ios'){
        this.setState(    {
          dob: date,
        })
      }
      else{
        this.setState({
          dob: date,
          isDatePickerOpen: false
        })
      }
    }
  }

  edit = () => {
    const {dispatch,auth} = this.props;

    if(this.state.isEdit)
    {
      let data = {
        username:this.state.username,
        email:this.state.email,
        gender:this.state.gender,
        dob:Moment(new Date(this.state.dob)).format('YYYY-MM-DD'),
        country:this.state.country,
        city:this.state.city,
        phone_number:this.state.areaCode + this.state.phone_number,
        short_bio:this.state.short_bio
      }

      if(this.state.imagedata)
      {
        data.profile_pic = {
          uri:this.state.imagedata.path,
          type:this.state.imagedata.mime,
          name:this.state.imagedata.path.split("/").pop()
        }
      }
      if(this.state.password)
      {
        if(this.state.password != this.state.confirmpassword)
        {
          this.setState({
            alert:{
              show:true,
              message:"Confirm Password doesn't match",
              title:"Valid Error"
            }
          })

          return;
        }
      }

      console.log('profiledata',data);
      
      dispatch({type:actiontype.UPDATE_PROFILE,data:data,updateprofile:this.updateprofile,token:auth.token});   
    }
    else
    {
      this.setState({
        isEdit:!this.state.isEdit
      })
    }
  }

  updateprofile = (profile) => {
    this.setState({
      imagedata:false,
      isEdit:!this.state.isEdit
    })
  }

  componentDidMount()
  {
    let {auth} = this.props;
    if(auth.user)
    {
      let userjson = JSON.parse(JSON.stringify(auth.user));
      if(userjson.profile_pic)
      {
        userjson.profile_pic = config.fileurl + userjson.profile_pic;
      }

      if(userjson && userjson.country)
      {
        userjson.areaCode ='+' +  getCountryCallingCode(userjson.country);
        userjson.phone_number = userjson.phone_number.split( userjson.areaCode)[1];
      }
      

      userjson.password = "";
      userjson.confirmpassword = "";
      
      //auth.user.phone_number = auth.user.phone_number.split(auth.user.areacode)[0];

      this.setState({...userjson});
    }
    
  }

  componentWillReceiveProps(props)
  {
    let {auth} = props;
    if(auth.user)
    {
      let userjson = JSON.parse(JSON.stringify(auth.user));
      if(userjson.profile_pic)
      {
        userjson.profile_pic = config.fileurl + userjson.profile_pic;
      }

      if(userjson && userjson.country)
      {
        userjson.areaCode ='+' +  getCountryCallingCode(userjson.country);
        userjson.phone_number = userjson.phone_number.split(userjson.areaCode)[1];
      }
      
      userjson.password = "";
      userjson.confirmpassword = "";
      //auth.user.phone_number = auth.user.phone_number.split(auth.user.areacode)[0];

      this.setState({...userjson});
    }
  }

  onimageshow = () => {
    if(this.state.isEdit)
    {
      let option = {title:'Select Profile Photo'};
      ImagePicker.showImagePicker(option,(response)=>{
        this.setState({
          imagedata:{
            path:response.uri,
            mime:response.type
          },
          profile_pic:response.uri
        })
      })
    }
  }

  getcountry = () => {
    let countries = getCountries();
    let countryname = [];
    for(let item in countries)
    {
      countryname.push({label:en[countries[item]],value:countries[item]});
    }

    return countryname;
  }

  render() {
    let {
      username,
      gender,
      country,
      city,
      dob,
      areaCode,
      phone_number,
      email,
      short_bio,
      isDatePickerOpen,
      isEdit,
      password,
      confirmpassword
    } = this.state
    let genderData = [{
      value: "Male",label:"Male"
    }, {
      value: 'Female',label:"Female"
    },];

    let {auth} = this.props;
    
    return (
      <>
      <KeyboardAwareScrollView
        scrollEnabled
        bounces={false}
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
                style={styles.menuIcon}
                onPress={()=>{this.props.drawer.open()}}
              >
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/toggle.png')}
                />
              </TouchableOpacity>
              <View style={{marginRight:'auto',marginLeft:'auto'}}>
                <Text style={styles.headerText}>
                  My Profile
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
              <View/>
            </View>
            {/* //=== profile === */}
            <View style={styles.profileRow}>
              <View style={styles.rowContainer}>
                <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientImage}
                    colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                  <TouchableOpacity onPress={this.onimageshow} style={styles.profileImage}>
                    <Image
                      source={this.state.profile_pic?{uri:this.state.profile_pic}:require('../../assets/placeHolder/user.png')}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                </LinearGradient>
                <View style={styles.nameView}>
                  <View>
                    <Text style={styles.labelText}>
                      {translator.getlang('Hello',auth.user.language)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.nameText}>
                      {username}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={this.edit}
                style={styles.editbutton}>
                  <Text style={styles.edittext}>{this.state.isEdit?'SAVE':'EDIT'}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            {/* //=== name === */}
            <View style={styles.inputContainer}>
              <TextInput
                type="outlined"
                underlineColorAndroid={false}
                underlineColor={isEdit?colors.grayColor:'transparent'} 
                style={styles.inputField}
                editable={isEdit}
                onChangeText={(val)=>{this.setState({
                  username: val
                })}}
                label={translator.getlang('Full Name',auth.user.language)}
                placeholder={translator.getlang('Full Name',auth.user.language)}
                value={username}
                theme={{ colors: { 
                  text: colors.primary,
                  primary: colors.grayColor,
                  placeholder: colors.grayColor,
                  underlineColor: isEdit?colors.grayColor:'transparent',
                }}}
              />
            </View>
            {/* //=== EmailId === */}
            <View style={styles.inputContainer}>
              <TextInput
                type="outlined"
                underlineColorAndroid={false}
                underlineColor={isEdit?colors.grayColor:'transparent'} 
                style={styles.inputField}
                editable={isEdit}
                label={translator.getlang('Email',auth.user.language)}
                placeholder={translator.getlang('Email',auth.user.language)}
                value={email}
                onChangeText={(email)=>{this.setState({
                  email
                })}}
                theme={{ colors: { 
                  text: colors.primary,
                  primary: colors.grayColor,
                  placeholder: colors.grayColor,
                  underlineColor: 'transparent',
                }}}
              />
            </View>
            {
              isEdit && (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      type="outlined"
                      underlineColorAndroid={false}
                      secureTextEntry={true}
                      underlineColor={isEdit?colors.grayColor:'transparent'} 
                      style={styles.inputField}
                      editable={isEdit}
                      label={translator.getlang('Password',auth.user.language)}
                      value={password}
                      onChangeText={(password)=>{this.setState({
                        password
                      })}}
                      theme={{ colors: { 
                        text: colors.primary,
                        primary: colors.grayColor,
                        placeholder: colors.grayColor,
                        underlineColor: 'transparent',
                      }}}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <TextInput
                      type="outlined"
                      underlineColorAndroid={false}
                      secureTextEntry={true}
                      underlineColor={isEdit?colors.grayColor:'transparent'} 
                      style={styles.inputField}
                      editable={isEdit}
                      label={translator.getlang('Confirm Password',auth.user.language)}
                      value={confirmpassword}
                      onChangeText={(confirmpassword)=>{this.setState({
                        confirmpassword
                      })}}
                      theme={{ colors: { 
                        text: colors.primary,
                        primary: colors.grayColor,
                        placeholder: colors.grayColor,
                        underlineColor: 'transparent',
                      }}}
                    />
                  </View>
                </>
              )
            }
            

            {/* //=== gender === */}
            <View style={styles.inputContainer}>
              {isEdit?
                <View style={styles.viewText}>
                  <View>
                    <Text style={styles.labelText2}>
                      {translator.getlang('Gender',auth.user.language)}
                    </Text>
                  </View>
                  <Dropdown
                    labelHeight={0}
                    data={genderData}
                    placeholder={translator.getlang('Gender',auth.user.language)}
                    underlineColor={isEdit?colors.grayColor:'transparent'} 
                    placeholderTextColor={colors.primary}
                    value={gender}
                    renderAccessory={this.renderArrow}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={styles.pickerStyles}
                    inputContainerStyle={styles.inputContainerStyles}
                    textColor={colors.primary}
                    itemColor={colors.primary}
                    fontSize={resonsiveText(12)}
                    onChangeText={(val)=>{this.setState({
                      gender: val
                    })}}
                    dropdownOffset={{top: 0, left: 0}}
                    rippleOpacity={0}
                  />
                </View>
              :
                <TextInput
                  type="outlined"
                  underlineColorAndroid={false}
                  underlineColor="transparent" 
                  style={styles.inputField}
                  editable={isEdit}
                  label={translator.getlang('Gender',auth.user.language)}
                  placeholder={translator.getlang('Gender',auth.user.language)}
                  value={gender}
                  theme={{ colors: { 
                    text: colors.primary,
                    primary: colors.grayColor,
                    placeholder: colors.grayColor,
                    underlineColor: 'transparent',
                  }}}
                />
              }
            </View>
            {/* //=== Dob === */}
            <View style={styles.inputContainer}>
              {isEdit?
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>this.setState({isDatePickerOpen: true})}
                  style={styles.viewText}>
                  <View>
                    <Text style={styles.labelText2}>
                      {translator.getlang('Date of Birth',auth.user.language)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.nameText}>
                      {moment(dob).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                </TouchableOpacity>
              :
                <TextInput
                  type="outlined"
                  underlineColorAndroid={false}
                  underlineColor="transparent" 
                  style={styles.inputField}
                  editable={isEdit}
                  label={translator.getlang('Date of Birth',auth.user.language)}
                  placeholder={translator.getlang('Date of Birth',auth.user.language)}
                  value={dob? moment(dob).format('YYYY-MM-DD'): ''}
                  theme={{ colors: { 
                    text: colors.primary,
                    primary: colors.grayColor,
                    placeholder: colors.grayColor,
                    underlineColor: 'transparent',
                  }}}
                />
              }
            </View>
            {/* //=== Country === */}
            <View style={styles.inputContainer}>
              <View style={{...styles.viewText,borderBottomWidth:isEdit?1:0}}>
                <Text style={{color:colors.grayColor}}>{translator.getlang('Country',auth.user.language)}</Text>
                {
                  !isEdit && (
                      <Text style={{...styles.labelText2,color:'white'}}>{en[country]}</Text>
                  )
                }

                {
                  isEdit && (
                    <CountryPicker 
                        theme={DARK_THEME}  
                        countryCode={this.state.country} 
                        withCountryNameButton  
                        withFlag 
                        withCloseButton 
                        withModal 
                        withFilter 
                        onSelect={(country)=>{
                            this.setState({
                              country:country.cca2,
                              areaCode:'+' + getCountryCallingCode(country.cca2)
                            })
                            
                          }}
                        ></CountryPicker>
                  )
                }
              </View>

              {/* <Dropdown
                labelHeight = {0}
                style={{marginLeft:15}}
                data = {this.getcountry()}
                placeholder={'Country'}
                placeholderTextColor={colors.grayColor}
                value={country}
                renderAccessory={this.renderArrow}
                containerStyle={styles.dropDownContainer}
                pickerStyle={styles.pickerStyles}
                inputContainerStyle={styles.inputContainerStyles}
                textColor={colors.primary}
                itemColor={colors.primary}
                fontSize={resonsiveText(12)}
                dropdownOffset={{top: 0, left: 0}}
                rippleOpacity={0}
                onChangeText={(value)=>{
                  this.setState({
                    country:value,
                    areaCode:getCountryCallingCode(value)
                  })
                }}
              ></Dropdown> */}
              {/* <TextInput
                type="outlined"
                underlineColorAndroid={false}
                underlineColor="transparent" 
                style={styles.inputField}
                editable={isEdit}
                label={'Country'}
                placeholder={'Country'}
                value={country}
                theme={{ colors: { 
                  text: colors.primary,
                  primary: colors.grayColor,
                  placeholder: colors.grayColor,
                  underlineColor: 'transparent',
                }}}
              /> */}
            </View>
            {/* //=== City === */}
            <View style={styles.inputContainer}>
              <TextInput
                type="outlined"
                underlineColorAndroid={false}
                underlineColor={isEdit?colors.grayColor:'transparent'}  
                style={styles.inputField}
                editable={isEdit}
                label={'City'}
                placeholder={'City'}
                value={city}
                theme={{ colors: { 
                  text: colors.primary,
                  primary: colors.grayColor,
                  placeholder: colors.grayColor,
                  underlineColor: 'transparent',
                }}}
              />
            </View>
            {/* === number === */}
            <View style={styles.rowContainer}>
              {/* === area code === */}
              <View style={styles.cloumn1}>
                <View style={{...styles.inputContainer,marginBottom: 0}}>
                  <TextInput
                    type="outlined"
                    underlineColorAndroid={false}
                    underlineColor={isEdit?colors.grayColor:'transparent'} 
                    style={styles.inputField}
                    editable={isEdit}
                    label={'Area Code'}
                    placeholder={'Area Code'}
                    value={areaCode}
                    theme={{ colors: { 
                      text: colors.primary,
                      primary: colors.grayColor,
                      placeholder: colors.grayColor,
                      underlineColor: 'transparent',
                    },
                  }}
                  />
                </View>
              </View>
              {/* === Mobile Number === */}
              <View style={styles.cloumn2}>
                <View style={{...styles.inputContainer,marginBottom: 0}}>
                  <TextInput
                    type="outlined"
                    underlineColorAndroid={'transparent'}
                    underlineColor={isEdit?colors.grayColor:'transparent'} 
                    style={styles.inputField}
                    editable={isEdit}
                    label={'Mobile Number'}
                    keyboardType='numeric'
                    returnKeyType='done'
                    value={phone_number}
                    onChangeText={(phone_number)=>{this.setState({
                      phone_number
                    })}}
                    theme={{ colors: { 
                      text: colors.primary,
                      primary: colors.grayColor,
                      placeholder: colors.grayColor,
                      underlineColor: 'transparent',
                    }}}
                  />
                </View>
              </View>
          </View>
            {/* //=== short bio === */}
            <View style={styles.inputContainer2}>
              <TextInput
                type="outlined"
                underlineColorAndroid={false}
                underlineColor={isEdit?colors.grayColor:'transparent'} 
                style={styles.inputField2}
                editable={isEdit}
                label={'Short Bio'}
                blurOnSubmit={true}
                onChangeText={(description)=>{this.setState({
                  short_bio:description
                })}}
                value={short_bio}
                multiline={true}
                bounces={false}
                theme={{ colors: { 
                  text: colors.primary,
                  primary: colors.grayColor,
                  placeholder: colors.grayColor,
                  underlineColor: 'transparent',
                }}}
              />
            </View>
          </View>
        </View>
        <Alert alert={this.state.alert}></Alert>
       
      </KeyboardAwareScrollView>
        {Platform.OS==='ios' && isDatePickerOpen &&
              <TouchableOpacity 
                style={styles.doneButton}
                activeOpacity={0.8}
                onPress={()=>{this.setState({isDatePickerOpen: false})}}>
                <Text style={styles.doneText}>
                  Done
                </Text>
              </TouchableOpacity>
            }
            {isDatePickerOpen &&
              <View style={styles.datePicker}>
                <DateTimePicker 
                  value={dob? new Date(dob) : new Date('1980-01-01')}
                  mode={'date'}
                  display='calendar'
                  is24Hour={true}
                  style={styles.datePicker}
                  onChange={this.setDate} 
                />
              </View>
            }
      </>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(MyProfileScreen);