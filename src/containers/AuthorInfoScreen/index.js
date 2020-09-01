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
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {NavigationAction} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as UserService from '../../service/UserService';

import config from '../../config/config';
import * as translate from '../../utils/translate';

class AuthorInfoScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      authinfo:firstData,
      bookCount: 101,
      authRating: 4,
      authDescText: 'Dummy text is text that is used in the publishing industry or by web designers to occupy the space which will later be filled with  content. This is required when, for example, the final text is not yet available. Dummy text is also known as',
    }
  }

  componentDidMount()
  {
    // let auth = this.props.auth;
    // let token = auth.token;
    // if(this.props.navigation.state && this.props.navigation.state.params.id)
    // {
    //   let authorid = this.props.navigation.state.params.id;
    //   UserService.getauthorinfo(token,authorid).then(res=>{
    //     this.setState({
    //       authorinfo:res.data
    //     })
    //   })
    // }
  }


  render() {
  

    const {authorinfo,auth} = this.props;
  
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
          source={require('../../assets/images/author-bg.png')}>
          <SafeAreaView />
          <View
            style={styles.headerContainer} >
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.menuIcon}
              onPress={()=>{this.props.navigation.pop()}}
            >
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/backArrow.png')}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>
                {translate.getlang("Author Info",auth.user.language)}
              </Text>
            </View>
            
            <View/>
          </View>
        </ImageBackground>
          {/* === main content === */}
          <View style={styles.mainContainer}>
            <ScrollView style={{flex: 1,}} 
              bounces={false}>
              {/* === author === */}
              <View style={styles.rowContainer}>
                <View style={styles.circleView}>
                  <Image 
                    style={styles.imageStyle}
                    source={{uri:config.fileurl + authorinfo.maininfo.profile_pic}}
                  />
                </View>
                <View style={styles.secondCloumn}>
                  <View style={styles.rowContainer4}>
                    <View>
                      {/* === auth name == */}
                      <View>
                        <Text style={styles.authText}>
                          {authorinfo.maininfo.username}
                        </Text>
                      </View>
                      {/* === auth book count == */}
                      <View>
                        <Text style={styles.booksCount}>
                        {translate.getlang("Total book",auth.user.language)} {authorinfo.content.length}
                        </Text>
                      </View>
                    </View>
                    {/* === auth rating == */}
                    <View style={styles.ratingView}>
                      <AirbnbRating
                        defaultRating={authorinfo.rating}
                        selectedColor={colors.yellowColor}
                        size={15}
                        fractions={true}
                        isDisabled={true}
                        showRating={false}
                        starStyle={{padding: 0,backgroundColor: 'transparent',margin: 0}}
                      />
                    </View>
                  </View>
                  <View style={styles.rowContainer5}>
                    <TouchableOpacity 
                      // onPress={()=>{}}
                      activeOpacity={0.8}
                      style={styles.borderButton}>
                        <Text style={styles.buttonText}>
                          {translate.getlang("Actions",auth.user.language)}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      // onPress={()=>{}}
                      activeOpacity={0.8}
                      style={{...styles.borderButton,marginLeft: 8}}>
                        <Text style={styles.buttonText}>
                          {translate.getlang("Thriller",auth.user.language)}
                        </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* === About the author === */}
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>
                  {translate.getlang("About the author",auth.user.language)}
                </Text>
              </View>
              {/* === author description === */}
              <View style={styles.descContainer}>
                <Text style={styles.descText}>
                  {authorinfo.maininfo.short_bio}
                </Text>
              </View>
              {/* === Heading Top collections === */}
              <View style={styles.headingContainer}>
                <Text style={styles.headingText}>
                  {translate.getlang("Top collections",auth.user.language)}
                </Text>
              </View>
            {/* === Books List === */}
            <View style={styles.rowContainer2}>
              <FlatList
                data={authorinfo.content}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={({item,index}) =>{
                  const _that = this;
                return(
                  <View 
                    style={{
                    ...styles.rectangleContainer,
                  }}>
                    <View style={styles.bookImageStyle1}>
                      <Image
                        source={{uri:config.fileurl + item.cover_image}}
                        style={styles.imageStyle}
                      />
                    </View>
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
                            {translate.getlang("Author",auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.greenView}>
                          <Text style={styles.greenText}>
                            {item.username}
                          </Text>
                        </View>
                      </View>
                      {/* === Language  === */}
                      <View style={styles.rowContainer3}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang("Format",auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.normalView}>
                          <Text style={styles.subheadingText}>
                          {translate.getlang("e-book",auth.user.language)}
                          </Text>
                        </View>
                      </View>
                      {/* === Language  === */}
                      <View style={styles.rowContainer3}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang("Language",auth.user.language)}:
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
                          {translate.getlang("Category",auth.user.language)}:
                          </Text>
                        </View>
                        <View style={styles.normalView}>
                          <Text style={styles.subheadingText}>
                            {item.categoryname}
                          </Text>
                        </View>
                      </View>
                      
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
                            {Number(item.rating).toFixed(2)}/5
                          </Text>
                        </View>
                      </View>

                      {/* === Review  === */}
                      <View style={styles.rowContainer3}>
                        <View>
                          <Text style={styles.subheadingText}>
                          {translate.getlang("Review",auth.user.language)}:
                          </Text>
                        </View>
                        <View style={{...styles.greenView,borderBottomWidth: 0}}>
                          <Text style={styles.greenText}>
                            {item.review}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {/* === redMore Button === */}
            <TouchableOpacity 
              style={styles.readmoreButton}
              activeOpacity={0.8}
              //onPress={()=>{}}
              >
              <Text style={styles.readMoreText}>
              {translate.getlang("SEE ALL",auth.user.language)}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  authorinfo:state.authorinfo,
  auth:state.auth
})
//===  make components available outside ===
export default connect(mapstatetoprops)(AuthorInfoScreen);