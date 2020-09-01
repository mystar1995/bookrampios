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
  Platform,
  Keyboard,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView
} from 'react-native';

//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';

import {connect} from 'react-redux';

//=== screen ===
class SuportCenterScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      searchKey: ''
    }
  }

  render() {
    let {
      searchKey
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
        <ScrollView 
          style={styles.screenContainer}
          bounces={false}>
          <View style={styles.screenContainer}>
            <StatusBar 
              backgroundColor={colors.circleColor} 
              barStyle="light-content"
              translucent={false}
            />
            {/* === header === */}
            <ImageBackground 
              resizeMode='stretch'
              style={styles.headerContainer2} 
              source={require('../../assets/images/support-bg.png')}>
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
                    Suport Center
                  </Text>
                </View>
                <View/>
              </View>
              </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* //=== 1 === */}
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('PhoneSupport',{title:"Learn how to use the app?",index:1})}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      Learn how to use the app?
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              {/* //=== 2 === */}
              <TouchableOpacity
                // onPress={()=>{}}
                onPress={()=>{this.props.navigation.navigate('PhoneSupport',{title:"FAQ's",index:2})}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      FAQ's
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              {/* //=== 3 === */}
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('EmailSupport')}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      Email Customer Support
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              {/* //=== 4 === */}
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('PhoneSupport',{title:"Call Customer Care",index:3})}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      Call Customer Care
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              {/* //=== 5 === */}
              <TouchableOpacity
                // onPress={()=>{}}
                onPress={()=>{this.props.navigation.navigate('PhoneSupport',{title:"Term Of Use",index:4})}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      Term Of Use
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              {/* //=== 6 === */}
              <TouchableOpacity
                onPress={()=>{this.props.navigation.navigate('PhoneSupport',{title:"Privacy Policy",index:5})}}
                activeOpacity={0.8}
                style={styles.rowContainer}
                >
                  <View>
                    <Text style={styles.textDesign}>
                      Privacy Policy
                    </Text>
                  </View>
                  <View style={styles.rightIcon}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(SuportCenterScreen);