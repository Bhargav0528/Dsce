//Header file

// imports
import React from 'react';
import { Text, View } from 'react-native';

//Creting Component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;
  return (
      <View style = {[viewStyle, props.style ]} >
        <Text style={textStyle}>{props.headerText}</Text>
      </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }

};

//Exporting Component
export { Header };
