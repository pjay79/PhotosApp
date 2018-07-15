import React, { Component } from 'react';
import {
  View, Image, StyleSheet, Alert, ActivityIndicator,
} from 'react-native';
import { Storage } from 'aws-amplify';
import Button from '../components/Button';

export default class UploadsScreen extends Component {
  static navigationOptions = {
    title: 'Uploads',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  state = {
    // uploads: [],
    index: null,
    url: '',
    loading: false,
  };

  componentDidMount() {
    // this.getUploads();
    this.getFile();
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

  getFile = async () => {
    this.setState({ loading: true });
    const name = 'example-image.png';
    const fileUrl = await Storage.get(name);
    this.setState({
      url: fileUrl,
      loading: false,
    });
  };

  // getUploads = async () => {
  //   try {
  //     const result = await Storage.list('');
  //     this.setState({ uploads: result });
  //     console.log(result);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

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
    const { url, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading && (
          <View>
            <ActivityIndicator size="small" />
          </View>
        )}
        {url !== '' && <Image source={{ uri: url }} style={{ width: 300, height: 300 }} />}
        <View>
          <Button title="Save Photo" style={{ backgroundColor: 'black' }} onPress={() => {}} />
          <Button title="Delete Photo" style={{ backgroundColor: 'black' }} onPress={() => {}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
