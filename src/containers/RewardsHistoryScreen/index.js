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
//=== style ==
import styles from './styles';
import colors from '../../utils/colors';
import {rewardHistory} from './data';
import {connect} from 'react-redux';

class RewardsHistoryScreen extends  Component{
  constructor(props){
    super(props)
    this.state={
      point: 50,
      isActive: false,
    }
  }

  calcearned = () => {
    let {auth} = this.props;
    let sum = 0;
    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == 'Earned')
      {
        sum += Number(auth.rewards[item].rewards);
      }
    }

    return sum;
  }

  calcburned = () => {
    let {auth} = this.props;
    let sum = 0;
    for(let item in auth.rewards)
    {
      if(auth.rewards[item].type == 'Burned')
      {
        sum += Number(auth.rewards[item].rewards);
      }
    }

    return sum;
  }

  render() {
    let {
      name,
      point,
      isActive,
    } = this.state

    let {auth} = this.props;
    return (
      <ScrollView 
        bounces={false}
        style={styles.screenContainer}
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
            source={require('../../assets/images/reward-bg.png')}>
            <SafeAreaView />
            <View
              style={styles.headerContainer} >
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backIcon}
                onPress={()=>{this.props.navigation.pop()}}
              >
                <Image
                  style={styles.imageStyle}
                  source={require('../../assets/icons/backArrow.png')}
                />
              </TouchableOpacity>
              <View>
                <Text style={styles.headerText}>
                  Rewards History
                </Text>
              </View>

              <View/>
            </View>
          </ImageBackground>
            {/* === main content === */}
          <View style={styles.mainContainer}>
            {/* //===details count === */}
            <View style={[styles.rowContainer2,styles.boxStyle]}>
              <View>
                {/* //===head count === */}
                <View>
                  <Text style={styles.descTxt}>
                    Total earned
                  </Text>
                </View>
                {/* //===count === */}
                <View style={styles.alineCenter}>
                  <Text style={styles.pointTxt}>
                    {this.calcearned()}
                  </Text>
                </View>
              </View>
              {/* //=== dollar === */}
              <View style={styles.secondColoumn}>
                {/* //===head count === */}
                <View>
                  <Text style={styles.descTxt}>
                    Total burned
                  </Text>
                </View>
                {/* //===count === */}
                <View style={styles.alineCenter}>
                  <Text style={styles.pointTxt}>
                    {this.calcburned()}
                  </Text>
                </View>
              </View>
            </View>

            {/* //==== details about reading === */}
            <View style={{...styles.rowContainer,marginTop: 20}}>
              <View style={styles.customWidth}>
                <Text style={styles.headTxt}>
                  Earned
                </Text>
              </View>
              <View style={styles.customWidth2}>
                <Text style={styles.headTxt}>
                  No. of Pages
                </Text>
              </View>
              <View style={styles.customWidth3}>
                <Text style={styles.headTxt}>
                  Points
                </Text>
              </View>
            </View>
            {/* // ====Read book ===  */}
            <View style={{flex: 1,marginTop:10}}>
              <FlatList
                data={auth.rewards}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                extraData={this.state}
                renderItem={({ item, index }) => {
                  const _that = this;
                  return ( 
                    <View style={{...styles.rowContainer,marginTop: 10}}>
                      <View style={[styles.rowContainer2,styles.customWidth]}>
                        <View>
                          <Text numberOfLines={1} style={styles.opTxt}>
                            Read {item.content_type} :   
                          </Text>
                        </View>
                        <View style={styles.opt2View}>
                          <Text numberOfLines={1} style={styles.opTxt2}>
                            "{item.comment}"
                          </Text>
                        </View>
                      </View>
                      <View style={styles.customWidth2}>
                        <Text style={styles.opTxt}>
                          {item.page}
                        </Text>
                      </View>
                      <View style={styles.customWidth3}>
                        <Text style={styles.opTxt}>
                          {item.rewards}
                        </Text>
                      </View>
                    </View>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(RewardsHistoryScreen);