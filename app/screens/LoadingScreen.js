import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, ActivityIndicator, StyleSheet, AsyncStorage,
} from 'react-native';

export default class LoadingScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.checkIntro();
  }

  checkIntro = async () => {
    const { navigation } = this.props;
    const value = await AsyncStorage.getItem('@SKIP_INTRO');
    if (value === 'true') {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('Intro');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0353D',
  },
});

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
