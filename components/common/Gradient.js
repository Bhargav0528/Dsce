import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
const Gradient = (props)=> {
  return(
    <ImageBackground
        source={require('../../Resources/Images/gradient.png')}
        style={{ 
                alignItems: 'center',
                resizeMode:'stretch', marginBottom:10}}> 
      <Text style={{color:'#fff',fontSize:20, padding:10}}>{props.subject}</Text> 

    </ImageBackground>
  )
}
export { Gradient } 