import {StyleSheet, View, StyleProp, TextStyle} from 'react-native';
import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';

interface InputTextProps extends TextInputProps {
  isPassword?: boolean;
  backgroundColor?: string;
  inputStyle?: StyleProp<TextStyle>;
  left?: React.ReactNode; // Added prop for left icon or custom element
}

const InputText: React.FC<InputTextProps> = ({
  isPassword,
  backgroundColor,
  inputStyle,
  left,
  ...props
}) => {
  const [isPasswordVisible, setPasswordVisible] = useState(!isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        secureTextEntry={!isPasswordVisible && isPassword}
        underlineStyle={{width: 0}}
        autoCapitalize="none"
        style={[styles.input, {backgroundColor}, inputStyle]}
        left={left} // Pass the left prop to TextInput
        right={
          isPassword ? (
            <TextInput.Icon
              icon={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            />
          ) : null
        }
      />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {},
  input: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
  },
});
