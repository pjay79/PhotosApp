import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, Text, Image, StyleSheet, SafeAreaView, AsyncStorage,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Button from '../components/Button';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    SplashScreen.hide();
    AsyncStorage.setItem('@SKIP_INTRO', 'true');
  }

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
        <Text style={styles.slogan}>
A photo sharing and uploading app
        </Text>
        <Button
          title="START"
          onPress={() => navigation.navigate('App')}
          style={{ backgroundColor: '#000000', marginBottom: 25 }}
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
    backgroundColor: '#F0353D',
  },
  header: {
    marginTop: 25,
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 44,
    fontWeight: '900',
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: '900',
  },
  slogan: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    fontStyle: 'italic',
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
