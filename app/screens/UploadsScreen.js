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
} from 'react-native';
import { Storage } from 'aws-amplify';
import Button from '../components/Button';
import s3Url from '../config/s3';

const { width } = Dimensions.get('window');

export default class UploadsScreen extends Component {
  static navigationOptions = {
    title: 'Uploads',
    headerStyle: {
      backgroundColor: 'lightseagreen',
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
    const { index } = this.state;
    if (index !== null) {
      console.log('File saved');
    } else {
      Alert.alert(
        'Oops',
        'Please select a photo',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
    }
  };

  deletPhoto = () => {};

  render() {
    const { uploads, index, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && (
          <View style={styles.spinner}>
            <ActivityIndicator size="small" />
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
        <Button title="Save Photo" style={{ backgroundColor: 'black' }} onPress={() => {}} />
        <Button title="Delete Photo" style={{ backgroundColor: 'black' }} onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  spinner: {
    paddingTop: 10,
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
