import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  CameraRoll,
} from 'react-native';
import { Storage, Analytics } from 'aws-amplify';
import Share from 'react-native-share';
import Ionicons from 'react-native-vector-icons/Ionicons';
import s3Url from '../config/s3Url';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default class UploadsScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Uploads',
    headerStyle: {
      backgroundColor: '#F0353D',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: '#FFFFFF',
    },
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
    loading: false,
    index: null,
    uploads: [],
  };

  componentDidMount() {
    this.getUploads();
    const { navigation } = this.props;
    navigation.setParams({ refresh: this.getUploads });
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
        .then((result) => {
          Analytics.record({ name: 's3PhotoShared' });
          console.log(result);
        })
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

  downloadPhoto = () => {
    const { uploads, index } = this.state;
    if (index !== null) {
      const uri = s3Url + uploads[index].key;
      CameraRoll.saveToCameraRoll(uri);
      Analytics.record({ name: 's3PhotoDownloaded' });
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
            <ActivityIndicator size="small" color="#FFFFFF" />
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
            title="Download Photo"
            style={{ backgroundColor: '#FF8C29' }}
            onPress={this.downloadPhoto}
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
    backgroundColor: '#F0353D',
  },
  spinner: {
    paddingVertical: 10,
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

UploadsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
