import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'firebase';
export default class QuestionandAns extends React.Component {
  state = { dailyques: {},keys:{},usn:'', flag:null};

  static navigationOptions = {
    header: null,
  };
    // ----------------------------- change userid, date, sem

  componentDidMount() {
    var daily = {};
    var att_status = [];
    var usns = [];
    var flag = false;

    var date = new Date().getDate()
    var mon = new Date().getMonth()
    var year = new Date().getFullYear()

    var finalDate = date+"-"+mon+1+"-"+year
    

    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).on('value',(user)=>{
    firebase.database().ref(`branch/computer_science/attendance/sem_${user.val().sem}`).on('value',(status)=>{
      console.log(status.val())
      if(status.val()!=null)
      {
        if(Object.keys(status.val()).length!=0)
        {
          console.log("ss")
      usns = status.val()['usns']
      att_status = status.val()[finalDate]
      if(usns!=undefined)
      {
      usns = usns.split(",")
      var index = -1;
      for (var i = 0; (i < usns.length) && (index == -1); i++) {
        if (usns[i] == user.val().usn) {
            index = i;
            flag = true
        }
    }
      }

      if(att_status!=undefined)
      {
      att_status = att_status.split(",")

      if(att_status[index]!="A")
      {
           console.log(index,flag,att_status) 
           firebase
      .database()
      .ref(`/branch/computer_science/question_answer/${finalDate}`)
      .on('value', snap => {

          var keys1 = {}
        var dailyques = {}

          if(snap.val()!=null && snap.val()!=undefined)
          {
          Object.keys(snap.val()).map(key=>{
          daily[key]="a"
        })
      
        
      Object.keys(snap.val()).map(quescon => {
        if(snap.val()[quescon]["results"]!=undefined)
        {
        if(!snap.val()[quescon]["results"].hasOwnProperty(user.val().usn))
        {
          
          console.log("www",quescon)
          dailyques[quescon] = snap.val()[quescon]
          keys1[quescon] = "b"
        }
      }
      })
    
    }
      

          console.log("aaaaa",Object.keys(dailyques).length)

          if(Object.keys(dailyques).length!=0)
          {
          this.setState({ dailyques: dailyques, keys:keys1,usn:user.val().usn ,flag:true});
          }
          else
          {
            this.setState({ dailyques: dailyques, keys:keys1,usn:user.val().usn ,flag:"over"});
          }
        })
      }
      else
      {
        this.setState({ flag:false });
      }
      }
        }
         
       
      
      }
      else
      {
        console.log("ssa")
         this.setState({flag:null})
      }
     
    })
    

    });
    //this.setState({dailyques:new Date().getMonth()})
  }

  submitAnswer()
  {
    var expected_ans = []
    var sub_ans = []

    var date = new Date().getDate()
    var mon = new Date().getMonth()
    var year = new Date().getFullYear()

    var finalDate = date+"-"+mon+1+"-"+year

    var keys = Object.keys(this.state.keys)
    Object.values(this.state.dailyques).map(ques=>{
      expected_ans.push(ques.answer)
    })
    Object.values(this.state.keys).map(sub=>{
      sub_ans.push(sub)
    })
    console.log(expected_ans, sub_ans, keys, this.state.usn)
    
    var results = {}
    var ctr = 0
    

    keys.forEach(key=>{
      let answer = ""
      if(expected_ans[ctr]==sub_ans[ctr])
      {
          answer = "yes"
      }
      else{
        answer = "no"
      }
      firebase.database().ref(`branch/computer_science/question_answer/${finalDate}/${key}/results/${this.state.usn}`).set  (answer)
    ctr=ctr+1
    })

    this.setState({dailyques: {},keys:{},flag:"over"})
    
  }

  renderQues(){
    var counter = 0
    if(this.state.flag=="over")
    {
       return <Text> You have either submitted the answers for all the questions or the questions are not uploaded for today</Text>
    }
    else if(this.state.flag)
    {
      

    return <ScrollView>
      {
       Object.keys(this.state.dailyques).map(quescon => {
         counter = counter +1
          return <View style={{marginBottom:15}}>
          <View style={{flexDirection:'row',marginBottom:10}}>
          <Text style={{marginRight:10}}> {counter}</Text>
          <Text style={{color:'#000'}}>{this.state.dailyques[quescon].question}</Text> 
          </View>
          
          <View style={{marginLeft:30,marginRight:50}}>


          <TouchableOpacity style={{backgroundColor:(Object.values(this.state.keys)[counter-1]=="a")?"#4DB6AC":"#448AFF",padding:6, borderRadius:10, marginBottom:5}} onPress={
            ()=>{
             let daily = this.state.keys
             daily[quescon] = "a"
             this.setState({keys:daily})
            }
          }>
          <Text style={{color:'#000',marginBottom:5}}>a) {this.state.dailyques[quescon].option1}</Text> 
          </TouchableOpacity>


          <TouchableOpacity style={{backgroundColor:(Object.values(this.state.keys)[counter-1]=="b")?"#4DB6AC":"#448AFF",padding:6, borderRadius:10, marginBottom:5}} onPress={
            ()=>{
             let daily = this.state.keys
             daily[quescon] = "b"
             this.setState({keys:daily})
            }
          }>
          <Text style={{color:'#000',marginBottom:5}}>b) {this.state.dailyques[quescon].option2}</Text> 
          </TouchableOpacity>


          <TouchableOpacity style={{backgroundColor:(Object.values(this.state.keys)[counter-1]=="c")?"#4DB6AC":"#448AFF",padding:6, borderRadius:10, marginBottom:5}} onPress={
            ()=>{
             let daily = this.state.keys
             daily[quescon] = "c"
             this.setState({keys:daily})
            }
          }>
          <Text style={{color:'#000',marginBottom:5}}>c) {this.state.dailyques[quescon].option3}</Text> 
          </TouchableOpacity>


          <TouchableOpacity style={{backgroundColor:(Object.values(this.state.keys)[counter-1]=="d")?"#4DB6AC":"#448AFF",padding:6, borderRadius:10, marginBottom:5}} onPress={
            ()=>{
             let daily = this.state.keys
             daily[quescon] = "d"
             this.setState({keys:daily})
            }
          }>
          <Text style={{color:'#000',marginBottom:5}}>d) {this.state.dailyques[quescon].option4}</Text> 
          </TouchableOpacity>
          </View>
          </View>

    })
      
    }
    
    <TouchableOpacity style={{alignSelf:'center', backgroundColor:'#272727',padding:10,paddingRight:15,paddingLeft:15,  borderRadius:16}} onPress={this.submitAnswer.bind(this)}>
      <Text style={{color:'orange'}}>Submit</Text>
    </TouchableOpacity>
    </ScrollView>
    }
    else if(this.state.flag==null){
        return <Text> The Attendace for today is not updated or this feature is not available for your sem </Text>
    }
    else if(!this.state.flag)
    {
      return <Text> You were absent for the class</Text>
    }
    
    
  }





  render() {
    console.log(this.state)
    let counter = 0
    return(
      <View style={{ width:'100%', height:'100%'}}>
      <View style={{height:'10%', width:'100%', backgroundColor:'#272727', alignItems:'center',justifyContent:'center',elevation:12, marginBottom:10 }}>
        <Text style={{color:'orange', fontSize:22}}>Daily Questions( beta )</Text>
      </View>
      {this.renderQues()}
    </View>
    );
  }
}