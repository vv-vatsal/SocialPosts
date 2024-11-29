import {StyleSheet, View} from 'react-native';
import React from 'react';
import InputText from '../textInput/InputText';
import {TextInput} from 'react-native-paper';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Header = () => {
  return (
    <View style={styles.container}>
      <InputText
        backgroundColor="#EEEEEE"
        inputStyle={styles.inputStyle}
        left={<TextInput.Icon icon="magnify" />}
        placeholder="Search"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {padding: 10},
  inputStyle: {
    borderRadius: 100,
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    height: responsiveHeight(5),
  },
});
