import React, { Component } from 'react';
import { View, StyleSheet, CameraRoll } from 'react-native';
import Button from '../components/Button';

export default class PhotosScreen extends Component {
  static navigationOptions = {
    title: 'Photos',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  state = {
    photos: [],
  };

  getPhotos = () => {
    CameraRoll.getPhotos({ first: 20, assetType: 'All' }).then(
      (result) => {
        this.setState(
          {
            photos: result.edges,
          },
          () => {
            const { photos } = this.state;
            console.log(photos);
          },
        );
      },
      (error) => {
        console.log(error.message);
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="View Photos"
          style={{ backgroundColor: 'lightseagreen' }}
          onPress={this.getPhotos}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
