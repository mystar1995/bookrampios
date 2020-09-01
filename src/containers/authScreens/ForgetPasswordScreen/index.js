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
  Keyboard
} from 'react-native';
//=== style ==
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== colors ===
import colors from '../../../utils/colors';
import {FORGET_PASSWORD,RESET_PASSWORD} from '../../../constant/action-type';
import {connect} from 'react-redux';
import CountryPicker,{DARK_THEME} from 'react-native-country-picker-modal';
import * as Util from '../../../utils/util';
import Alert from '../../../components/Alert';
//=== screen ===
class ForgetPasswordScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      phone_number: '',
      verify_code:'',
      password:'',
      confirm_password:'',
      verify:false,
      alert:{
        show:false,
        title:"",
        message:""
      }
    }
  }

  componentDidMount()
  {
     
  }

  forgetpassword = () => {
    const {dispatch} = this.props;
    if(!this.state.verify)
    {
      if(this.state.phone_number)
      {
        dispatch({type:FORGET_PASSWORD,phone_number:this.state.phone_number,next:this.next});
      }
      else
      {
        this.setState({
          alert:{
            show:true,
            title:"Validate Error",
            message:"You have to add valid phone number"
          }
        })
        //Alert.alert("You have to add valid phone number");
      }
    }
    else
    {
      if(this.state.password && this.state.password == this.state.confirm_password)
      {
        let data = {
          phone_number:this.state.phone_number,
          verify_code:this.state.verify_code,
          password:this.state.password
        }
        dispatch({type:RESET_PASSWORD,data:data,next:this.resetpassword});
      }
      else
      {
        this.setState({
          alert:{
            show:true,
            title:"Validate Error",
            message:"Password has to be same as Confirm Password"
          }
        })
        //Alert.alert("Password has to be same as Confirm Password");
      }
      
    }
    
  }

  resetpassword = (data) => {
    console.log(data);
    if(data.success)
    {
      if(data.usertype == 'writer')
      {
        this.props.navigation.navigate('WriterMain');
      }
      else
      {
        this.props.navigation.navigate('ReaderMain');
      }
    }
    else
    {
      this.setState({
        alert:{
          show:true,
          title:"Confirm Error",
          message:data.message
        }
      }) 
      //Alert.alert(data.message);
    }
  }

  next = (data) => {
    if(data.success)
    {
      this.setState({verify:true});
    }
    else
    {
      this.setState({
        alert:{
          show:true,
          title:"Error",
          message:data.message
        }
      }) 
      //Alert.alert(data.message);
    }
  }

  render() {
    let {
      phone_number,
      password,
      confirm_password,
      verify_code
    } = this.state;
    return (
      <KeyboardAwareScrollView
        scrollEnabled={false}
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
          {/* === header image === */}
          <View style={styles.topImage}>
            <Image
              source={require('../../../assets/images/headerImage.png')}
              style={styles.imageStyle2}
            />
          </View>
          
          <View style={styles.mainContainer}>
            {/* === app logo === */}
            <View style={styles.logoStyle}>
              <Image
                style={styles.imageStyle}
                source={require('../../../assets/images/logo2.png')}
              />
            </View>
            {/* === app name === */}
            <View style={styles.textView}>
              <View style={styles.appNameView}>
                <Text style={styles.appNameText}>
                  Forget Password?
                </Text>
              </View>
              <View style={styles.descView}>
                <Text style={styles.descText}>
                  Enter your Phone number. here you recieve futher instructions.
                </Text>
              </View>
            </View>
            {/* === Form === */}
            <View style={styles.form}>
              {/* === email === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={'Phone Number'}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      keyboardType={'phone-pad'}
                      returnKeyType={'done'}
                      value={phone_number}
                      onChangeText={(val)=>{this.setState({phone_number: val})}}
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
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
              {/* === submit === */}
              {
                this.state.verify && (
                  <>
                    <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientStyle}
                    colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                    <View style={styles.rowContainer}>
                      <View style={styles.inputField}>
                        <TextInput
                          underlineColorAndroid={'transparent'}
                          placeholder={'Verify Code'}
                          placeholderTextColor={colors.grayColor}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          blurOnSubmit={false}
                          returnKeyType={'done'}
                          value={verify_code}
                          onChangeText={(val)=>{this.setState({verify_code: val})}}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                          style={styles.inputStyle}/> 
                      </View>
                    </View>
                  </LinearGradient>
                    <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientStyle}
                    colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                    <View style={styles.rowContainer}>
                      <View style={styles.inputField}>
                        <TextInput
                          underlineColorAndroid={'transparent'}
                          placeholder={'Password'}
                          placeholderTextColor={colors.grayColor}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          blurOnSubmit={false}
                          returnKeyType={'done'}
                          secureTextEntry={true}
                          value={password}
                          onChangeText={(val)=>{this.setState({password: val})}}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                          style={styles.inputStyle}/> 
                      </View>
                    </View>
                  </LinearGradient>
                  <LinearGradient 
                    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                    style={styles.gradientStyle}
                    colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                    <View style={styles.rowContainer}>
                      <View style={styles.inputField}>
                        <TextInput
                          underlineColorAndroid={'transparent'}
                          placeholder={'Confirm Password'}
                          placeholderTextColor={colors.grayColor}
                          autoCorrect={false}
                          autoCapitalize={'none'}
                          blurOnSubmit={false}
                          returnKeyType={'done'}
                          secureTextEntry={true}
                          value={confirm_password}
                          onChangeText={(val)=>{this.setState({confirm_password: val})}}
                          onSubmitEditing={()=>{Keyboard.dismiss()}}
                          style={styles.inputStyle}/> 
                      </View>
                    </View>
                  </LinearGradient>
                  </>
                )
              }
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={this.forgetpassword}
                >
                  <Text style={styles.submitText}>
                    SEND
                  </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(ForgetPasswordScreen);