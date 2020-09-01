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
import WriterSideBar from '../../components/WriterSideBar';
//=== tab bar ===
import { TabView} from 'react-native-tab-view';
import WriterHomeScreen from '../WriterHomeScreen';
import SearchScreen from '../SearchScreen';
import WriterDraftScreen from '../WriterDraftScreen';
import MyProfileScreen from '../MyProfileScreen';

//=== screen ===
class WriterDashboardScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      index: props.route.params? props.route.params.index : 0,
      activeTab: props.route.params? props.route.params.activeTab : 1,
      routes: [
        { key: 'writerHome', title: 'WriterHome' },
        { key: 'dashboard', title: 'dashboard'},
        { key: 'search', title: 'Search' },
        { key: 'user', title: 'User' },
      ]
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
        {/* //=== book === */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 1,
          })
          //this._drawer.close()
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===1? 
              require('../../assets/icons/edit-icon-active.png')
              : require('../../assets/icons/edit-icon.png')
            }
          />
        </TouchableOpacity>
        {/* //=== Search === */}
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 2,
          })
          //this._drawer.close()
        }}
          style={styles.iconsStyle}>
          <Image
            style={styles.imageStyle}
            source={activeIndex===2? 
              require('../../assets/icons/atabSearch.png')
              : require('../../assets/icons/tabSearch.png')
            }
          />
        </TouchableOpacity>
        {/* //=== User === */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=>{this.setState({
            index: 3,
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
      routes,
      activeTab
    } = this.state;
    return (
      // === side bar ===
      <ScalingDrawer 
        tapToClose={true}
        minimizeFactor={0.5}
        swipeOffset={10}
        scalingFactor={0.8}
        ref={ref => this._drawer = ref}
        content={<WriterSideBar navigation={this.props.navigation}/>}
      >
        {/* === tab bar === */}
        <TabView
          tabBarPosition='bottom'
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderTabBar={this.renderTabBarComponent}
          renderScene={({ route }) => {
            switch (route.key) {
              case 'writerHome':
                return <WriterHomeScreen 
                        drawer={this._drawer}
                        navigation={this.props.navigation} />;
              case 'search':
                return <SearchScreen 
                          drawer={this._drawer}
                          navigation={this.props.navigation} />;
                case 'dashboard':
                return <WriterDraftScreen 
                          drawer={this._drawer}
                          activeTab={activeTab}
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

//===  make components available outside ===
export default WriterMainHomeScreen;