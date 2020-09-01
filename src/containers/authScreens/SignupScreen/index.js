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
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
//=== style ==
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-timezone';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== colors ===
import colors from '../../../utils/colors';
import resonsiveText from '../../../utils/fontResponsive';
import * as actiontype from '../../../constant/action-type';
import {connect} from 'react-redux';
import Moment from 'moment';
import * as Util from '../../../utils/util';
import en from 'react-phone-number-input/locale/en.json';
import {getCountryCallingCode,getCountries} from 'react-phone-number-input';
import CountryPicker,{DARK_THEME} from 'react-native-country-picker-modal';

//=== screen ===
class SignupScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      name: '',
      ageGroup: '',
      dob: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      city: '',
      areaCode: '',
      mobileNumber: '',
      asWrite: '',
      isChecked: false,
      datePickerOpen: false,
      showcountrypickermodal:false
    }
  }

  //=== set date of birth ===
  setDate = (event, date) => {
    if (date !== undefined) {
      if(Platform.OS==='ios'){
        this.setState({
          dob: date,
          datePickerOpen:true
        })
      }
      else{
        this.setState({
          dob: date,
          datePickerOpen: false
        })
      }
    }
  }

  componentWillReceiveProps(props)
  {
    
  }

  //=== arrow ===
  renderArrow=()=>{
    return(
      <View style={styles.mailIcon}>
        <Image
          style={styles.imageStyle}
          source={require('../../../assets/icons/downArrow.png')}
        />
      </View> 
    )
  }

  signup = () => {
    const {dispatch} = this.props;

    let user = {
      username:this.state.name,
      email:this.state.email,
      password1:this.state.password,
      password2:this.state.confirmPassword,
      dob:Moment(new Date(this.state.dob)).format('YYYY-MM-DD'),
      country:this.state.country,
      city:this.state.city,
      phone_number:this.state.areaCode + "" + this.state.mobileNumber,
      terms_n_condition:this.state.isChecked?'on':'off',
      age_group:this.state.ageGroup
    }

    console.log(this.checkvalidation(user));
    if(this.checkvalidation(user) && this.state.isChecked)
    {
      user.writer = this.state.asWrite == 'Yes'?true:false;
      dispatch({type:actiontype.SIGNUP_START,user:user,login:()=>{this.props.navigation.navigate('Verify',{phone:user.phone_number})}})
    }
  }

  checkvalidation = (user) => {
    const {dispatch} = this.props;
    let error = []; let second_error = {};
    for(let item in user)
    {
      if(!user[item])
      {
        second_error[item] = "This field is required";
      }
    }

    if(user.email && !Util.validateemail(user.email))
    {
      second_error['email'] = "Email is not valid";
    } 

    for(let item in second_error)
    {
      error.push({[item]:second_error[item]});
    }

    if(error.length > 0)
    {
      dispatch({type:actiontype.SIGNUP_ERROR,error:error});
    }
    
    return error.length == 0;
    
  }

  geterror = () => {
    let error = this.props.auth.error;
    let erroritem = {};
    for(let item in error)
    {
      for(let key in error[item])
      {
        erroritem[key] = error[item][key];
      }
    }
    return erroritem;
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

  getphonecode = () => {
    let countries = getCountries();
    let list = [];
    for(let item in countries)
    {
      list.push({value:'+' + getCountryCallingCode(countries[item])});
    }

    return list;
  }

  render() {
    let {
      name,
      ageGroup,
      dob,
      email,
      password,
      confirmPassword,
      country,
      city,
      areaCode,
      mobileNumber,
      asWrite,
      isChecked,
      datePickerOpen
    } = this.state;
    let ageData = [{
      value: '18-25',
    }, {
      value: '26-36',
    }, {
      value: '40-50',
    }];
    let asWriteData = [{
      value: 'Yes',
    }, {
      value: 'No',
    }];

    let {auth} = this.props;
    let error = this.geterror();
    return (
      <KeyboardAvoidingView
        scrollEnabled
        style={{flex:1}}
        behavior="padding"
        >
        <ScrollView style={styles.screenContainer}>
          <StatusBar 
            backgroundColor={colors.circleColor} 
            barStyle="light-content"
            translucent={false}
          />
          {/* === header image === */}
          <View style={styles.topImage}>
            <ImageBackground
              source={require('../../../assets/images/signupBg.png')}
              style={styles.imageStyle2}>
              <View style={styles.headerText}>
                <Text style={styles.submitText}>
                  SIGN UP
                </Text>
              </View>
            </ImageBackground>
          </View>
          
          <View style={styles.mainContainer}>
              {/* === Form === */}
            <View style={styles.form}>
              {/* === NAME === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.5,0.9]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Name'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      returnKeyType={'done'}
                      value={name}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({name: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                  <View style={styles.mailIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/mail.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {
                error.name && (
                <Text style={styles.error}>{error.name}</Text>
                )
              }

              
              {/* === date of birth === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <TouchableOpacity style={styles.rowContainer}  onPress={()=>{this.setState({datePickerOpen: true})}} >
                  <TouchableOpacity style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Date of Birth'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      value={dob? moment(dob).format('YYYY-MM-DD'): ''}
                      editable={false}
                      style={styles.inputStyle}/> 
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.mailIcon} onPress={()=>{this.setState({datePickerOpen: true})}}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/calendar-icon.png')}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </LinearGradient>
              {
                error.dob && (
                <Text style={styles.error}>{error.dob}</Text>
                )
              }
              {/* === email address === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Email Address'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      keyboardType={'email-address'}
                      returnKeyType={Platform.OS==='ios'? 'done': 'next'}
                      value={email}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({email: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                  <View style={styles.mailIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/mail.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {
                error.email && (
                <Text style={styles.error}>{error.email}</Text>
                )
              }
              {/* === password === */}
              <LinearGradient 
                start={{x: 0.0, y: 0.8}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Password'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={true}
                      returnKeyType={'done'}
                      secureTextEntry={true}
                      value={password}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({password: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                  <View style={styles.mailIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/password.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {
                error.password1 && (
                <Text style={styles.error}>{error.password1}</Text>
                )
              }
              {/* === Conform password === */}
              <LinearGradient 
                start={{x: 0.0, y: 0.8}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Confirm Password'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={true}
                      returnKeyType={'done'}
                      secureTextEntry={true}
                      value={confirmPassword}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({confirmPassword: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                  <View style={styles.mailIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/password.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {
                error.password2 && (
                <Text style={styles.error}>{error.password2}</Text>
                )
              }
              {/* === country ==== */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                {
                  (!this.state.country && !this.state.showcountrypickermodal) && (
                    <TouchableOpacity style={{...styles.inputField,alignItems:'center',display:'flex'}} onPress={()=>this.setState({showcountrypickermodal:true})}>
                      <Text style={{...styles.inputStyle,height:'auto',paddingTop:10,color:colors.grayColor}}>Select Country</Text>
                    </TouchableOpacity>
                  )
                }
                {
                  (this.state.country || this.state.showcountrypickermodal) && (
                    <CountryPicker 
                      theme={DARK_THEME}  
                      countryCode={this.state.country} 
                      withCountryNameButton  
                      withFlag 
                      withCloseButton 
                      withModal 
                      withFilter 
                      visible={this.state.showcountrypickermodal}
                      onSelect={(country)=>{
                          this.setState({
                            country:country.cca2,
                            areaCode:'+' + getCountryCallingCode(country.cca2)
                          })
                          
                        }}
                      onClose={()=>{
                        this.setState({
                          showcountrypickermodal:false
                        })
                      }}
                      
                      ></CountryPicker>
                  )
                } 
                </View>
              </LinearGradient>
              {
                error.country && (
                <Text style={styles.error}>{error.country}</Text>
                )
              }
              {/* ==== city === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'City'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      value={city}
                      onChangeText={(val)=>{this.setState({
                        city: val
                      })}}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      style={styles.inputStyle}/> 
                  </View>
                  <View style={styles.mailIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../../assets/icons/globe-icon.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {
                error.city && (
                <Text style={styles.error}>{error.city}</Text>
                )
              }
              <View style={styles.rowContainer4}>
                {/* === Area Code === */}
                <View style={styles.cloumn1}>
                <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientStyle}
                    locations={[0.5,0.9]}
                    colors={[colors.borderColor,colors.inputGradient]}>
                    <View style={styles.rowContainer}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        //onPress={()=>{}} 
                        style={styles.areaCodeStyle}>
                        <Text style={styles.placeText}> 
                        {
                          this.state.areaCode?this.state.areaCode:'Area Code'
                        }
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </LinearGradient>
                </View>
                <View style={styles.cloumn2}>
                  {/*=== mobile number === */}
                  <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientStyle}
                    locations={[0.5,0.9]}
                    colors={[colors.borderColor,colors.inputGradient]}>
                    <View style={styles.rowContainer}>
                      <View style={styles.inputField}>
                        <TextInput
                          underlineColorAndroid={'transparent'}
                          placeholder={'Mobile Number'}
                          placeholderTextColor={colors.grayColor}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          blurOnSubmit={false}
                          keyboardType={'numeric'}
                          returnKeyType={'done'}
                          value={mobileNumber}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                          onChangeText={(val)=>{this.setState({mobileNumber: val})}}
                          style={styles.inputStyle}/> 
                      </View>
                      <View style={styles.mailIcon}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../../assets/icons/phone.png')}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
              {
                error.phone_number && (
                <Text style={styles.error}>{error.phone_number}</Text>
                )
              }
              {/* === as writer === */}
              <LinearGradient 
                start={{x: 0.0, y: 0.8}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                locations={[0.5,0.9]}
                colors={[colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <Dropdown
                    labelHeight={0}
                    data={asWriteData}
                    placeholder={'Do you want to contribute as writer?'}
                    placeholderTextColor={colors.grayColor}
                    value={asWrite}
                    renderAccessory={this.renderArrow}
                    containerStyle={styles.dropDownContainer}
                    pickerStyle={styles.pickerStyles}
                    inputContainerStyle={{...styles.inputContainerStyles,marginTop:5}}
                    textColor={colors.primary}
                    itemColor={colors.primary}
                    fontSize={resonsiveText(13)}
                    dropdownOffset={{top: 0, left: 0}}
                    onChangeText={(val)=>{
                      this.setState({
                        asWrite: val
                      })
                    }}
                    rippleOpacity={0}
                  />
                </View>
              </LinearGradient>
              {/* === terms === */}
              <View style={styles.rowContainer2}>
                <View>
                  <CheckBox
                    center
                    size={20}
                    containerStyle={styles.checkBoxContainer}
                    title='I accept terms & condition'
                    textStyle={{...styles.forgetText,marginLeft: 2}}
                    checked={isChecked}
                    onPress={()=>this.setState({isChecked:!this.state.isChecked})}
                  />
                </View>
              </View>
              
              {/* === submit === */}
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={()=>{this.signup()}}
                >
                  <Text style={styles.submitText}>
                    SUBMIT
                  </Text>
              </TouchableOpacity>
            </View>
            {/* //=== footer View === */}
            <View style={styles.rowContainer3}>
              <View>
                <Text style={styles.userText}>
                  Already account?
                </Text>
              </View>
              <TouchableOpacity
                onPress={()=>this.props.navigation.navigate('Login')}
                activeOpacity={0.8}>
                <View style={styles.bottonLine2}>
                  <Text style={styles.signupText}>
                    Sign in
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {Platform.OS==='ios' && datePickerOpen &&
          <View style={{width:'100%',backgroundColor:'white',position:'absolute',bottom: 200,right: 0,flexDirection:'row'}}>
            <TouchableOpacity 
              style={styles.doneButton}
              activeOpacity={0.8}
              onPress={()=>{this.setState({datePickerOpen: false})}}>
              <Text style={styles.doneText}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
          }
          {datePickerOpen &&
            <View style={styles.datePicker}>
              <DateTimePicker 
                value={dob? dob : new Date()}
                mode={'date'}
                display='calendar'
                is24Hour={true}
                style={styles.datePicker}
                onChange={this.setDate} 
              />
            </View>
          }
      </KeyboardAvoidingView>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})
//===  make components available outside ===
export default connect(mapstatetoprops)(SignupScreen);