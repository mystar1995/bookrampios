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

import {connect} from 'react-redux';

//=== star ====
import {
  AirbnbRating,
  CheckBox
} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';

import config from '../../config/config';
import * as actiontype from '../../constant/action-type';
import * as translate from '../../utils/translate';

class BookDetailScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      name: 'Big Magic This is Mystry',
      rating: 3,
      subTitle: "This is subtitle of this book",
      authorName: "Mr. Vikas anand Sath",
      review: 100,
      language: 'English',
      category: 'Mystry',
      format: 'e-book',
      bookCount: 101,
      authRating: 4,
      point: 50,
      isReadMore: false,
      isChecked: true,
      bookDescText: 'Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with  content. This is required when, for example, the final text is not yet available. Dummy text is also known as',
    }
  }

  selectpayment = () => {
    const {dispatch,auth,bookinfo} = this.props;
    if(this.getcontentpurchased(bookinfo.id))
    {
      dispatch({type:actiontype.SELECT_BOOK,id:bookinfo.id,token:auth.token,next:this.readbook});
    }
    else
    {
      dispatch({type:actiontype.SELECT_PAYMENT,contentid:bookinfo.id,token:auth.token,nextaction:this.nextpayment});
    }
    
  }

  selectauthorinfo = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_AUTHORINFO,authorid:id,token:auth.token,next:()=>this.props.navigation.navigate('AuthorInfo')})
  }

  readbook = () => {
    this.props.navigation.navigate('ReadBook');
  }

  nextpayment = () => {
    this.props.navigation.navigate('Payment');
  }

  getcontentpurchased = (contentid) => {
    const {purchased} = this.props;
    for(let item in purchased)
    { 
      if(purchased[item].id == contentid)
      {
        return true;
      }
    }

    return false;
  }
  render() {
    let {
      name,
      authorName,
      language,
      category,
      format,
      bookDescText,
      bookCount,
      authRating,
      isReadMore,
      point,
      isChecked
    } = this.state

    let {bookinfo,auth} = this.props;
    console.log('contentinfo',this.getcontentpurchased(bookinfo.id));
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
                {translate.getlang("Book Details",auth.user.language)}
                </Text>
              </View>
              
              <View/>
            </View>
          </ImageBackground>
            {/* === main content === */}
            <View style={styles.mainContainer}>
              <ScrollView 
                style={styles.scrollView}
                bounces={false}>
                <View style={styles.centerAlgin}>
                  {/* === book image  === */}
                  <View style={styles.bookImageStyle}>
                    <Image
                      style={styles.imageStyle}
                      source={{uri:config.fileurl + bookinfo.cover_image}}
                    />
                  </View>
                  {/* === Rating  === */}
                  <View style={styles.ratingContainer}>
                    <AirbnbRating
                      defaultRating={bookinfo.rating}
                      selectedColor={colors.yellowColor}
                      size={12}
                      fractions={true}
                      isDisabled={true}
                      showRating={false}
                      starStyle={styles.starStyles}
                    />
                  </View>
                  {/* //=== book name === */}
                  <View style={styles.bookTextView}>
                    <Text 
                      numberOfLines={1} 
                      style={styles.bookNameTxt}>
                      {bookinfo.title}
                    </Text>
                  </View>
                  {/* ===other === */}
                  <View style={[styles.rowView,styles.increaseWidth]}>
                    <View>
                      <View style={styles.rowView}>
                        <View>
                          <Text 
                            numberOfLines={1} 
                            style={styles.otherText}>
                            {translate.getlang("Author",auth.user.language)}:
                          </Text>
                        </View>
                        <TouchableOpacity style={styles.borderView} onPress={()=>this.selectauthorinfo(bookinfo.author)}>
                          <Text 
                            numberOfLines={1} 
                            style={styles.greenTxt}>
                            {bookinfo.authorName}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.secondTextView}>
                      <Text 
                        numberOfLines={1} 
                        style={styles.otherText}>
                        {translate.getlang("Language",auth.user.language)}:   {bookinfo.language == 'en'?'English':'Arabic'}
                      </Text>
                    </View>
                  </View>
                  {/* === format ==== */}
                  <View style={[styles.rowView,styles.increaseWidth]}>
                    <View style={styles.secondTextView}>
                      <Text 
                        numberOfLines={1} 
                        style={styles.otherText}>
                        {translate.getlang("Format",auth.user.language)}:  en-book
                      </Text>
                    </View>
                  </View>
                </View>
                {/* //=== book desc === */}
                <View style={styles.descView}>
                  {isReadMore?
                    <Text style={styles.descText}>
                      {bookinfo.description}
                    </Text>
                  :
                    <Text style={styles.descText} numberOfLines={4}>
                      {bookinfo.story}
                    </Text>
                  }
                </View>
                {/* //=== Read More === */}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>{this.setState({
                    isReadMore: !isReadMore
                  })}}
                  style={styles.readMoreButton}>
                  <Text style={styles.readMoreTxt}>
                  {translate.getlang("Read More",auth.user.language)}...
                  </Text>
                </TouchableOpacity>
                {/* //=== check box === */}
                <View style={styles.rowContainer2}>
                  <View>
                    <CheckBox
                      center
                      size={10}
                      onPress={()=>{this.setState({
                        isChecked: !isChecked
                      })}}
                      containerStyle={styles.checkBoxContainer}
                      title={translate.getlang('Use LOL Points',auth.user.language)}
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
                <View style={[styles.rowContainer3,styles.marginIncrease]}>
                  <View>
                    <Text style={styles.pointText}>
                    {translate.getlang('Total reader rewards',auth.user.language)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.pointText}>
                      {bookinfo.amount}
                    </Text>
                  </View>
                </View>
                {/* //=== reward === */}
                <View style={[styles.rowContainer3,{marginTop: 5}]}>
                  <View>
                    <Text style={styles.pointText}>
                    {translate.getlang('LOL rewards',auth.user.language)}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.pointText}>
                      {auth.user.rewards}
                    </Text>
                  </View>
                </View>
                {/* ==== total  === */}
                <View style={[styles.rowContainer3,styles.totalView]}>
                  <View>
                    <Text style={styles.pointText}>
                      Total
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.pointText}>
                      {!isChecked?bookinfo.amount:bookinfo.amount - auth.user.rewards}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.selectpayment} 
                  style={styles.cartButton}>
                  <Text style={styles.cartText}>
                    {this.getcontentpurchased(bookinfo.id)?'Read':"Add to Cart"}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
          </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  bookinfo:state.bookinfo,
  auth:state.auth,
  purchased:state.content.purchase
})

//===  make components available outside ===
export default connect(mapstatetoprops)(BookDetailScreen);