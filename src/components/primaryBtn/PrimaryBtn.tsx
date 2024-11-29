import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, ButtonProps} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';

interface PrimaryBtnProps extends ButtonProps {
  children: string;
  backgroundColor?: string;
  textColor?: string;
  outlineColor?: string;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({
  children,
  onPress,
  style,
  mode = 'contained',
  backgroundColor = '#495ECA',
  textColor = '#fff',
  outlineColor = '#495ECA',
  ...rest
}) => {
  return (
    <View style={style}>
      <Button
        mode={mode}
        onPress={onPress}
        theme={{
          colors: {
            primary: mode === 'contained' ? textColor : outlineColor,
            surface: backgroundColor,
          },
        }}
        contentStyle={
          mode === 'contained'
            ? {height: 48, backgroundColor}
            : {height: 48, borderColor: outlineColor}
        }
        style={[
          styles.button,
          mode === 'outlined' && {borderColor: outlineColor},
        ]}
        labelStyle={styles.title}
        {...rest}>
        {children}
      </Button>
    </View>
  );
};

export default PrimaryBtn;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  title: {
    fontSize: RFValue(14),
  },
});
