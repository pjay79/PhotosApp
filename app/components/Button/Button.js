import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const Button = ({
  title, onPress, style, textStyle,
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.buttonContainer, style]}>
      <Text style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.shape(),
  textStyle: PropTypes.shape(),
};

Button.defaultProps = {
  style: {},
  textStyle: {},
};

export default Button;
