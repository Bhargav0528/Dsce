import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image,Modal, Alert, StyleSheet,Platform, Picker, RefreshControl } from 'react-native';
import { Card, CardSection, InputForm, InputPicker  } from '../common';
import firebase from 'firebase'; 

import NotificationList from './NotificationList';
class Notifications extends Component {
  state = { notifications:'', faculty: false,Alert_Visibility: false, category:0, description:'', text:'',refreshing: false };
  
  
  renderNotifications(){
    if(this.state.notifications != '')
    return Object.values(this.state.notifications).map(noti => <NotificationList data={noti} key={noti.text} />)
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    firebase.database().ref().child('news').on('value', (snapshot)=>{
      firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
      
      var notifications = [];
      snapshot.forEach((child) => {
        notifications.push({
          category: child.val().category,
          description: child.val().description,
          text: child.val().text,
          year:child.val().year,
          month:child.val().month,
          date:child.val().date,
          hour:child.val().hour,
          minutes:child.val().minutes
        });
      });
      


  
      this.setState({
       notifications:notifications, faculty:snap.val().faculty, refreshing:false});
      });
    });
  }

  sendNotification(){
    const postKey = firebase.database().ref().child('news').push().key
    console.log('Push Key', postKey)
    firebase.database().ref('news/' + (99999999999-Math.floor(Date.now() / 1000))).set({
      category: this.state.category,
      text: this.state.text,
      description : this.state.description,
      year:new Date().getFullYear(),
      month:new Date().getMonth(),
      date:new Date().getDate(),
      hour:new Date().getHours(),
      minutes:new Date().getMinutes(),
      uid: firebase.auth().currentUser.uid
    },async ()=>{
      await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Authorization": "Basic ZjE0ZDJhNDYtMWMzMi00ZTA5LTg2ZjQtNDY0MDNmYjY5MThi"
        },
        body: JSON.stringify({
          "app_id": "d3672cc3-dd21-481a-bc1a-0f7a9bcaea3e",
          "included_segments": ["All"],
          "data": {"foo": "bar"},
          "contents": {"en": "Important Notification"}
        }),
      });
    }
  );
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
    <Card style={{ width:'100%', flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text style={{fontSize:18, color:'#000', paddingTop:10}}>Create Notification</Text>
    
    <InputPicker
      pick = {this.state.category}
      onValueChange= {(itemValue, itemIndex) => this.setState({category: itemValue})}
      label="Category">
      <Picker.Item label="Holiday" value={0}/>
      <Picker.Item label="Important Notice" value={1}/>
      <Picker.Item label="Branch Related" value={2} />
      <Picker.Item label="Timetable Change" value={3} />
      <Picker.Item label="Exam Related" value={4} />
        </InputPicker>
    <InputForm 
    onChangeText={text => this.setState({ text: text })}
    value={this.state.text}
    label="Text"
    />  
    <InputForm 
    onChangeText={description => this.setState({ description: description })}
    value={this.state.description}
    label="Description"
    multiline ={true}
    />  
    
          
          <TouchableOpacity style={{marginBottom:20}} onPress={this.sendNotification.bind(this)}>

            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>Send Notification</Text>
            </Card>
          </TouchableOpacity>
   </Card>
   </View>
   </Modal>
   </View>
    )
  }

  Show_Custom_Alert(visible) {
  
    this.setState({Alert_Visibility: visible});
    
  }



  showModal(){

    this.setState({Alert_Visibility: true})

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




  render() {
    console.log("My notifications ",this.state.category)
    console.log("Loaded Notification");


    return (
      <View style={{flex:1 , backgroundColor:'#EEEEEE'}}>
      <ScrollView style={{flex:1}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        { this.renderNotifications() }
        { this.showEventDescription() }
      </ScrollView>
      {this.facultyUpload() }
      </View>
    );
  }

  

  listenForEvents() {
    firebase.database().ref().child('news').on('value', (snapshot)=>{
      firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
      
      var notifications = [];
      snapshot.forEach((child) => {
        notifications.push({
          category: child.val().category,
          description: child.val().description,
          text: child.val().text,
          year:child.val().year,
          month:child.val().month,
          date:child.val().date,
          hour:child.val().hour,
          minutes:child.val().minutes
        });
      });
      


  
      this.setState({
       notifications:notifications, faculty:snap.val().faculty});
      });
    });
    }

    componentDidMount() {
      this.listenForEvents()
      
  }
  
  componentWillUnmount() {
      this.notificationDisplayedListener();
      this.notificationListener();
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

export default Notifications;