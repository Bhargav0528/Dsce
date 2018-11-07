import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View,Image,ScrollView } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import Notifications from '../Tabs/Notifications';
import Events from '../Tabs/Events';
import RegisterEvent from '../Tabs/RegisterEvent';
import ImageViewer from '../common/ImageViewer';

const TopTab = createMaterialTopTabNavigator({
  Notifications: {screen:Notifications},
  Events: createStackNavigator({
    Events: { screen: Events },
    RegisterEvent : {screen : RegisterEvent},
    ImageViewer: { screen: ImageViewer },
  })
},
{
    navigationOptions: {
      tabBarPosition: 'top',
      tabBarOptions: {
        activeTintColor: 'orange',
        style: {
          backgroundColor: '#272727',
        },
      },
    },
  }
)
class ScreenOne extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <TopTab />
      </View>
    );
  }
}

export default ScreenOne;