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
import * as translator from '../../utils/translate';

class MyRewardsScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      name: 'Abhi Raj',
      point: 50,
      isActive: 1,
      buyreward:false,
      amount:0,
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
    let {auth,dispatch} = this.props;
    let amount = auth.user.balance;
    
    
    if(Number(amount) == 0)
    {
      this.setState({
        alert:{
          show:true,
          title:"Error",
          message:"You didn't have received payment for now"
        },
        buyreward:false
      })
    }
    else
    {
      let data = {
        amount
      }

      dispatch({type:actiontype.ADD_SETTLEMENT,data:data,token:auth.token,next:this.next});
      this.setState({
        buyreward:false,
        amount:0
      })
      
     
    }
  }

  next = (data) => {
    if(data.success)
    {
      this.setState({
        alert:{
          show:true,
          title:"Success",
          message:"you have successfully Settled"
        }
      })
    }
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
    const {dispatch,auth,settlement} = this.props;
    let result = [];

    for(let item in settlement[type])
    {
      if(settlement[type][item])
      {
        result.push(settlement[type][item]);
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
                    {translator.getlang('Money Earned',auth.user.language)}
                  </Text>
                </View>

                <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backIcon}
                onPress={()=>{this.props.navigation.goBack()}}
                >
                <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/backArrow.png')}
                />
                </TouchableOpacity>
              </View>
            </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* //=== reward === */}
              <View style={[styles.rowContainer2,styles.alineCenter]}>
                <View>
                  <Text style={styles.pointTxt}>
                    {auth.user.balance * config.purchase_points / 100} $
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
                  {translator.getlang('Rewards points Balance',auth.user.language)}
                </Text>
              </View>
              <View style={{...styles.alineCenter,marginTop:10}}>
                <TouchableOpacity style={styles.button} onPress={()=>this.setState({buyreward:true})}>
                  <Text style={styles.buttontext}>{translator.getlang('Payment Settlement',auth.user.language)}</Text>
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
                      {translator.getlang('Total earned',auth.user.language)}
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
                      {translator.getlang('Total Settled',auth.user.language)}
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
                  Remaing {auth.user.balance} earn & burned
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
                      {translator.getlang('Earned',auth.user.language)}
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
                      {translator.getlang('Settled',auth.user.language)}
                    </Text>
                </TouchableOpacity>
              </View>
              {/* //==== details about reading === */}
              <View style={{...styles.rowContainer,marginTop: 10}}>
                <View/>
                <View>
                  <Text style={styles.opTxt}>
                    USD
                  </Text>
                </View>
              </View>
              {
                this.getrewards(this.state.isActive == 1?'earned':'settled').slice(0,2).map((row,index)=>{
                  return (
                    <View key={index} style={{...styles.rowContainer,marginTop: 10}}>
                    <View style={styles.rowContainer2}>
                      <View>
                        <Text style={styles.opTxt}>
                            {this.state.isActive == 1?'Buy ' + row.title:"Settled1"}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={styles.opTxt}>
                        {row.status}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.opTxt}>
                        {row.amount} $
                      </Text>
                    </View>
                  </View>
                  )
                })
              }
              {/* // ====Read book ===  */}
              
              {/* // ====Read Artical ===  */}
              
              {/* === history === */}
              {/* <TouchableOpacity
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
                </TouchableOpacity> */}
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
                      <View style={{flexDirection:'row',marginTop:20,alignItems:'center'}}>
                        <Text style={styles.rewardtext}>Amount : ${this.props.auth.user.balance}</Text>
                      </View>
                    </View>
                  </LinearGradient>
                  <View style={styles.rowpopContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.setState({buyreward:false})}
                        style={styles.cancelButton}>
                        <Text style={styles.submitText}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.pay}
                        style={styles.submitButton}>
                        <Text style={styles.submitText}>
                            Submit
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
  config:state.config,
  settlement:state.settlement
})
//===  make components available outside ===
export default connect(mapstatetoprops)(MyRewardsScreen);