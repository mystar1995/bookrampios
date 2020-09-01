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
  FlatList,
  Dimensions
} from 'react-native';

import {connect} from 'react-redux';

import {noficationData} from './data';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
import config from '../../config/config';
import * as actiontype from '../../constant/action-type';
//=== screen ===
class NotificationScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      noficationData: noficationData,
    }
  }

  selectbook = (id,contentid) => {
    const {dispatch,auth} = this.props;
    dispatch({type:actiontype.READ_NOTIFICATION,id:id,token:auth.token});
    dispatch({type:actiontype.SELECT_BOOK_INFO,id:contentid,token:auth.token,next:this.next})
  }

  next = () => {
    this.props.navigation.navigate('BookDetails');
  }

  render() {
    let {
      noficationData,
    } = this.state;

    let {notification,auth} = this.props;
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
            resizeMode='stretch'
            style={styles.headerContainer2} 
            source={require('../../assets/images/notification-bg.png')}>
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
                <Text style={styles.headingText}>
                  Notification
                </Text>
              </View>
              
              <View/>
            </View>
            </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            <FlatList
              data={notification}
              bounces={false}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={()=>{return(<View style={styles.separatorStyle}/>)}}
              extraData={this.state}
              renderItem={({item,index}) =>{
                const _that = this;
              return(
              item.type==='books'?
                <TouchableOpacity
                  // onPress={()=>{
                  //   this.setState({
                  //   language: 'ar',
                  // })}}
                  onPress={()=>this.selectbook(item.id,item.content_id)}
                  activeOpacity={0.9}
                  style={styles.rowContainer}
                  >
                  <View style={styles.rowContainer2}>
                    <View style={styles.bookView}>
                      <Image
                        source={{uri:config.fileurl + item.image}}
                        style={styles.imageStyle}
                      />
                    </View>

                    <View style={styles.textViewRow1}>
                      <View style={styles.rowContainer2}>
                        <View>
                          <Text style={styles.optionText}>
                            {item.noty_type}
                          </Text>
                        </View>
                        <View style={styles.textViewRow2}>
                          <Text style={styles.optionText2}>
                            {item.comment}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.text2View}>
                        <Text style={styles.timeText}>
                          {item.created_at}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              : 
                <TouchableOpacity
                  activeOpacity={0.9}
                  // onPress={()=>{
                  //   this.setState({
                  //   language: 'ar',
                  // })}}
                  style={styles.rowContainer}
                  >
                  <View style={styles.rowContainer2}>
                    <View style={styles.circleView}>
                      <Image
                        source={{uri:config.fileurl + item.image}}
                        style={styles.imageStyle}
                      />
                    </View>
                    <View style={styles.textViewRow1}>
                      <View style={styles.rowContainer2}>
                        <View>
                          <Text style={styles.optionText}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={styles.textViewRow2}>
                          <Text style={styles.optionText2}>
                            {item.comment}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.text2View}>
                        <Text style={styles.timeText}>
                          {item.created_at}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
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
  notification:state.notification,
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(NotificationScreen);