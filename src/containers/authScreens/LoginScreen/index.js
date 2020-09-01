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
  Keyboard} from 'react-native';
//=== style ==
import styles from './styles';
import { CheckBox } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== colors ===
import colors from '../../../utils/colors';
import * as actiontype from '../../../constant/action-type';
import {connect} from 'react-redux';
import * as Util from '../../../utils/util';
import Alert from '../../../components/Alert';
//=== screen ===
class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      email: '',
      password: '',
      remember_me:false,
      accept_policy:false,
      alert:{
        show:false,
        title:"",
        message:""
      }
    }
  }

  //=== focus Next ====
  _focusNextField(nextField){
    this.refs[nextField].focus();
  }

  handleSubmit=()=>{
    const {dispatch} = this.props;
    if(this.validate())
    {
      const {email,password} = this.state;
      dispatch({type:actiontype.AUTH_START,user:{email:email,password:password},login:this.login,error:this.error,verify:this.verify})
    }
  }

  verify = (phone) => {
    console.log(phone);
    this.props.navigation.navigate('Verify',{phone:phone});
  }

  error = (str) => {
    this.setState({
      alert:{
        show:true,
        title:"Login Error",
        message:str
      }
    })
  }

  login = (usertype) => {
    if(usertype == 'writer')
    {
      this.props.navigation.navigate('WriterMain');
    }
    else
    {
      this.props.navigation.navigate('ReaderMain');
    }
  }

  validate = () => {
    if(!this.state.email || !Util.validateemail(this.state.email))
    {
      this.setState({
        alert:{
          show:true,
          message:"Email is empty or not valid",
          title:'Validate Error'
        }
      })
      //Alert.alert("Email is empty or not valid")
      return false;
    }

    if(!this.state.password)
    {
      this.setState({
        alert:{
          show:true,
          message:"Password is required",
          title:'Validate Error'
        }
      })
      //Alert.alert("Password is required");
      return false;
    }

    if(!this.state.accept_policy)
    {
      this.setState({
        alert:{
          show:true,
          message:"Please Accept Terms and Policy",
          title:'Validate Error'
        }
      })
      //Alert.alert("Please Accept Terms and Policy");
      return false;
    }

    return true;
  }

  componentWillReceiveProps(props)
  {
    let {auth} = this.props;
    if(auth.isLogin)
    {
      this.login(auth.role);
    }
  }

  render() {
    let {
      email,
      password,
      isChecked
    } = this.state;

    let {auth} = this.props;
    if(auth.islogin)
    {
      this.login(auth.role);
    }
    return (
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
          {/* === header image === */}
          <View style={styles.topImage}>
            <Image
              source={require('../../../assets/images/headerImage.png')}
              style={styles.imageStyle2}
            />
          </View>
          
          <View style={styles.mainContainer}>
            <View>
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
                    WELCOME TO BOOKRAMP
                  </Text>
                </View>
                {/* <View style={styles.descView}>
                  <Text style={styles.descText}>
                  Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
                  </Text>
                </View> */}
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
                        placeholder={'Email Address'}
                        placeholderTextColor={colors.grayColor}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        blurOnSubmit={false}
                        keyboardType={'email-address'}
                        returnKeyType={Platform.OS==='ios'? 'done': 'next'}
                        value={email}
                        onSubmitEditing={()=>{this._focusNextField('password')}}
                        onChangeText={(val)=>{this.setState({email: val})}}
                        style={styles.inputStyle}/> 
                    </View>
                    <View style={styles.mailIcon}>
                      <Image
                        style={{width:20,height:15}}
                        source={require('../../../assets/icons/mail.png')}
                      />
                    </View>
                  </View>
                </LinearGradient>
                {/* === password === */}
                <LinearGradient
                  start={{x: 0.0, y: 0.8}} end={{x: 1.0, y: 1.0}}
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
                        secureTextEntry={true}
                        blurOnSubmit={true}
                        returnKeyType={'done'}
                        ref='password'
                        value={password}
                        onSubmitEditing={()=>{Keyboard.dismiss()}}
                        onChangeText={(val)=>{this.setState({password: val})}}
                        style={styles.inputStyle}/> 
                    </View>
                    <View style={styles.mailIcon}>
                      <Image
                        style={{width:15,height:17}}
                        source={require('../../../assets/icons/password.png')}
                      />
                    </View>
                  </View>
                </LinearGradient>
                {/* === forgetpassword === */}
                <View style={styles.rowContainer2}>
                  <View>
                    <CheckBox
                      size={20}
                      containerStyle={styles.checkBoxContainer}
                      title='I accept all term & conditions'
                      textStyle={{...styles.forgetText,marginLeft: 2}}
                      checked={this.state.accept_policy}
                      onPress={()=>this.setState({accept_policy:!this.state.accept_policy})}
                    />
                  </View>
                  <View>
                    <CheckBox
                      size={20}
                      containerStyle={styles.checkBoxContainer}
                      title='Remember Me'
                      textStyle={{...styles.forgetText,marginLeft: 2}}
                      checked={this.state.remember_me}
                      onPress={()=>this.setState({remember_me:!this.state.remember_me})}
                    />
                  </View>
                </View>
                {/* === submit === */}
                <TouchableOpacity
                  style={styles.submitButton}
                  activeOpacity={0.8}
                  onPress={()=>this.handleSubmit()}
                  >
                    <Text style={styles.submitText}>
                      SUBMIT
                    </Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                  <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={()=>{this.props.navigation.navigate('ForgetPassword')}}
                    style={styles.forgetButton}>
                      <View style={styles.bottonLine}>
                        <Text style={styles.forgetText}>
                          Forget Password?
                        </Text>
                      </View>
                  </TouchableOpacity>
                </View>
                
              </View>
            </View>

            <View style={styles.rowContainer3}>
              <View>
                <Text style={styles.userText}>
                  New User?
                </Text>
              </View>
              <TouchableOpacity
                onPress={()=>{
                  this.props.navigation.navigate('Signup')
                }}
                activeOpacity={0.8}
              >
                <View style={styles.bottonLine2}>
                  <Text style={styles.signupText}>
                    Click here to Sign up
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Alert 
          alert={this.state.alert}
          onconfirmpressed={()=>this.setState({
            alert:{show:false}
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
export default connect(mapstatetoprops)(LoginScreen);