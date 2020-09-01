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
import styles from './styles';
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import config from '../../config/config';

function WriterSideBar(props) {
  const logoutscreen = () => {
    const {navigation} = props;
    navigation.navigate('Login');
  }

  const logout = () => {
    const {dispatch,token} = props;
    dispatch({type:actiontype.AUTH_LOGOUT,token:token,logout:logoutscreen});
  }

  const {notification,user} = props;
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
            onPress={()=>{props.navigation.navigate('WriterMain')}} 
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
                  Home
                </Text>
              </View>
          </TouchableOpacity>
          {/* === My Books === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('WriterMyBook')}} 
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/book.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                  My Books
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
                  Categories
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
                  My Wishes
                </Text>
              </View>
          </TouchableOpacity>
          {/* === My Bookmarks === */}
          {/* <TouchableOpacity
            onPress={()=>{props.navigation.navigate('MyBookmarks')}}
            style={styles.rowContainer}
            activeOpacity={0.8}>
              <View style={styles.sideIcon}>
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/bookmark.png')}
                />
              </View>
              <View style={styles.listContainer}>
                <Text style={styles.listText}>
                  My Bookmarks
                </Text>
              </View>
          </TouchableOpacity> */}
           {/* === My Bookmarks === */}
           {/* <TouchableOpacity
            onPress={()=>{props.navigation.navigate('MyFriendList')}}
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
                  My Friend List
                </Text>
              </View>
          </TouchableOpacity>  */}
          {/* === My Account === */}
          <TouchableOpacity
            onPress={()=>{props.navigation.navigate('WriterAccount')}}
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
                  My Account
                </Text>
              </View>
          </TouchableOpacity>
          {/* === My Friend List ===
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
                  MyFriendList
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
                  Language Preference
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
                    Notification
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
                  Support
                </Text>
              </View>
          </TouchableOpacity>
        </View>
        {/* === logout === */}
        <TouchableOpacity 
          onPress={logout}
          style={[styles.rowContainer,styles.logoutButton]}
          activeOpacity={0.8}>
          <View style={styles.sideIcon}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/icons/logout.png')}
            />
          </View>
          <View style={styles.listContainer}>
            <Text style={styles.listText}>
              Logout
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
  notification:state.notification,
  user:state.auth.user
})

export default connect(mapstatetoprops)(WriterSideBar);