import React, { Component } from 'react';
import { Text, View, ScrollView,PixelRatio, Modal,ToastAndroid, Alert,ImageBackground, StyleSheet,Platform, Button, TouchableOpacity, Image  } from 'react-native';
import { Card, CardSection, InputForm } from '../common';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import  Firebase from 'react-native-firebase';
import EventList from './EventList';

import ImagePicker from 'react-native-image-picker';
class Events extends Component {

  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  state = {events:[],faculty: false, Alert_Visibility: false, timings:'',
           modal:{url:'',Description:'',contact:'', reg_url:'', title:'', venue:'', timings:'', coordinator:''}, 
           Modal_Visibility: false, description:'', event:'',venue:'', ImageSource: null, contact:'',co_ordinator:'', reg_url:'' }
  
  uploadDetails(){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
const uploadImage = (uri, imageName, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
    const imageRef = firebase.storage().ref('posts').child(imageName)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        const postKey = firebase.database().ref().child('events').push().key
        firebase.database().ref('events/' + (99999999999-Math.floor(Date.now() / 1000))).set({
          Event: this.state.event,
          Venue: this.state.venue,
          Description : this.state.description,
          contact:this.state.contact,
          co_ordinator:this.state.co_ordinator,
          reg_url:this.state.reg_url,
          timings:this.state.timings,
          url : url
        }, ()=>{
          ToastAndroid.show('Event Uploaded', ToastAndroid.SHORT);
          this.setState({  event:'', ImageSource:null, venue:'', description:'',contact:'',reg_url:'',co_ordinator:'', timings:'' })
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
   
  if(this.state.ImageSource == null)
  {
    const postKey = firebase.database().ref().child('events').push().key
        firebase.database().ref('events/' + (99999999999-Math.floor(Date.now() / 1000))).set({
          Event: this.state.event,
          Venue: this.state.venue,
          Description : this.state.description,
          contact:this.state.contact,
          co_ordinator:this.state.co_ordinator,
          timings:this.state.timings,
          reg_url:this.state.reg_url,
          url : 'https://firebasestorage.googleapis.com/v0/b/dsceapp-5ed7f.appspot.com/o/Logo.jpg?alt=media&token=98c38f91-1f5e-4b7a-8760-7fe444049ee9'
        }, ()=>{
          ToastAndroid.show('Event Uploaded', ToastAndroid.SHORT);
          this.setState({ event:'', ImageSource:null, venue:'', description:'',contact:'',reg_url:'',co_ordinator:'', timings:'' })
        })
  }
  else
  {
   g= uploadImage(this.state.ImageSource.uri, this.state.event+".jpeg")
  }

  }



  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({

          ImageSource: source

        });
      }
    });
  }

  /*

  Event: child.val().Event,
            url: child.val().url,
            Description: child.val().Description,
            Venue: child.val().Venue,
            co_ordinator: child.val().co_ordinator,
            timings: child.val().timings,
            contact:child.val().contact,
            reg_url:child.val().reg_url
  */

  renderEvent(){
    const { cardViewStyle } = styles;
    return Object.values(this.state.events).map(event =>
      <TouchableOpacity style={{flex:1}} onPress={()=>{ this.setState({modal: {url:event.url, Description:event.Description, contact:event.contact,
      reg_url:event.reg_url, title:event.Event, venue:event.Venue, timings:event.timings, coordinator:event.co_ordinator}, Alert_Visibility: true})  }} >
    <Card key={event.Event} style={{
      flex:1,
      backgroundColor : '#fff',
      flexDirection:'row',
      borderRadius:15,
      }}>
      <CardSection style={{width:'30%', height:'100%'}}>
        <Image source={{uri: event.url}}
            style={{ width:'100%',height:100, }} resizeMode='contain' />
      </CardSection>
    <CardSection style={{width:'70%',flexDirection:'column',
      borderRadius:15,}}>
        <Text style={{fontSize:18, color:'#000', paddingTop:5, paddingLeft:5}}>{event.Event}</Text>
        <Text style={{fontSize:15, color:'#757575', paddingTop:2, paddingLeft:8}}>Venue: {event.Venue}</Text>
        <Text style={{fontSize:15, color:'#757575', paddingTop:2, paddingLeft:8}}>Timings: {event.timings}</Text>
        <Text style={{fontSize:15, color:'#757575', paddingTop:2, paddingLeft:8}}>Co-ordinator: {event.co_ordinator}</Text>
      </CardSection>
      
    </Card>
    </TouchableOpacity>)
  }



  Show_Custom_Alert(visible) {
  
    this.setState({Alert_Visibility: visible});
    
  }

  showWebView(visible)
  {
      this.setState({Alert_Visibility: visible},()=>{
        this.props.navigation.navigate('RegisterEvent', {screen:'RegisterEvent',reg_url:this.state.modal.reg_url})
      })
      
      
  }



  ok_Button=()=>{

    Alert.alert("OK Button Clicked.");

  }

  goToViewer(){

    this.setState({
      Alert_Visibility: false},()=>{
      this.props.navigation.navigate('ImageViewer', {screen:'ImageViewer', uri:this.state.modal.url})} )
  }

  showEventDescription(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <View style={{ width:'100%',flexDirection:'column',
    alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <View style={{ width:'100%', alignItems: 'center', justifyContent: 'center', padding:20,borderTopLeftRadius:25, borderTopRightRadius:25, flexDirection:'row'}}>
        <View style={{alignItems:'center',flex:1}}>
        <TouchableOpacity onPress={
          this.goToViewer.bind(this)
          } style={{width:'100%'}}>
          <Image source={{uri: this.state.modal.url}}
            style={{height: 100, width: '100%',resizeMode:'contain' }}/>
            </TouchableOpacity>
            </View>
          <View style={{flexDirection:'column',width:'70%', paddingLeft:20}}>
            <Text style={{fontSize:24,color:'#000'}}>{this.state.modal.title}</Text>
            <View style={{alignItems:'flex-start'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,color:'#000'}}>Contact:  </Text>
                <Text style={{fontSize:16,color:'#272727',}}>{this.state.modal.contact}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,color:'#000'}}>Venue:  </Text>
                <Text style={{fontSize:16,color:'#272727',}}>{this.state.modal.venue}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,color:'#000'}}>Timings:  </Text>
                <Text style={{fontSize:16,color:'#272727'}}>{this.state.modal.timings}</Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:16,color:'#000'}}>Coordinators:  </Text>
                <Text style={{fontSize:16,color:'#272727'}}>{this.state.modal.coordinator}</Text>
              </View>
            </View>
          </View>

    </View>
          <View style={{marginTop:10, backgroundColor:'#272727',alignItems:'center',width:'100%'}}>
              <Text style={{fontSize:18,color:'#fff', paddingTop:10}}>Description</Text>
              <Text style={{fontSize:16,color:'#E0E0E0', paddingLeft:20,paddingRight:20, paddingTop:5, textAlign:'center',paddingBottom:15}}>{this.state.modal.Description}</Text>
          </View>
          <TouchableOpacity style={{width:'100%'}} onPress={
            () => { this.showWebView(!this.state.Alert_Visibility)}
            }>
            
            <View style={{width:'100%',backgroundColor:'orange', alignItems:'center', borderBottomLeftRadius:25, borderBottomRightRadius:25}}>
            <Text style={{color:'#000', padding:18, fontSize:16,}}>Register Now</Text>
            </View>
            
          </TouchableOpacity>

          </View>
   </Card>
   </View>
   </Modal>
   </View>
    )
  }

  facultyUpload(){
    if(this.state.faculty)
    {
    return(
      <TouchableOpacity
      activeOpacity={0.5}

              style={{position: 'absolute',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              right: 30,
              bottom: 30,
              elevation:20}}
              onPress={this.showModal.bind(this)}>


              <Image source={require('../../Resources/Images/upload.png')} 
          
          style={{resizeMode: 'contain',
          width: 50,
          height: 50,
          tintColor:'#272727'}} />
            </TouchableOpacity>

    );
  }
  }



  uploadEvent(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Modal_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Event(!this.state.Modal_Visibility)} } 
          >
    <ScrollView style={{flex:1,
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ flex:1,width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    
    <Text style={{fontSize:18,color:'#000'}}>Create Event</Text>
    <Text style={{fontSize:15,color:'#212121'}}>Choose an Image for your Event (Optional)</Text>
    { this.state.ImageSource === null ? 
              <TouchableOpacity style={{marginBottom:20}} onPress={this.selectPhotoTapped.bind(this)}>
              <Card style={{backgroundColor:'#272727', borderRadius:15}}>
              <Text style={{color:'#fff', padding:10}}>Select Image</Text>
              </Card>
              </TouchableOpacity> 
            :<Image style={styles.ImageContainer} source={this.state.ImageSource} />
            }  
                        <InputForm 
                        onChangeText={event => this.setState({ event: event })}
                        value={this.state.event}
                        label="Event"
                        />  
                        <InputForm 
                        onChangeText={description => this.setState({ description: description })}
                        value={this.state.description}
                        label="Description"
                        multiline ={true}
                        />
                        <InputForm 
                        onChangeText={venue => this.setState({ venue: venue })}
                        value={this.state.venue}
                        label="Venue"
                        multiline ={true}
                        />    
                         <InputForm 
                        onChangeText={timings => this.setState({ timings: timings })}
                        value={this.state.timings}
                        label="Timings"
                        multiline ={true}
                        /> 
                        <InputForm 
                        onChangeText={coordinator => this.setState({ co_ordinator: coordinator })}
                        value={this.state.co_ordinator}
                        label="Co-ordinator"
                        multiline ={true}
                        /> 
                        <InputForm 
                        onChangeText={contact => this.setState({ contact: contact })}
                        value={this.state.contact}
                        label="Contact Number"
                        multiline ={true}
                        /> 
                        <InputForm 
                        onChangeText={reg_url => this.setState({ reg_url: reg_url })}
                        value={this.state.reg_url}
                        label="Registration Url"
                        multiline ={true}
                        /> 
    
          
          <TouchableOpacity style={{marginBottom:20}} onPress={this.uploadDetails.bind(this)}>
            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>Send Notification</Text>
            </Card>
          </TouchableOpacity>
   </Card>
   </ScrollView>
   </Modal>
   </View>
    )
  }

  Show_Event(visible) {
  
    this.setState({Modal_Visibility: visible});
    
  }

  showModal(visible){

    this.setState({Modal_Visibility: true})

  }





  render() {
    try{
    console.log('Events:',this.state.ImageSource.uri  );
    }
    catch(error)
    {
      console.log(error);
    }
    return (
      <View style={{flex:1, backgroundColor:'#EEEEEE'}}>
      <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        { this.renderEvent() }
        { this.showEventDescription() }
        { this.uploadEvent() }
      </ScrollView>
      {this.facultyUpload() }
      </View>

    );
  }

    listenForEvents() {
      firebase.database().ref().child('events').on('value', (snapshot)=>{
        firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
        
        var events = [];
        snapshot.forEach((child) => {
          events.push({
            Event: child.val().Event,
            url: child.val().url,
            Description: child.val().Description,
            Venue: child.val().Venue,
            co_ordinator: child.val().co_ordinator,
            timings: child.val().timings,
            contact:child.val().contact,
            reg_url:child.val().reg_url
          });
        });
  
  
    
        this.setState({
          
          events:events, faculty:snap.val().faculty});
        });
      });
      }
  

  componentDidMount(){
    //firebase.database().ref().child('events').on('child_added', (snapshot)=>{this.setState({events:snapshot.val()})});
    this.listenForEvents()
  }
}



const styles = StyleSheet.create({
 
  MainContainer :{
      
   flex:1,
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: (Platform.OS == 'ios') ? 20 : 0
   
  },
   
  Alert_Main_View:{
   
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688", 
    height: 200 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },
   
  Alert_Title:{
   
    fontSize: 25, 
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%'
   
  },
  ImageContainer: {
    borderRadius: 10,
    width: 250,
    height: 250,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
    
  },
  
  Alert_Message:{
   
      fontSize: 22, 
      color: "#fff",
      textAlign: 'center',
      padding: 10,
      height: '42%'
     
    },
  
  buttonStyle: {
      
      width: '50%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center'
  
  },
     
  TextStyle:{
      color:'#fff',
      textAlign:'center',
      fontSize: 22,
      marginTop: -5
  },
  cardViewStyle:{
    flex:1,
    backgroundColor : '#FFF3E0',
    flexDirection:'column',
  },
   
  });


export default Events;