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
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
//=== star ====
import {
  AirbnbRating,
  CheckBox
} from 'react-native-elements';
import Modal from 'react-native-modal';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import * as StoryService from '../../service/StoryService';
import {connect} from 'react-redux';
import configdata from '../../config/config';
import Paypal from 'react-native-paypal-wrapper';
import * as actiontype from '../../constant/action-type';
import Alert from 'react-native-awesome-alerts';
import responsiveText from '../../utils/fontResponsive';

class PaymentScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      isChecked: true,
      isModalOpen: false,
      data:{},
      dataopen:false
    }
  } 
  

  requestpayment = async() => {
    let {amount,title} = this.props.payment;
    let {auth} = this.props;
    //Paypal.initialize(Paypal.SANDBOX,config.paypal.sandbox);
    
    let pay_amount = amount;

    let rewards = 0;
    if(this.state.isChecked)
    {
      pay_amount = pay_amount - auth.user.rewards;
      rewards = auth.user.rewards;
    }
    
    console.log(pay_amount);
    if(pay_amount > 0)
    {
      this.setState({
        dataopen:true
      })
    }
    else
    {
      this.payment(amount);
    }
    
    //let result = await requestOneTimePayment(config.paypal.production,{amount:amount,currency:'USD',localeCode:'en_USD',shippingAddressRequired:false,userAction:title,intent:'authorize'});
    
    //console.log(response);
  }

  payment = (amount) => {
    let {dispatch,auth} = this.props;
    let {id} = this.props.payment;

    let data = {
      content:id,
      rewards:amount
    }

    let self = this;

    dispatch({type:actiontype.SEND_PAYMENT,data:data,token:auth.token});
  }

  nextpayment = (data) => {
    if(data.success)
    {
      self.setState({
        isModalOpen:true
      })
    }
  }

  
  render() {
    let {
      title,
      rating,
      authorName,
      review,
      language,
      cover_image,
      amount
    } = this.props.payment

    let {isChecked,
      isModalOpen} = this.state;

      let {auth,config} = this.props;
      console.log(cover_image);
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
        <ScrollView style={styles.screenContainer} bounces={false} >
          <View style={styles.screenContainer}>
            <StatusBar 
              backgroundColor={colors.circleColor} 
              barStyle="light-content"
              translucent={false}
            />
              {/* === header === */}
            <ImageBackground 
              style={styles.headerContainer2} 
              source={require('../../assets/images/payment-bg.png')}>
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
                    Payments
                  </Text>
                </View>
                <View/>
              </View>
            </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>this.props.navigation.navigate('BookDetails')} 
                  style={styles.bookImageStyle1}>
                  <Image
                    source={{uri:configdata.fileurl + cover_image}}
                    style={styles.imageStyle2}
                  />
                </TouchableOpacity>
                <View style={styles.cloumnStyle}>
                  {/* === book text === */}
                  <View style={styles.bookView}>
                    <Text style={styles.bookName}>
                      {title}
                    </Text>
                  </View>
                  <View style={styles.rowContainer2}>
                    <View>
                      <Text style={styles.subheadingText}>
                        Author:
                      </Text>
                    </View>
                    <TouchableOpacity 
                      activeOpacity={0.8}
                      onPress={()=>{this.props.navigation.navigate('AuthorInfo')}}
                      style={styles.greenView}>
                      <Text style={styles.greenText}>
                        {authorName}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* === Formate  === */}
                  <View style={{...styles.rowContainer2,marginTop: 15}}>
                    <View>
                      <Text style={styles.subheadingText}>
                        Format:
                      </Text>
                    </View>
                    <View style={styles.rowHelpView}>
                      <Text style={styles.subheadingText}>
                        e-book
                      </Text>
                    </View>
                  </View>
                  {/* === language  === */}
                  <View style={{...styles.rowContainer2,marginTop: 5}}>
                    <View>
                      <Text style={styles.subheadingText}>
                        Language:
                      </Text>
                    </View>
                    <View style={styles.rowHelpView}>
                      <Text style={styles.subheadingText}>
                        {language}
                      </Text>
                    </View>
                  </View>
                  <View style={{...styles.rowContainer2,marginTop: 15,marginBottom: 3}}>
                    <View style={styles.circleStyle}/>
                    <View style={styles.lineStyle}/>
                    <View style={styles.circleStyle}/>
                  </View>
                  {/* === second row === */}
                  <View style={styles.rowContainer3}>
                    <View>
                      {/* === Category  === */}
                      <View style={styles.rowContainer2}>
                        {/* === Rating === */}
                        <View style={styles.ratingView}>
                          <AirbnbRating
                            defaultRating={rating}
                            selectedColor={colors.yellowColor}
                            size={10}
                            fractions={true}
                            isDisabled={true}
                            showRating={false}
                            starStyle={{
                              padding: 0,
                              backgroundColor: 'transparent',
                              margin: 0,
                            }}
                          />
                        </View>
                        <View style={styles.overallRating}>
                          <Text style={styles.subheadingText}>
                            {rating}/5
                          </Text>
                        </View>
                      </View>
                      {/* === Review  === */}
                      <View style={{...styles.rowContainer2}}>
                        <View>
                          <Text style={styles.subheadingText}>
                            Review:
                          </Text>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={()=>this.props.navigation.navigate('Review')} 
                          style={{...styles.greenView,borderBottomWidth: 0}}>
                          <Text style={styles.greenText}>
                            {review}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* //=== check box === */}
              <View style={styles.rowContainer21}>
                <View>
                  <CheckBox
                    center
                    size={10}
                    onPress={()=>{this.setState({
                      isChecked: !isChecked
                    })}}
                    containerStyle={styles.checkBoxContainer}
                    title='Use LOL Points'
                    checkedColor={colors.primary}
                    textStyle={styles.checkBoxTxt}
                    checked={isChecked}
                  />
                </View>
                <View>
                  <Text style={styles.pointText}>
                    {auth.user.rewards} points
                  </Text>
                </View>
              </View>

              {/* //=== View Price === */}
              <View style={[styles.rowContainer31,styles.marginIncrease]}>
                <View>
                  <Text style={styles.pointText}>
                    Total reader rewards
                  </Text>
                </View>
                <View>
                  <Text style={styles.pointText}>
                    {amount}
                  </Text>
                </View>
              </View>
              {/* //=== reward === */}
              <View style={[styles.rowContainer31,{marginTop: 5}]}>
                <View>
                  <Text style={styles.pointText}>
                    LOL rewards
                  </Text>
                </View>
                <View>
                  <Text style={styles.pointText}>
                    {auth.user.rewards}
                  </Text>
                </View>
              </View>
              {/* ==== total  === */}
              <View style={[styles.rowContainer31,styles.totalView]}>
                <View>
                  <Text style={styles.pointText}>
                    Total
                  </Text>
                </View>
                <View>
                  <Text style={styles.pointText}>
                    {this.state.isChecked?amount - auth.user.rewards:amount}
                  </Text>
                </View>
              </View>
              {/* //=== payment === */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.requestpayment()} 
                style={styles.payButton}>
                <Text style={styles.payText}>
                  PROCEED TO PAY
                </Text>
              </TouchableOpacity>
            </View>
            {/* === payment successfully === */}
            <Modal
              isVisible={isModalOpen} 
              backdropOpacity={0.7}
              backdropColor={colors.circleColor}
              onBackdropPress={()=>{this.setState({
                isModalOpen: false
              })}}
            >
              <View style={styles.modalView}>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/images/payment-confirm.png')}
                  />
                </View>
                  <View style={styles.txtView}>
                    <Text style={styles.modalText}>
                      Order placed successfully!
                    </Text>
                  </View>
                {/* //=== payment === */}
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.setState({
                      isModalOpen: false
                    },()=>this.props.navigation.navigate('ReadBook'))} 
                    style={styles.readButton}>
                    <Text style={styles.readText}>
                      READ NOW
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backButtonStyle}
                    onPress={()=>this.setState({
                      isModalOpen: false,
                    })}
                  >
                    <Text style={styles.backText}>
                      Back
                    </Text>
                  </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </ScrollView>
        <Alert 
          show={this.state.dataopen}
          title="Buy More Rewards"
          message="Do you want to Buy More Rewards ? "
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          showCancelButton={true}
          confirmText="YES"
          cancelText="NO"
          contentContainerStyle={{backgroundColor:colors.secondry,width:'80%',borderRadius:20}}
          titleStyle={{color:colors.primary,fontSize:responsiveText(20),fontWeight:'bold',alignSelf:'center'}}
          messageStyle={{color:colors.primary,fontSize:responsiveText(15),textAlign:'center'}}
          confirmButtonTextStyle={styles.payText}
          cancelButtonTextStyle={styles.payText}
          onConfirmPressed={()=>{this.setState({
            dataopen:false
          }); this.props.navigation.navigate('MyRewards')}}
          onCancelPressed={()=>this.setState({
            dataopen:false
          })}
          confirmButtonStyle={{
            backgroundColor:colors.submitColor,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
          }}
          cancelButtonStyle={{
            backgroundColor:colors.redColor,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderBottomLeftRadius: 25,
            paddingVertical: 10,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        ></Alert>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  payment:state.payment,
  config:state.config
})

//===  make components available outside ===
export default connect(mapstatetoprops)(PaymentScreen);