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
import { Dropdown } from 'react-native-material-dropdown';
import LinearGradient from 'react-native-linear-gradient';
//=== keyboardAware ===
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';

import {connect} from 'react-redux'
import * as actiontype from '../../constant/action-type';
import * as StoryService from '../../service/StoryService';
import config from '../../config/config';

class SearchScreen extends  Component{
  searchcontainer = null;

  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      searchKey: '',
      authorName: '',
      language: '',
      content:{
        data:[]
      },
      category:0,
      categoryname:""
    }
  }

  componentDidMount()
  {
      let {keywords} = this.props;
      let token = this.props.auth.token;
      let category = (this.props.category && this.props.category.category)?this.props.category.category:0;
      let keyword = (this.props.category && this.props.category.keyword)?this.props.category.keyword:false;
      console.log(keyword);
      if(!keyword)
      {
        StoryService.get_content_search("",category,token).then(res=>{
          console.log('search',res.data);
          this.setState({
            content:res.data
          })
        }).catch(err=>console.log(err.response.data))
      }
      else
      {
        let keywordlist = [];
        for(let item in keywords)
        {
          keywordlist.push(keywords[item].text);
        }

        console.log('keyword',keywordlist);
        StoryService.get_content_by_keyword(keywordlist,token).then(res=>{
          console.log(res.data);
          if(res.data.success)
          {
            this.setState({
              content:{data:res.data.data}
            })
          }
        }).catch(e=>console.log(e.response.data))
      }
      
  }

  componentWillReceiveProps(params)
  {
    const {auth,keywords} = this.props;
    if(params.category)
    {
      if(!params.category.keyword)
      {
        StoryService.get_content_search("",params.category.category,auth.token).then(content=>{
          if(content.data.success)
          {
            this.setState({
              content:{data:content.data.data}
            })
          }
        }).catch(err=>console.log(err.response.data))
      }
      if(params.category.keyword)
      {
        let keywordlist = [];
        for(let item in keywords)
        {
          keywordlist.push(keywords[item].text);
        }

        console.log('keyword',keywordlist);
        try
        {
          StoryService.get_content_by_keyword(keywordlist).then(res=>{
            if(res.data.success)
            {
              this.setState({
                content:{data:res.data.data}
              })
            }
          })
        }
        catch(e)
        {
          console.log(e.response.data)
        }
        
      }
    }

    
  }


  handlechange = (value) => {
    this.setState({
      searchKey:value
    })
    this.search(value);
  }

  selectbook = (id) => {
    const {dispatch,auth}  = this.props;
    console.log(id);
    dispatch({type:actiontype.SELECT_BOOK_INFO,token:auth.token,id:id,next:()=>this.props.navigation.navigate('BookDetails')});
  }

  checkwishlist = (id) => {
    let {wishlist} = this.props;

    for(let item in wishlist)
    {
      if(wishlist[item].content_id == id)
      {
        return true;
      }
    }

    return false;
  }

  checkpurchase = (id) => {
    let {purchase} = this.props;

    for(let item in purchase)
    {
      if(purchase[item].id == id)
      {
        return true;
      }
    }
    return false;
  }

  addwishlist = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.ADD_WISHLIST,contentid:id,token:auth.token});
  }

  deletewishlist = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.DELETE_WISHLIST,contentid:id,token:auth.token});
  }
  
  read = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,contentid:id,token:auth.token,next:()=>this.props.navigation.navigate('Bookmark')})
  }

  next = () => {
    this.props.navigation.navigate('Bookmark')
  }

  selectauthorinfo = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,authorid:id,token:auth.token,next:()=>this.props.navigation.navigate('AuthorInfo')})
  }

  search = (search) => {
    let {auth} = this.props;
    clearTimeout(this.searchcontainer);
    
    this.searchcontainer = setTimeout(()=>{
      let category = (this.props.category && this.props.category.category)?this.props.category.category:0;
      StoryService.get_content_search(search,category,auth.token).then(res=>{
        if(res.data.success)
        {
          this.setState({content:{data:res.data.data}})
        }
        else
        {
          this.setState({content:{data:[]}});
        }
        
      })
    },200);
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

  selectfreebooks = (contentid) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,token:auth.token,contentid:contentid,next:this.next});
  }

  selectreview = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.INIT_RATING,contentid:id,token:auth.token,next:()=>this.props.navigation.navigate('Review')})
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

    let {search,content} = this.state;
    console.log('resdata',content.data);

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
                Search {(this.props.category && this.props.category.category)?"In " + this.props.category.categoryname:""}
              </Text>
            </View>
            
            <View/>
          </View>
          {/* //==== content ===  */}
          <View style={styles.contentView}>
            {/* === Search === */}
            <LinearGradient 
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={styles.gradientStyle}
              colors={[colors.borderColor,colors.inputGradient]}>
              <View style={styles.rowContainer}>
                <View style={styles.inputField}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={'Search'}
                    placeholderTextColor={colors.grayColor}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    blurOnSubmit={false}
                    returnKeyType={'done'}
                    value={this.state.searchKey}
                    onSubmitEditing={()=>{Keyboard.dismiss()}}
                    onChangeText={this.handlechange}
                    style={styles.inputStyle}/> 
                </View>
                <View style={styles.mailIcon}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/search.png')}
                  />
                </View>
              </View>
            </LinearGradient>
            {/* //==== options === */}
             {/* === main content === */}
              
            </View>
            <View style={styles.mainContainer}>
                {/* === first list === */}
              <View style={styles.rowContainer2}>
                <FlatList
                  data={content.data}
                  showsHorizontalScrollIndicator={false}
                  extraData={content}
                  renderItem={({item,index}) =>{
                    const _that = this;
                  return(
                    <View
                      key={index} 
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
                              Author:
                            </Text>
                          </View>
                          <TouchableOpacity 
                            activeOpacity={0.8}
                            onPress={()=>{this.selectauthorinfo(item.author)}}
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
                              {item.format}
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
                              {item.language}
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
                                  Review:
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

                          {
                            this.checkwishlist(item.id) && (
                              <TouchableOpacity 
                                style={styles.readmoreButton}
                                activeOpacity={0.8}
                                onPress={()=>{this.read(item.id)}}
                                >
                                <Text style={styles.readMoreText}>
                                  Read
                                </Text>
                              </TouchableOpacity>    
                            )
                          }
                          {
                            !this.checkwishlist(item.id) && (
                              <TouchableOpacity 
                                style={styles.readmoreButton}
                                activeOpacity={0.8}
                                onPress={()=>{this.addwishlist(item.id)}}
                                >
                                <Text style={styles.readMoreText}>
                                  Add to Wishlist
                                </Text>
                              </TouchableOpacity>
                            )
                          }
                          
                        </View>
                      </View>
                    </View>
                  )}}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
              </View>
        </ImageBackground>
         
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  search:state.content.search,
  content:state.content.content,
  wishlist:state.wishlist,
  purchase:state.content.purchase,
  keywords:state.content.keywords
})

//===  make components available outside ===
export default connect(mapstatetoprops)(SearchScreen);