import {StyleSheet, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import PrimaryBtn from '../../components/primaryBtn/PrimaryBtn';
import {AuthContext} from '../../components/authContext/AuthContext';
import FastImage from 'react-native-fast-image';
import {Text} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {getUserInfo} from '../../redux/homeApiFun';

const ProfileScreen = () => {
  const userData = useSelector(state => state.home.userData);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);
  const authContext = useContext(AuthContext);
  const handleLogOut = () => {
    authContext?.logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <FastImage style={styles.image} source={{uri: userData.image}} />
        <Text style={styles.name}>
          {userData && `${userData.firstName} ${userData.lastName}`}
        </Text>
      </View>

      <View style={styles.middleContainer}>
        <PrimaryBtn onPress={handleLogOut} children="Log Out" />
      </View>
      <View style={styles.bottomContainer} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleContainer: {
    paddingHorizontal: 15,
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: RFValue(24),
    marginTop: 10,
  },
  bottomContainer: {flex: 1},
});
