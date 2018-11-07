import React from 'react';
import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native';

const Input = props => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        underlineColorAndroid="transparent"
        placeholder={props.placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    width: 250,
    height: '100%',
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
  containerStyle: {
    backgroundColor: '#fff',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export  {Input};
