import React, { Component } from 'react';
import { 
  View,
  Image,
  ImageBackground,
  BackHandler,
  SafeAreaView,
  StatusBar,
} from 'react-native';
//=== style ==
import styles from './styles';
import { colors } from 'react-native-elements';
//=== screen ===
class SplashScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      auth: '',
    }
  }

  //=== mount ===
  componentDidMount(){
    this.checkAuth();
  }

  //=== checkauth ===
  checkAuth=()=>{
    setTimeout(() => {
      this.props.navigation.navigate('Login')
    }, 2000);
  }

  render() {
    let {
      auth
    } = this.state;
    return (
        <View style={styles.screenContainer}>
          <StatusBar 
            backgroundColor={'transparent'} 
            barStyle="light-content"
            translucent={true}
          />
          {/* === logo image === */}
          <ImageBackground
            source={require('../../assets/images/Splash1.png')} 
            style={styles.mainContainer}>
            <View style={styles.logoImage}>
              <Image
                style={styles.imageStyle}
                source={require('../../assets/images/logo.png')}
              />
            </View>
          </ImageBackground>
        </View>
    );
  }
}

//===  make components available outside ===
export default SplashScreen;