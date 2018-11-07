import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  BackHandler,
  ImageBackground
} from 'react-native';
import firebase from 'firebase';
import PinchZoomView from 'react-native-pinch-zoom-view';
//import ViewEditor from 'react-native-view-editor';


export default class ImageViewer extends Component{

  state = {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png'}
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}
  render()
  {
    const uri = this.props.navigation.getParam('uri','No-uri');
    console.log("State:",this.state.uri)
    return(
      <ImageBackground
        source={require('../../Resources/Images/background_white.jpg')}
        style={{width: '100%',
        height: '100%',
        alignItems: 'center'
        }}>
      <PinchZoomView >
        <Image
          style={{flex: 1,
    width: 300,
    height: 300,
    resizeMode: 'contain'}} 
          source={{uri: uri}}
        />
      </PinchZoomView>
      </ImageBackground>
      );
  }
}