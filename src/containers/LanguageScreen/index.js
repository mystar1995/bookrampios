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
  Dimensions
} from 'react-native';

//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import * as translate from '../../utils/translate';
import * as actiontype from '../../constant/action-type';
import {connect} from 'react-redux';
//=== screen ===
class LanguageScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      language: '',
    }
  }

  setlanguage = (lang) => {
    let {dispatch,auth} = this.props;
    dispatch({type:actiontype.SET_LANG,lang:lang,token:auth.token});
  }

  render() {
    let {
      language,
    } = this.state;

    let {auth} = this.props;
    return (
        // === side bar ===
      <ScalingDrawer 
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        ref={ref => this._drawer = ref}
        content={auth.role == 'reader'?<SideBar navigation={this.props.navigation}/>:<WriterSideBar navigation={this.props.navigation}></WriterSideBar>}
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
                  onPress={()=>{this._drawer.open()}}
                >
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/toggle.png')}
                  />
                </TouchableOpacity>
                <View>
                  <Text style={styles.headingText}>
                    {translate.getlang("Select Language",auth.user.language)}
                  </Text>
                </View>
                
                <View></View>
              </View>
              </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* === Arabic === */}
              <TouchableOpacity
                onPress={()=>{
                  this.setlanguage("ar")
                  }}
                style={styles.rowContainer}
                >
                <View style={styles.rowContainer2}>
                  <View style={styles.circleView}>
                    <Text style={styles.optionText}>
                      Ar
                    </Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.optionText}>
                      {translate.getlang("Arabic",auth.user.language)}
                    </Text>
                  </View>
                </View>
                {auth.user.language==='ar' &&
                  <View style={styles.checkBoxStyle}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/checkBox.png')}
                  />
                </View>
                }
              </TouchableOpacity>
              {/* === english === */}
              <TouchableOpacity
                onPress={()=>{
                  this.setlanguage('en')  
                }}
                style={styles.rowContainer}
                >
                <View style={styles.rowContainer2}>
                  <View style={styles.circleView}>
                    <Text style={styles.optionText}>
                      En
                    </Text>
                  </View>
                  <View style={styles.textView}>
                    <Text style={styles.optionText}>
                      {translate.getlang("English",auth.user.language)}
                    </Text>
                  </View>
                </View>
                {auth.user.language==='en' &&
                  <View style={styles.checkBoxStyle}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/checkBox.png')}
                  />
                </View>
                }
              </TouchableOpacity>

            </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(LanguageScreen);