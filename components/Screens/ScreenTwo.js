import React, { Component } from 'react';
import { Text, View,Image,ScrollView } from 'react-native'; 
import StuffIndex from '../College_Material/StuffIndex.js';
import Calender from '../College_Material/Calender.js';
import TimeTable from '../College_Material/TimeTable.js';
import Notes from '../College_Material/Notes.js';
import ExamSection from '../College_Material/ExamSection';
import ExamUploads from '../College_Material/ExamUploads';
import StudentFeedback from '../College_Material/StudentFeedback';
import ImageViewer from '../common/ImageViewer';
import { createStackNavigator } from 'react-navigation';
class ScreenTwo extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#f3f3f3'}}>
        <Stack />
      </View>
    );
  }
}

const Stack = createStackNavigator({
  StuffIndex: {screen: StuffIndex},
  Calender: {screen: Calender},
  TimeTable: {screen: TimeTable},
  Notes: {screen: Notes},
  ExamSection: {screen:ExamSection},
  ExamUploads: {screen: ExamUploads},
  ImageViewer: {screen: ImageViewer},
  StudentFeedback: {screen: StudentFeedback}
  }
)

export default ScreenTwo;