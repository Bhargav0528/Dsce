import React, { Component } from 'react';
import { Text, View, ScrollView,PixelRatio, Modal,ToastAndroid, Alert,ImageBackground, StyleSheet,Platform, Button, TouchableOpacity, Image, Picker  } from 'react-native';
import { Card, CardSection, InputForm, InputPicker } from '../common';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

import ImagePicker from 'react-native-image-picker';
class ExamUploads extends Component {

    state={exam_uploads:'',faculty:'', Alert_Visibility:false, text:'', branch:'', sem:'', upload_sem:'', ImageSource:null,key:''}


    componentDidMount(){
        //firebase.database().ref().child('events').on('child_added', (snapshot)=>{this.setState({events:snapshot.val()})});
        this.listenForExams()
      }

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
            firebase.database().ref(`branch/${this.state.branch}/exam_uploads/sem_${this.state.sem}/${this.state.key}/uploads/` + (99999999999-Math.floor(Date.now() / 1000))).set({
              text:this.state.text,
              url : url
            }, ()=>{
              ToastAndroid.show('Event Uploaded', ToastAndroid.SHORT);
              this.setState({  text:'', ImageSource:null })
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
              reg_url:this.state.reg_url,
              url : 'https://dscebaconclave.com/wp-content/uploads/2018/03/cropped-cropped-logo-2.png'
            }, ()=>{
              ToastAndroid.show('Event Uploaded', ToastAndroid.SHORT);
              this.setState({ event:'', ImageSource:null, venue:'', description:'',contact:'',reg_url:'',co_ordinator:'' })
            })
      }
      else
      {
       g= uploadImage(this.state.ImageSource.uri, this.state.event+".jpeg")
      }
    
      }

    renderUploads(){
        Object.values(this.state.exam_uploads).map(upload => {
            //this.setState({ url: this.state.subjects[noti][mod]['url']})
            console.log(upload.text)
            return(
            <View style={{flex:1}}>
            <View style={{backgroundColor:'red', borderRadius:20}}>
            <Text style={{color:'#fff'}}>{upload.text}</Text>
            </View>
            <TouchableOpacity
                key={upload.text}
                //onPress={this.download.bind(this,link,noti)}
                onPress={()=>{}}
                >
                <Card
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 20,
                    padding: 15,
                  }}>
                  <Image style={{ alignItems: 'center' }} source={{uri: upload.url}} />
                </Card>
              </TouchableOpacity>
              </View>
            )
          })
    }
    
    render(){
        console.log("Heyoo", this.state.exam_uploads)
        const key = this.props.navigation.getParam('click_upload', 'NO-ID');
        return(
            <View style={{backgroundColor:'#fff', alignItems:'center',justifyContent:'center', flex:1}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:'100%', height:'80%'}}>
                {Object.values(this.state.exam_uploads).map(upload => {
            //this.setState({ url: this.state.subjects[noti][mod]['url']})
            console.log(upload.text)
            return(
            <View>
            <View style={{backgroundColor:'red', borderRadius:20, alignItems:'center', padding:10, marginLeft:25, marginRight:25,elevation:11}}>
            <Text style={{color:'#fff', fontSize:15}}>{upload.text}</Text>
            </View>
            <TouchableOpacity
                key={upload.text}
                //onPress={this.download.bind(this,link,noti)}
                style={{flex:1, elevation:11}}
                onPress={()=>{this.props.navigation.navigate('ImageViewer', {screen:'ImageViewer', uri:upload.url})}}
                >
                <Card
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 20,
                    padding: 15,
                    height:'70%',
                    elevation:11
                  }}>
                  <Image style={{ width:200, height:'100%',alignItems: 'center' }} source={{uri: upload.url}} />
                </Card>
              </TouchableOpacity>
              </View>
            )
          })}
                {this.uploadEvent()}
                </ScrollView>
                {this.facultyUpload()}
                </View>
        )
    }


    uploadEvent(){
        return(
          <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
        <Modal
              visible={this.state.Alert_Visibility}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.Show_Event(!this.state.Alert_Visibility)} } 
              >
        <ScrollView style={{flex:1,
        left: 0,
        top: 0,
        backgroundColor: '#00000070',width:'100%', height:'100%'}}>
        <Card style={{ flex:1,width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
        
        <Text style={{fontSize:18,color:'#000'}}>Create Exam Upload</Text>
        <Text style={{fontSize:15,color:'#212121'}}>Choose an Image for the Upload</Text>
        { this.state.ImageSource === null ? 
                  <TouchableOpacity style={{marginBottom:20}} onPress={this.selectPhotoTapped.bind(this)}>
                  <Card style={{backgroundColor:'#272727', borderRadius:15}}>
                  <Text style={{color:'#fff', padding:10}}>Select Image</Text>
                  </Card>
                  </TouchableOpacity>
                :<Image style={styles.ImageContainer} source={this.state.ImageSource} />
                }  
                            <InputForm 
                            onChangeText={text => this.setState({ text: text })}
                            value={this.state.text}
                            label="Text"
                            />  
                            
        
              
              <TouchableOpacity style={{marginBottom:20}} onPress={this.uploadDetails.bind(this)}>
                <Card style={{backgroundColor:'#272727', borderRadius:15}}>
                <Text style={{color:'#fff', padding:10}}>Upload Image</Text>
                </Card>
              </TouchableOpacity>
       </Card>
       </ScrollView>
       </Modal>
       </View>
        )
      }
    
      Show_Event(visible) {
      
        this.setState({Alert_Visibility: visible});
        
      }
    
      showModal(visible){
    
        this.setState({Alert_Visibility: true})
    
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

      listenForExams() {
        const key = this.props.navigation.getParam('click_upload', 'NO-ID');
        const semester = this.props.navigation.getParam('sem', 'NO-ID');
        console.log('Key', key)
        firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
          firebase.database().ref(`branch/${snap.val().branch}/exam_uploads/sem_${snap.val().sem}/${key}/uploads`).on('value', (snapshot)=>{
        var exam_uploads = [];
        snapshot.forEach((child) => {
          exam_uploads.push({
            text: child.val().text,
            url:child.val().url
          });
        });
  
        console.log('Exam Uploads', exam_uploads,key )
    
        this.setState({
          
          exam_uploads:exam_uploads, faculty:snap.val().faculty, branch:snap.val().branch, sem:snap.val().sem, key:key});
        });
          
        })
       
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

export default ExamUploads