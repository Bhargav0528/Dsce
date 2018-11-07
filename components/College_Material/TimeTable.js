import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  BackHandler,
  Picker,
  TouchableOpacity
} from 'react-native';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import firebase from 'firebase';
import PinchZoomView from 'react-native-pinch-zoom-view';
import { Firebase } from 'react-native-firebase';

export default class TimeTable extends Component{
  static navigationOptions = {
    header: null,
  };
  state = {uri:'https://facebook.github.io/react-native/docs/assets/favicon.png', user:[], uid:'',
  tableHead: ['Day','9:00-10:00', '10:00-11:00', 'Break', '11:15-12:15', '12:15-1:15','Break', '2:00-3:00', '3:00-4:00', '4:00-5:00'],
  tableTitle: ['Mon','Tue', 'Wed','Thu','Fri','Sat'],
      widthArr: [60, 120, 120, 40, 120,120, 40, 120, 120, 120],
      ttdata:{},
      edit:false,
      subjects:['ADA','OS','MP','M-IV','UNIX','PYTHON','ADAL','MPL'],
      tableDat:[],
      faculty:'',
      sem:'3',
      section:'A',
      branch:'',
      branchModify:{'computer_science':'Computer Science', 'civil_engineering':'Civil Engineering'}
}
  uri= 'maga'
  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
    console.log("Will Mount")
    this.setState({uid: firebase.auth().currentUser.uid})
    console.log(this.state.faculty)
    if(!this.state.faculty==true && !this.state.faculty=='')
    {
      console.log(this.state.faculty)
    //firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snapshot)=>{firebase.database().ref(`branch/${snapshot.val().branch}/timetable/sem_${snapshot.val().sem}/${snapshot.val().section}/url`).on('value', (snapshot1)=>{this.setState({uri: snapshot1.val()})})})
    firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snapshot)=>{firebase.database().ref(`branch/${snapshot.val().branch}/timetable/sem_${snapshot.val().sem}/B`).on('value', (snapshot1)=>{this.setState({ttdata: snapshot1.val(), branch: snapshot.val().branch})})})
    }
  }

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true
}

  firebaseUpload(){
    firebase.database().ref(`branch/computer_science/timetable/sem_4/B`).set({
      Mon: this.state.tableDat[0].slice(1,this.state.tableDat[0].length).join(','),
      Tue: this.state.tableDat[1].slice(1,this.state.tableDat[1].length).join(','),
      Wed: this.state.tableDat[2].slice(1,this.state.tableDat[2].length).join(','),
      Thu: this.state.tableDat[3].slice(1,this.state.tableDat[3].length).join(','),
      Fri: this.state.tableDat[4].slice(1,this.state.tableDat[4].length).join(','),
      Sat: this.state.tableDat[5].slice(1,this.state.tableDat[5].length).join(','),
    },()=>{
      firebase.database().ref('news/' + (99999999999-Math.floor(Date.now() / 1000))).set({
        category: 3,
        text: `TimeTable has been altered for ${this.state.branchModify[this.state.branch]}, Sem ${this.state.sem}`,
        description : `Please refer the timetable, TimeTable has been altered for ${this.state.branchModify[this.state.branch]}, Sem ${this.state.sem} Section - ${this.state.section}.`,
        year:new Date().getFullYear(),
        month:new Date().getMonth(),
        date:new Date().getDate(),
        hour:new Date().getHours(),
        minutes:new Date().getMinutes()
      }, ()=>{
        this.setState({edit:false})
      });
      
    })
    
  }

 componentDidMount(){
    console.log('Calleddd?')
    firebase.database().ref(`branch/${this.state.user.branch}`).on('value', (snapshot)=>{ 
      firebase.database().ref().child('users').child(firebase.auth().currentUser.uid).on('value', (snap)=>{
        if(snap.val().faculty == true)
        {
          this.setState({faculty:snap.val().faculty, branch:snap.val().branch})
          
        }
        else{
          console.log(`branch/${snap.val().branch}/sem_${snap.val().sem}/B`)
          firebase.database().ref(`branch/${snap.val().branch}/timetable/sem_${snap.val().sem}/B`)
          .on('value', (snapshot1)=>{this.setState({ttdata: snapshot1.val(), branch: snap.val().branch})})
        }
      this.uri =  snapshot.val()})
    })
  } 

  fetchTimetable(){
    if(this.state.sem == "1" || this.state.sem == "2")
    {
      console.log("Less than")
      firebase.database().ref(`firstyear/timetable/sem_${this.state.sem}/${this.state.section}`).on('value', 
      (snapshot1)=>{this.setState({ttdata: snapshot1.val()})})
    }
    else
    {
      console.log(typeof this.state.faculty, `branch/${this.state.branch}/timetable/sem_${this.state.sem}/${this.state.section}`  )
      firebase.database().ref(`branch/${this.state.branch}/timetable/sem_${this.state.sem}/${this.state.section}`)
      .on('value', (snapshot1)=>{this.setState({ttdata: snapshot1.val()})})
    }
  }


  facultymode(){
    const EditTT = (data,rowindex,colindex)=>{
      return(
        <TouchableOpacity onPress={() => {}}>
        <View style={styles.btn}>
          <Picker
              selectedValue = {this.state.tableDat[rowindex][colindex]}
              onValueChange= {(itemValue, itemIndex) => {
                let fullData = this.state.tableDat
                fullData[rowindex][colindex] = itemValue
                this.setState({tableDat: fullData})}}
              mode="dialog"
              style={{flex:1}}>
              <Picker.Item label={this.state.subjects[0]} value={this.state.subjects[0]} />
              <Picker.Item label={this.state.subjects[1]} value={this.state.subjects[1]} />
              <Picker.Item label={this.state.subjects[2]} value={this.state.subjects[2]} />
              <Picker.Item label={this.state.subjects[3]} value={this.state.subjects[3]} />
              <Picker.Item label={this.state.subjects[4]} value={this.state.subjects[4]} />
              <Picker.Item label={this.state.subjects[5]} value={this.state.subjects[5]} />
              <Picker.Item label={this.state.subjects[6]} value={this.state.subjects[6]} />
              <Picker.Item label={this.state.subjects[7]} value={this.state.subjects[7]} />
              <Picker.Item label="-" value="-" />
            </Picker>
        </View>
      </TouchableOpacity>
      )}
    const state = this.state;
    const tableData = [];
    const columns = [];
    if(this.state.tableDat.length==0)
    {
      console.log('Data', this.state.tableDat.length)
    if (typeof this.state.ttdata !== "undefined")
    {
    inistr = this.state.ttdata.Mon
    if(typeof inistr === "string")
    {
      for (let i = 0; i < 6; i += 1) {
        const day = this.state.tableTitle[i];
        const dayrow = this.state.ttdata[day].split(',')
        dayrow.splice(0, 0, day);
        tableData.push(dayrow);
        console.log('dada',tableData)
      }
      this.setState({tableDat:tableData})
    }
    //console.log('DATA:',daytemp); 
  }
}
    if(this.state.faculty)
    {
      if(!this.state.edit)
      {
        return(
          
          <View style={{flex: 1,backgroundColor:'#ffe3c6'}}>
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
            onPress={this.fetchTimetable.bind(this)}>
            <View style={{flex:1 , justifyContent:'center'}}>
              <Text style={{fontSize:16, color:'#000'}}>Done</Text>
              </View>
              </TouchableOpacity>
            </View>
          <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    {
                      this.state.tableDat.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArr}
                          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                          textStyle={styles.text}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
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
              onPress={()=>{ this.setState({edit:true}) }}>


              <Image source={require('../../Resources/Images/edit.png')} 
          
          style={{resizeMode: 'contain',
          width: 50,
          height: 50,
          tintColor:'#272727'}} />
        </TouchableOpacity>
          </View>
          );
      }
          
    else
    {
      console.log('Tureee')
      return(
        <View style={{flex: 1,backgroundColor:'#ffe3c6'}}>
        <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                  {
                    this.state.tableDat.map((rowData, index) => (
                      <Row
                        key={index}
                        data={[rowData[0],EditTT(rowData[1],index,1),EditTT(rowData[2],index,2),
                          rowData[3],EditTT(rowData[4],index,4),EditTT(rowData[5],index,5),
                          rowData[6],EditTT(rowData[7],index,7),EditTT(rowData[8],index,8),
                          EditTT(rowData[9],index,9)]}
                        widthArr={state.widthArr}
                        style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
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
              onPress={this.firebaseUpload.bind(this)}>


              <Image source={require('../../Resources/Images/finish.png')} 
          
          style={{resizeMode: 'contain',
          width: 50,
          height: 50,
          tintColor:'#272727'}} />
        </TouchableOpacity>
        </View>
        );
    }
      
    }
    else
    {
      
      return(
        <View style={{flex: 1,backgroundColor:'#ffe3c6'}}>
          <ScrollView horizontal={true}>
              <View>
                <Table borderStyle={{borderColor: '#C1C0B9'}}>
                <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
                </Table>
                <ScrollView style={styles.dataWrapper}>
                  <Table borderStyle={{borderColor: '#C1C0B9'}}>
                    {
                      this.state.tableDat.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={state.widthArr}
                          style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                          textStyle={styles.text}
                        />
                      ))
                    }
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
            </View>
      )
    }
  }
  
  
  render()
  {
    console.log('Data', this.state.tableDat.length)
    console.log("data:", this.state.tableDat)
    return(
      <View style={{flex:1}}>
    {this.facultymode()}
    </View>
    )


  }

}




const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  btn: { width:'100%',height:28, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});