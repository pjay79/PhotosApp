import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, CameraRoll, Platform,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BrowseScreen extends Component {
  static navigationOptions = {
    title: 'Camera',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  state = {
    cameraBack: true,
    cameraFlash: false,
  };

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
