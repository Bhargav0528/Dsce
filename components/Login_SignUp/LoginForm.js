import React, { Component } from 'react';
import { View, Image, Text, ImageBackground,TextInput, Keyboard,PixelRatio,Dimensions, TouchableOpacity, ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { CardSection, Button, Card, Input, Spinner } from '../common';
import MainScreen from '../Screens/MainScreen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import firebase from 'firebase';
import LinearGradient from 'react-native-linear-gradient'
//TODO -----> All designs Done ( Color Changes if Required )



export default class LoginForm extends Component {
  state = { 
    loginPress: true, 
    email: '', 
    password: '', 
    backgroundColor:'', 
    gestureName: 'none', 
    usn:'', 
    loginSpinner:false, 
    usns:"" };
  f = 1;
  w = Dimensions.get('window').width;
  h = Dimensions.get('window').height;
  constructor(props) {
    super(props);
    this.f = PixelRatio.getFontScale()
  }

  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  componentDidMount() {
    firebase.database().ref().child('users').on('value', (snapshot)=>{
      
      usn_arr = []
      Object.values(snapshot.val()).map(user=>{
        if(user.usn!=null)
        usn_arr.push(user.usn)
      })
      console.log(usn_arr)
      this.setState({
       usns:usn_arr});
      });
    
    }
  
  
  /** Main Render Method */
  render() {
    console.log("State:",this.state)
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return ( 
      <KeyboardAwareView animated={true} style={{flex:1}}>
      <TouchableWithoutFeedback style={{width:'100%',height:'100%',backgroundColor: '#4857cb',flexDirection: 'column'}} 
                                                  onPress={Keyboard.dismiss}>
      <GestureRecognizer
        onSwipeLeft={(state) => this.onSwipeLeft(state)}
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
        
      <View
        style={
          {
            flex:1,
            width: null,
        height: null,
        alignItems: 'center'
        }}>
         <Image
          source={require('../../Resources/Images/logo_bggr.png')}
          style={{
            position:'absolute',
            top:0,
            left:0,
            height: this.h*0.40,
            width: this.w,
            borderBottomLeftRadius:this.w*0.35,
            borderBottomRightRadius:this.w*0.35,
            resizeMode:'cover'
          }}
        /> 

          <Image
          source={require('../../Resources/Images/Campusconnect_trans.png')}
          style={{
            height: this.h*0.40,
            width: this.w*0.80,
            marginBottom: 10,
            resizeMode:'cover'
          }}
        />
        
        <View style={{alignItems:'center', width:'85%', flex:1}}>
        <Card
          style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#fff',
            width:'100%',
            flex:1,
          }}>

<LinearGradient colors={['#F88111', '#FF9538']} start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 1 }} style={{height:55, width:'100%',borderRadius: 20,flexDirection:'row', marginBottom:10}} >
          

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
                flexDirection: 'column',
              }}>
              <Button style={{backgroundColor:'transparent', borderWidth:0}} btpress={this.loginbtnPress.bind(this)}>
                <Text style={{fontSize:18, fontFamily:'montserrat_eb'}}>Login</Text>
              </Button>
              {this.renderUnderlineLogin()}
              
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
              }}>
              <Button style={{backgroundColor:'transparent', borderWidth:0}} btpress={this.signupbtnPress.bind(this)}>
                <Text style={{fontSize:18}}>SignUp</Text>
              </Button>
              {this.renderUnderlineSignUp()}
            </View>
            
          </LinearGradient>
          <View style={{ alignItems:'center' }}>
          <View >
            {this.renderTabs()}
          </View>
          </View>
          
        </Card>
              
        {this.renderAdditionalButtons() }
        
        
        </View>
      </View>
      

      </GestureRecognizer>
      </TouchableWithoutFeedback>
      </KeyboardAwareView>
    );
  }

  
  renderAdditionalButtons()
  {
      if(this.state.loginPress)
      {
        return <View style={{flexDirection:'row',marginBottom:10,alignItems:'center', justifyContent:'space-around'}}>
           
           <TouchableOpacity activeOpacity = { .5 } style={{width:'60%', height:'100%', alignItems:'center'}} onPress={()=>{ this.props.navigation.navigate('FacultyLogin', {screen:'FacultyLogin'}) }}>
 
            <LinearGradient colors={['#F88111', '#FF9538']} start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 1 }} style={{
                height: 40,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 20,
                marginTop:10,
                width:'80%'
                }} >
 
                  <Text style={{ fontSize: 16,
                                textAlign: 'center',
                                margin: 7,
                                color : '#272727',
                                fontWeight: '600',
                                backgroundColor: 'transparent' }}> Faculty Login</Text>
                  
            </LinearGradient>
        
        </TouchableOpacity>
           
          
        <TouchableOpacity activeOpacity = { .5 } style={{width:'60%', height:'100%', alignItems:'center'}} onPress={()=>{ this.forgotPassword.bind(this) } }>
 
 <LinearGradient colors={['#F88111', '#FF9538']} start={{ x: 0, y: 1 }}
end={{ x: 1, y: 1 }} style={{
     height: 40,
     paddingLeft: 2,
     paddingRight: 2,
     borderRadius: 20,
     marginTop:10,
     width:'80%'
     }} >

       <Text style={{ fontSize: 16,
                     textAlign: 'center',
                     margin: 7,
                     color : '#272727',
                     fontWeight: '600',
                     backgroundColor: 'transparent' }}> Forgot Password</Text>
       
 </LinearGradient>

</TouchableOpacity>
          </View>

            }
  }


  loginbtnPress() {
    this.setState({ loginPress: true, email: '', password: '' });
  }

  signupbtnPress() {
    this.setState({ loginPress: false, email: '', password: '' });
  }

  usn_unique(usn_upper)
  {
    if(this.state.usns.includes(usn_upper))
    {
      return true;
    }
    else 
      return false;
  }

  //Firebase methods
  firebaseSignUp() {
    const { navigate } = this.props.navigation;

    if(this.state.usn=="")
    {
      ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
      return;
    }


    const usn_upper = this.state.usn.toUpperCase()

    

    is_usn_unique = this.usn_unique(usn_upper)
    
    if(!is_usn_unique){
    firebase.auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
            {
            const uid = firebase.auth().currentUser.uid
            firebase.database().ref().child('users').child(uid).set({
             email: this.state.email,
             infoSetup: false,
             usn: usn_upper
            },()=>{navigate('SignUpForm', { screen: 'SignUpForm' })})
            
          
          }
          
        })
        .catch(() => {
          //Function Binding is very necessary in JS as onLoginFail is not bound to the class
          ToastAndroid.show('Invalid Credentials', ToastAndroid.SHORT);
        });
      }
        else
        {
          ToastAndroid.show('Duplicate USN Found', ToastAndroid.SHORT);
        }
      
          
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
          borderColor: '#f5861f',
          paddingLeft: 30,
          paddingRight: 30,
          backgroundColor: '#f5861f',
          color: '#ffffff',
          elevation: 6,
          width:'90%'
        }}>
        {<Text style={{ color: '#fff', width:this.f*100 }}>SignUp</Text>}
      </Button>
    );
  }
  renderButtonSignIn() {
    if(this.state.loginSpinner==false)
    {
    return (
      
      <TouchableOpacity activeOpacity = { .5 } style={{width:'100%', height:'100%', alignItems:'center'}} onPress={this.firebaseSignIn.bind(this)}>
 
            <LinearGradient colors={['#F88111', '#FF9538']} start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 1 }} style={{
                height: 40,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 20,
                marginTop:10,
                elevation: 6,
                width:'80%'
                }} >
 
                  <Text style={{ fontSize: 18,
                                textAlign: 'center',
                                margin: 7,
                                color : '#fff',
                                fontWeight: '600',
                                backgroundColor: 'transparent' }}> Sign In</Text>
                  
            </LinearGradient>
        
        </TouchableOpacity>
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
        <View style={{flex:1}}>
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
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20,tintColor:'orange' }}
              />

              <Input

              style={{borderRadius: 20,width:'80%', alignItems:'center'}}
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
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20,tintColor:'orange'  }}
          />
            
            <Input
              style={{borderRadius: 20,width:'80%', alignItems:'center'}}
              placeholder="Password"
              onChangeText={password => this.setState({ password: password })}
              value={this.state.password}
              secureTextEntry={true}
            />
          </Card>
        </View>
        
          <View style={{ justifyContent: 'center', alignItems:'center' }}>
            {this.renderButtonSignIn()}
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
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20 ,tintColor:'orange'}}
          />
          <Input
            style={{borderRadius: 20, width:'80%', alignItems:'center'}}
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
            justifyContent:'space-between'
          }}>
          <Image
            source={require('../../Resources/Images/email.png')}
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20,tintColor:'orange' }}
          />
          <Input
            style={{borderRadius: 20, width:'80%', alignItems:'center'}}
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
            style={{ height: 50, width: 50, backgroundColor: '#fff',borderRadius: 20,tintColor:'orange' }}
          />
          <Input
            style={{borderRadius: 20, width:'80%', alignItems:'center'}}
            placeholder="Password"
            onChangeText={password => this.setState({ password: password })}
            value={this.state.password}
            secureTextEntry={true}
          />
        </Card>
        <View style={{ alignItems: 'center' }}>
          {this.renderButtonSignUp()}
        </View>
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