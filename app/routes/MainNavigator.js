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
import BrowseScreen from '../screens/BrowseScreen';

const PhotosIcon = ({ tintColor }) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-photos' : 'md-photos'} size={20} color={tintColor} />
);

const BrowseIcon = ({ tintColor }) => (
  <Ionicons name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} size={20} color={tintColor} />
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

const BrowseStack = createStackNavigator(
  {
    Browse: {
      screen: BrowseScreen,
    },
  },
  {
    inititalRouteName: 'Browse',
  },
);

BrowseStack.navigationOptions = {
  tabBarIcon: BrowseIcon,
};

const PhotosTabs = createBottomTabNavigator(
  {
    PhotosStack: {
      screen: PhotosStack,
    },
    BrowseStack: {
      screen: BrowseStack,
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

BrowseIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
