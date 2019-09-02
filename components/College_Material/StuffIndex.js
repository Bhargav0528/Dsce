import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ToastAndroid
} from 'react-native';
import { Button, Card } from '../common';
class StuffIndex extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('../../Resources/Images/neverForget.jpg')}
          style={{ width: '100%', height: '40%' }}
        />
        <ScrollView
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: '#f3f3f3',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Calender', {
                  screen: 'Calender',
                })
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/calendar.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>Calender</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('TimeTable', {
                  screen: 'TimeTable',
                })
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/timetable.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>TimeTable</Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Notes', { screen: 'Notes' })
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/books.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>Notes</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                //this.props.navigation.navigate('ExamSection', {
                 // screen: 'ExamSection',
                //})
                {
                  ToastAndroid.show("This feature will be available in future updates", ToastAndroid.LONG)
                }
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/exam.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>Exam Section</Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
               // this.props.navigation.navigate('StudentFeedback', {
               //   screen: 'StudentFeedback',
                //})
                {
                  ToastAndroid.show("This feature will be available in future updates", ToastAndroid.LONG)
                }
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/feedback.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>Student Feedback</Text>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('QuestionandAns', {
                  screen: 'QuestionandAns',
                })
              }>
              <Card
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  borderRadius: 20,
                  padding: 15,
                }}>
                <Image
                  source={require('../../Resources/Images/qanda.png')}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ alignItems: 'center' }}>Daily Questions</Text>
              </Card>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 10,
  },
});

export default StuffIndex;
