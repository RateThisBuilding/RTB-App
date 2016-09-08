import React, { Component } from 'react';
import { AppRegistry, Navigator, ListView, Text, View } from 'react-native';

import Main from './src/main';

class MyApp extends Component {
  render() {
  return (
    <Main />
  );
}
}

// App registration and rendering
AppRegistry.registerComponent('RateThisBuilding', () => Main);
