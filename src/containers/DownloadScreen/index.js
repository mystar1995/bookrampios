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

import {firstData} from './data';
//=== star ====
import {AirbnbRating} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import {NavigationAction} from '@react-navigation/native';
import {connect} from 'react-redux';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';
import * as translate from '../../utils/translate';

class DownloadScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      searchKey: '',
      authorName: '',
      language: '',
      title:props.route.params?props.route.params.title:"Archieved Books",
      data:[]
    }
  }

  selectbook = (id) => {
    let {auth,dispatch} = this.props;
    dispatch({type:actiontype.SELECT_BOOK_INFO,token:auth.token,id:id,next:this.props.navigation.navigate('BookDetails')});
  }

  selectreview = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.INIT_RATING,contentid:id,token:auth.token,next:()=>this.props.navigation.navigate('Review')})
  }

  selectfreebooks = (contentid) => {
    console.log(contentid);
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,token:auth.token,contentid:contentid,next:this.next});
  }

  next = () => {
    this.props.navigation.navigate('Bookmark')
  }

  selectauthorinfo = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,authorid:id,token:auth.token,next:()=>this.props.navigation.navigate('AuthorInfo')})
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

  getinformation = () => {

  }
  

  render() {
    let {
      firstdata,
      searchKey,
      authorName,
      language,
    } = this.state
    let authorData = [{
      value: 'Abhi',
    }, {
      value: 'Jonh',
    }, {
      value: 'Jack',
    }];
    let languageData = [{
      value: 'English',
    }, {
      value: 'Hindi',
    }];

    let {download,auth} = this.props;

    if(this.state.title == 'Sold')
    {
      download = this.props.sold;
    }
    return (
      // === side bar ===
      <ScalingDrawer 
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        ref={ref => this._drawer = ref}
        content={auth.role == 'writer'?<WriterSideBar navigation={this.props.navigation}/>:<SideBar navigation={this.props.navigation}/>}
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
                  {this.state.title}
                </Text>
              </View>
              
              <View/>
            </View>
            {/* //==== content ===  */}
           
          </ImageBackground>
            {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* === first list === */}
            <View style={styles.rowContainer2}>
              <FlatList
                data={download}
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
                        onPress={()=>this.selectbook(item.id)}  
                        style={styles.bookImageStyle1}>
                      <Image
                        source={{uri:config.fileurl + item.cover_image}}
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
                            {translate.getlang('Author',auth.user.language)}:
                          </Text>
                        </View>
                        <TouchableOpacity 
                          activeOpacity={0.8}
                          onPress={()=>{this.selectauthorinfo(item.id)}}
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
                          {translate.getlang('Format',auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.normalView}>
                          <Text style={styles.subheadingText}>
                            e-book
                          </Text>
                        </View>
                      </View>
                      {/* === Language  === */}
                      <View style={styles.rowContainer3}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang('Language',auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.normalView}>
                          <Text style={styles.subheadingText}>
                            {item.language == 'en'?"English":'Arabic'}
                          </Text>
                        </View>
                      </View>
                      {/* === Category  === */}
                      <View style={styles.rowContainer3}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang('Category',auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.normalView}>
                          <Text style={styles.subheadingText}>
                            {item.categoryname}
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
                              {translate.getlang('Review',auth.user.language)}:
                              </Text>
                            </View>
                            <TouchableOpacity
                              activeOpacity={0.8}
                              onPress={()=>this.selectreview(item.id)} 
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
                          onPress={()=>this.selectfreebooks(item.id)}
                          //onPress={()=>{}}
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
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  mycontent:state.content.purchase,
  auth:state.auth,
  sold:state.content.sold,
  download:state.home.download
})
//===  make components available outside ===
export default connect(mapstatetoprops)(DownloadScreen);