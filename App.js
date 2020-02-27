import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './js/navigators/AppNavigator';

export default function App() {
  return (
    
      <AppNavigator style={{alignItems:"center"}}/>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});