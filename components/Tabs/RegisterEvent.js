import React, { Component } from 'react';
import { WebView, View, Text } from 'react-native';
import { Spinner } from '../common/Spinner';
export default class RegisterEvent extends Component {
  render() {
    const uri = this.props.navigation.getParam('reg_url', 'NO-ID');
    if (uri=='')
    {
      return(
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'#000', fontSize:22}} > No Registration Link Found </Text>
        </View>
      )
    }
    console.log('Url', uri)
    return (
      <WebView
        source={{uri: uri}}
        style={{marginTop: 20}}
        renderLoading={()=>{return <Spinner />}}
        startInLoadingState
      />
    );
  }
}