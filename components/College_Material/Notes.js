import React, { Component } from 'react';
import { Text, View, Image,Modal, TouchableOpacity,StyleSheet, ScrollView, Platform,Picker, ToastAndroid } from 'react-native';
import { Gradient, Card, InputForm, InputPicker } from '../common'
import RNFetchBlob from 'react-native-fetch-blob'
import DocumentPicker from 'react-native-document-picker';
import firebase from 'firebase'
class Notes extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {subjects:[], Alert_Visibility: false,Modal_Visibility: false,faculty: false,NoteSource:null,mimeType:'',
           modal:{ mod:'fs', noti:'dfs',sem:'3',section:'A'},
          branch:'computer_science', sem:'', subject:'', module:'Module1', chap:'',semester:''}
  path = RNFetchBlob.fs.dirs.SDCardDir+'/DSCE/Notes'
  android = RNFetchBlob.android;

  componentDidMount(){
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', 
    (snapshot)=>{
      if(snapshot.val().faculty)
      {
        this.setState({ faculty: snapshot.val().faculty, branch: snapshot.val().branch})
      }
      else
      {
        if(snapshot.val().sem == "1" || snapshot.val().sem == "2")
        {
          firebase.database().ref(`firstyear/notes/sem_${snapshot.val().sem}`).on('value', 
          (snapshot1)=>{
            this.setState({subjects: snapshot1.val(), faculty: snapshot.val().faculty})
            
          })
        }
        else
        {
          firebase.database().ref(`branch/${snapshot.val ().branch}/notes/sem_${snapshot.val().sem}`).on('value', 
    (snapshot1)=>{
      this.setState({subjects: snapshot1.val(), faculty: snapshot.val().faculty})
      
    })
        }
      }
      
  })
  }

  uploadDetails(){
    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
  const uploadImage = (uri, imageName, mime = 'application') => {
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
        //firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}`).push().key
        firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}/${this.state.subject}/${this.state.module}/` + (99999999999-Math.floor(Date.now() / 1000))).set({
          url : url,
          name : this.state.chap,
          mime : this.state.mimeType.split("/")[1],
          subject: this.state.subject,
          module: this.state.module
        }, ()=>{
          firebase.database().ref('news/' + (99999999999-Math.floor(Date.now() / 1000))).set({
            category: 4,
            text: `Notes has been uploaded for Sem ${this.state.sem}`,
            description : `Please refer the Notes section, Chapter ${this.state.chap} in Module ${this.state.module} for Subject ${this.state.subject}`,
            year:new Date().getFullYear(),
            month:new Date().getMonth(),
            date:new Date().getDate(),
            hour:new Date().getHours(),
            minutes:new Date().getMinutes()
          }, ()=>{
            async ()=>{
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
                  "contents": {"en": "Notes Uploaded"}
                }),
              });
            }
            ToastAndroid.show('Note Uploaded', ToastAndroid.SHORT);
          this.setState({ subject:'', NoteSource:null, module:'', chap:''})
          });
          
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
   ToastAndroid.show('Uploading Notes, Please Wait...',ToastAndroid.SHORT)
   //console.log('chapName', this.state.chap+`${this.state.mimeType.split("/")[1]}`)
   g= uploadImage(this.state.NoteSource, this.state.chap+'.'+`${this.state.mimeType.split("/")[1]}`, this.state.mimeType)

  }


  openFile(link,sub, mod, chap){
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod)
    .then((exist) => {
    if(exist == false){
      
    fs.mkdir(this.path+'/'+sub+'/'+mod)}
    console.log(`file ${exist ? '' : 'not'} existdds`, exist)
    })

    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod+'/'+chap)
    .then((exist)=>{
      if(exist == false){
        
      }
      else{
        console.log('peace1')
        this.android.actionViewIntent(this.path+'/'+sub+'/'+mod+'/'+chap)
              .then((success) => {
                console.log('success: ', success)
              })
              .catch((err) => {
                console.log('err:', err)
              })
      }
    })


  }



  async download(link,sub, mod, chap){
    var date      = new Date();
    var url       = link;
    const { config, fs } = RNFetchBlob
    let NotesDir = this.path
    //console.log("PictureDir",PictureDir)
    //var str = url.toString()
    //var re = new RegExp('/(\w+)\.');
   // console.log("Regex",str.match(re))
    //var xArray;
    //while(xArray = re.exec(url.toString())) console.log("REGEX",xArray);
    //var myArray = re.exec(url.toString());
    //console.log("Regular Expression", myArray)
    console.log("Path to chapter" , this.path+'/'+sub+'/'+mod+'/'+chap)
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod)
    .then((exist) => {
    if(exist == false){
      
    fs.mkdir(this.path+'/'+sub+'/'+mod)}
    console.log(`file ${exist ? '' : 'not'} existdds`, exist)
    })

    ModDir = this.path+'/'+sub

    let options = {
      fileCache: true,
      addAndroidDownloads : {
        useDownloadManager : true,
        notification : true,
        path:  this.path+'/'+sub+'/'+mod+'/'+chap,
        description : 'Document'
      }
    }
    
    RNFetchBlob.fs.exists(this.path+'/'+sub+'/'+mod+'/'+chap)
    .then(
    async (exist) => {
      
    if(exist == false){
      console.log('peace11111')
      
        await config(options).fetch('GET', url).then(
        (res) => {
          console.log("path111",res.path())
          this.android.actionViewIntent(res.path())
            .then((success) => {
              console.log('success: ', success)
            })
            .catch((err) => {
              console.log('err:', err)
            })
          });
        
    }
    else{
      console.log('peace1')
      this.android.actionViewIntent(this.path+'/'+sub+'/'+mod+'/'+chap)
            .then((success) => {
              console.log('success: ', success)
            })
            .catch((err) => {
              console.log('err:', err)
            })
    }
  }
  )
    
    
  }

  extention(filename){
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
  }
  


  showModuleDescription(){
    try {
      let color = true;
      if (this.state.subjects != null && typeof this.state.subjects[this.state.modal.noti][this.state.modal.mod] !== "undefined"){
        console.log("Notes true", this.state.subjects[this.state.modal.noti][this.state.modal.mod])
        chapters = Object.keys(this.state.subjects[this.state.modal.noti][this.state.modal.mod])
        console.log(chapters)
        return(
      
          <Modal
                visible={this.state.Alert_Visibility}
                transparent={true}
                animationType={"fade"}
                swipeToClose = {false}
                swipeArea={0}
                onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } 
                >
      
          <View  style={{height:'100%',width:'100%',justifyContent: 'center' ,alignItems: 'center',
          backgroundColor: '#00000070'}}>
          <View  style={{height:'80%', width:'80%'}}>
          <Card style={{height:'100%', width:'100%', alignItems:'center', flexDirection:'column', borderRadius:20}}>
          <Text style={{fontSize:16, color:'#000', margin:10}}>{this.state.modal.mod}</Text>
          <ScrollView  style={{flex:1, width:'100%'}}>
      
          {
            
            Object.values(this.state.subjects[this.state.modal.noti][this.state.modal.mod]).map(chaps => {
            //console.log(chaps, this.state.subjects[this.state.modal.noti][this.state.modal.mod][chaps].url)
            if(color)
            {
              color = false;
            }
            else{
              color=true;
            }
            return (

                <TouchableOpacity style={{ elevation:11, width:'100%',borderBottomWidth:1,borderBottomColor:'#d3d3d3'}} 
                onPress={this.download.bind(this,chaps.url,chaps.subject, chaps.module, chaps.name+'.'+chaps.mime)}>
                  <View style={{backgroundColor:(color)?'orange':'#FFE0B2',height:60, alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'#000',fontSize:22}}>{chaps.name}</Text>
                  </View>
                </TouchableOpacity>
            
            )
          }) 
          
          
          }
          
         </ScrollView>
         </Card>
         </View>
         </View>
         </Modal>
          )
      }  
    } catch (error) {
      console.log('Notes', this.state.subjects)
    }
    
  }

  Show_Custom_Alert(visible) {
    this.setState({Alert_Visibility: visible});
  }


  ShowNotes(noti,mod){
    this.setState({Alert_Visibility: true, modal:{mod:mod, noti:noti}});
  }

  

  fecthNotes(){
    if(this.state.sem == "1" || this.state.sem == "2")
    {
      console.log("Less than")
      firebase.database().ref(`firstyear/notes/sem_${this.state.sem}/${this.state.section}`).on('value', 
      (snapshot1)=>{this.setState({subjects: snapshot1.val()})})
    }
    else
    {
      console.log(typeof this.state.faculty, `branch/${this.state.branch}/notes/sem_${this.state.sem}`  )
      firebase.database().ref(`branch/${this.state.branch}/notes/sem_${this.state.sem}`)
      .on('value', (snapshot1)=>{this.setState({subjects: snapshot1.val()})})
    }
  }


  renderSubjects(){
    if(this.state.subjects == null)
    {
      return <Text style={{fontSize:22, color:'#000', alignSelf:'center'}}>NOTES NOT AVAILABLE</Text>
    }
    var subjects = Object.keys(this.state.subjects)
    return subjects.map(noti =>
      <View key={noti}>
        <Gradient subject={noti} />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} > 
        {Object.keys(this.state.subjects[noti]).map(mod => {
          try {
            if (this.state.subjects != null && typeof this.state.subjects[noti][mod] !== "undefined"){
              //console.log("URLS", this.state.subjects[noti][mod].url)
              var link = this.state.subjects[noti][mod].url
              //console.log("Subjects",this.state.subjects[noti])
            }  
          } catch (error) {
            console.log('dawdad')
          }
          //this.setState({ url: this.state.subjects[noti][mod]['url']})
          return(
          <TouchableOpacity
          key={mod}
              style={styles.button}
              //onPress={this.download.bind(this,link,noti)}
              onPress={this.ShowNotes.bind(this, noti, mod)}
              >
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                  elevation:10
                }}>
                <Text style={{ alignItems: 'center' }}>{mod}</Text>
              </Card>
            </TouchableOpacity>
          )
        })}
        </ScrollView>
      </View>
    )
  
       
  }


  
  createDirectories(){
    const { config, fs } = RNFetchBlob
    RNFetchBlob.fs.exists(this.path)
    .then((exist) => {
    if(exist == false){
    fs.mkdir(this.path)}
    //console.log(`file ${exist ? '' : 'not'} exists`, exist)
    })
    //.catch(() => { ... })
    
    RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.SDCardDir)
    // files will an array contains filenames
    .then((files) => {
        //console.log(files)
    })
    //console.log("PictureDir",fs.dirs)
  }

  uploadNotes(){
    this.setState({Modal_Visibility:true})
  }

  Show_Note(visible) {
  
    this.setState({Modal_Visibility: visible});
    
  }

  selectNote2Upload() {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    },(error,res) => {
      // Android
      this.setState({ NoteSource:res.uri, mimeType:res.type})
    });
  }

  ModalNotes(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.Modal_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Note(!this.state.Modal_Visibility)} } 
          >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ flex:1,width:'100%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25}}>
    <Text style={{margin:5, color:'#000', fontSize:16}}>Upload Notes</Text>
    { this.state.NoteSource === null ? 
              <TouchableOpacity style={{marginBottom:20}} onPress={this.selectNote2Upload.bind(this)}>
              <Card style={{backgroundColor:'#272727', borderRadius:15}}>
              <Text style={{color:'#fff', padding:10}}>Select Document to Upload</Text>
              </Card>
              </TouchableOpacity> 
            :<Text style={{fontSize: 16, color:'#000'}}>Note is Selected , Please fill the details</Text>
            }           
                        <InputPicker
                            pick = {this.state.module}
                            onValueChange= {(itemValue, itemIndex) => this.setState({module: itemValue})}
                            label="Module">
                            <Picker.Item label="Module1" value="Module1" />
                            <Picker.Item label="Module2" value="Module2" />
                            <Picker.Item label="Module3" value="Module3" />
                            <Picker.Item label="Module4" value="Module4" />
                            <Picker.Item label="Module5" value="Module5" />
                            <Picker.Item label="Miscallaneous" value="Miscallaneous" />
                      </InputPicker>
        
                        <InputPicker
                          pick = {this.state.branch}
                          onValueChange= {(itemValue, itemIndex) => this.setState({branch: itemValue, branchchange:true})}
                          label="Branch">
                          <Picker.Item label="Computer Science" value="computer_science" />
                          <Picker.Item label="Information Science" value="information_science" />
                          <Picker.Item label="Civi Engineering" value="civil_engg" />
                          <Picker.Item label="Mechanincal Engineering" value="mech_engg" />
                          <Picker.Item label="Electronics and Communication" value="ec_engg" />
                        </InputPicker>


                        <InputForm 
                        onChangeText={subject => this.setState({ subject: subject })}
                        value={this.state.subject}
                        label="Subject"
                        multiline ={true}
                        />

                        <InputForm 
                        onChangeText={chap => this.setState({ chap: chap })}
                        value={this.state.chap}
                        label="Chapter Name"
                        multiline ={true}
                        />    
    
          
          <TouchableOpacity style={{marginBottom:20}} onPress={this.uploadDetails.bind(this)}>
            <Card style={{backgroundColor:'#272727', borderRadius:15}}>
            <Text style={{color:'#fff', padding:10}}>Upload</Text>
            </Card>
          </TouchableOpacity>

   </Card>
   </View>
   </Modal>
   </View>
    )}

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
              onPress={this.uploadNotes.bind(this)}>


              <Image source={require('../../Resources/Images/upload.png')} 
          
          style={{resizeMode: 'contain',
          width: 50,
          height: 50,
          tintColor:'#272727'}} />
            </TouchableOpacity>

    );
  }
  }


  facultyChoose(){
    if(this.state.faculty)
    {
    return(
            <View style={{backgroundColor:'#ffe3c6'}}>
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
            
            <TouchableOpacity style={{width:'40%',height:50, 
            alignItems:'center', justifyContent:'center', backgroundColor:'#E7E6E1'}}
            onPress={this.fecthNotes.bind(this)}>
            <View style={{flex:1 , justifyContent:'center'}}>
              <Text style={{fontSize:16, color:'#000'}}>Done</Text>
              </View>
              </TouchableOpacity>
            </View>
            </View>
            )
          }
  }


  render() {
    
    
    this.createDirectories()
    return (
      <View  style={{ flex: 1,
    backgroundColor: '#ECEFF1'}}>
       <Image source={require('../../Resources/Images/notes_bg.jpg')} style={{width:'100%',height:'40%',}} />
       {this.facultyChoose()}
       <ScrollView>
       {this.renderSubjects()}
       {this.showModuleDescription()}
       {this.ModalNotes()}
       </ScrollView>
       {this.facultyUpload() }
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ECEFF1',
    padding: 10,
  },
});
export default Notes; 