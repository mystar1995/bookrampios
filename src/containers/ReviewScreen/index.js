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
  Platform,
  Keyboard,
  Dimensions,
  FlatList,
  TouchableHighlight
} from 'react-native';

import { reviewData } from './data';
import LinearGradient from 'react-native-linear-gradient';
//=== star ====
import {
  AirbnbRating,
} from 'react-native-elements';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import config from '../../config/config';

const ScreenWidth = Math.round(Dimensions.get('window').width);

class ReviewScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Big Magic This is Mystry',
      authorName: "Mr. Vikas",
      review: 100,
      language: 'English',
      format: 'e-book',
      authRating: 4,
      isReadMore: false,
      reviewData: reviewData
    }
  }

  render() {
    let {
      name,
      authorName,
      language,
      format,
      review,
      authRating,
      reviewData,
      isReadMore,
    } = this.state

    const {rating,content} = this.props;
    console.log(rating);
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
              onPress={() => { this.props.navigation.pop() }}
            >
              <Image
                style={styles.imageStyle}
                source={require('../../assets/icons/backArrow.png')}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerText}>
                Reader Review
              </Text>
            </View>

            <View />
          </View>
        </ImageBackground>
        {/* === main content === */}
        <View style={styles.mainContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.rowContainer2}>
              <View style={styles.bookImage}>
                <Image
                  style={styles.imageStyle2}
                  source={{uri:config.fileurl + content.cover_image}}
                />
              </View>
              <View style={styles.secondColumn}>
                {/* === book name === */}
                <View style={styles.bookView}>
                  <Text numberOfLines={1} style={styles.bookText}>
                    {content.title}
                  </Text>
                </View>
                {/* === author name === */}
                <View style={{ ...styles.rowContainer2, marginTop: 5 }}>
                  <View>
                    <Text
                      numberOfLines={1}
                      style={styles.otherText}>
                      Author:
                      </Text>
                  </View>
                  <View style={styles.borderView}>
                    <Text
                      numberOfLines={1}
                      style={styles.greenTxt}>
                      {content.authorName}
                    </Text>
                  </View>
                </View>
                {/* === formate === */}
                <View style={{ ...styles.rowContainer2, marginTop: 5 }}>
                  <Text
                    numberOfLines={1}
                    style={styles.otherText}>
                    Format:  e-book
                  </Text>
                </View>
                {/* === formate === */}
                <View style={{ ...styles.rowContainer2, marginTop: 5 }}>
                  <Text
                    numberOfLines={1}
                    style={styles.otherText}>
                    Language:  {content.language == 'en'?"English":'Arabic'}
                  </Text>
                </View>
              </View>
            </View>
            <LinearGradient
              start={{ x: 0.0, y: 0.7 }} end={{ x: 1.0, y: 0.1 }}
              style={styles.gradientStyle}
              colors={[
                colors.borderColor,
                colors.borderColor,
                colors.borderColor,
                colors.inputGradient
              ]}>
              <View style={styles.thirdCloumn}>
                <View>
                  <Text style={styles.ratingText}>
                    {content.rating.toFixed(2)}
                    </Text>
                </View>
                {/* === Rating  === */}
                <View style={styles.ratingContainer}>
                  <AirbnbRating
                    defaultRating={authRating}
                    selectedColor={colors.yellowColor}
                    size={12}
                    fractions={true}
                    isDisabled={true}
                    showRating={false}
                    starStyle={styles.starStyles}
                  />
                </View>
                <View style={styles.reviewView}>
                  <Text style={styles.reviewText}>
                    {content.review} Reviews
                    </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
         
          {/* === list of reviews === */}
          <View style={styles.mainList}>
            <FlatList
              data={rating}
              showsHorizontalScrollIndicator={false}
              extraData={this.state}
              renderItem={({ item, index }) => {
                const _that = this;
                return (

                  <View style={styles.listRowView}>
                    {/* === Image  === */}
                    <View style={styles.reviewerImage}>
                      <Image
                        style={styles.imageStyle}
                        source={{uri:config.fileurl + item.profile_pic}}
                      />
                    </View>
                    <View style={styles.remaingView}>
                      {/* === Name  === */}
                      <View>
                        <Text style={styles.nameText}>
                          {item.username}
                        </Text>
                      </View>
                      {/* === Rating  === */}
                      <View style={styles.ratingView}>
                        <AirbnbRating
                          defaultRating={item.rating}
                          selectedColor={colors.yellowColor}
                          size={12}
                          fractions={true}
                          isDisabled={true}
                          showRating={false}
                          starStyle={styles.starStyles}
                        />
                      </View>
                      {/* //=== book desc === */}
                      <View style={styles.descView}>
                        {isReadMore === index ?
                          <Text style={styles.descText}>
                            {item.aboutBook}
                          </Text>
                          :
                          <Text style={styles.descText} numberOfLines={4}>
                            {item.aboutBook}
                          </Text>
                        }
                      </View>
                      {/* //=== Read More === */}
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          this.setState({
                            isReadMore: isReadMore === index ? false : index
                          })
                        }}
                        style={styles.readMoreButton}>
                        <Text style={styles.readMoreTxt}>
                          Read More...
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {/* //=== load more === */}
          <TouchableOpacity
            activeOpacity={0.8}
            //onPress={()=>this.props.navigation.navigate('ReaderMain')} 
            style={styles.loadButton}>
            <Text style={styles.loadText}>
              LOAD MORE
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  rating:state.rating.rating,
  content:state.rating.content
})
//===  make components available outside ===
export default connect(mapstatetoprops)(ReviewScreen);