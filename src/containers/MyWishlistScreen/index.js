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
import {firstData} from './data';
import LinearGradient from 'react-native-linear-gradient';
//=== star ====
import {
  AirbnbRating,
} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import WriterSidebar from '../../components/WriterSideBar';
import {connect} from 'react-redux';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

class MyWishlistScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstData: firstData,
      search:false,
      searchKey:""
    }
  }

  createpayment = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_PAYMENT,contentid:id,token:auth.token,nextaction:this.nextpayment})
  }

  nextpayment = () => {
    this.props.navigation.navigate('Payment');
  }
  selectauthorinfo = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,token:auth.token,authorid:id,next:this.next})
  }

  selectfreebooks = (contentid) => {
    console.log(contentid);
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,token:auth.token,contentid:contentid,next:this.navigate});
  }

  handlechange = (text) => {
    this.setState({
      searchKey:text
    })
  }
  next = () => {
    this.props.navigation.navigate('AuthorInfo');
  }

  navigate = () => {
    this.props.navigation.navigate('Bookmark')
  }
  selectreview = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.INIT_RATING,contentid:id,token:auth.token,next:()=>this.props.navigation.navigate('Review')})
  }

  removewishitem = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.DELETE_WISHLIST,token:auth.token,contentid:id});
  }
  render() {
    let {
      firstData
    } = this.state

    let {auth,wishlist} = this.props;
    console.log(wishlist);
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
            style={{...styles.headerContainer2,height:this.state.search?180:120}}
            source={require('../../assets/images/wishlist-bg.png')}>
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
                  {translator.getlang('My Wishes',auth.user.language)}
                </Text>
              </View>
              
              <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>{this.setState({search:!this.state.search,searchKey:""})}}
                >
                  <LinearGradient
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.gradientStyle}
                    colors={[colors.borderColor, colors.inputGradient]}
                    >
                    <View style={styles.searchIcon}>
                      <Image
                        style={styles.imageStyle}
                        source={require('../../assets/icons/search.png')}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              
              {/* <TouchableOpacity 
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
              </TouchableOpacity> */}
            </View>
            {
                this.state.search && (
                  <View style={styles.contentView}>
                    <LinearGradient
                      start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                      style={styles.gradientinputStyle}
                      colors={[colors.borderColor, colors.inputGradient]}
                    >
                     <View style={styles.rowContainer1}>
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
                      <TouchableOpacity style={styles.mailIcon} onPress={()=>this.setState({search:!this.state.search,searchKey:""})}>
                        <Image
                          style={styles.imageStyle}
                          source={require('../../assets/icons/search.png')}
                        />
                      </TouchableOpacity>
                    </View> 
                  </LinearGradient>
                  </View>
                )
              }
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            <FlatList
              data={wishlist?wishlist:[]}
              showsHorizontalScrollIndicator={false}
              extraData={this.state}
              renderItem={({item,index}) =>{
                const _that = this;
                if(!this.state.searchKey || item.title.toLowerCase().split(this.state.searchKey.toLowerCase()).length > 1)
                {
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
                        <View style={styles.bookView}>
                          <Text style={styles.bookName}>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.rowContainer2}>
                          <View>
                            <Text style={styles.subheadingText}>
                              {translator.getlang('Author',auth.user.language)}:
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
                        {/* === Formate  === */}
                        <View style={{...styles.rowContainer2,marginTop: 15}}>
                          <View>
                            <Text style={styles.subheadingText}>
                              {translator.getlang('Format',auth.user.language)}:
                            </Text>
                          </View>
                          <View style={styles.rowHelpView}>
                            <Text style={styles.subheadingText}>
                              {translator.getlang('e-book',auth.user.language)}
                            </Text>
                          </View>
                        </View>
                        {/* === language  === */}
                        <View style={{...styles.rowContainer2,marginTop: 5}}>
                          <View>
                            <Text style={styles.subheadingText}>
                              {translator.getlang('Language',auth.user.language)}:
                            </Text>
                          </View>
                          <View style={styles.rowHelpView}>
                            <Text style={styles.subheadingText}>
                              {item.language == 'en'?'English':'Arabic'}
                            </Text>
                          </View>
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.removewishitem(item.content_id)} 
                            style={styles.deletebutton}>
                            <Text style={styles.submitText}>
                              {translator.getlang('Remove Wishitem',auth.user.language)}
                            </Text>
                          </TouchableOpacity>
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
                            {/* === Review  === */}
                            <View style={{...styles.rowContainer2}}>
                              <View>
                                <Text style={styles.subheadingText}>
                                  {translator.getlang('Review',auth.user.language)}:
                                </Text>
                              </View>
                              <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={()=>this.selectreview(item.content_id)} 
                                style={{...styles.greenView,borderBottomWidth: 0}}>
                                <Text style={styles.greenText}>
                                  {item.review}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                          {/* //=== submit === */}
                          <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={()=>this.selectfreebooks(item.content_id)} 
                            style={styles.submitButton}>
                            <Text style={styles.submitText}>
                              {translator.getlang('Want to Read',auth.user.language)}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )
                } 
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            {
              (!wishlist || wishlist.length == 0) && (
                <View style={{paddingTop:10}}>
                  <Text style={{...styles.headerText,textAlign:'center'}}>{translator.getlang("You haven¡¯t added any book to your wishist",auth.user.language)}</Text>
                </View>
              )
            }
          </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  wishlist:state.wishlist
})

//===  make components available outside ===
export default connect(mapstatetoprops)(MyWishlistScreen);