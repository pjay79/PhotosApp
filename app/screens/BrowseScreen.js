import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class BrowseScreen extends Component {
  static navigationOptions = {
    title: 'Browse',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>
Browse Screen
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
