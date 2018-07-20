import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
  StyleSheet,
  CameraRoll,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Storage, Analytics } from 'aws-amplify';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default class PhotosScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Photos',
    headerStyle: {
      backgroundColor: '#F0353D',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
    headerLeft: (
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        onPress={() => {
          navigation.state.params.refresh();
        }}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-refresh-circle' : 'md-refresh-circle'}
          size={25}
          color="white"
          style={styles.refresh}
        />
      </TouchableOpacity>
    ),
  });

  state = {
    photos: [],
    index: null,
    loading: false,
    uploading: false,
  };

  componentDidMount() {
    this.getPhotos();
    const { navigation } = this.props;
    navigation.setParams({ refresh: this.getPhotos });
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

  getPhotos = async () => {
    try {
      this.setState({ loading: true });
      const result = await CameraRoll.getPhotos({ first: 45 });
      this.setState({ photos: result.edges, loading: false });
      console.log(result.edges);
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.message);
    }
  };

  sharePhoto = () => {
    const { photos, index } = this.state;
    if (index !== null) {
      const { uri } = photos[index].node.image;
      RNFetchBlob.fs.readFile(uri, 'base64').then((data) => {
        const shareOptions = {
          title: 'React Native Photos App',
          message: 'Check out this photo!',
          url: `data:image/jpg;base64,${data}`,
          subject: 'Powered by AWS Amplify & Amazon S3.',
        };
        Share.open(shareOptions)
          .then((result) => {
            console.log(result);
            Analytics.record({ name: 'cameraPhotoShared' });
          })
          .catch(error => console.log(error.message));
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

  uploadPhoto = async () => {
    const { photos, index } = this.state;
    if (index !== null) {
      const { uri } = photos[index].node.image;
      const filenameiOS = photos[index].node.image.filename;
      const filenameAndroid = await RNFetchBlob.wrap(uri);
      this.uploadPhotoToS3(uri, Platform.OS === 'ios' ? filenameiOS : filenameAndroid);
    } else {
      Alert.alert(
        'Oops',
        'Please select a photo',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  uploadPhotoToS3 = async (uri, key) => {
    try {
      this.setState({ uploading: true });
      const file = await RNFetchBlob.fs.readFile(uri, 'base64');
      const buffer = await Buffer.from(file, 'base64');
      await Storage.put(key, buffer, {
        contentType: 'image/jpeg',
      });
      this.setState({ uploading: false });
      Analytics.record({ name: 'cameraPhotoUploaded' });
      console.log('Photo uploaded!');
    } catch (error) {
      this.setState({ uploading: false });
      console.log(error.message);
    }
  };

  render() {
    const {
      photos, index, loading, uploading,
    } = this.state;
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinner}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        )}
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
        <View style={styles.buttonGroup}>
          <Button
            title="Share Photo"
            style={{ backgroundColor: '#000000', marginTop: 5 }}
            onPress={this.sharePhoto}
          />
          {uploading ? (
            <Button
              title="Uploading..."
              style={{ backgroundColor: '#FF8C29' }}
              onPress={() => {}}
            />
          ) : (
            <Button
              title="Upload Photo"
              style={{ backgroundColor: '#FF8C29' }}
              onPress={this.uploadPhoto}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F0353D',
  },
  spinner: {
    marginVertical: 10,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: width / 3,
  },
  refresh: {
    marginRight: 10,
  },
  image: {
    width: width / 3,
    height: width / 3,
  },
  buttonGroup: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
});

PhotosScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
