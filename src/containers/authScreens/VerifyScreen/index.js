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
import {FORGET_PASSWORD} from '../../../constant/action-type';
import {connect} from 'react-redux';
import * as Util from '../../../utils/util';
import * as actiontype from '../../../constant/action-type';
import { color } from 'react-native-reanimated';
import Alert from '../../../components/Alert';

//=== screen ===
class VerifyScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      phone_number: '',
      verify:"",
      alert:{
        show:false
      }
    }
  }

  componentDidMount()
  {
    console.log(this.props.auth);
    let phone = this.props.auth.verify_phone;
    console.log(phone);
    this.setState({
      phone_number:phone
    })
  }

  verify = () => {
      if(this.state.verify)
      {
        const {dispatch,auth} = this.props;
        dispatch({type:actiontype.Verify_User,phone_number:auth.verify_phone,verify:this.state.verify,next:this.next});
      }
  }

  next = (data) => {
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
          message:data.message,
          title:'Verify Error'
        }
      })
      //alert(data.message);
    }
  }

  render() {
    let {
      phone_number,
    } = this.state;

    let {auth} = this.props;
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
                  Verify If It is you
                </Text>
              </View>
            </View>
            {/* === Form === */}
            <View style={styles.form}>
              {/* === phone number === */}
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
                      value={auth.verify_phone}
                      editable={false}
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
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.borderColor,colors.inputGradient]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField}>
                    <TextInput
                      keyboardType="phone-pad"
                      onChangeText={(val)=>this.setState({verify:val})}
                      placeholder="Verify Code" 
                      placeholderTextColor={colors.grayColor}                     
                      style={styles.inputStyle}/> 
                  </View>                 
                </View>
              </LinearGradient>
              {/* === submit === */}
              <TouchableOpacity
                style={styles.submitButton}
                activeOpacity={0.8}
                onPress={this.verify}
                >
                  <Text style={styles.submitText}>
                    SEND
                  </Text>
              </TouchableOpacity>
              <Alert 
                alert={this.state.alert}
                onconfirmpressed={()=>this.setState({
                  alert:{
                    show:false
                  }
                })}
              ></Alert>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})


//===  make components available outside ===
export default connect(mapstatetoprops)(VerifyScreen);