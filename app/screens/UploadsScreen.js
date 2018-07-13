import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import Button from '../components/Button';

const { width } = Dimensions.get('window');

export default class UploadsScreen extends Component {
  static navigationOptions = {
    title: 'Uploads',
    headerStyle: {
      backgroundColor: 'lightseagreen',
    },
  };

  state = {
    uploads: [],
    index: null,
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

  getUploads = () => {};

  save = () => {
    const { index } = this.state;
    if (index !== null) {
      console.log('File uploaded');
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
    const { uploads, index } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {uploads.map((p, i) => (
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
        <Button title="Save Photos" style={{ backgroundColor: 'black' }} onPress={() => {}} />
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
  },
});
