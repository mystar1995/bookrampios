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
import Modal from 'react-native-modal';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
//=== pops === 
import * as Animatable from 'react-native-animatable';
import HowJourneyPop1 from '../../components/HowJourney/Pop1';
import HowJourneyPop2 from '../../components/HowJourney/Pop2';
import HowJourneyPop3 from '../../components/HowJourney/Pop3';
import LinearGradient from 'react-native-linear-gradient';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSidebar from '../../components/WriterSideBar';

import {connect} from 'react-redux';

const ScreenHeight = Math.round(Dimensions.get('window').height);
const ScreenWidth = Math.round(Dimensions.get('window').width);
import * as translate from '../../utils/translate';

class HowJounreyScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      isModalOpen: false,
      indexSwiper: 0,
      entertain: false,
      timepass: true,
      insightful: false,
      gripping: false,
      animationType: '',
      rating: 2,
      aboutBook: '',
      aboutAuthor: '',
    }
  }

  //=== rating ==
  handleRating=(rating)=>{
    this.setState({
      rating
    })
  }

  //===handle like ===
  handleLike=(like)=>{
    this.setState(like)
  }

  // === submit ==
  handleSubmit=()=>{
    this.setState({
      isModalOpen: false,
    })
  }

  //=== ===
  onTextChange=(val)=>{
    this.setState(val)
  }

  render() {
    let {
      isModalOpen,
      indexSwiper,
      animationType,
      rating,
      entertain,
      timepass,
      insightful,
      gripping,
      aboutBook,
      aboutAuthor
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
        content={auth.role == 'reader'?<SideBar navigation={this.props.navigation}/>:<WriterSidebar navigation={this.props.navigation}></WriterSidebar>}
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
            source={require('../../assets/images/jurney-bg.png')}>
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

            </View>
          </ImageBackground>
          <View style={styles.mainContainer}>
            {/* //=== heading === */}
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.headingText}>
                {translate.getlang('HOW WAS THE JOURNEY',auth.user.language)}?
              </Text>
            </View>
            {/* //=== list View=== */}
            <View style={styles.mainList}>
              <TouchableOpacity 
                onPress={()=>{}}
                activeOpacity={0.8}
                style={styles.rowContainer}>
                  <View>
                    <Text style={styles.listOptionTxt}>
                    {translate.getlang('Review',auth.user.language)} & {translate.getlang('Rating',auth.user.language)}
                    </Text>
                  </View>
                  <View style={styles.imageContainer}>
                     <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={()=>{}}
                activeOpacity={0.8}
                style={{...styles.rowContainer,borderBottomWidth: 0}}>
                  <View>
                    <Text style={styles.listOptionTxt}>
                    {translate.getlang('Share This book',auth.user.language)}
                    </Text>
                  </View>
                  <View style={styles.imageContainer}>
                    <Image
                      source={require('../../assets/icons/rightArrow.png')}
                      style={styles.imageStyle}
                    />
                  </View>
              </TouchableOpacity>
            </View>
            {/* //=== CLOSE THE BOOK === */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>this.setState({
                isModalOpen: true
              })} 
              style={styles.closeButton}>
              <Text style={styles.closeText}>
              {translate.getlang('Close This book',auth.user.language)}
              </Text>
            </TouchableOpacity>
          </View>
          {/* //=== modal === */}
          <Modal
            visible={isModalOpen}
            deviceHeight={ScreenHeight}
            deviceWidth={ScreenWidth}
          >
            <View style={styles.modalInnerView}>
              {/* //=== opcaity === */}
              <View style={styles.headOpacity}/>
              {/* //=== main pop === */}
              <LinearGradient 
                start={{x: 1.0, y: 1.0}} end={{x: 1.0, y: 0.1}}
                style={styles.gradientContainer}
                colors={[
                  colors.borderColor,
                  colors.borderColor,
                  colors.borderColor,
                  colors.inputGradient
                ]}>
                <Animatable.View 
                  animation={animationType}
                  duration={1000}
                  useNativeDriver={true}
                  onAnimationEnd={()=>{this.setState({animationType: ''})}}
                  style={styles.swiperContainer}>
                    {indexSwiper===2?
                      <HowJourneyPop3 
                        rating={rating}
                        value={aboutAuthor}
                        onTextChange={(val)=>this.onTextChange({aboutAuthor: val})}
                        handleRating={this.handleRating}/>
                    :indexSwiper===1?
                      <HowJourneyPop2 
                        rating={rating}
                        value={aboutBook}
                        onTextChange={(val)=>this.onTextChange({aboutBook: val})}
                        handleRating={this.handleRating}/>
                    :
                    <HowJourneyPop1 
                      rating={rating} 
                      entertain={entertain}
                      timepass={timepass}
                      insightful={insightful}
                      gripping={gripping}
                      handleLike={this.handleLike}
                      handleRating={this.handleRating}/>
                    }
                    {/* //=== buttons === */}
                    <View style={styles.rowpopContainer}>
                      {indexSwiper>0 ?
                        <TouchableOpacity 
                          activeOpacity={0.8}
                          onPress={()=>{indexSwiper>0 && this.setState({
                            indexSwiper: indexSwiper-1
                          })}}
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>
                          {translate.getlang('Back',auth.user.language)}
                          </Text>
                        </TouchableOpacity>
                      : <View/>
                      }
                      {indexSwiper<2 ?
                        <TouchableOpacity 
                          activeOpacity={0.8}
                          onPress={()=>{indexSwiper<2 && this.setState({
                            indexSwiper: indexSwiper+1
                          })}}
                          style={styles.buttonContainer}>
                          <Text style={styles.buttonText}>
                          {translate.getlang('Next',auth.user.language)}
                          </Text>
                        </TouchableOpacity>
                      : <View/>
                      }
                    </View>
                    {/* //=== Dots === */}
                    <View style={styles.dotsContainer}>
                      <View style={{
                          ...styles.dotStyle,
                          backgroundColor: indexSwiper===0 ? colors.primary: colors.circleColor45
                      }}/>
                      <View style={{
                          ...styles.dotStyle,
                          backgroundColor: indexSwiper===1 ? colors.primary: colors.circleColor45
                      }}/>
                      <View style={{
                          ...styles.dotStyle,
                          backgroundColor: indexSwiper===2 ? colors.primary: colors.circleColor45
                      }}/>
                    </View>
                </Animatable.View>
              </LinearGradient>
              {/* //=== submit === */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>this.handleSubmit()} 
                style={styles.submitButton}>
                <Text style={styles.submitText}>
                {translate.getlang('SUBMIT',auth.user.language)}
                </Text>
              </TouchableOpacity>
              <View style={styles.footerView}/>
            </View>
          </Modal>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(HowJounreyScreen);