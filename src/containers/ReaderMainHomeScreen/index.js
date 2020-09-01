import React, { Component } from 'react';
import { 
  View,
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

//=== style ==
import styles from './styles';
//=== side bar ===
import ScalingDrawer from 'react-native-scaling-drawer';
import SideBar from '../../components/SideBar';
import WriterSideBar from '../../components/WriterSideBar';
//=== tab bar ===
import { TabView} from 'react-native-tab-view';
import HomeScreen from '../HomeScreen';
import SearchScreen from '../SearchScreen';
import MyBookScreen from '../MyBookScreen';
import MyProfileScreen from '../MyProfileScreen';
import {connect} from 'react-redux';

//=== screen ===
class ReaderMainHomeScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      index: props.route.params? props.route.params.index : 0,
      routes: [
        { key: 'home', title: 'Home' },
        { key: 'search', title: 'Search' },
        { key: 'book', title: 'Book' },
        { key: 'user', title: 'User' },
      ],
      category:props.route.params
    }
  }

  componentWillReceiveProps(props)
  {
    let index = props.route.params?props.route.params.index:0;

    if(index)
    {
      this.setState({
        index:index,
        category:props.route.params
      })
    }
    
  }

  //=== tab Bar ===
  renderTabBarComponent=(props)=>{
    let activeIndex = props.navigationState.index;
    return(
      <View style={styles.tabBarContainer}>
        {/* //=== home === */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 0,
            category:{}
          })
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===0? 
              require('../../assets/icons/atabHome.png')
              : require('../../assets/icons/tabHome.png')
            }
          />
        </TouchableOpacity>
        {/* //=== Search === */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 1,
            category:{}
          })
          //this._drawer.close()
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===1? 
              require('../../assets/icons/atabSearch.png')
              : require('../../assets/icons/tabSearch.png')
            }
          />
        </TouchableOpacity>
        {/* //=== book === */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 2,
            category:{}
          })
          //this._drawer.close()
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===2? 
              require('../../assets/icons/atabBook.png')
              : require('../../assets/icons/tabBook.png')
            }
          />
        </TouchableOpacity>
        {/* //=== User === */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 3,
            category:{}
          })
          //this._drawer.close()
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===3? 
              require('../../assets/icons/atabUser.png')
              : require('../../assets/icons/tabUser.png')
            }
          />
        </TouchableOpacity>
        {/* <SafeAreaView/> */}
      </View>
    )
  }

  render() {
    let {
      index,
      routes
    } = this.state;

    let {auth} = this.props;
    return (
      // === side bar ===
      <ScalingDrawer 
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        style={{paddingBottom:80}}
        ref={ref => this._drawer = ref}
        content={auth.role == 'reader'?<SideBar navigation={this.props.navigation}/>:<WriterSideBar navigation={this.props.navigation}></WriterSideBar>}
      >
        {/* === tab bar === */}
        <TabView
          tabBarPosition='bottom'
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderTabBar={this.renderTabBarComponent}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'home':
                return <HomeScreen 
                        drawer={this._drawer}
                        settab={(index)=>this.setState({index:index})}
                        navigation={this.props.navigation} />;
              case 'search':
                return <SearchScreen 
                          drawer={this._drawer}
                          category={this.state.category}
                          navigation={this.props.navigation} />;
                case 'book':
                return <MyBookScreen 
                          drawer={this._drawer}
                          navigation={this.props.navigation} />;
                case 'user':
                return <MyProfileScreen 
                        drawer={this._drawer}
                        navigation={this.props.navigation} />;
              default:
                return <HomeScreen 
                          drawer={this._drawer} 
                          navigation={this.props.navigation} />;
            }}}
        />
      </ScalingDrawer>
    );
  }
}

const mapstatetoprops = (state) => ({
  auth:state.auth
})

//===  make components available outside ===
export default connect(mapstatetoprops)(ReaderMainHomeScreen);