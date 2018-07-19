import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, CameraRoll, Platform,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

class CameraScreen extends Component {
  static navigationOptions = {
    title: 'Camera',
    headerStyle: {
      backgroundColor: '#FF3A5B',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
  };

  state = {
    cameraBack: true,
    cameraFlash: false,
  };

  componentWillUnmount() {
    this.forceUpdate();
  }

  toggleType = () => {
    this.setState(prevState => ({
      cameraBack: !prevState.cameraBack,
    }));
  };

  toggleFlash = () => {
    this.setState(prevState => ({
      cameraFlash: !prevState.cameraFlash,
    }));
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, forceUpOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      CameraRoll.saveToCameraRoll(data.uri);
      console.log(data.uri);
    }
  };

  render() {
    const { cameraBack, cameraFlash } = this.state;
    const { isFocused } = this.props;

    if (!isFocused) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={cameraBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={
            cameraFlash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off.on
          }
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        >
          <View style={styles.buttonGroup}>
            <TouchableOpacity onPress={this.toggleType}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-reverse-camera' : 'md-reverse-camera'}
                size={30}
                color="white"
                style={styles.button}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePicture}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
                size={30}
                color="white"
                style={styles.button}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFlash}>
              <Ionicons
                name={Platform.OS === 'ios' ? 'ios-flash' : 'md-flash'}
                size={30}
                color="white"
                style={styles.button}
              />
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default withNavigationFocus(CameraScreen);

CameraScreen.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
