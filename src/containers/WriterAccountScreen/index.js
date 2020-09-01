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
  TouchableHighlight
} from 'react-native';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import WriterSideBar from '../../components/WriterSideBar';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';

import config from '../../config/config';
import * as actiontype from '../../constant/action-type';


class WriterAccountScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      name: 'Abhi Raj',
      point: 50,
      isActive: false,
    }
  }

  handlePress=(screenName,value,indexVal)=>{
    this.setState({
      isActive: value,
    })
    if(indexVal){
      this.props.navigation.replace(screenName,{index: indexVal})
    }else{
      this.props.navigation.navigate(screenName,{index: indexVal})
    }
  }

  logout = () => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.AUTH_LOGOUT,token:auth.token,logout:this.logoutsuccess});
  }

  logoutsuccess = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    let {
      name,
      point,
      isActive
    } = this.state

    let {auth} = this.props;
    return (
      // === side bar ===
      <ScalingDrawer 
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        ref={ref => this._drawer = ref}
        content={<WriterSideBar navigation={this.props.navigation}/>}
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
                <Text style={styles.headerText}>
                  My Account
                </Text>
              </View>
             <View/>
            </View>
          </ImageBackground>
            {/* === main content === */}
            <View style={styles.mainContainer}>
              <View style={styles.imageCon}>
                <View style={styles.centerAlgin}>
                    {/* === book image  === */}
                    <View style={styles.userImageStyle}>
                      <Image
                        style={styles.imageStyle}
                        source={{uri:config.fileurl + auth.user.profile_pic}}
                      />
                    </View>
                    {/* //===name === */}
                    <View style={styles.nameTextView}>
                      <Text 
                        numberOfLines={1} 
                        style={styles.nameTxt}>
                        {auth.user.username}
                      </Text>
                    </View>
                    {/* //=== reward === */}
                    <View style={{marginTop:3}}>
                      <Text 
                        numberOfLines={1} 
                        style={styles.pointTxt}>
                        Reward point :{auth.user.rewards}
                      </Text>
                    </View>
                  </View>
              </View>
              <ScrollView 
                style={styles.scrollView}
                bounces={false}>
                {/* //===list === */}
                <View style={styles.listView}>
                  {/* //=== account === */}
                  <TouchableOpacity
                    onPress={()=>{this.handlePress(auth.role == 'reader'?'ReaderMain':'WriterMain',1,3)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===1? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===1 ?
                                require('../../assets/icons/userOn.png')
                              :
                                require('../../assets/icons/tabUser.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            My Profile
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===1? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === bookMark === */}
                  <TouchableOpacity
                    onPress={()=>{this.handlePress('MyBookmarks',2)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===2 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===2 ?
                              require('../../assets/icons/bookmarkOn.png')
                            :
                              require('../../assets/icons/bookmark.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            My Bookmarks
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===2? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === my book === */}
                  <TouchableOpacity
                     onPress={()=>{this.handlePress('ReaderMain',3,2)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===3 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===3 ?
                                require('../../assets/icons/my-bookOn.png')
                              :
                                require('../../assets/icons/my-book.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            My Books
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===3? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === Sold Book === */}
                  <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('Download',{title:'Sold'})}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===4 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===4 ?
                                require('../../assets/icons/solid-active.png')
                              :
                                require('../../assets/icons/solid.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            Sold Books
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===4? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === Money Earned === */}
                  <TouchableOpacity
                    onPress={()=>{this.props.navigation.navigate('WriterReward')}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===5 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===5 ?
                                require('../../assets/icons/rewardOn.png')
                              :
                                require('../../assets/icons/reward.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            Money Earned
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===5? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === my reward === */}
                  <TouchableOpacity
                    onPress={()=>{this.handlePress('MyRewards',6)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===6 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===6 ?
                                require('../../assets/icons/rewardOn.png')
                              :
                                require('../../assets/icons/reward.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            My Rewards
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===6? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === My Purchase === */}
                  <TouchableOpacity
                    onPress={()=>{this.handlePress('RewardsHistory',7)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===7 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===7 ?
                                require('../../assets/icons/purchaseOn.png')
                              :
                                require('../../assets/icons/purchase.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            My Purchase
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===7? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === preffered book === */}
                  <TouchableOpacity
                    onPress={()=>{this.handlePress('PreferredBooks',8)}}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===8 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===8 ?
                                require('../../assets/icons/preferred-bookOn.png')
                              :
                                require('../../assets/icons/preferred-book.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            Preferred Books
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===8? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                  {/* === Logout === */}
                  <TouchableOpacity
                    onPress={this.logout}
                    activeOpacity={0.8}
                    style={{
                      ...styles.rowContainer,
                      backgroundColor: isActive===9 ? colors.submitColor: colors.listColor
                    }}>
                      <View style={styles.rowContainer2}>
                        {/* //=== icons === */}
                        <View style={styles.iconsStyle}>
                          <Image
                            style={styles.imageStyle}
                            source={isActive===9 ?
                                require('../../assets/icons/logoutOn.png')
                              :
                                require('../../assets/icons/logout.png')
                            }
                          />
                        </View>
                        <View style={{marginLeft: 20}}>
                          <Text style={styles.optionTxt}>
                            Logout
                          </Text>
                        </View>
                      </View>
                      {/* //=== right icon === */}
                      <View style={{
                        ...styles.rightIcon,
                        backgroundColor: isActive===9? colors.submitColor33: colors.listColor
                        }}>
                        <Image
                          source={require('../../assets/icons/rightArrow.png')}
                          style={styles.imageStyle}
                        />
                      </View>
                  </TouchableOpacity>
                </View>
              </ScrollView>
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
export default connect(mapstatetoprops)(WriterAccountScreen);