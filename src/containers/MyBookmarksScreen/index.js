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
import {firstData} from './data';
import LinearGradient from 'react-native-linear-gradient';
//=== star ====
import {
  AirbnbRating,
} from 'react-native-elements';
import {connect} from 'react-redux';
import config from '../../config/config';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import * as actiontype from '../../constant/action-type';
import WriterSideBar from '../../components/WriterSideBar';
import * as translate from '../../utils/translate';

class MyBookmarksScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstData: firstData,
    }
  }

  selectbook = (id,bookmarkid) => {
    let {auth,dispatch,bookmark} = this.props;
    dispatch({type:actiontype.SELECT_BOOK,token:auth.token,id:id,next:this.navigation,page:this.getpage(bookmarkid)})
  }

  getpage = (id) => {
    let {bookmark} = this.props;
    for(let item in bookmark)
    {
      if(bookmark[item].id == id)
      {
        return bookmark[item].page;
      }
    }

    return 0;
  }

  navigation = () => {
    this.props.navigation.navigate('ReadBook');
  }

  selectauthorinfo = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,token:auth.token,authorid:id,next:this.next})
  }

  next = () => {
    this.props.navigation.navigate('AuthorInfo');
  }

  render() {
    let {
      firstData
    } = this.state

    let {bookmark,auth} = this.props;
    console.log('bookmark',bookmark);
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
        <View style={styles.screenContainer}>
          <StatusBar 
            backgroundColor={colors.circleColor} 
            barStyle="light-content"
            translucent={false}
          />
            {/* === header === */}
          <ImageBackground 
            style={styles.headerContainer2} 
            source={require('../../assets/images/bookmark-bg.png')}>
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
                  {translate.getlang('My Bookmarks',auth.user.language)}
                </Text>
              </View>
              
              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={()=>this.props.navigation.navigate('ReaderMain',{index:1,category:0})}
                >
                <LinearGradient 
                  start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
                  style={styles.gradientStyle}
                  colors={[colors.borderColor,colors.inputGradient]}>
                  <View style={styles.searchIcon}>
                    <Image
                      style={styles.imageStyle}
                      source={require('../../assets/icons/search.png')}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            <FlatList
              data={bookmark}
              showsHorizontalScrollIndicator={false}
              extraData={this.state}
              renderItem={({item,index}) =>{
                const _that = this;
              return(
                <View style={styles.rowContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>this.props.navigation.navigate('BookDetails')} 
                    style={styles.bookImageStyle1}>
                    <Image
                      source={{uri:config.fileurl + item.cover_image}}
                      style={styles.imageStyle2}
                    />
                  </TouchableOpacity>
                  <View style={styles.cloumnStyle}>
                    {/* === book text === */}
                    <TouchableOpacity
                      activeOpacity={0.8} 
                      onPress={()=>this.props.navigation.navigate('Bookmark')}
                      style={styles.bookView}>
                      <Text style={styles.bookName}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.rowContainer2}>
                      <View>
                        <Text style={styles.subheadingText}>
                        {translate.getlang('Author',auth.user.language)}:
                        </Text>
                      </View>
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{this.selectauthorinfo(item.author_id)}}
                        style={styles.greenView}>
                        <Text style={styles.greenText}>
                          {item.authorName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {/* === Formate  === */}
                    <View style={{...styles.rowContainer2,marginTop: 15}}>
                      <View>
                        <Text style={styles.subheadingText}>
                        {translate.getlang('Format',auth.user.language)}:
                        </Text>
                      </View>
                      <View style={styles.rowHelpView}>
                        <Text style={styles.subheadingText}>
                          e-books
                        </Text>
                      </View>
                    </View>
                    {/* === language  === */}
                    <View style={{...styles.rowContainer2,marginTop: 5}}>
                      <View>
                        <Text style={styles.subheadingText}>
                        {translate.getlang('Language',auth.user.language)}:
                        </Text>
                      </View>
                      <View style={styles.rowHelpView}>
                        <Text style={styles.subheadingText}>
                          {item.language == 'en'?'English':'Arabic'}
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
                              defaultRating={item.rating}
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
                              {item.rating.toFixed(2)}/5
                            </Text>
                          </View>
                        </View>
                      </View>
                      {/* === link list === */}
                      <View style={styles.rowContainer2}>
                        {/* === share  === */}
                        <TouchableOpacity 
                          //onPress={()=>}
                          activeOpacity={0.8}
                          style={styles.iconStyle}>
                            <Image
                              style={styles.imageStyle}
                              source={require('../../assets/icons/share-circle.png')}
                            />
                        </TouchableOpacity>
                        {/* === bookmark  === */}
                        <TouchableOpacity 
                          //onPress={()=>}
                          activeOpacity={0.8}
                          style={styles.iconStyle}>
                            <Image
                              style={styles.imageStyle}
                              source={require('../../assets/icons/bookmark-circle.png')}
                            />
                        </TouchableOpacity>
                        {/* === bookmark  === */}
                        <TouchableOpacity 
                          //onPress={()=>}
                          activeOpacity={0.8}
                          style={styles.iconStyle}>
                            <Image
                              style={styles.imageStyle}
                              source={require('../../assets/icons/heart-circle.png')}
                            />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* === Review  === */}
                    <View style={styles.rowContainer5}>
                      <View style={{...styles.rowContainer2}}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang('Review',auth.user.language)}:
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
                      <TouchableOpacity 
                        style={styles.readmoreButton}
                        activeOpacity={0.8}
                        onPress={()=>{this.selectbook(item.content_id,item.id)}}
                        >
                        <Text style={styles.readMoreText}>
                        {translate.getlang('READ',auth.user.language)}
                        </Text>
                    </TouchableOpacity>
                    </View>
                    
                  </View>
                  
                </View>
              )}}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  bookmark:state.bookmark,
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(MyBookmarksScreen);