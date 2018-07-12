import PropTypes from 'prop-types';
import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
// import LoadingScreen from '../screens/LoadingScreen';
// import IntroScreen from '../screens/IntroScreen';
import HomeScreen from '../screens/HomeScreen';
import PhotosScreen from '../screens/PhotosScreen';
import CameraScreen from '../screens/CameraScreen';

const PhotosIcon = ({ tintColor }) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-photos' : 'md-photos'} size={20} color={tintColor} />
);

const CameraIcon = ({ tintColor }) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-camera' : 'md-camera'} size={30} color={tintColor} />
);

const PhotosStack = createStackNavigator(
  {
    Photos: {
      screen: PhotosScreen,
    },
  },
  {
    inititalRouteName: 'Photos',
  },
);

PhotosStack.navigationOptions = {
  tabBarIcon: PhotosIcon,
};

const CameraStack = createStackNavigator(
  {
    Camera: {
      screen: CameraScreen,
    },
  },
  {
    inititalRouteName: 'Camera',
  },
);

CameraStack.navigationOptions = {
  tabBarIcon: CameraIcon,
};

const PhotosTabs = createBottomTabNavigator(
  {
    Photos: {
      screen: PhotosStack,
    },
    Camera: {
      screen: CameraStack,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'lightgrey',
      style: {
        backgroundColor: 'lightseagreen',
      },
    },
  },
);

const AuthStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
  },
  {
    headerMode: 'none',
  },
);

const AppStack = createStackNavigator(
  {
    PhotosTabs: {
      screen: PhotosTabs,
    },
  },
  {
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    // Loading: LoadingScreen,
    // Intro: IntroScreen,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'Auth',
  },
);

PhotosIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

CameraIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
