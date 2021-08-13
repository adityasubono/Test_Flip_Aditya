import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-auto-stylesheet';

const CustomViewComponent = ({header, child}) => {
  return (
    <View style={{paddingVertical: 10}}>
      <Text style={s.Text2}>{header}</Text>
      <Text style={s.Text1}>{child}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  Text1: {
    fontSize: 15,
    // color:'white'
  },
  Text2: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default CustomViewComponent;

