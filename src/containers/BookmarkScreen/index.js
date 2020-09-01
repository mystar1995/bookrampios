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
import WriterSidebar from '../../components/WriterSideBar';
import {firstData,descData} from './data';
import LinearGradient from 'react-native-linear-gradient';
import * as translate from '../../utils/translate';
//=== star ====
import {
  AirbnbRating,
} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import * as actiontype from '../../constant/action-type';
import config from '../../config/config';

class BookmarkScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstData: firstData,
      name: 'Big Magic',
      rating: 3,
      subTitle: "This is subtitle of this book",
      authorName: "Mr. Vikas anand Sath",
      review: 100,
      language: 'English',
      category: 'Mystry',
      format: 'e-book',
      imageUrl: require('../../assets/placeHolder/bookmagic.png')
    }
  }

  readforfree = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_BOOK,token:auth.token,id:id,next:this.next});
  }

  next = () => {
    this.props.navigation.navigate('ReadBook');
  }

  selectbook = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_FREE_BOOKS,contentid:id,token:auth.token});
  }

  selectpurchasebook = (id) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.SELECT_BOOK_INFO,id:id,token:auth.token,next:()=>this.props.navigation.navigate('BookDetails')})
  }

  checkpurchased = (id) => {
    let {purchased} = this.props;

    for(let item in purchased)
    {
      if(purchased[item].id == id)
      {
        return true;
      }
    }

    return false;
  }


  render() {
    let {
      name,
      rating,
      authorName,
      review,
      language,
      format,
      imageUrl,
      firstData
    } = this.state

    let {bookinfo,auth} = this.props;
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
        <ScrollView style={styles.screenContainer} bounces={false}>
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
                    {translate.getlang("My BookMarks",auth.user.language)}
                  </Text>
                </View>
                
               <View/>
              </View>
            </ImageBackground>
              {/* === main content === */}
            <View style={styles.mainContainer}>
              {/* === top book Details ==== */}
              <View style={styles.rowContainer}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={()=>this.props.navigation.navigate('BookDetails')} 
                  style={styles.bookImageStyle1}>
                  <Image
                    source={{uri:config.fileurl + bookinfo.cover_image}}
                    style={styles.imageStyle2}
                  />
                </TouchableOpacity>
                <View style={styles.cloumnStyle}>
                  {/* === book text === */}
                  <View style={styles.bookView}>
                    <Text style={styles.bookName}>
                      {bookinfo.title}
                    </Text>
                  </View>
                  {/* === first row === */}
                  <View style={styles.rowContainer3}>
                     {/* ===  Author  === */}
                    <View style={styles.rowContainer2}>
                      <View>
                        <Text style={styles.subheadingText}>
                          {translate.getlang("Author",auth.user.language)}:
                        </Text>
                      </View>
                      <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={()=>{this.props.navigation.navigate('AuthorInfo')}}
                        style={styles.greenView}>
                        <Text style={styles.greenText}>
                          {bookinfo.authorName}
                        </Text>
                      </TouchableOpacity>
                    </View>
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
                  </View>
                  {/* === Formate  === */}
                  <View style={{...styles.rowContainer3,marginTop: 10}}>
                    <View style={styles.rowContainer2}>
                      <View>
                        <Text style={styles.subheadingText}>
                        {translate.getlang("Format",auth.user.language)}:
                        </Text>
                      </View>
                      <View style={styles.rowHelpView}>
                        <Text style={styles.subheadingText}>
                          {translate.getlang("e-books",auth.user.language)}:
                        </Text>
                      </View>
                    </View>
                    {/* === heart  === */}
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
                  {/* === language  === */}
                  <View style={{...styles.rowContainer2,marginTop: 5}}>
                    <View>
                      <Text style={styles.subheadingText}>
                        {translate.getlang("Language",auth.user.language)}:
                      </Text>
                    </View>
                    <View style={styles.rowHelpView}>
                      <Text style={styles.subheadingText}>
                        {bookinfo.language == 'en'?'English':'Arabic'}
                      </Text>
                    </View>
                  </View>
                  <View style={{...styles.rowContainer2,marginTop: 8,marginBottom: 10}}>
                    <View style={styles.circleStyle}/>
                    <View style={styles.lineStyle}/>
                    <View style={styles.circleStyle}/>
                  </View>
                  {/* === second row === */}
                  <View style={{...styles.rowContainer2}}>
                    <View>
                      {/* === Category  === */}
                      <View style={styles.rowContainer2}>
                        {/* === Rating === */}
                        <View style={styles.ratingView}>
                          <AirbnbRating
                            defaultRating={bookinfo.rating}
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
                            {bookinfo.rating?bookinfo.rating.toFixed(2):0}/5
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* === Review  === */}
                    <View style={{...styles.rowContainer2,marginLeft: 30}}>
                      <View>
                        <Text style={styles.subheadingText}>
                          {translate.getlang("Review",auth.user.language)}:
                        </Text>
                      </View>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>this.props.navigation.navigate('Review')} 
                        style={{...styles.greenView,borderBottomWidth: 0}}>
                        <Text style={styles.greenText}>
                          {bookinfo.review}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              {/* ==== description ==== */}
              <View style={styles.headView}>
                <Text style={styles.headText}>
                  {translate.getlang("Description",auth.user.language)}
                  
                </Text>
              </View>
              {/* === desc ==== */}
              <View>
                <Text style={styles.descText}>
                  {bookinfo.story}
                </Text>
              </View>
              {/* === read  === */}
              {
               (bookinfo.author && Number(bookinfo.author.point) < Number(this.props.config.purchase_points)) && (
                  <TouchableOpacity 
                    style={styles.readButton}
                    activeOpacity={0.8}
                    onPress={()=>{this.readforfree(bookinfo.id)}}
                    >
                    <Text style={styles.readText}>
                      {translate.getlang("READ FOR FREE",auth.user.language)}
                    </Text>
                  </TouchableOpacity>
                )
              }

              {
                (bookinfo.author && Number(bookinfo.author.point) >= Number(this.props.config.purchase_points) && !this.checkpurchased(bookinfo.id)) && (
                  <TouchableOpacity 
                    style={styles.readButton}
                    activeOpacity={0.8}
                    onPress={()=>{this.selectpurchasebook(bookinfo.id)}}
                    >
                    <Text style={styles.readText}>
                      {translate.getlang("Purchase Book",auth.user.language)}
                    </Text>
                  </TouchableOpacity>
                ) 
              }

              {
                (bookinfo.author && Number(bookinfo.author.point) >= Number(this.props.config.purchase_points) && this.checkpurchased(bookinfo.id)) && (
                  <TouchableOpacity 
                    style={styles.readButton}
                    activeOpacity={0.8}
                    onPress={()=>{this.readforfree(bookinfo.id)}}
                    >
                    <Text style={styles.readText}>
                      {translate.getlang("READ",auth.user.language)}
                    </Text>
                  </TouchableOpacity>
                ) 
              }
              
              <View style={{...styles.rowContainer2,marginTop: 20,marginBottom: 10}}>
                <View style={styles.circleStyle}/>
                <View style={styles.lineStyle}/>
                <View style={styles.circleStyle}/>
              </View>
              {/* ==== description ==== */}
              <View style={styles.headView}>
                <Text style={styles.headText}>
                  {translate.getlang("Similar Books",auth.user.language)}
                </Text>
              </View>
              {/* //=== book List === */}
              <View style={styles.listStyle}>
                <FlatList
                  data={bookinfo.related}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  extraData={this.state}
                  renderItem={({item,index}) =>{
                    const _that = this;
                  return(
                    <TouchableOpacity style={styles.boxContainer} onPress={()=>this.selectbook(item.id)}>
                      <View style={styles.boxStyle}>
                        <Image
                          style={styles.imageStyle2}
                          source={{uri:config.fileurl + item.cover_image}}
                        />
                      </View>
                      <View style={styles.bookTxtView}>
                        <Text numberOfLines={2} style={styles.readingBook}>
                          {item.title}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  bookinfo:state.freebook,
  auth:state.auth,
  purchased:state.content.purchased,
  config:state.config
})

//===  make components available outside ===
export default connect(mapstatetoprops)(BookmarkScreen);