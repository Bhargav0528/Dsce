import React from 'react';
import { View, Text, Image } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';

const Tab = createBottomTabNavigator(
  {
    ScreenOne: {
      screen: ScreenOne,
      navigationOptions: {
        tabBarIcon: ({ focused,tintColor })=>(
          focused?
          <Image
            source={require('../../Resources/Images/announce.png')}
            style={{ width: 40, height: 40, tintColor: 'orange' }}
          />
          :
          <Image
            source={require('../../Resources/Images/announce.png')}
            style={{ width: 30, height: 30 }}
          />
          ),
      }
    },
    ScreenTwo: {
      screen: ScreenTwo,
       navigationOptions: {
        tabBarIcon: ({ focused,tintColor })=>(
          focused?
          <Image
            source={require('../../Resources/Images/study_mat.png')}
            style={{ width: 40, height: 40, tintColor: 'orange' }}
          />
          :
          <Image
            source={require('../../Resources/Images/study_mat.png')}
            style={{ width: 30, height: 30 }}
          />
          ),
      }
    },
    ScreenThree: {
      screen: ScreenThree,
       navigationOptions: {
        tabBarIcon: ({ focused,tintColor })=>(
          focused?
          <Image
            source={require('../../Resources/Images/user.png')}
            style={{ width: 40, height: 40, tintColor: 'orange' }}
          />
          :
          <Image
            source={require('../../Resources/Images/user.png')}
            style={{ width: 30, height: 30 }}
          />
          ),
      }
  }},
  
  {
    navigationOptions: {
      tabBarOptions: {
        showLabel: false,
      },
    },
  }
); 
/*const TopTab = createMaterialTopTabNavigator(
  {
    Notification: { screen: Notification },
    Events: { screen: Events },
  },
  {
    navigationOptions: {
      tabBarPosition: 'top',
    }
  }
);*/
class MainScreen extends React.Component {
  render() {
    console.log("Props", this.props.navigation)
    return (
      <View style={{ flex: 1 }}>
        <Tab />
      </View>
    );
  }
}

export default MainScreen;
