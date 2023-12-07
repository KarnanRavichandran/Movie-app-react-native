import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS } from '../constants';

const HeaderButton = ({ onPress, icon }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: COLORS.transparentBlack,
      }}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );
};

HeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
};

export default HeaderButton;
