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
import {firstData} from './data';
//=== submission ===
import Submission from '../../components/Submission';
//=== draft ===
import Draft from '../../components/Draft';
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import Modal from 'react-native-modal';

class WriterDraftScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      firstdata: firstData,
      isActiveTab: props.activeTab?props.activeTab:1,
      isModalOpen:false
    }
  }

  render() {
    let {
      firstdata,
      isActiveTab,
      isModalOpen
    } = this.state
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
                Dashboard
              </Text>
            </View>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.plusIcon}
              onPress={()=>{this.setState({isModalOpen: true})}}
            >
            <Image
              style={styles.imageStyle}
              source={require('../../assets/icons/plusCircle.png')}
            />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        {/* === main content === */}
        <View style={styles.mainContainer}>
          <View style={styles.topTabContainer}>
             {/* === draft === */}
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>this.setState({
                isActiveTab: 1,
              })}
              style={{
                ...styles.tabStyle,
                borderBottomColor: isActiveTab===1 ?colors.submitColor33 : colors.grayColor
              }}>
                <Text 
                  style={{
                    ...styles.tabText,
                    color: isActiveTab===1 ? colors.submitColor33 : colors.grayColor
                  }}>
                    My Submission
                </Text>
            </TouchableOpacity>
            {/* === draft === */}

            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>this.setState({
                isActiveTab: 2,
              })}
              style={{
                ...styles.tabStyle,
                borderBottomColor: isActiveTab===2 ?colors.submitColor33 : colors.grayColor
              }}>
                <Text 
                  style={{
                    ...styles.tabText,
                    color: isActiveTab===2 ? colors.submitColor33 : colors.grayColor
                  }}>
                    My Draft
                </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {isActiveTab===2 ?
                <Draft firstData={firstData} navigation={this.props.navigation}/>
              : 
                <Submission firstData={firstData}/>
            }
          </View>
        </View>

        <Modal 
          isVisible={isModalOpen}
          onBackdropPress={()=>this.setState({
            isModalOpen: false,
          })}
          backdropColor={colors.circleColor}
          backdropOpacity={0.7}
        >
          {/* ===  Write a new book === */}
          <View style={styles.viewContainer}>
            <TouchableOpacity
              onPress={()=>{
                this.setState({
                  isModalOpen: false,
                })
                this.props.navigation.navigate('WriteNewStory')
              }}
              activeOpacity={0.8} 
              style={styles.modalButton}>
              <Text style={styles.modalText}>
                Write a new book
              </Text>
            </TouchableOpacity>
            {/* //==== Upload a book === */}
            <TouchableOpacity
              onPress={()=>{
                this.setState({
                  isModalOpen: false,
                })
                this.props.navigation.navigate('NewStory')
              }}
              activeOpacity={0.8} 
              style={{...styles.modalButton,borderBottomWidth: 0,}}>
              <Text style={styles.modalText}>
                Upload a book
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

//===  make components available outside ===
export default WriterDraftScreen;