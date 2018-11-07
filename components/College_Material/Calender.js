import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  BackHandler,
  ImageBackground,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import PinchZoomView from 'react-native-pinch-zoom-view';
//import ViewEditor from 'react-native-view-editor';


export default class Calender extends Component{
  static navigationOptions = {
    header: null,
  };
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
componentDidMount(){
    firebase.database().ref().child('calender').child('url').on('value', (snapshot)=>{this.setState({uri:snapshot.val()})});
  }
handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}
  render()
  {

    return(
      <ImageBackground
        source={require('../../Resources/Images/background_pat.jpg')}
        style={{width: '100%',
        height: '100%',
        alignItems: 'center'
        }}>
        
      <PinchZoomView style={{flex:1}}>
        <Image
        resizeMode="contain"
          style={{flex:1, width:500, height:500}} 
          source={{uri: this.state.uri}}
        />
      </PinchZoomView>
      </ImageBackground>

      );
  }
}