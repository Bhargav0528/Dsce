import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  return (
      <TouchableOpacity onPress={props.btpress} style={[ styles.ButtonStyle, props.style ]}>
      <Text style={styles.TextStyle}>
         {props.children}
      </Text>
      </TouchableOpacity>
  );
};

const styles = {
  TextStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  ButtonStyle: {
    backgroundColor: '#fff',
    borderRadius: 3,
    borderColor: '#fff',
    borderWidth: 2,
    marginLeft: 5,
    marginTop: 10,
    marginRight: 5,
  }
};
export {Button };
