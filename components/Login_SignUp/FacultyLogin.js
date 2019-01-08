import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Picker
} from 'react-native';
import { Button, Card, Input, InputForm, Spinner, InputPicker } from '../common';
import MainScreen from '../Screens/MainScreen';
import firebase from 'firebase';

export default class FacultyLogin extends Component {
  state = { setup: false, email:'',password:'',username: '', sem:'1', section:'', branch:'computer_science', error:'' };

  static navigationOptions = {
    header: null,
  };

  forgotPassword(){
    firebase.auth()
    .sendPasswordResetEmail(this.state.email)
    .then(()=>{
      ToastAndroid.show("Password Reset Link is sent your mail", ToastAndroid.LONG)
    })
    .catch(() => {
      //Function Binding is very necessary in JS as onLoginFail is not bound to the class
      ToastAndroid.show('Please Enter your Email', ToastAndroid.SHORT);
    });
  }

  LoginFaculty(){
    const { navigate } = this.props.navigation;
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        navigate('MainScreen', { screen: 'MainScreen' });
      })
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        this.setState({ error: 'Fail' });
      });
  }

  SignUpFaculty(){
    const { navigate } = this.props.navigation;
    if(this.state.branch!='computer_science')
    {
      ToastAndroid.show('App not available for other branches currently', ToastAndroid.SHORT);
    }
    else
    {
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        
            const uid = firebase.auth().currentUser.uid
            firebase.database().ref().child('users').child(uid).set({
             email: this.state.email,
             infoSetup: true,
             username: this.state.username,
             branch: this.state.branch,
             faculty: true
            },()=>{
              firebase.database().ref(`branch/${this.state.branch}/faculties/${this.state.username}`).set({
                uid:uid
              })
            })
            
          
      })
      .then(()=>{navigate('SignUpForm', { screen: 'SignUpForm' })})
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        this.setState({ error: 'Fail' });
      });
    }
  }
  createaccount(){
    this.setState({setup:true})
  }


  renderScreens() {
    switch (this.state.setup) {
      case true:
        return (
          <View style={{flex:1, backgroundColor:'#fff', alignItems: 'center', justifyContent:'space-around'}}>
          <View style={{height:'40%',width:'100%', alignItems:'center', justifyContent:'center'}}>
          <ImageBackground source={require('../../Resources/Images/gradien2.jpg')} style={{height:'100%',width:'100%', alignItems:'center', justifyContent:'center'}} >
              <Image source={require('../../Resources/Images/dsce_logo.png')} style={{width:100, height:100}} />
              <Text style={{fontSize:36, color:'#fff'}}>Dsce App</Text>
              <Text style={{fontSize:22, color:'#fff'}}>Faculty Login</Text>
          </ImageBackground>
          </View>

          <ScrollView style={{flex:1}}>

          <InputForm
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              label="Email"
            />

            <InputForm
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry={true}
              label="Password"
            />
            
            <InputForm
              onChangeText={username => this.setState({ username: username })}
              value={this.state.username}
              label="FullName"
            />
            <InputPicker
              pick = {this.state.branch}
              onValueChange= {(itemValue, itemIndex) => this.setState({branch: itemValue})}
              label="Branch">
              <Picker.Item label="Computer Science" value="computer_science" />
              <Picker.Item label="Information Science" value="information_science" />
              <Picker.Item label="Civi Engineering" value="civil_engg" />
              <Picker.Item label="Mechanincal Engineering" value="mech_engg" />
              <Picker.Item label="Electronics and Communication" value="ec_engg" />
            </InputPicker>

            <Button
        btpress={this.SignUpFaculty.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>SignUp</Text>}
      </Button>
      
            </ScrollView>
            
          </View>
        );
      case false:
        return (
          
          <View style={{ flex: 1 , backgroundColor:'#fff', alignItems: 'center', justifyContent:'space-around'}}>
          <ImageBackground source={require('../../Resources/Images/gradien2.jpg')} style={{flex :2,width:'100%', alignItems:'center', justifyContent:'center'}} >
          <Image source={require('../../Resources/Images/dsce_logo.png')} style={{width:100, height:100}} />          
              <Text style={{fontSize:36, color:'#fff'}}>Dsce App</Text>
              <Text style={{fontSize:22, color:'#fff'}}>Faculty Login</Text>
          </ImageBackground>

          <View  style={{ flex: 3 , backgroundColor:'#fff', alignItems: 'center', marginTop:30}}>
            
            <InputForm
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              label="Email"
            />

            <InputForm
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              label="Password"
              secureTextEntry={true}
            />
          <View style={{flexDirection:'row'}}>
            <Button
        btpress={this.LoginFaculty.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>Login</Text>}
      </Button>
      <Button
        btpress={this.createaccount.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>SignUp</Text>}
      </Button>
      
      </View>
      <Button
        btpress={this.forgotPassword.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#000000',
          color: '#ffffff',
          elevation: 12,
          marginTop:40
        }}>
        {<Text style={{ color: '#fff' }}>Forgot Password</Text>}
      </Button>
      
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