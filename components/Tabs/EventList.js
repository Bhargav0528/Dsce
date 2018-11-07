import React from 'react';
import { View,Text, Image } from 'react-native';
import { Card, CardSection } from '../common';
const EventList = ({data})=> {
  console.log("Hey"+data.url);
  const { cardViewStyle, categoryViewStyle } = styles;
  return(
    <Card style={cardViewStyle}>
      <CardSection style={{flex:1}}>
        <View style={{flex:1}}>
          <Image source={{uri: data.url}}
            style={{flex: 1, height: 200, width: '100%', resizeMode: 'contain' }}/>
        </View>
      </CardSection>
      <CardSection>
        <Text>{data.Event}</Text>
      </CardSection>
      <CardSection>
        <Text>{data.Venue}</Text>
      </CardSection>
    </Card>
    );
}

const styles = {
  cardViewStyle:{
    backgroundColor : '#FFF3E0',
    flexDirection:'column',
  },
  categoryViewStyle:{
    alignItems: 'flex-start'
  },
  
  
}

export default  EventList;