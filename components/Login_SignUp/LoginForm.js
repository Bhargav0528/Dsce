import React, { Component } from 'react';
import { View, Image, Text, ImageBackground,TextInput, StyleSheet,PixelRatio, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native';
import { CardSection, Button, Card, Input, Spinner } from '../common';
import MainScreen from '../Screens/MainScreen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import firebase from 'firebase';
export default class LoginForm extends Component {
  state = { loginPress: true, email: '', password: '', backgroundColor:'', gestureName: 'none', usn:'', loginSpinner:false };
  f = 1;
  constructor(props) {
    super(props);
    this.f = PixelRatio.getFontScale()
  }

  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };
  
  /** Main Render Method */
  render() {
    console.log("State:",this.state)
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return ( 
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
      <ImageBackground
        source={require('../../Resources/Images/background_text5.png')}
        style={
          {
            flex:1,
            width: null,
        height: null,
        alignItems: 'center'
        }}>
        <View style={{flex:2}}>
          <Image
          source={require('../../Resources/Images/blackhat1.png')}
          style={{
            height: '60%',
            width: 200,
            marginTop: 60,
            marginBottom: 40,
            resizeMode:'contain',
          }}
        />
        </View>
        
        <View style={{flex:3,alignItems:'center'}}>
        <Card
          style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            flex:3
          }}>
          <Card
            style={{
              shadowRadius: 2,    
              shadowOffset: { width: 12, height: 12 },
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#fff',
              elevation: 12,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
              }}>
              <Button btpress={this.loginbtnPress.bind(this)}>
                <Text>Login</Text>
              </Button>
              {this.renderUnderlineLogin()}
              
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
              }}>
              <Button btpress={this.signupbtnPress.bind(this)}>
                SignUp
              </Button>
              {this.renderUnderlineSignUp()}
            </View>
          </Card>
          <View style={{ alignItems:'center' }}>
          <CardSection >
            {this.renderTabs()}
          </CardSection>
          </View>
          
        </Card>
        </View>
      </ImageBackground>
      </GestureRecognizer>
    );
  }

  



  loginbtnPress() {
    this.setState({ loginPress: true, email: '', password: '' });
  }

  signupbtnPress() {
    this.setState({ loginPress: false, email: '', password: '' });
  }

  //Firebase methods
  firebaseSignUp() {
    const { navigate } = this.props.navigation;
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
            const usn_upper = this.state.usn.toUpperCase()
            const uid = firebase.auth().currentUser.uid
            firebase.database().ref().child('users').child(uid).set({
             email: this.state.email,
             infoSetup: false,
             usn: usn_upper
            })
            
          
      })
      .then(()=>{navigate('SignUpForm', { screen: 'SignUpForm' })})
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      });
  }
  firebaseSignIn() {
    const { navigate } = this.props.navigation;

    this.setState({loginSpinner:true}, ()=>{

    },
    firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate('MainScreen', { screen: 'MainScreen' });
      })
      .catch(() => {
        //Function Binding is very necessary in JS as onLoginFail is not bound to the class
        ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        this.setState({loginSpinner:false})
      }))
    
  }
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

  //Buttons for Signin  and SignUp

  renderButtonSignUp() {
    return (
      <Button
        btpress={this.firebaseSignUp.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 6,
        }}>
        {<Text style={{ color: '#000', width:this.f*100 }}>SignUp</Text>}
      </Button>
    );
  }
  renderButtonSignIn() {
    if(this.state.loginSpinner==false)
    {
    return (
      <View style={{flexDirection:'row'}}>
      <Button
        btpress={this.firebaseSignIn.bind(this)}
        style={{
          borderRadius: 20,
          borderWidth: 2,
          borderColor: '#000',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 6,
        }}>
        {<Text style={{ color: '#000', width:100 }}>Login</Text>}
      </Button>
      </View>
    )
    }
    else{
      return (
        <View style={{flexDirection:'row'}}>
        <Spinner />
      </View>
      )  
    }
    
  }

  // Login and Signup Tabs
  renderTabs() {
    if (this.state.loginPress) {
      return (
        <View>
        <View>
          <Card
            style={{
              borderRadius: 20,
              elevation: 8,
              justifyContent:'space-between',
              borderWidth: 1,
              borderColor: '#fff',
            }}>
            <Image
            source={require('../../Resources/Images/email.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 }}
              />

              <Input
              style={{borderRadius: 20}}
              placeholder="Email"
              onChangeText={email => this.setState({ email: email })}
              value={this.state.email}
              
            />
            
            
          </Card>
          <Card
            style={{
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#fff',
              elevation: 8,
              justifyContent:'space-between'
            }}>
            <Image
            source={require('../../Resources/Images/password.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 }}
          />
            
            <Input
              style={{borderRadius: 20}}
              placeholder="Password"
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry={true}
            />
          </Card>
          
       

        </View>
        
          
          <CardSection style={{ justifyContent: 'center' }}>
            {this.renderButtonSignIn()}
          </CardSection>

          <View style={{flexDirection:'row',marginTop:7,alignItems:'center', justifyContent:'space-around'}}>
           
           <Button
                btpress={()=>{ this.props.navigation.navigate('FacultyLogin', {screen:'FacultyLogin'}) }}
                style={{
                borderRadius: 20,
                borderWidth: 2,
                paddingLeft:7,
                paddingRight:7,
                borderColor: '#000',
                backgroundColor: '#fff',
                color: '#ffffff',
                elevation: 6,
              }}>
        {<Text style={{ color: '#000' }}>Faculty Login </Text>}
      </Button>
         
          
           <Button
                btpress={this.forgotPassword.bind(this)}
                style={{
                borderRadius: 20,
                borderWidth: 2,
                paddingLeft:5,
                paddingRight:5,
                borderColor: '#000',
                backgroundColor: '#fff',
                color: '#ffffff',
                elevation: 6,
              }}>
        {<Text style={{ color: '#000' }}>Forgot Password</Text>}
      </Button>
          </View>
        </View>
      );
    }
    return (
      <View style={{ alignItems:'center' }}> 
      <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
            justifyContent:'space-between'
          }}>
          <Image
            source={require('../../Resources/Images/user.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 }}
          />
          <Input
            style={{borderRadius: 20}}
            placeholder="USN"
            onChangeText={usn => this.setState({ usn: usn })}
            value={this.state.usn}
          />
        </Card>
        <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
          }}>
          <Image
            source={require('../../Resources/Images/email.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 }}
          />
          <Input
            style={{borderRadius: 20}}
            placeholder="Email"
            onChangeText={email => this.setState({ email: email })}
            value={this.state.email}
          />
        </Card>
        <Card
          style={{
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            elevation: 8,
            justifyContent:'space-between'
          }}>
          <Image
            source={require('../../Resources/Images/password.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 }}
          />
          <Input
            style={{borderRadius: 20}}
            placeholder="Password"
            onChangeText={password => this.setState({ password: password })}
            value={this.state.password}
            secureTextEntry={true}
          />
        </Card>
        <CardSection style={{ alignItems: 'center' }}>
          {this.renderButtonSignUp()}
        </CardSection>
      </View>
    );
  }

  //Under Line for Tabs

  renderUnderlineLogin() {
    if (this.state.loginPress) {
      return (
        <View style={{ backgroundColor: '#393939', width: 100, height: 5 }} />
      );
    }

    return <View />;
  }
  renderUnderlineSignUp() {
    if (!this.state.loginPress) {
      return (
        <View style={{ backgroundColor: '#393939', width: 100, height: 5 }} />
      );
    }
    return <View />;
  }

 
  onSwipeLeft(gestureState) {
    this.setState({loginPress: false});
  }
 
  onSwipeRight(gestureState) {
    this.setState({loginPress: true});
  }


  
}