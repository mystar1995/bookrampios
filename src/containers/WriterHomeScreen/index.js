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
import {firstData} from './data';
//=== library ====
import Modal from 'react-native-modal';
import {AirbnbRating} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';

class WriterHomeScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      publishCount: 53,
      bookRating: 15,
      download: 35,
      sold: 12,
      rating: 3,
      isModalOpen: false,
    }
  }

  selectauthor = () => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,authorid:auth.user['id'],token:auth.token,next:this.next});
  }

  next = () => {
    this.props.navigation.navigate('AuthorInfo');
  }

  selectbook = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_DRAFT_CONTENT,token:auth.token,contentid:id,next:this.nextaction});
  }
  
  nextaction = (contentfile) => {
    if(contentfile)
    {
      this.props.navigation.navigate('NewStory');
    }
    else
    {
      this.props.navigation.navigate('WriteNewStory');
    }   
  }

  render() {
    let {
      firstdata,
      publishCount,
      bookRating,
      download,
      sold,
      rating,
      isModalOpen
    } = this.state

    let {home,mycontent} = this.props;
    console.log('sold',home.sold);
    return (
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
              onPress={()=>{this.props.drawer.open()}}
            >
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/toggle.png')}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>
                Welcome User
              </Text>
            </View>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusIcon}
              onPress={()=>{this.setState({isModalOpen: true})}}
            >
            <Image
              style={styles.imageStyle}
              source={require('../../assets/icons/plusCircle.png')}
            />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* === main content === */}
        <View
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}>
            <View style={{paddingRight: 20,paddingLeft:20,zIndex:100,width:'100%',height:'100%',marginTop:-40}}>
              <LinearGradient 
                start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                locations={[0.4,0.6]}
                style={styles.gradientStyle}
                colors={[colors.borderColor,colors.inputGradient2]}>
                <View style={styles.supportView}>
                  <View style={styles.threeCol}>
                    {/* ===Published === */}
                    <TouchableOpacity
                      // onPress={()=>}
                      onPress={()=>{this.props.tabconvert(1)}}
                      style={styles.buttonView}
                      activeOpacity={0.8}>
                      <View style={styles.countView}>
                        <Text style={styles.titleText}>
                          {home.published?home.published.length:0}
                        </Text>
                      </View>
                      <View style={styles.subView}>
                        <Text style={styles.subTitleText}>
                          Published
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonView}
                      // onPress={()=>} 
                      onPress={()=>this.props.navigation.navigate('Download',{title:'Download'})}
                      activeOpacity={0.8}>
                      <View style={styles.countView}>
                        <Text style={styles.titleText}>
                          {home.download?home.download.length:0}
                        </Text>
                      </View>
                      <View style={styles.subView}>
                        <Text style={styles.subTitleText}>
                          Downloaded
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* ===Downloaded === */}
                    <TouchableOpacity
                      style={styles.buttonView}
                      // onPress={()=>} 
                      onPress={()=>this.props.tabconvert(1)}
                      activeOpacity={0.8}>
                      <View style={styles.countView}>
                        <Text style={styles.titleText}>
                          {home.rating?home.rating.length:0}
                        </Text>
                      </View>
                      <View style={styles.subView}>
                        <Text style={styles.subTitleText}>
                          Book ratings and reviews
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.threeCol}>
                    {/* ===Published === */}
                    <TouchableOpacity
                      // onPress={()=>}
                      onPress={()=>this.props.navigation.navigate('Download',{title:'Sold'})}
                      style={styles.buttonView}
                      activeOpacity={0.8}>
                      <View style={styles.countView}>
                        <Text style={styles.titleText}>
                          {home.sold?home.sold.length:0}
                        </Text>
                      </View>
                      <View style={styles.subView}>
                        <Text style={styles.subTitleText}>
                          Sold
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{...styles.buttonView,marginRight: 80}}
                      // onPress={()=>} 
                      onPress={this.selectauthor}
                      activeOpacity={0.8}>
                      {/* === Rating  === */}
                      <View style={styles.ratingContainer}>
                        <AirbnbRating
                          defaultRating={home.author?home.author.rating:0}
                          selectedColor={colors.yellowColorfb}
                          size={12}
                          fractions={true}
                          isDisabled={true}
                          showRating={false}
                          starStyle={styles.starStyles}
                        />
                      </View>
                      <View style={styles.subView}>
                        <Text style={styles.subTitleText}>
                          Over all ratings
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View></View>
                    <View/>
                  </View>
                </View>
              </LinearGradient>
              <ScrollView style={styles.mainContainer}>
            
                {/* === Continue Reading === */}
                {
                  (home.draft && home.draft.length > 0) && (
                    <>
                      <View style={styles.headingView}>
                        <View>
                          <Text style={styles.headingText}>
                            Continue Writing
                          </Text>
                        </View>
                        {/* <TouchableHighlight 
                          activeOpacity={0.8}
                          //onPress={()=>{this.props,naigation.navigate('')}}
                        >
                          <View style={styles.textContainer}>
                            <Text style={styles.headingText2}>
                              See All
                            </Text>
                          </View>
                        </TouchableHighlight> */}
                      </View>
                      <View style={styles.listContainer}>
                        <FlatList
                          data={home.draft}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          extraData={this.state}
                          renderItem={({item,index}) =>{
                            const _that = this;
                          return(
                            <TouchableOpacity onPress={()=>this.selectbook(item.id)} style={styles.boxContainer}>
                              <View style={styles.boxStyle}>
                                <Image
                                  style={styles.imageStyle2}
                                  source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/bookmagic.png')}
                                />
                              </View>
                              <View style={styles.bookTxtView}>
                                <Text numberOfLines={2} style={styles.readingBook}>
                                  {item.description}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
                
                    </>
                  )
                }
                {/* === Most Read === */}
                <View style={styles.headingView}>
                  <View>
                    <Text style={styles.headingText}>
                      Most Read
                    </Text>
                  </View>
                  {/* <TouchableHighlight 
                    activeOpacity={0.8}
                    //onPress={()=>{this.props,naigation.navigate('')}}
                  >
                    <View style={styles.textContainer}>
                      <Text style={styles.headingText2}>
                        See All
                      </Text>
                    </View>
                  </TouchableHighlight> */}
                </View>
                {
                home.sold && home.sold.length > 0 && (
                    <>
                      <View style={styles.listContainer}>
                        <FlatList
                          data={home.sold?home.sold.slice(0,3):[]}
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          extraData={this.state}
                          renderItem={({item,index}) =>{
                            const _that = this;
                          return(
                            <TouchableOpacity style={styles.boxContainer}>
                              <View style={styles.boxStyle}>
                                <Image
                                  style={styles.imageStyle2}
                                  source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/bookmagic.png')}
                                />
                              </View>
                              <View style={styles.bookTxtView}>
                                <Text numberOfLines={2} style={styles.readingBook}>
                                  {item.description}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}}
                          keyExtractor={(item, index) => index.toString()}
                        />
                      </View>
              
                    </>
                  )
                }
              </ScrollView>
            </View>
          
        </View>
        {/* //=== Modal selection screens  === */}
        <Modal 
          isVisible={isModalOpen}
          onBackdropPress={()=>this.setState({
            isModalOpen: false,
          })}
          backdropColor={colors.circleColor}
          backdropOpacity={0.7}
        >
          {/* ===  Write a new book === */}
          <View style={styles.viewContainer}>
            <TouchableOpacity
              onPress={()=>{
                this.setState({
                  isModalOpen: false,
                })
                this.props.navigation.navigate('WriteNewStory')
              }}
              activeOpacity={0.8} 
              style={styles.modalButton}>
              <Text style={styles.modalText}>
                Write a new book
              </Text>
            </TouchableOpacity>
            {/* //==== Upload a book === */}
            <TouchableOpacity
              onPress={()=>{
                this.setState({
                  isModalOpen: false,
                })
                this.props.navigation.navigate('NewStory')
              }}
              activeOpacity={0.8} 
              style={{...styles.modalButton,borderBottomWidth: 0,}}>
              <Text style={styles.modalText}>
                Upload a book
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  home:state.home,
  auth:state.auth,
  mycontent:state.content.purchase
})

//===  make components available outside ===
export default connect(mapstatetoprops)(WriterHomeScreen);
