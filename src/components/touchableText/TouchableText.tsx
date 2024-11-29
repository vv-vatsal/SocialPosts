import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface TouchableTextProps {
  onPress?: (event: GestureResponderEvent) => void;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  [key: string]: any;
}

const TouchableText: React.FC<TouchableTextProps> = ({
  onPress,
  text,
  style,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      {...props}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export default TouchableText;
