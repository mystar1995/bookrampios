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

//=== star ====
import {AirbnbRating} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== style ==
import styles from './styles'
import colors from '../../utils/colors';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';

class MyBooksInReview extends  Component{
  constructor(props){
    super(props)
    this.state={
      searchKey: '',
      authorName: '',
      language: '',
      isModalOpen:false
    }
  }

  //=== arrow ===
  renderArrow=()=>{
    return(
      <View style={styles.mailIcon}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/icons/downArrow.png')}
        />
      </View> 
    )
  }

  selectbook = (id) => {
    let {auth,dispatch} = this.props;
    dispatch({type:actiontype.SELECT_BOOK,token:auth.token,id:id,next:this.navigate});
  }

  navigate = () => {
    this.props.navigation.navigate('ReadBook');
  }

  render() {
    let {
      searchKey,
      authorName,
      language,
    } = this.state
    let ageData = [{
      value: '18-25',
    }, {
      value: '26-36',
    }, {
      value: '40-50',
    }];
    let asWriteData = [{
      value: 'Yes',
    }, {
      value: 'No',
    }];

    let {home} = this.props;
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
                My Books In Review
              </Text>
            </View>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusIcon}
              onPress={()=>{this.setState({isModalOpen: true})}}
            //onPress={()=>{}}
            >
            <Image
              style={styles.imageStyle}
              source={require('../../assets/icons/plusCircle.png')}
            />
            </TouchableOpacity>
          </View>
          {/* //==== content ===  */}
      
        </ImageBackground>
          {/* === main content === */}
          <View style={styles.mainContainer}>
            {/* === first list === */}
          <View style={styles.rowContainer2}>
            <FlatList
              data={home.rating}
              showsHorizontalScrollIndicator={false}
              extraData={this.state}
              renderItem={({item,index}) =>{
                const _that = this;
              return(
                <View 
                  style={{
                  ...styles.rectangleContainer,
                }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.props.navigation.navigate('BookDetails')} 
                    style={styles.bookImageStyle1}>
                    <Image
                      source={{uri:item.cover_image?config.fileurl + item.cover_image:''}}
                      style={styles.imageStyle}
                    />
                  </TouchableOpacity>
                  <View>
                    {/* === book name === */}
                    <View>
                      <Text style={styles.titleText}>
                        {item.title}
                      </Text>
                    </View>
                    {/* === author  === */}
                    <View style={styles.rowContainer3}>
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
                          {item.authorName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* === Language  === */}
                    <View style={styles.rowContainer3}>
                      <View>
                        <Text style={styles.subheadingText}>
                          Format:
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Text style={styles.subheadingText}>
                          e-books
                        </Text>
                      </View>
                    </View>
                    {/* === Language  === */}
                    <View style={styles.rowContainer3}>
                      <View>
                        <Text style={styles.subheadingText}>
                          Language:
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Text style={styles.subheadingText}>
                          {item.language == 'en'?'English':'Arabic'}
                        </Text>
                      </View>
                    </View>
                    {/* === Category  === */}
                    <View style={styles.rowContainer3}>
                      <View>
                        <Text style={styles.subheadingText}>
                          Category:
                        </Text>
                      </View>
                      <View style={styles.normalView}>
                        <Text style={styles.subheadingText}>
                          {item.category}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.rowContainer5}>
                      <View>
                        {/* === Category  === */}
                        <View style={styles.rowContainer3}>
                          {/* === Rating === */}
                          <View style={styles.ratingView}>
                            <AirbnbRating
                              defaultRating={item.rating}
                              selectedColor={colors.yellowColor}
                              size={10}
                              fractions={true}
                              isDisabled={true}
                              showRating={false}
                              starStyle={{padding: 0,backgroundColor: 'transparent',margin: 0,}}
                            />
                          </View>
                          <View style={styles.overallRating}>
                            <Text style={styles.subheadingText}>
                              {item.rating.toFixed(2)}/5
                            </Text>
                          </View>
                        </View>

                        {/* === Review  === */}
                        <View style={styles.rowContainer3}>
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
                              {item.review}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      {/* === redMore Button === */}
                      <TouchableOpacity 
                        style={styles.readmoreButton}
                        activeOpacity={0.8}
                        onPress={()=>{this.selectbook(item.id)}}
                        >
                        <Text style={styles.readMoreText}>
                          READ
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <Modal 
            isVisible={this.state.isModalOpen}
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
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  home:state.home,
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(MyBooksInReview);