import React, { Component } from 'react';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import Navigations from './src/navigations';
import { enableScreens } from 'react-native-screens';
enableScreens()

const store = configureStore();
console.disableYellowBox = true;
//=== main ===
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigations/>
      </Provider>
    );
  }
}

//===  make components available outside ===
export default App;