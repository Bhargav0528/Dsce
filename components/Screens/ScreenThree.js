import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, Modal, Picker, ToastAndroid } from 'react-native';
import { Button, InputForm, InputPicker } from '../common';
import { Card } from '../common';
import firebase from 'firebase';
class ScreenThree extends Component {
  constructor(props){
    super(props);
  }

  state = {userProps:'', ProfileVisibility:false, sem:'1',branch:'computer_science',
  username:'', section:'', branchchange:false, semchange:false, ContactVisibility:false}

  componentDidMount(){
    
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value',(snapshot)=>{this.setState({userProps: snapshot.val()})})
  }

  showEditProfile(){
    if(this.state.userProps.faculty)
    {
      return(
          <View style={{justifyContent: 'center' ,alignItems: 'center'}}>
        <Modal
              visible={this.state.ProfileVisibility}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.closeModal(!this.state.ProfileVisibility)} } 
              >
        <View style={{justifyContent: 'center' ,alignItems: 'center',
        left: 0,
        top: 0,
        backgroundColor: '#00000070',width:'100%', height:'100%'}}>
        <View>
                
                <InputForm
                  onChangeText={username => this.setState({ username: username })}
                  value={this.state.username}
                  label="Username"
                />
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
    
                
    
                <View style={{
            alignItems:'center',}}>
            <Button style={{borderRadius: 20,
              borderWidth: 2,
              borderColor: '#000',
              backgroundColor: '#fff',
              color: '#ffffff',
              elevation: 4,
              paddingLeft:50,
              paddingRight:50,
              marginTop:15,}}
            btpress={()=>{
              if(this.state.section == '' || this.state.username == '' )
              {
                  ToastAndroid.show('Please enter the Details', ToastAndroid.SHORT)
              }
              else{
              firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).update({
                username:this.state.username,
                branch:this.state.branch
              }, ()=>{
                ToastAndroid.show('Edited Profile Successfully', ToastAndroid.SHORT)
              })
              }
            }}>Done</Button>
            </View>
    
                </View>
       </View>
       </Modal>
       </View>
        )
      
    }
    else{
    return(
      <View style={{justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.ProfileVisibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.closeModal(!this.state.ProfileVisibility)} } 
          >
    <View style={{justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <View>
            
            <InputForm
              onChangeText={username => this.setState({ username: username })}
              value={this.state.username}
              label="Username"
            />
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

            <InputPicker
              pick = {this.state.sem}
              onValueChange= {(itemValue, itemIndex) => this.setState({sem: itemValue, semchange:true})}
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

            <View style={{
        alignItems:'center',}}>
        <Button style={{borderRadius: 20,
          borderWidth: 2,
          borderColor: '#000',
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 4,
          paddingLeft:50,
          paddingRight:50,
          marginTop:15,}}
        btpress={()=>{
          if(this.state.section == '' || this.state.username == '' )
          {
              ToastAndroid.show('Please enter the Details', ToastAndroid.SHORT)
          }
          else{
          firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).update({
            username:this.state.username,
            section:this.state.section,
            branch:this.state.branch,
            sem:this.state.sem
          }, ()=>{
            ToastAndroid.show('Edited Profile Successfully', ToastAndroid.SHORT)
          })
          }
        }}>Done</Button>
        </View>

            </View>
   </View>
   </Modal>
   </View>
    )
  }
  }
  showModal(){
    this.setState({ProfileVisibility: true})
  }
  closeModal(visible) {
    this.setState({ProfileVisibility: visible});
  }

  showContactUs(){
    return(
      <View style={{justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.ContactVisibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.closeContactModal(!this.state.ContactVisibility)} } 
          >
    <View style={{justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <View style={{height:'60%' , backgroundColor:'#fff', borderRadius:20,elevation:10, padding:10}}>
    <Text style={{fontSize:16, color:'#000', fontStyle:'italic'}}>Developed By</Text>
    <Text style={{fontSize:18, color:'#000', marginTop:10}}>|  Bhargav BV</Text>
    <Text style={{fontSize:15, color:'#3c3c3c', marginTop:5}}>   Department of Computer Science</Text>
    <Text style={{fontSize:15, color:'#3c3c3c', marginTop:5}}>   5th Sem</Text>

    <Text style={{fontSize:16, color:'#000', fontStyle:'italic', marginTop:15}}>Designed By</Text>
    <Text style={{fontSize:18, color:'#000', marginTop:10}}>|  Pooja Suresh</Text>
    <Text style={{fontSize:15, color:'#3c3c3c', marginTop:5}}>   Department of Civil Engineering</Text>
    <Text style={{fontSize:15, color:'#3c3c3c', marginTop:5}}>   5th Sem</Text>

    <Text style={{fontSize:16, color:'#000', fontStyle:'italic', marginTop:15}}>Contact Info</Text>
    <View style={{flexDirection:'row', marginTop:10}}>
    <Image source={require('../../Resources/Images/contact.png')} style={{width:20, height:20}} />
    <Text style={{paddingLeft:7}}>9738826242</Text>
    </View>

    <View style={{flexDirection:'row', marginTop:5}}>
    <Image source={require('../../Resources/Images/email.png')} style={{width:20, height:20}} />
    <Text style={{paddingLeft:7}}>bhargavauden1998@gmail.com</Text>
    </View>

</View>
            </View>
   </Modal>
   </View>
    )
  }
  showContactModal(){
    this.setState({ContactVisibility: true})
  }
  closeContactModal(visible) {
    this.setState({ContactVisibility: visible});
  }


  branch_name(){
    if(this.state.userProps!= '')
    {
      const branch = this.state.userProps.branch
      console.log('Branch', branch)
      var new_branch = branch.split('_');
      new_branch = new_branch.map((small)=>{return small.charAt(0).toUpperCase()+ small.slice(1)})
      new_branch = new_branch.join(' ')
      return  new_branch;
    }
  }

  render() {
    //console.log(firebase.auth().currentUser);
    console.log('State',this.props.navigation.state.key)
    return (
      <ImageBackground
        source={require('../../Resources/Images/background_white.jpg')}
        style={{width: '100%',
        height: '100%',
        alignItems: 'center'
        }}>
        {this.showEditProfile()}
        {this.showContactUs()}
      <View style={{width:'100%',height:'100%'}}>
        <Card style={{width:'100%',height:'35%', borderRadius:20}}>
            <ImageBackground source={require('../../Resources/Images/IDCARD.png')} style={{flex:1}}>

            <View style={{top:'30%', left:'15%'}}>
              <Text style={{color:'#000', marginBottom:10, fontSize:20}}>Username : {this.state.userProps.username}</Text>
              {()=>{
                if(this.state.userProps.faculty)
                {
                  return;
                }
                else{

              <Text style={{color:'#000', marginBottom:10, fontSize:20}}>USN : {this.state.userProps.usn}</Text>
                }
              }}
              <Text style={{color:'#000', fontSize:20}}>Branch: {this.branch_name()}</Text>
              </View>
            </ImageBackground>
          </Card>

        
        
        <TouchableOpacity 
        onPress={this.showModal.bind(this)}
        style={{borderRadius: 20,
          borderWidth: 1,
          borderColor: '#d3d3d3',
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 4,
          marginTop:30,
          paddingLeft:10,
          flexDirection:'row',
          alignItems:'center'}}>
            <Image source={require('../../Resources/Images/edit_profile.png')} style={{width:30, height:30,}}/>
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Edit Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity
        
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#d3d3d3',
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 4,
          marginTop:15,
          paddingLeft:10,
          flexDirection:'row',
          alignItems:'center'}}>
          <Image source={require('../../Resources/Images/starred.png')} style={{width:30, height:30}} />
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Starred Items </Text>
            </TouchableOpacity>

          <TouchableOpacity 
          onPress={this.showContactModal.bind(this)}
          style={{borderRadius: 20,
          borderWidth: 1,
          borderColor: '#d3d3d3',
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 4,
          marginTop:15,
          paddingLeft:10,
          flexDirection:'row',
          alignItems:'center'}}>
          <Image source={require('../../Resources/Images/contact_us.png')} style={{width:30, height:30}} />
            <Text style={{color:'#000', fontSize:18, paddingLeft:20, paddingTop:10, paddingBottom:10}}> Contact </Text>
            </TouchableOpacity>
        <View style={{
        alignItems:'center',}}>
        <Button style={{borderRadius: 20,
          borderWidth: 2,
          borderColor: '#000',
          backgroundColor: '#fff',
          color: '#ffffff',
          elevation: 4,
          paddingLeft:20,
          paddingRight:20,
          marginTop:15,}}
        btpress={()=>(firebase.auth().signOut() 
        .then(function() {
          this.props.navigation.navigate('LoginForm',{screen:'LoginForm'})
          })
          .catch(function(error) {  
          // An error happened
        }))}>Log Out</Button>
        </View>
            </View>
            </ImageBackground>
          );
  }
}

export default ScreenThree;