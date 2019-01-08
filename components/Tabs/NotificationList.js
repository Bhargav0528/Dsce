import React from 'react';
import { View,Text, Image, TouchableOpacity,ImageBackground, Modal, PixelRatio } from 'react-native';
import { Card, CardSection } from '../common';

class NotificationList extends React.Component {

  state={DescriptionVisibility:false}

  f = 1;

  
  constructor(props) {
    super(props);
    this.f = PixelRatio.getFontScale()
  }


  DescriptionModal(){
    return(
      <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center'}}>
    <Modal
          visible={this.state.DescriptionVisibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.closeDescription(!this.state.DescriptionVisibility)} } >
    <View style={{flex:1,justifyContent: 'center' ,alignItems: 'center',
    left: 0,
    top: 0,
    backgroundColor: '#00000070',width:'100%', height:'100%'}}>
    <Card style={{ width:'100%', height:'50%',flexDirection:'column', alignItems: 'center', justifyContent: 'center', borderRadius:25, borderWidth:0,borderColor:'orange'}}>
      
      <View style={{height:'50%',width:'100%', backgroundColor:'orange', borderTopLeftRadius:25, borderTopRightRadius:25, justifyContent:'center', alignItems:'center'}} >
      <Text style={{color:'#000', padding:10, fontSize:22}}>{data.text}</Text>
      </View>
      <View style={{height:'50%'}}>
      <Text style={{color:'#000', padding:10, fontSize:18,}}>{data.description}</Text>
      </View>
    
   </Card>
   </View>
   </Modal>
   </View>
    )
  }
  showDescription(){
    this.setState({DescriptionVisibility:true})
  }
  closeDescription(visible){
    this.setState({DescriptionVisibility:visible})
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


  render()
  {
    console.log("f", this.f)
    data = this.props.data
    console.log(data)
    var description = data.description
    if(data.description.length>90 )
    {
    var description = data.description.substring(0,90) + '...more'
    }
    console.log("Hey"+typeof data.category);
    const { cardViewStyle, categoryViewStyle } = styles;
    const imgArray = [require('../../Resources/Images/Category/holiday.png'),require('../../Resources/Images/Category/branchrelated.png'),
    require('../../Resources/Images/Category/notice.png'),require('../../Resources/Images/Category/timetable.png'),
    require('../../Resources/Images/Category/notes.png')]
    const colorArray = ['blue','orange','red','black','green']
    return(
      <TouchableOpacity onPress={this.showDescription.bind(this)} >
      {this.DescriptionModal()}
      <Card style={cardViewStyle}>
      <View style={{ justifyContent:'center',width:'15%',borderTopLeftRadius: 10,borderBottomLeftRadius:10, backgroundColor:'#272727'}}>
        <View style={{height:50,padding:5, justifyContent:'center',backgroundColor:'#272727'}}>
          <Image source={imgArray[parseInt(data.category)]} style={{width:undefined,height:undefined, flex:1, tintColor:colorArray[parseInt(data.category)]}} resizeMode='contain'/>
        </View>
        </View>
        <CardSection style={{backgroundColor : '#fff', flexDirection:'column', borderRadius: 10,width:'90%'}}>
          <View style={{width:'90%',flexDirection:'row',justifyContent:'space-between'}}>
          <Text style={{width:'80%',fontSize:this.f*18, color:'#000000', fontStyle:'normal'}} numberOfLines={2} ellipsizeMode="tail">{data.text}</Text>
          <Text style={{fontSize:this.f*14, color:'#2979FF', fontStyle:'normal'}} >{this.showTime(data)}</Text>
          </View>
          <View style={{width:'95%'}}>
          <Text  numberOfLines={2} ellipsizeMode="tail" style={{paddingRight:10}}>{description}</Text>
          </View>
        </CardSection>
      </Card>
      </TouchableOpacity>
      );
  }
}


const styles = {
  cardViewStyle:{
    borderRadius: 10,
    flexDirection:'row',
    height:100,  
    elecation:6,
    borderColor:'#fff'
  },
  categoryViewStyle:{
    alignItems: 'flex-start'
  },
  
  
}

export default  NotificationList;