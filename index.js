import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Class RCTCxxModule',
  'RCTBridge',
  'Module RCTImageLoader',
  'Module RNFetchBlob requires main queue setup',
  'Class GenericShare was not exported.',
  'Class WhatsAppShare was not exported.',
  'Class GooglePlusShare was not exported.',
  'Warning: isMounted(...)',
]);

global.Buffer = require('buffer').Buffer;

AppRegistry.registerComponent('PhotosApp', () => App);
