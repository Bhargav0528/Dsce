import React from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
const InputPicker = props => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      <View style={[styles.containerStyle2, props.style]}>
        <Text style={styles.labelStyle}>{props.label}</Text>
      </View>
      <Picker
  selectedValue={props.pick}
  style={styles.inputStyle}
  mode="dropdown"
  onValueChange={props.onValueChange}>
  {props.children}
</Picker>
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
  },
  labelStyle: {
    fontSize: 18,
    padding: 5,
    color:'#fff',
    borderRadius:20,
    backgroundColor: '#272727',
  },
  containerStyle2: {
    width:100,
    height:'100%',
    backgroundColor: '#272727',
    alignItems: 'center',
    borderRightWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#757575',
    paddingTop:7,
    paddingBottom:7
  },
  containerStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#757575',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 11,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
};

export { InputPicker };
