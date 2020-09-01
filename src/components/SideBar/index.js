import React from 'react';
import { 
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
// == style ===
import styles from './styles'
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import config from '../../config/config';
import * as translate from '../../utils/translate'

function SideBar(props) {
  const logoutscreen = () => {
    const {navigation} = props;
    navigation.navigate('Login');
  }

  const logout = () => {
    const {dispatch,token} = props;
    dispatch({type:actiontype.AUTH_LOGOUT,token:token,logout:logoutscreen});
  }

  const {user,notification,auth} = props;
  
  return (
    <View style={styles.sideBarContainer}>
      <SafeAreaView/>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer2}>
          {/* === user image === */}
          <TouchableHighlight
            activeOpacity={0.8}
            // onPress={()=>{}}
            style={styles.userImage}>
            <Image
              style={styles.imageStyle}
              source={user.profile_pic?{uri:config.fileurl + user.profile_pic}:require('../../assets/placeHolder/user.png')}
            />
          </TouchableHighlight>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {user.username}
            </Text>
          </View>
        </View>
        {/* === main list === */}
        <View style={styles.mainList}>
        
        {/* Home */}
        <TouchableOpacity
            onPress={()=>{props.navigation.navigate('ReaderMain')}} 
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/tabHome.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('Home',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === Categories === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('Category')}} 
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/categories.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('Categories',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === Wishes === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('MyWish')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/wishes.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('My Wishes',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === My Account === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('MyAccount')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/tabUser.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('My Account',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === My Friend List === */}
          {/* <TouchableOpacity
            onPress={()=>{props.navigation.navigate('MyFriendList')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/language.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                  Language Preference
                </Text>
              </View>
          </TouchableOpacity> */}

           {/* === Fan List === */}
           {/* <TouchableOpacity
            onPress={()=>{props.navigation.navigate('FanList')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/language.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                  FanList
                </Text>
              </View>
          </TouchableOpacity> */}
          {/* === Language Preference === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('Language')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/language.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('Language Preference',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === Archieved Book === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('Download')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/archive.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('Archieved Books',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
          {/* === Notification === */}
          <View style={styles.rowContainer3}>
            <TouchableOpacity
              onPress={()=>{props.navigation.navigate('Notification')}}
              style={styles.rowContainer}
              activeOpacity={0.8}>
                <View style={styles.sideIcon}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/notification.png')}
                  />
                </View>
                <View style={styles.listContainer}>
                  <Text style={styles.listText}>
                  {translate.getlang('Notification',auth.user.language)}
                  </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.circleView}>
              <Text style={styles.listText2}>
                {notification.length}
              </Text>
            </View>
          </View>
          
          {/* === Support === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('SuportCenter')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/support.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                {translate.getlang('Support',auth.user.language)}
                </Text>
              </View>
          </TouchableOpacity>
        </View>
        {/* === logout === */}
        <TouchableOpacity 
          onPress={logout}
          style={styles.rowContainer}
          activeOpacity={0.8}>
          <View style={styles.sideIcon}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/icons/logout.png')}
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>
            {translate.getlang('Logout',auth.user.language)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <SafeAreaView/>
    </View>
  );
}

const mapstatetoprops = (state) => ({
  token:state.auth.token,
  user:state.auth.user,
  notification:state.notification,
  auth:state.auth
});

export default connect(mapstatetoprops)(SideBar);