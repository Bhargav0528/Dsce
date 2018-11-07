import React, { Component } from 'react';
import { Text, View, ScrollView,PixelRatio, Modal,ToastAndroid, Alert,ImageBackground, StyleSheet,Platform, Button, TouchableOpacity, Image, Picker  } from 'react-native';
import { Card, CardSection, InputForm, InputPicker } from '../common';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import ImagePicker from 'react-native-image-picker';
class ExamSection extends Component {
  static navigationOptions = {
    header: null,
  };
  state={exam_uploads:{},faculty:'', Alert_Visibility:false, text:'', branch:'', sem:'', upload_sem:''}

  componentDidMount(){
    //firebase.database().ref().child('events').on('child_added', (snapshot)=>{this.setState({events:snapshot.val()})});
    this.listenForExams()
  }
  showTime(data){
    month={0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sept',9:'Oct',10:'Nov',11:'Dec'}
    if(data.hour != 'undefined')
    {
    if(new Date().getDate() == data.date)
    {
      var hour = String(data.hour)
      var minutes = String(data.minutes)
      if(hour.length==1)
      {
        hour = "0"+String(data.hour)
      }
      if(minutes.length == 1)
      {
        minutes = "0"+String(data.minutes)
      }
      date = hour+":"+minutes
      return date
    }
    else{
      var dates =  String(data.date)
      if (dates.length==1)
      {
        dates="0"+String(data.date)
      }
      date=dates+" "+month[data.month]
      return date
    }
  }
  }

  fetchExamUploads(){
    if(this.state.sem == "1" || this.state.sem == "2")
    {
      console.log("Less than")
      firebase.database().ref(`firstYears/exam_uploads/sem_${this.state.sem}`).on('value', 
      (snapshot1)=>{this.setState({exam_uploads: snapshot1.val()})})
    }
    else
    {
      console.log(typeof this.state.faculty, `branch/${this.state.branch}/exam_uploads/sem_${this.state.sem}`  )
      firebase.database().ref(`branch/${this.state.branch}/exam_uploads/sem_${this.state.sem}`)
      .on('value', (snapshot1)=>{this.setState({exam_uploads: snapshot1.val()})})
    }    
  }

  renderExamUploads(){
    const {cardViewStyle} = styles;
    try
    {
    console.log(this.state.exam_uploads)
    return Object.keys(this.state.exam_uploads).map(
      key =>
      <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ExamUploads', {screen:'ExamUploads',click_upload:key, sem:this.state.sem})}}>
      <Card style={cardViewStyle}>
        <CardSection style={{backgroundColor : '#1c64db', flexDirection:'row', borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,width:'100%'}}>
          <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between',height:'100%',}}>
          <Text style={{width:'80%',fontSize:18, color:'#fff', fontStyle:'normal', padding:10}}>{this.state.exam_uploads[key].text}</Text>
          <Text style={{fontSize:14, color:'#FFFF00', fontStyle:'normal'}} >{this.showTime(this.state.exam_uploads[key])}</Text>
          </View>
        </CardSection> 
      </Card>
      </TouchableOpacity>)
    }
    catch(error)
    {
      return <Text>{error}</Text>
    }
    
  }

  sendNotification(){
    firebase.database().ref(`branch/${this.state.branch}/exam_uploads/sem_${this.state.upload_sem}/` + (99999999999-Math.floor(Date.now() / 1000))).set({
      text: this.state.text,
      sem: this.state.upload_sem,
      year:new Date().getFullYear(),
      month:new Date().getMonth(),
      date:new Date().getDate(),
      hour:new Date().getHours(),
      minutes:new Date().getMinutes()
    });
  }

  renderFacultyFeature(){
    if(this.state.faculty)
    {
    return(
      <View style={{flexDirection:'row', width:'100%', height:50, backgroundColor:'#F7F6E7'}}>
              <View style={{width:'30%',height:50, backgroundColor:'#F7F6E7'  }}>
              <Text style={{fontSize:16, color:'#000'}}>Semester</Text> 
              <Picker
              selectedValue = {this.state.sem}
              onValueChange= {(itemValue, itemIndex) => {
                this.setState({sem: itemValue})}}
              mode="dialog"
              style={{flex:1}}>
              <Picker.Item label= "1" value="1" />
              <Picker.Item label= "2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </Picker>
            </View>
            <View style={{width:'30%',height:50 , backgroundColor:'#F7F6E7' }}>
            <Text  style={{fontSize:16, color:'#000'}}>Section</Text> 
            <Picker
              selectedValue = {this.state.section}
              onValueChange= {(itemValue, itemIndex) => {
                this.setState({section: itemValue})}}
              mode="dialog"
              style={{flex:1}}>
              <Picker.Item label= "A" value="A" />
              <Picker.Item label= "B" value="B" />
              <Picker.Item label= "C" value="C" />
              <Picker.Item label= "D" value="D" />
              <Picker.Item label= "E" value="E" />
              <Picker.Item label= "F" value="F" />
              <Picker.Item label= "G" value="G" />
              <Picker.Item label= "H" value="H" />
              <Picker.Item label= "I" value="I" />
              <Picker.Item label= "J" value="J" />
              <Picker.Item label= "K" value="K" />
              <Picker.Item label= "L" value="L" />
              <Picker.Item label= "M" value="M" />
              <Picker.Item label= "N" value="N" />
              <Picker.Item label= "O" value="O" />
              <Picker.Item label= "P" value="P" />
              <Picker.Item label= "Q" value="Q" />
              <Picker.Item label= "R" value="R" />
              <Picker.Item label= "S" value="S" />
              <Picker.Item label= "T" value="T" />
              <Picker.Item label= "U" value="U" />
              <Picker.Item label= "V" value="V" />
              <Picker.Item label= "W" value="W" />
            </Picker>
            </View>
            <TouchableOpacity style={{width:'40%',height:50, 
            alignItems:'center', justifyContent:'center', backgroundColor:'#E7E6E1'}}
            onPress={this.fetchExamUploads.bind(this)}>
            <View style={{flex:1 , justifyContent:'center'}}>
              <Text style={{fontSize:16, color:'#000'}}>Done</Text>
              </View>
              </TouchableOpacity>
            </View>
    )
  }
}

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#EEEEEE'}}>
      <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent: 'center',alignItems: 'center'}}>
        {this.renderFacultyFeature()}
        { this.renderExamUploads() }
        { this.uploadEvent() }
      </ScrollView>
      {this.facultyUpload() }
      </View>
    );
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
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.closeModal(!this.state.Alert_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ width:'100%', flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text style={{fontSize:18, color:'#000', paddingTop:10}}>Create Exam Upload</Text>
    
    <InputForm 
    onChangeText={text => this.setState({ text: text })}
    value={this.state.text}
    label="Text"
    />  
    <InputPicker
      pick = {this.state.upload_sem}
      onValueChange= {(itemValue, itemIndex) => this.setState({upload_sem: itemValue})}
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
  closeModal(visible) {
    this.setState({Alert_Visibility: visible});
  }
  showModal(){
    this.setState({Alert_Visibility: true})
  }

  listenForExams() {
    
      firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
        if(!snap.val().faculty)
        {
          console.log('Into it')
        firebase.database().ref(`branch/${snap.val().branch}/exam_uploads/sem_${snap.val().sem}`).on('value', (snapshot)=>{
      
  
      this.setState({
        
        exam_uploads:snapshot.val(), faculty:snap.val().faculty, branch:snap.val().branch, sem:snap.val().sem});
      })}
      else{
        this.setState({
        
          faculty:snap.val().faculty, branch:snap.val().branch });
        }
      })
     
    }






}

const styles = {
  cardViewStyle:{
    borderRadius: 10,
    flexDirection:'row',
    height:100,  
    elevation:6,
  },
  categoryViewStyle:{
    alignItems: 'flex-start'
  },
  
  
}
export default ExamSection;