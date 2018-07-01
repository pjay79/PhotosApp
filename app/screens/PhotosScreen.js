import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PhotosScreen extends Component {
  static navigationOptions = {
    title: 'Photos',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
Photos Screen
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
