import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface SecondaryContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

const SecondaryContainer: React.FC<SecondaryContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default SecondaryContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
});
