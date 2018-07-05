import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  CameraRoll,
  Dimensions,
} from 'react-native';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default class PhotosScreen extends Component {
  static navigationOptions = {
    title: 'Photos',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  state = {
    photos: [],
    index: null,
  };

  componentDidMount() {
    this.getPhotos();
  }

  setIndex = (i) => {
    const { index } = this.state;
    if (i === index) {
      /* eslint-disable no-param-reassign */
      i = null;
      /* eslint-enable no-param-reassign */
    }
    this.setState({ index: i });
  };

  getPhotos = () => {
    CameraRoll.getPhotos({ first: 50 }).then(
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
    const { photos, index } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {photos.map((p, i) => (
            <TouchableHighlight
              style={{ opacity: i === index ? 0.5 : 1 }}
              /* eslint-disable react/no-array-index-key */
              key={i}
              /* eslint-enable react/no-array-index-key */
              underlayColor="transparent"
              onPress={() => this.setIndex(i)}
            >
              <Image style={styles.image} source={{ uri: p.node.image.uri }} />
            </TouchableHighlight>
          ))}
        </ScrollView>
        <Button title="View Photos" style={{ backgroundColor: 'black' }} onPress={this.getPhotos} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  image: {
    width: width / 3,
    height: width / 3,
    borderColor: 'lightseagreen',
    borderWidth: 1,
  },
});
