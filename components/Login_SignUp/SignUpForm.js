import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Picker,
  ToastAndroid
} from 'react-native';
import { Button, Card, Input, InputForm, Spinner, InputPicker } from '../common';
import MainScreen from '../Screens/MainScreen';
import firebase from 'firebase';


//TODO --------> Change name of the app , branch changes



export default class SignUpForm extends Component {
  state = { setup: null, username: '', sem:'1', section:'', branch:'computer_science' };
  componentWillMount() {
    firebase
      .database()
      .ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .child('infoSetup')
      .on('value', snapshot => {
        this.setState({ setup: snapshot.val() });
      });
  }

  validateInfo(){
    console.log
    if(this.state.branch!='computer_science')
    {
      ToastAndroid.show('App not available for other branches currently', ToastAndroid.SHORT);
    }
    else{
    firebase
      .database()
      .ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .on('value', snapshot => {
         firebase
      .database()
      .ref()
      .child('users')
      .child(firebase.auth().currentUser.uid)
      .set({
        usn:snapshot.val().usn,
        email:snapshot.val().email,
        username:this.state.username,
        branch:this.state.branch,
        sem:this.state.sem,
        section:this.state.section,
        infoSetup:true,
        faculty: false
      })})
    }
  }

  gotoHome(){
    firebase.auth().signOut()
  .then(function() {
    this.props.navigation.navigate('LoginForm',{screen:'LoginForm'})
  })
  .catch(function(error) {
    // An error happened
  })
  }


  renderScreens() {
    switch (this.state.setup) {
      case null:
        return <Spinner />;
      case true:
        return <MainScreen />;
      case false:
        return (
          
          <View style={{ flex: 1 , backgroundColor:'#fff', alignItems: 'center', justifyContent:'space-around'}}>
          <ImageBackground source={require('../../Resources/Images/gradien2.jpg')} style={{flex :2,width:'100%', alignItems:'center', justifyContent:'center'}} >
              <Image source={require('../../Resources/Images/dsce_logo.png')} style={{width:100, height:100}} />
              <Text style={{fontSize:36, color:'#fff'}}>CAMPUS CONNECT</Text>
              <View style={{alignItems:'center'}}>
              <Text style={{fontSize:16, color:'#fff'}}>Event Alerts, Timetable and Notes</Text>
              </View>
          </ImageBackground>

          <View  style={{ flex: 3 , backgroundColor:'#fff', alignItems: 'center', marginTop:30}}>
            
            <InputForm
              onChangeText={username => this.setState({ username: username })}
              value={this.state.username}
              label="Username"
            />
            <InputPicker
              pick = {this.state.branch}
              onValueChange= {(itemValue, itemIndex) => this.setState({branch: itemValue})}
              label="Branch">
              <Picker.Item label="Computer Science" value="computer_science" />
            </InputPicker>

            <InputPicker
              pick = {this.state.sem}
              onValueChange= {(itemValue, itemIndex) => this.setState({sem: itemValue})}
              label="Semester">
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </InputPicker>



            <InputForm
              onChangeText={section => this.setState({ section: section })}
              value={this.state.section}
              label="Section"
            />

            

          <View style={{flexDirection:'row'}}>
            <Button
        btpress={this.validateInfo.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#FFE0B2',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#FFE0B2',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#272727' }}>Submit</Text>}
      </Button>
      <Button
        btpress={this.gotoHome.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#FFE0B2',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#FFE0B2',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#272727' }}>Go Back</Text>}
      </Button>
      </View>
            </View>
            
          </View>
        )
    }
  }

  render() {
    console.log(this.state);
    return <View style={{ flex: 1 }}>{this.renderScreens()}</View>;
  }
}