import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, SafeAreaView,
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
        <View style={styles.header}>
          <Text style={styles.title}>
Photos App
          </Text>
          <Text style={styles.subtitle}>
REACT NATIVE
          </Text>
          <Text style={styles.subtitle}>
AWS Amplify S3
          </Text>
        </View>
        <Image source={require('../assets/images/photo.png')} style={styles.image} />
        <Button
          title="START"
          onPress={() => navigation.navigate('App')}
          style={{ backgroundColor: '#FF9C1E', marginBottom: 50 }}
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
    backgroundColor: '#FF3A5B',
  },
  header: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    color: '#FF9C1E',
    fontSize: 44,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#000000',
    fontSize: 14,
    letterSpacing: 3,
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
