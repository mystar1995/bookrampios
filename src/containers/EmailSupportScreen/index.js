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
} from 'react-native';
//=== side bar ===
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {descData } from './data';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as translate from '../../utils/translate';
class EmailSupportScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      email: ''
    }
  }

  
  render() {
    let {
      query,
      email
    } = this.state;
    
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
          <SafeAreaView style={{backgroundColor: colors.supportHeaderColor}}/>
          <View style={styles.headerContainer} >
            <View style={styles.headView}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backIcon}
                onPress={()=>{this.props.navigation.pop()}}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/backArrow.png')}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerText}>
                {translate.getlang('Email Customer Support',auth.user.language)}
                </Text>
              </View>
              <View/>
            </View>
          </View>
          {/* === main content === */}
          <View style={styles.mainContainer}>
            {/* === IMAGE === */}
            <View style={styles.supportImage}>
              <Image
                style={styles.imageStyle}
                source={require('../../assets/images/email-support-bg.png')}
              />
            </View>
            {/* === text === */}
            <View>
              <Text style={styles.helpText}>
              {translate.getlang('Do you have any query',auth.user.language)}?
              </Text>
            </View>
            {/* === text === */}
            <View style={styles.decView}>
              <Text style={styles.descText}>
                Contact Email : {this.props.config.content_server_email}
              </Text>
            </View>

            <View style={styles.formView}>
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.rowContainer}>
                  <View style={styles.inputField2}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={translate.getlang('Email Address',auth.user.language)}
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
                      source={require('../../assets/icons/mail.png')}
                    />
                  </View>
                </View>
              </LinearGradient>
              {/* === Story === */}
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientTxtAreaStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={{...styles.rowContainer,paddingTop: 10}}>
                  <View style={styles.inputField2}>
                    <TextInput
                      underlineColorAndroid={'transparent'}
                      placeholder={translate.getlang('Type your query here',auth.user.language)}
                      placeholderTextColor={colors.grayColor}
                      autoCorrect={false}
                      multiline={true}
                      autoCapitalize={'none'}
                      blurOnSubmit={false}
                      returnKeyType={'done'}
                      value={query}
                      textAlignVertical="top"
                      onSubmitEditing={()=>{Keyboard.dismiss()}}
                      onChangeText={(val)=>{this.setState({query: val})}}
                      style={styles.inputStyle}/> 
                  </View>
                </View>
              </LinearGradient>
            </View>
            {/* === Button === */}
              <TouchableOpacity
                style={styles.sendButton}
                activeOpacity={0.8}
                >
                  <Text style={styles.sendText}>
                  {translate.getlang('SEND',auth.user.language)}
                  </Text>
              </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapstatetoprops = (state) => ({
  config:state.config,
  auth:state.auth
})
//===  make components available outside ===
export default connect(mapstatetoprops)(EmailSupportScreen);