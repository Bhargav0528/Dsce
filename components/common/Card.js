import React, { Component } from 'react';
import { View } from 'react-native';


const Card = (props) => {
  return (
    <View style={[ styles.containerStyle, props.style ]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
      flexDirection: 'row',
      borderRadius: 2,
      borderBottomWidth: 0,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 5,
      marginBottom:5,
      backgroundColor:'#fff' 
  }
};



export {Card};