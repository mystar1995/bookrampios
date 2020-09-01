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
import {firstData} from './data';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import * as StoryService from '../../service/StoryService';
import { actionTypes } from 'redux-form';
import * as actiontype from '../../constant/action-type';

class PreferredBooksScreen extends  Component{
  
  searchcontainer = null;

  constructor(props){
    super(props)
    this.state={
      firstDataArr: [],
      initialData:  firstData,
      backArray: firstData,
      helpArr: [],
      searchKey: '',
      isSearchActive: false,
      selectedid:false
    }
  }

  //=== add ===
  handleAdd=()=>{
    const {dispatch,auth} = this.props;
    if(this.state.searchKey)
    {
      if(this.state.selectedid)
      {
        dispatch({type:actiontype.UPDATE_KEYWORDS,id:this.state.selectedid,text:this.state.searchKey,token:auth.token});
      }
      else
      {
        dispatch({type:actiontype.ADD_KEYWORDS,text:this.state.searchKey,token:auth.token})
      }
      
      this.setState({
        searchKey:"",
        selectedid:false
      })
    }
  } 

  handleSubmit = () => {
    let {auth} = this.props;
    this.props.navigation.navigate(auth.role == 'reader'?'ReaderMain':"WriterMain",{keyword:true,index:auth.role == 'reader'?1:2});
  }

  // === delete ===
  handleDelete=(item,index)=>{
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.DELETE_KEYWORDS,id:item.id,token:auth.token})
  }

  //==== clieck ====
  handleClick=(item)=>{
    this.setState({
      searchKey: item.keywords,
      isSearchActive: false
    })
  }

  handleEdit = (item) => {
    this.setState({
      searchKey:item.text,
      selectedid:item.id
    })
  }

  //=== search ===
  searchText=(text)=>{
   let  backArr = this.state.backArray;
   let data =this.state.initialData;
   let searchText = text;
   this.setState({
      searchKey: text
   })

  if(this.searchcontainer)
  {
    clearTimeout(this.searchcontainer);
  }

   this.searchcontainer = window.setTimeout(()=>{
     let {auth} = this.props;
     StoryService.get_keyword_search(text).then(result=>{
      this.setState({
        initialData:result.data.data,
        isSearchActive:true
      })
     })
   })
    // if(searchText.length>3){
    //   searchText = searchText.trim().toLowerCase();
    //   data = data.filter(l => {
    //     return l.name.toLowerCase().match( searchText );
    //   });
    //   this.setState({
    //     initialData: data,
    //     isSearchActive: true,
    //   })
    // }else{
    //   this.setState({
    //     initialData: backArr,
    //   })
    // }
  }


  render() {
    let {
      firstDataArr,
      isSearchActive,
      initialData,
      searchKey,
      helpArr
    } = this.state

    let {auth,keywords} = this.props;
    console.log(this.state.selectedid);
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
                  Preferred Books
                </Text>
              </View>
              <View/>
            </View>
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            <LinearGradient 
              start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
              style={styles.gradientStyle2}
              colors={[colors.borderColor,colors.inputGradient]}>
              <View style={styles.rowContainer}>
                <View style={styles.inputField}>
                  <TextInput
                    underlineColorAndroid={'transparent'}
                    placeholder={'Add here'}
                    placeholderTextColor={colors.grayColor}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    blurOnSubmit={false}
                    returnKeyType={'done'}
                    value={searchKey}
                    onSubmitEditing={()=>{
                        Keyboard.dismiss();
                        this.setState({
                        isSearchActive: false
                      })
                    }}
                    onChangeText={(val)=>{this.searchText(val)}}
                    style={styles.inputStyle}/> 
                </View>
                <TouchableOpacity 
                  onPress={()=>{this.handleAdd()}}
                  style={styles.plusStyle}>
                  <Image
                    style={styles.imageStyle}
                    source={require('../../assets/icons/plusIcon.png')}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            {isSearchActive&&
              <View style={styles.dropDownContainer}>
                <FlatList
                  data={initialData}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  extraData={this.state.initialData}
                  renderItem={({ item, index }) => {
                    const _that = this;
                    return ( 
                      <TouchableOpacity
                        onPress={()=>{this.handleClick(item)}} 
                        style={styles.dropDown}>
                        <Text style={styles.dropText}>
                          {item.keywords}
                        </Text>
                      </TouchableOpacity>
                    )
                  }}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            }
            {/* === heading Text === */}
            <View style={styles.headingView}>
              <Text style={styles.headingText}>
                What Kind of books do you like to read? 
              </Text>
            </View>
            {/* //=== List === */}
            <View style={styles.listContainer}>
              {keywords && keywords.length>0 && keywords.map((item,index)=>
                {return(
                  <View style={this.state.selectedid == item.id?styles.rowContainer3:styles.rowContainer2}>
                    <View>
                      <Text style={styles.optionText}>
                        {item.text}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={()=>{this.handleEdit(item)}} 
                      activeOpacity={0.8}
                      style={styles.iconsStyles}>
                      <Image
                        source={require('../../assets/icons/editIcon.png')}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>{this.handleDelete(item)}} 
                      activeOpacity={0.8}
                      style={styles.iconsStyles2}>
                      <Image
                        source={require('../../assets/icons/closeIcon.png')}
                        style={styles.imageStyle}
                      />
                    </TouchableOpacity>
                  </View>
                )})
              }
            </View>
            {/* //=== submit === */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.handleSubmit} 
              style={styles.submitButton}>
              <Text style={styles.submitText}>
                LET'S GET STARTED
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth,
  keywords:state.content.keywords
})

//===  make components available outside ===
export default connect(mapstatetoprops)(PreferredBooksScreen);