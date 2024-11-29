import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useContext} from 'react';
import InputText from '../../components/textInput/InputText';
import PrimaryContainer from '../../components/containers/PrimaryContainer';
import {RFValue} from 'react-native-responsive-fontsize';
import {Checkbox} from 'react-native-paper';
import PrimaryBtn from '../../components/primaryBtn/PrimaryBtn';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../../components/authContext/AuthContext';
import {doFetch} from '../../../fetcher';

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      Username: 'emilys',
      password: 'emilyspass',
      rememberMe: true,
    },
    validationSchema: Yup.object({
      Username: Yup.string().required('Username is required.'),
      password: Yup.string().required('Password is required.'),
    }),
    onSubmit: values => {
      doFetch<{accessToken: string}>('auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: values.Username,
          password: values.password,
        }),
        credentials: 'include',
      })
        .then(response => {
          authContext?.login(response.accessToken);
        })
        .catch(e => {
          console.log(e);
        });
    },
  });

  return (
    <View style={styles.container}>
      <PrimaryContainer style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.loginText}>Login</Text>
          <Text>Enter your Username and password to log in </Text>
        </View>
        <View style={styles.inputContainer}>
          <InputText
            placeholder="Username"
            value={formik.values.Username}
            onChangeText={formik.handleChange('Username')}
            backgroundColor="white"
          />
          {formik.touched.Username && formik.errors.Username && (
            <Text style={styles.errorText}>{formik.errors.Username}</Text>
          )}
          <InputText
            placeholder="******"
            isPassword
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            backgroundColor="white"
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.errorText}>{formik.errors.password}</Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.CheckboxContainer}>
            <Checkbox
              status={formik.values.rememberMe ? 'checked' : 'unchecked'}
              // status= {'checked'}
              onPress={() =>
                formik.setFieldValue('rememberMe', !formik.values.rememberMe)
              }
            />
            <Text>Remember me</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPass}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
        <PrimaryBtn children="Log In" onPress={formik.submitForm} />
      </PrimaryContainer>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  innerContainer: {
    gap: 15,
    justifyContent: 'center',
    padding: 10,
    paddingVertical: responsiveHeight(20),
    borderRadius: 15,
  },
  headerContainer: {justifyContent: 'center', alignItems: 'center', gap: 10},
  loginText: {fontSize: RFValue(32), fontWeight: '700'},
  CheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  forgotPass: {color: '#495ECA'},
  inputContainer: {
    gap: 10,
  },
  errorText: {
    color: 'red',
  },
});
