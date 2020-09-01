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
//=== star ====
import {AirbnbRating} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import config from '../../config/config';
import * as translate from '../../utils/translate';

class HomeScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      isModalOpen:false
    }
  }

  selectcontent = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_BOOK_INFO,id:id,token:auth.token,next:this.navigate});
  }

  selectbook = (id,page) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_BOOK,page:page,id:id,token:auth.token,next:()=>this.props.navigation.navigate('ReadBook')});
  }

  navigate = () => {
    this.props.navigation.navigate('BookDetails');
  }

  selectfreeread = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,contentid:id,token:auth.token,next:this.next});
  }

  next = () => {
    this.props.navigation.navigate('Bookmark');
  }

  get_continue_reading = (bookmark) => {
    let contentid = [];
    let content = [];
    for(let item in bookmark)
    {
      if(contentid.length >= 5)
      {
        break;
      }
      if(contentid.indexOf(bookmark[item].content_id) == -1)
      {
        content.push(bookmark[item]);
        contentid.push(bookmark[item].content_id);
      }
    }

    return content;
  }

  render() {
    let {
      firstdata,
    } = this.state

    const {home,auth,continue_reading} = this.props;

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
                {translate.getlang("Home",auth.user.language)}
              </Text>
            </View>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusIcon}
            >
            
            </TouchableOpacity>
          </View>
        </ImageBackground>
          {/* === main content === */}
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}>
          <View style={styles.mainContainer}>
            {/* === first list === */}
            <View style={styles.rowContainer}>
              <FlatList
                data={home.recommended?home.recommended:[]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={({item,index}) =>{
                  const _that = this;
                return(
                  <View style={{paddingTop: 12}}>
                    <View 
                      style={{
                      ...styles.rectangleContainer,
                      backgroundColor: colors.borderColor
                    }}>
                      <View>
                        {/* === book name === */}
                        <View>
                          <Text numberOfLines={1} style={styles.titleText}>
                            {item.title}
                          </Text>
                        </View>
                        {/* === subtitle  === */}
                        <View>
                          <Text style={styles.subTitleText}>
                            {item.description}
                          </Text>
                        </View>
                        {/* === author name === */}
                        <View>
                          <Text style={styles.authorText}>
                            {item.authorName}
                          </Text>
                        </View>

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

                        {/* === redMore Button === */}
                        <TouchableOpacity 
                          style={styles.readmoreButton}
                          activeOpacity={0.8}
                          onPress={()=>{this.selectfreeread(item.id)}}
                          >
                          <Text style={styles.readMoreText}>
                            {translate.getlang("READ",auth.user.language)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.bookImageStyle1}>
                      <Image
                        source={{uri:config.fileurl + item.cover_image}}
                        style={styles.imageStyle}
                      />
                    </View>
                  </View>
                )}}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {/* === continue reading === */}
            {
              (this.get_continue_reading(continue_reading) && this.get_continue_reading(continue_reading).length > 0) && (
              <>
                <View style={styles.headingView}>
                  <View>
                    <Text style={styles.headingText}>
                      {translate.getlang("Continue Reading",auth.user.language)}
                    </Text>
                  </View>
                  <TouchableHighlight 
                    activeOpacity={0.8}
                    //onPress={()=>{this.props,naigation.navigate('')}}
                  >
                    <View style={styles.textContainer}>
                      <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyBookmarks')}>
                        <Text style={styles.headingText2}>
                          {translate.getlang("See All",auth.user.language)}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={styles.rowContainer}>
                  <FlatList
                    data={this.get_continue_reading(continue_reading)}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    extraData={this.state}
                    renderItem={({item,index}) =>{
                      const _that = this;
                    return(
                      <TouchableOpacity style={styles.boxContainer} onPress={()=>this.selectbook(item.content_id,item.page)}>
                        <View style={styles.boxStyle}>
                          <Image
                            style={styles.imageStyle2}
                            source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/book1.png')}
                          />
                        </View>
                        <View>
                          <Text numberOfLines={2} style={styles.readingBook}>
                            {item.title}
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
            
            {
              (home.recently_added && home.recently_added.length > 0) && (
                <>
                  <View style={styles.headingView}>
                    <View>
                      <Text style={styles.headingText}>
                        {translate.getlang("Recently Added",auth.user.language)}
                      </Text>
                    </View>
                    <TouchableHighlight 
                      activeOpacity={0.8}
                      onPress={()=>{this.props.settab(1)}}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.headingText2}>
                          {translate.getlang("See All",auth.user.language)}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.rowContainer}>
                    <FlatList
                      data={home.recently_added}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                      renderItem={({item,index}) =>{
                        const _that = this;
                      return(
                        <TouchableOpacity style={styles.boxContainer2} onPress={()=>this.selectcontent(item.id)}>
                          <View style={styles.boxStyle2}>
                            <Image
                              style={styles.imageStyle2}
                              source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/book1.png')}
                            />
                          </View>
                          <View>
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
            {/* === Recently Added === */}
            

            {/* === continue reading === */}
            {
              (home.best_sellers && home.best_sellers.length > 0) && (
                <>
                   <View style={styles.headingView}>
                    <View>
                      <Text style={styles.headingText}>
                        {translate.getlang("Best Selling",auth.user.language)}
                      </Text>
                    </View>
                    <TouchableHighlight 
                      activeOpacity={0.8}
                      onPress={()=>{this.props.settab(1)}}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.headingText2}>
                          {translate.getlang("See All",auth.user.language)}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.rowContainer}>
                    <FlatList
                      data={home.best_sellers}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                      renderItem={({item,index}) =>{
                        const _that = this;
                      return(
                        <TouchableOpacity style={styles.boxContainer} onPress={()=>this.selectcontent(item.id)}>
                          <View style={styles.boxStyle}>
                            <Image
                              style={styles.imageStyle2}
                              source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/book1.png')}
                            />
                          </View>
                          <View>
                            <Text numberOfLines={2} style={styles.readingBook}>
                              {item.title}
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
           

            {/* === Most Popular === */}
            {
              (home.top_writers && home.top_writers.length > 0) && (
                <>
                  <View style={styles.headingView}>
                    <View>
                      <Text style={styles.headingText}>
                        {translate.getlang("Most Popular",auth.user.language)}
                      </Text>
                    </View>
                    <TouchableHighlight 
                      activeOpacity={0.8}
                      onPress={()=>{this.props.settab(1)}}
                    >
                      <View style={styles.textContainer}>
                        <Text style={styles.headingText2}>
                          {translate.getlang("See All",auth.user.language)}
                        </Text>
                      </View>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.rowContainer}>
                    <FlatList
                      data={home.top_writers}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      extraData={this.state}
                      renderItem={({item,index}) =>{
                        const _that = this;
                      return(
                        <TouchableOpacity style={styles.boxContainer2} onPress={()=>this.selectcontent(item.id)}>
                          <View style={styles.boxStyle2}>
                            <Image
                              style={styles.imageStyle2}
                              source={item.cover_image?{uri:config.fileurl + item.cover_image}:require('../../assets/placeHolder/book1.png')}
                            />
                          </View>
                          <View>
                            <Text numberOfLines={2} style={styles.readingBook}>
                              {item.title}
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
            </View>
        </ScrollView>
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
                {translate.getlang("Write a new book",auth.user.language)}
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
                {translate.getlang("Upload a book",auth.user.language)}
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
  continue_reading:state.bookmark
})

//===  make components available outside ===
export default connect(mapstatetoprops)(HomeScreen);