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
import { firstData,descData } from './data';
import LinearGradient from 'react-native-linear-gradient';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {connect} from 'react-redux';
import config from '../../config/config';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import * as translate from '../../utils/translate';

class CategoriesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstData: firstData,
      search:false,
      searchKey:""
    }
  }

  handlechange = (text) => {
    this.setState({
      searchKey:text
    })
  }
  
  render() {
    let {
      firstData
    } = this.state

    let {auth} = this.props;

    let index = auth.role == 'writer'?2:1;
    return (
      // === side bar ===
      <ScalingDrawer
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        ref={ref => this._drawer = ref}
        content={this.props.auth.role == 'reader'?<SideBar navigation={this.props.navigation} />:<WriterSideBar navigation={this.props.navigation}></WriterSideBar>}
      >
        <View style={styles.screenContainer}>
          <StatusBar
            backgroundColor={colors.circleColor}
            barStyle="light-content"
            translucent={false}
          />
          {/* === header === */}
          <ImageBackground
            style={{...styles.headerContainer2,height:this.state.search?170:100}}
            source={require('../../assets/icons/main-bg.png')}>
            <SafeAreaView />
            <View
              style={styles.headerContainer} >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.menuIcon}
                onPress={() => { this._drawer.open() }}
              >
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/toggle.png')}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerText}>
                  {translate.getlang('Category',auth.user.language)}
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
            <View style={styles.listContainer}>
              <FlatList
                data={this.props.category}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={({ item, indexitem }) => {
                  const _that = this;
                  if(!this.state.searchKey || item.category.toLowerCase().split(this.state.searchKey.toLowerCase()).length > 1)
                  {
                    return (
                      <TouchableOpacity style={styles.rowContainer} onPress={()=>{this.props.navigation.replace(auth.role == 'writer'?'WriterMain':'ReaderMain',{index: index,category:item.id,categoryname:item.category})}}>
                        <View style={styles.rowContainer2}>
                          {/* //=== book image === */}
                          <View style={styles.bookImage}>
                            <Image
                              source={item.cover_url?{uri:config.fileurl + item.cover_url}:require('../../assets/placeHolder/type-book3.png')}
                              style={styles.imageStyle2}
                            />
                          </View>
                          {/* //=== type === */}
                          <View style={styles.textBookStyle}>
                            <Text style={styles.textBook}>
                              {item.category}
                            </Text>
                          </View>
                        </View>
                         <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={()=>{this.props.navigation.replace(auth.role == 'writer'?'WriterMain':'ReaderMain',{index: index,category:item.id,categoryname:item.category})}}
                          style={styles.rightArrow}
                        >
                          <Image
                            source={require('../../assets/icons/rightCircleArrow.png')}
                            style={styles.imageStyle}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )
                  }
                  
                }}
                keyExtractor={(item, i) => i.toString()}
              />
            </View>
           </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  category:state.category,
  auth:state.auth
})

export default connect(mapstatetoprops)(CategoriesScreen);
//===  make components available outside ===