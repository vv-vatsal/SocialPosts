import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

interface PrimaryContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

const PrimaryContainer: React.FC<PrimaryContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default PrimaryContainer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#495ECA17',
    // gap: 15,
  },
});
