import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Text, Image, StyleSheet, SafeAreaView,
} from 'react-native';
import Button from '../components/Button';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>
Photos App
        </Text>
        <Image source={require('../assets/images/photo.png')} style={styles.image} />
        <Button
          title="START"
          onPress={() => navigation.navigate('App')}
          style={{ backgroundColor: 'black' }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightseagreen',
  },
  title: {
    color: 'black',
    fontSize: 44,
    fontWeight: '900',
  },
  image: {
    height: 200,
    width: 200,
  },
});

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
