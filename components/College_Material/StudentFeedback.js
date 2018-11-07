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
import firebase from 'firebase';
import PureChart from 'react-native-pure-chart';

export default class StudentFeedback extends Component{

  static navigationOptions = {
    header: null,
  };

    state = {subjects:['maths','english','science'], i:0,profcurrent:'hello',profs:['Anupama', 'Vindhya', 'RameshBabu', 'Asnika', 'Poornima', 'Rashmi'], profsuid:{'Anupama':'We0WT6hWVpSPL0QPPQDkz5wCNw72'},
            Q1:0,Q2:0,Q3:0,Q4:0,Q5:0,Q6:0,Q7:0,Q8:0,Q9:0,Q10:0, sem:'', section:'', branch:'',
            fQ1:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ2:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ3:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ4:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ5:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ6:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ7:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ8:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ9:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            fQ10:{'Outstanding':1,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
            
            ,faculty:false,
            facultiesList:{},
            facs:[],
            
            ratings:{'5':'Outstanding', '4':'Very Good', '3':'Good', '2':'Fair', '1':'Poor'},
            standardRating:{'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0},
            feedbacks:null,
            uid:''
            }


    componentWillMount()
    {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value',(snapshot)=>{

          if(snapshot.val().faculty)
          {
            firebase.database().ref(`branch/${snapshot.val().branch}/feedback/${firebase.auth().currentUser.uid}`).on('value', (snap)=>{
              this.setState({ branch:snapshot.val().branch, faculty:snapshot.val().faculty, feedbacks:snap.val(), uid:firebase.auth().currentUser.uid})
            })
            
          }
          else{
            var arr= []
                firebase.database().ref(`branch/${snapshot.val().branch}/faculties`).on('value',(snap1)=>{
                  Object.keys(snap1.val()).map(name=>{
                    arr.push(<Picker.Item label={name} value={snap1.val()[name].uid}/>)
                  })
                  this.setState({sem:snapshot.val().sem, section:snapshot.val().section, branch:snapshot.val().branch, faculty:snapshot.val().faculty,facultiesList:snap1.val(), facs:arr
                    })
                  
                })
                
          }
            
        })
    }

    sumObjects(obj1, obj2)
    {
      let sum = {};

      Object.keys(obj1).forEach(key => {
        if (obj2.hasOwnProperty(key)) {
          sum[key] = obj1[key] + obj2[key]
        }  
      })
      return sum;
    }

    uploadFeedback(){
        firebase.database().ref(`branch/${this.state.branch}/feedback/${this.state.profcurrent}/sem_${this.state.sem}/${this.state.section}`).once('value',(snap)=>{
            if(snap.val()==null)
            {
                firebase.database().ref(`branch/${this.state.branch}/feedback/${this.state.profcurrent}/sem_${this.state.sem}/${this.state.section}`).set({
                    Q1:this.state.fQ1,
                    Q2:this.state.fQ2,
                    Q3:this.state.fQ3,
                    Q4:this.state.fQ4,
                    Q5:this.state.fQ5,
                    Q6:this.state.fQ6,
                    Q7:this.state.fQ7,
                    Q8:this.state.fQ8,
                    Q9:this.state.fQ9,
                    Q10:this.state.fQ10
                },()=>{
                  this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
                  this.setState({i:this.state.i+1})
                  return
                })
            }
            else{
              console.log('ELSEE')
              
              let fQues1 = this.sumObjects(snap.val().Q1, this.state.fQ1)
              let fQues2 = this.sumObjects(snap.val().Q2, this.state.fQ2)
              let fQues3 = this.sumObjects(snap.val().Q3, this.state.fQ3)
              let fQues4 = this.sumObjects(snap.val().Q4, this.state.fQ4)
              let fQues5 = this.sumObjects(snap.val().Q5, this.state.fQ5)
              let fQues6 = this.sumObjects(snap.val().Q6, this.state.fQ6)
              let fQues7 = this.sumObjects(snap.val().Q7, this.state.fQ7)
              let fQues8 = this.sumObjects(snap.val().Q8, this.state.fQ8)
              let fQues9 = this.sumObjects(snap.val().Q9, this.state.fQ9)
              let fQues10 = this.sumObjects(snap.val().Q10, this.state.fQ10)

              firebase.database().ref(`branch/${this.state.branch}/feedback/${this.state.profcurrent}/sem_${this.state.sem}/${this.state.section}`).set({
                  Q1:fQues1,
                  Q2:fQues2,
                  Q3:fQues3,
                  Q4:fQues4,
                  Q5:fQues5,
                  Q6:fQues6,
                  Q7:fQues7,
                  Q8:fQues8,
                  Q9:fQues9,
                  Q10:fQues10
                },
                ()=>{
                  console.log('Dones')
                  this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
                  this.setState({i:this.state.i+1, profcurrent:'hi'})
                  return
                })
            }
            
        })
        
    }
    renderFaculties(){

      try{
      
      if(!this.state.facultiesList=='')
      {
        console.log("Reached render Faculties")
         Object.keys(this.state.facultiesList).map(
          name =>{
            return <Picker.Item label = "adsdas" value='-' key={name}/>
          }
        )
      }
    }
    catch(error){
      return <Picker.Item label="dasd" value="-" />
    }
      
    }
    renderFeedback(){
      const arr = []
      console.log("Facydasd",this.state.facultiesList)
        if(this.state.i < this.state.subjects.length -1 )
        {
          return(
              <View>
                <View style={{alignItems:'center', backgroundColor:'#03A9F4' , padding:10, borderBottomWidth:1,borderColor:'#d3d3d3'}}>
                <Text style={{fontSize:18, color:'#000'}}>Subject : {this.state.subjects[this.state.i]}</Text>
                </View>
                <View style={{flexDirection:'row', backgroundColor:'#039BE5', justifyContent:'center', marginBottom:10}}>
                <Text style={{fontSize:18, color:'#000', paddingLeft:20,paddingRight:20, paddingTop:15}}>Faculty</Text>
                <Picker
                selectedValue = {this.state.profcurrent}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({profcurrent: itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#0277BD', flex:1}}>
                {
                  this.state.facs
                }
                <Picker.Item label=" Click to Choose Faculty" value='-'/>
                <Picker.Item label={String(this.state.profs[0])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72'/>
                <Picker.Item label={String(this.state.profs[1])} value='dd' />
                <Picker.Item label={String(this.state.profs[2])} value='fd'/>
                <Picker.Item label={String(this.state.profs[3])} value='rr' />
                <Picker.Item label={String(this.state.profs[4])} value='dsd' />
                <Picker.Item label={String(this.state.profs[5])} value='asasas' />
                <Picker.Item label="-" value="-" />
                </Picker>
                </View>
            
            <View>
            <View>
              <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q1: Punctuality and Engaging the class Full Time</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q1}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q1 = {}
                    Q1 = standardRating
                  this.setState({Q1 : itemValue, fQ1:Q1})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q2: Organization of the Lecture</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q2}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q2 = {}
                    Q2 = standardRating
                  this.setState({Q2 : itemValue, fQ2:Q2})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q3: Delivery of the lecture</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q3}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q3 = {}
                    Q3 = standardRating
                  this.setState({Q3 : itemValue, fQ3:Q3})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q4: Teacher's voice while teaching</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q4}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q4 = {}
                    Q4 = standardRating
                  this.setState({Q4 : itemValue, fQ4:Q4})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q5: Pace of teaching</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q5}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q5 = {}
                    Q5 = standardRating
                  this.setState({Q5 : itemValue, fQ5:Q5})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q6: Utilization of blac board and other Teaching aids</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q6}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q6 = {}
                    Q6 = standardRating
                  this.setState({Q6 : itemValue, fQ6:Q6})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q7: Percentage of Portions covered</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q7}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q7 = {}
                    Q7 = standardRating
                  this.setState({Q7 : itemValue, fQ7:Q7})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q8: Internal assessment Evaluation</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q8}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q8 = {}
                    Q8 = standardRating
                  this.setState({Q8 : itemValue, fQ8:Q8})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q9: Motivation to students</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q9}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q9 = {}
                    Q9 = standardRating
                  this.setState({Q9 : itemValue, fQ9:Q9})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60, marginBottom:15}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <View style={{backgroundColor:'#4DB6AC'}}> 
                <Text style={{fontSize:16, color:'#000', paddingTop:15, paddingBottom:15}}>Q10: Approachable/ Clarifies the doubts</Text>
                </View>
                <Picker
                selectedValue = {this.state.Q10}
                onValueChange= {(itemValue, itemIndex) => {
                    var ratingclass = this.state.ratings[itemValue]
                    var standardRating ={'Outstanding':0,'Very Good':0, 'Good':0, 'Fair':0, 'Poor':0}
                    standardRating[ratingclass] = 1
                    var Q10 = {}
                    Q10 = standardRating
                  this.setState({Q10 : itemValue, fQ10:Q10})}}
                mode="dialog"
                style={{backgroundColor:'#9575CD', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
            
                <TouchableOpacity onPress={this.uploadFeedback.bind(this)}>
                    <Text style={{fontSize:18,backgroundColor:'#FB8C00', paddingTop:15,paddingBottom:15}}> Save and Go to next Section</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                    </View>
          )
        }
        else
        {
            return(
                <View>
                <View style={{alignItems:'center'}}>
                <Text>Subject : {this.state.subjects[this.state.i]}</Text>
                </View>
                <View style={{alignItems:'center'}}>
                <Text>Choose the respective Faculty</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Text>Faculty</Text>
                <Picker
                selectedValue = {this.state.profcurrent}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({profcurrent: itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', flex:1}}>
                <Picker.Item label='Anupama' value='We0WT6hWVpSPL0QPPQDkz5wCNw72'/>
                <Picker.Item label={String(this.state.profs[1])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72' />
                <Picker.Item label={String(this.state.profs[2])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72'/>
                <Picker.Item label={String(this.state.profs[3])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72' />
                <Picker.Item label={String(this.state.profs[4])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72' />
                <Picker.Item label={String(this.state.profs[5])} value='We0WT6hWVpSPL0QPPQDkz5wCNw72' />
                <Picker.Item label="-" value="-" />
                </Picker>
                </View>
            
            <View>
            <View>
                <Text>Q1: Punctuality and Engaging the class Full Time</Text>
                <Picker
                selectedValue = {this.state.Q1}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q1 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q2: Organization of the Lecture</Text>
                <Picker
                selectedValue = {this.state.Q2}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q2 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q3: Delivery of the lecture</Text>
                <Picker
                selectedValue = {this.state.Q3}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q3 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q4: Teacher's voice while teaching</Text>
                <Picker
                selectedValue = {this.state.Q4}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q4 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q5: Pace of teaching</Text><Picker
                selectedValue = {this.state.Q5}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q5 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q6: Utilization of blac board and other Teaching aids</Text>
                <Picker
                selectedValue = {this.state.Q6}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q6 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q7: Percentage of Portions covered</Text>
                <Picker
                selectedValue = {this.state.Q7}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q7 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q8: Internal assessment Evaluation</Text>
                <Picker
                selectedValue = {this.state.Q8}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q8 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q9: Motivation to students</Text>
                <Picker
                selectedValue = {this.state.Q9}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q9 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                <Text>Q10: Approachable/ Clarifies the doubts</Text>
                <Picker
                selectedValue = {this.state.Q10}
                onValueChange= {(itemValue, itemIndex) => {
                  this.setState({Q10 : itemValue})}}
                mode="dialog"
                style={{backgroundColor:'#d3d3d3', height:60}}>
                <Picker.Item label="Outstanding" value='5'/>
                <Picker.Item label="Very Good" value='4' />
                <Picker.Item label="Good" value='3' />
                <Picker.Item label="Fair" value='2' />
                <Picker.Item label="Poor" value='1' />
                </Picker>
                </View>
                <View>
                  <TouchableOpacity>
                      <Text style={{fontSize:18,backgroundColor:'#d3d3d3'}}>Submit</Text>
                      </TouchableOpacity>
                      </View>
                      </View>
                      </View>
            )
        }
    }


    renderRatings(sem,section){

       return Object.keys(this.state.feedbacks[sem][section]).map(                       
        ques=>
        <View style={{margin:15}}>
          <Text style={{fontSize:20}}>{ques}</Text>
          
          <PureChart data={[{x:'Outstanding',y:this.state.feedbacks[sem][section][ques].Outstanding},
          {x:'Very Good',y:this.state.feedbacks[sem][section][ques]['Very Good']}
            ,{x:'Good',y:this.state.feedbacks[sem][section][ques].Good},
            {x:'Fair',y:this.state.feedbacks[sem][section][ques].Fair},
            
            {x:'Poor',y:this.state.feedbacks[sem][section][ques].Poor}]
          } type='line' />
        </View>
      )
    }
    renderGraphs(){
      if(this.state.feedbacks!=null)
                      {
                      return Object.keys(this.state.feedbacks).map(sem=>
                          Object.keys(this.state.feedbacks[sem]).map(section=>
                            
                              <View style={{flex:1}}>
                              <View style={{alignItems:'center', backgroundColor:'#03A9F4' , padding:10, borderBottomWidth:1,borderColor:'#d3d3d3'}}>
                                <Text style={{fontSize:18, color:'#000' }}>Semester: {`${sem.split('_')[1]}`}</Text>
                                </View>
                                <View style={{alignItems:'center', backgroundColor:'#03A9F4' , padding:10, borderBottomWidth:1,borderColor:'#d3d3d3'}}>
                                <Text style={{fontSize:18, color:'#000'}}>Section: {section}</Text>
                                </View>
                                { this.renderRatings(sem,section) }
                                
                              </View>
                            
                          )
                      )
                      }
    }

    renderStudTeac(){
      if(this.state.faculty)
      {
        console.log('Hey', this.state.feedbacks)
        return(
          <ScrollView style={{flex:3}} ref='_scrollView'>
                  {
                      this.renderGraphs()
                  }
          </ScrollView>)
      }
      else
      {
        return(
        <ScrollView style={{flex:1}} ref='_scrollView'>
                {
                    this.renderFeedback()
                }
        </ScrollView>)
      }
                
    }

    render(){
        console.log(this.state.fQ10)
        return(
            <View style={{flex:1, backgroundColor:'#fff'}}>
                <View  style={{alignItems:'center'}}>
                <Text style={{fontSize:24, color:'#000' }}>Student Feedback</Text>
                </View>

                {this.renderStudTeac()}
                
            </View>
        )
    }
}