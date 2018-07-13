import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  CameraRoll,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Share from 'react-native-share';
import RNFetchBlob from 'react-native-fetch-blob';
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
    loading: false,
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
    this.setState({ loading: true });
    CameraRoll.getPhotos({ first: 50 }).then(
      (result) => {
        this.setState(
          {
            photos: result.edges,
          },
          () => {
            this.setState({ loading: false });
            const { photos } = this.state;
            console.log(photos);
          },
        );
      },
      (error) => {
        this.setState({ loading: false });
        console.log(error.message);
      },
    );
  };

  share = () => {
    const { photos, index } = this.state;
    if (index !== null) {
      const image = photos[index].node.image.uri;
      RNFetchBlob.fs.readFile(image, 'base64').then((data) => {
        const shareOptions = {
          title: 'React Native Share Example',
          message: 'Check out this photo!',
          url: `data:image/jpg;base64,${data}`,
          subject: 'Check out this photo!',
        };
        Share.open(shareOptions)
          .then(res => console.log('res:', res))
          .catch(err => console.log('err', err));
      });
    } else {
      Alert.alert(
        'Oops',
        'Please select a photo',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  render() {
    const { photos, index, loading } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {loading && (
            <View style={styles.spinner}>
              <ActivityIndicator size="small" />
            </View>
          )}
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
        <Button title="Share Photos" style={{ backgroundColor: 'black' }} onPress={this.share} />
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
  spinner: {
    marginTop: 10,
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
  },
});
