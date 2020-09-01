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
  TouchableHighlight,
  Linking,
} from 'react-native';

import {descData } from './data';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';

class PhoneSupportScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '+918976543210'
    }
  }

  getservice = () => {
    let index = this.props.route.params.index;
    switch(index)
    {
      case 1:
        return this.props.config.how_to_use;
      case 2:
        return this.props.config.faqs;
      case 3:
        return '';
      case 4:
        return this.props.config.terms_condition;
      case 5:
        return this.props.config.profanity;
    }
  }
  //===call  press===
  dialCall=()=>{
    const {config}=this.props;
    if(phone){
      const number = config.content_service_number;
      let  phoneNumber='';
      if (Platform.OS === 'android') {
        phoneNumber = 'tel:${'+number+'}';
      }
      else {
        phoneNumber = 'telprompt:${'+number+'}';
      }
      Linking.openURL(phoneNumber);
    }
  }

  render() {
    let {config} = this.props;
    return (
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
                {this.props.route.params.title}
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
              source={require('../../assets/images/phone-support-bg.png')}
            />
          </View>
          {/* === text === */}
          <View>
            <Text style={styles.helpText}>
              Need some help?
            </Text>
          </View>
          {/* === text === */}
          <View style={styles.decView}>
            <Text style={styles.descText}>
              {
                this.getservice()
              }
            </Text>
          </View>
           {/* === Button === */}
           {
             this.props.route.params.index == 3 && (
                <TouchableOpacity
                style={styles.callButton}
                activeOpacity={0.8}
                onPress={()=>this.dialCall()}
                >
                  <Text style={styles.callText}>
                    Call:  {config.content_service_number}
                  </Text>
              </TouchableOpacity>
             )
           }
            
        </View>
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  config:state.config
})

//===  make components available outside ===
export default connect(mapstatetoprops)(PhoneSupportScreen);