import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Platform,
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

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        >
          <TouchableOpacity onPress={this.takePicture} style={styles.button}>
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'}
              size={40}
              color="white"
            />
          </TouchableOpacity>
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
    marginBottom: 10,
  },
});
