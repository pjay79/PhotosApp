import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  CameraRoll,
} from 'react-native';
import { Storage } from 'aws-amplify';
import Share from 'react-native-share';
import s3Url from '../config/s3Url';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default class UploadsScreen extends Component {
  static navigationOptions = {
    title: 'Uploads',
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
    loading: false,
    index: null,
    uploads: [],
  };

  componentDidMount() {
    this.getUploads();
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

  getUploads = async () => {
    try {
      this.setState({ loading: true });
      const result = await Storage.list('');
      this.setState({ uploads: result, loading: false });
      console.log(result);
    } catch (error) {
      this.setState({ loading: false });
      console.log(error.message);
    }
  };

  savePhoto = () => {
    const { uploads, index } = this.state;
    if (index !== null) {
      const uri = s3Url + uploads[index].key;
      CameraRoll.saveToCameraRoll(uri);
    } else {
      Alert.alert(
        'Oops',
        'Please select a photo',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  sharePhoto = () => {
    const { uploads, index } = this.state;
    if (index !== null) {
      const url = s3Url + uploads[index].key;
      const shareOptions = {
        title: 'React Native Photos App',
        message: 'Check out this photo!',
        url,
        subject: 'Powered by AWS Amplify & Amazon S3.',
      };
      Share.open(shareOptions)
        .then(result => console.log(result))
        .catch(error => console.log(error.message));
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
    const { uploads, index, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinner}>
            <ActivityIndicator size="small" color="#2B2CB7" />
          </View>
        )}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {uploads.map((u, i) => (
            <TouchableHighlight
              style={{ opacity: i === index ? 0.5 : 1 }}
              /* eslint-disable react/no-array-index-key */
              key={i}
              /* eslint-enable react/no-array-index-key */
              underlayColor="transparent"
              onPress={() => this.setIndex(i)}
            >
              <Image style={styles.image} source={{ uri: s3Url + u.key }} />
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View style={styles.buttonGroup}>
          <Button
            title="Share Photo"
            style={{ backgroundColor: '#000000', marginTop: 5 }}
            onPress={this.sharePhoto}
          />
          <Button
            title="Save Photo"
            style={{ backgroundColor: '#2B2CB7' }}
            onPress={this.savePhoto}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF3A5B',
  },
  spinner: {
    paddingTop: 10,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingBottom: width / 3,
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
