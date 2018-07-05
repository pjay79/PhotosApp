import { AppRegistry, YellowBox } from 'react-native';
import App from './App';

YellowBox.ignoreWarnings([
  'Class RCTCxxModule',
  'RCTBridge',
  'Module RCTImageLoader',
  'Module RNFetchBlob requires main queue setup',
  'Warning: isMounted(...)',
]);

AppRegistry.registerComponent('PhotosApp', () => App);
