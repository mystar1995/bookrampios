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
} from 'react-native';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import {descData} from './data';
import LinearGradient from 'react-native-linear-gradient';
//=== star ====
import {
  AirbnbRating,
} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import config from '../../config/config';
import Paypal from 'react-native-paypal-wrapper';
import * as actiontype from '../../constant/action-type';
import Alert from '../../components/Alert';

class WriterRewardsScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      name: 'Abhi Raj',
      point: 50,
      isActive: 1,
      buyreward:false,
      rewards:0,
      alert:{
        show:false
      }
    }
  }

  calcearned = () => {
    let {auth} = this.props;
    let sum = 0;
    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == 'Earned')
      {
        sum += Number(auth.rewards[item].rewards);
      }
    }

    return sum;
  }

  calcburned = () => {
    let {auth} = this.props;
    let sum = 0;
    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == 'Burned')
      {
        sum += Number(auth.rewards[item].rewards);
      }
    }

    return sum;
  }

  getpointwithtype = (type) => {
    let {auth} = this.props;
    let sum = {article:0,book:0};
    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == type)
      {
        sum[auth.rewards[item].content_type] += Number(auth.rewards[item].rewards);
      }
    }

    return sum;
  }

  pay = () => {
    let {auth} = this.props;
    let amount = this.state.rewards * this.props.config.purchase_points / 100;
    this.setState({
      buyreward:false,
      rewards:0
    })
    Paypal.initialize(Paypal.SANDBOX,config.paypal.sandbox);
    Paypal.pay({
      price:amount + "",
      currency:'USD',
      description:'Buy Reward'
    }).then(confirm=>{
      this.buyreward(confirm.response.id,amount,this.state.rewards);
    }).catch(err=>console.log(err));
  }

  buyreward = (rewards) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.BUY_REWARDS,rewards:rewards,token:auth.token});
    this.setState({
      alert:{
        show:true,
        title:"Payment Success",
        message:'You have successfully Buy ' + rewards + " Rewards"
      }
    })
    //Alert.alert('You have successfully Buy ' + rewards + " Rewards");
  }

  getrewards = (type) => {
    const {dispatch,auth} = this.props;
    let result = [];

    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == type)
      {
        result.push(auth.rewards[item]);
      }
    }

    return result;
  }

  render() {
    let {
      name,
      point,
      isActive,
    } = this.state
    const ScreenWidth = Math.round(Dimensions.get('window').width);
    const ScreenHeight = Math.round(Dimensions.get('window').height);
    let {auth,config} = this.props;
    console.log(config);
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
          bounces={false}
          style={styles.screenContainer}
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
              source={require('../../assets/images/reward-bg.png')}>
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
                    My Rewards
                  </Text>
                </View>

                <View/>
              </View>
            </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* //=== reward === */}
              <View style={[styles.rowContainer2,styles.alineCenter]}>
                <View>
                  <Text style={styles.pointTxt}>
                    {auth.user.rewards} Points
                  </Text>
                </View>
                {/* === / === */}
                {/* <View>
                  <Text style={styles.slashTxt}>
                    /
                  </Text>
                </View> */}
                {/* //=== dollar === */}
                {/* <View>
                  <Text style={styles.pointTxt}>
                    {auth.user.rewards / 100}$
                  </Text>
                </View> */}
              </View>
              {/* //=== subtitle === */}
              <View style={{...styles.alineCenter,marginTop: 5}}>
                <Text style={styles.subTxt}>
                  Rewards points Balance
                </Text>
              </View>
              <View style={{...styles.alineCenter,marginTop:10}}>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({buyreward:true})}>
                  <Text style={styles.buttontext}>Buy Rewards</Text>
                </TouchableOpacity>
              </View>
              {/* === earn === */}
              {/* <View style={{...styles.alineCenter,marginTop: 25}}>
                <Text style={styles.howTxt}>
                  How to earn rewards point?
                </Text>
              </View> */}
              {/* //=== description === */}
              {/* <View style={styles.descTxtView}>
                <Text style={styles.descTxt}>
                  {descData}
                </Text>
              </View> */}
              {/* //===details count === */}
              <View style={[styles.rowContainer2,styles.boxStyle]}>
                <View>
                  {/* //===head count === */}
                  <View>
                    <Text style={styles.descTxt}>
                      Total earned
                    </Text>
                  </View>
                  {/* //===count === */}
                  <View style={styles.alineCenter}>
                    <Text style={styles.pointTxt}>
                      {this.calcearned()}
                    </Text>
                  </View>
                </View>
                {/* //=== dollar === */}
                <View style={styles.secondColoumn}>
                  {/* //===head count === */}
                  <View>
                    <Text style={styles.descTxt}>
                      Total burned
                    </Text>
                  </View>
                  {/* //===count === */}
                  <View style={styles.alineCenter}>
                    <Text style={styles.pointTxt}>
                      {this.calcburned()}
                    </Text>
                  </View>
                </View>
              </View>

              {/* //=== Rewards === */}
              <View style={{...styles.alineCenter,marginTop: 5}}>
                <Text style={styles.descTxt}>
                  Remaing {auth.user.rewards} earn & burned
                </Text>
              </View>
              {/* === tab === */}
              <View style={styles.tabContainer}>
                 {/* === Earned === */}
                <TouchableOpacity 
                  activeOpacity={0.8} 
                  onPress={()=>{this.setState({
                    isActive: 1,
                  })}}
                  style={{
                    ...styles.tabStyle,
                    borderBottomWidth: isActive===1? 2: 0,
                  }}>
                    <Text style={{
                      ...styles.tabTxt,
                      color: isActive===1? colors.submitColor : colors.primary
                    }}>
                      Earned
                    </Text>
                </TouchableOpacity>
                {/* === burned === */}
                <TouchableOpacity
                  activeOpacity={0.8} 
                  onPress={()=>{this.setState({
                    isActive: 2,
                  })}}
                  style={{
                    ...styles.tabStyle,
                    borderBottomWidth: isActive===2? 2: 0,
                  }}>
                    <Text style={{
                      ...styles.tabTxt,
                      color: isActive===2? colors.submitColor : colors.primary
                    }}>
                      Burned
                    </Text>
                </TouchableOpacity>
              </View>
              {/* //==== details about reading === */}
              <View style={{...styles.rowContainer,marginTop: 10}}>
                <View/>
                <View>
                  <Text style={styles.opTxt}>
                    Points
                  </Text>
                </View>
              </View>
              {
                this.getrewards(this.state.isActive == 1?'Earned':'Burned').slice(0,2).map((row,index)=>{
                  return (
                    <View key={index} style={{...styles.rowContainer,marginTop: 10}}>
                    <View style={styles.rowContainer2}>
                      <View>
                        <Text style={styles.opTxt}>
                            {row.comment} {row.content_type} 
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.opTxt}>
                        {row.rewards} Points
                      </Text>
                    </View>
                  </View>
                  )
                })
              }
              {/* // ====Read book ===  */}
              
              {/* // ====Read Artical ===  */}
              
              {/* === history === */}
              <TouchableOpacity
                  activeOpacity={0.8} 
                  onPress={()=>{this.props.navigation.navigate('RewardsHistory')}}
                  style={styles.historyStyle}>
                    <View>
                      <Text style={styles.historyTxt}>
                        View history
                      </Text>
                    </View>
                    <View style={styles.iconStyle}>
                      <Image 
                        style={styles.imageStyle}
                        source={require('../../assets/icons/down-arrow.png')}
                      />
                    </View>
                </TouchableOpacity>
            </View>
          </View>
          <Modal
              visible={this.state.buyreward}
              deviceHeight={ScreenHeight}
              deviceWidth={ScreenWidth}
              onDismiss={()=>this.setState({buyreward:false})}
              onBackdropPress={()=>this.setState({buyreward:false})}
          >
            <View style={styles.modalInnerView}>
              {/* //=== opcaity === */}
              <View style={styles.headOpacity} />
              <LinearGradient
                  start={{ x: 1.0, y: 1.0 }} end={{ x: 1.0, y: 0.1 }}
                  style={styles.gradientContainer}
                  colors={[
                      colors.borderColor,
                      colors.borderColor,
                      colors.borderColor,
                      colors.inputGradient
                  ]}>
                    <View style={styles.swiperContainer}>
                      <View style={{flexDirection:'row'}}>
                        <Text style={styles.rewardtext}>Amount : </Text>
                        <Text style={styles.rewardtext}>$ {this.state.rewards * config.purchase_points / 100}</Text>
                      </View>
                      <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                        <Text style={styles.rewardtext}>Rewards : </Text>
                        <View style={styles.input}>
                          <TextInput style={styles.input} keyboardType="number-pad" onChangeText={(val)=>this.setState({rewards:val})} defaultValue={this.state.rewards}></TextInput>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                  <View style={styles.rowpopContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.setState({buyreward:false})}
                        style={styles.cancelButton}>
                        <Text style={styles.submitText}>
                            CANCEL
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.pay}
                        style={styles.submitButton}>
                        <Text style={styles.submitText}>
                            SUBMIT
                        </Text>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.footerView} />
            </View>
          </Modal>
          {/* <Modal isVisible={this.state.buyreward} deviceHeight={}>
            <View style={{width:300,height:200,backgroundColor:'black',justifyContent:'center',alignItems:'center'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.rewardtext}>Amount : </Text>
                <Text style={styles.rewardtext}>$ {this.state.rewards / 100}</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                <Text style={styles.rewardtext}>Rewards : </Text>
                <View style={styles.input}>
                  <TextInput style={styles.input} keyboardType="number-pad" onChangeText={(val)=>this.setState({rewards:val})} defaultValue={this.state.rewards}></TextInput>
                </View>
              </View>
              <View style={{flexDirection:'row',marginTop:20}}>
                <TouchableOpacity style={styles.cancel} onPress={()=>this.setState({buyreward:false})}>
                  <Text style={styles.buttontext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyreward} onPress={this.pay}>
                  <Text style={styles.buttontext}>Buy Rewards</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}
        </ScrollView>
        <Alert 
          alert={this.state.alert}
          onconfirmpressed={()=>this.setState({alert:{show:false}})}
        ></Alert>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  config:state.config
})
//===  make components available outside ===
export default connect(mapstatetoprops)(WriterRewardsScreen);