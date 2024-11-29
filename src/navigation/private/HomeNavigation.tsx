/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import HomeScreen from '../../screens/home/HomeScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/profileScreen/ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import DetailsScreen from '../../screens/home/DetailsScreen';
import CommentsScreen from '../../screens/home/CommentsScreen';
import {SvgXml} from 'react-native-svg';
import ProfileSVG from '../../../assets/svgs/profile';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import likeSVG from '../../../assets/svgs/like';
import HomeSVG from '../../../assets/svgs/homeSVG';
import LikeScreen from '../../screens/like/LikeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreenNavigation = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused}) => {
          let Icon;
          if (route.name === 'Home') {
            Icon = HomeSVG(
              focused ? '#FFFFFF' : 'gray',
              focused ? '#FFFFFF' : 'gray',
            );
          } else if (route.name === 'LikesScreen') {
            Icon = likeSVG('white');
          } else if (route.name === 'ProfileScreen') {
            Icon = ProfileSVG('white');
          }
          return (
            <View
              style={focused ? styles.activeTabBarStyle : styles.tabBarStyle}>
              <SvgXml
                xml={Icon}
                width={20}
                height={20}
                fill={focused ? '#FFFFFF' : 'gray'}
                stroke={focused ? '#FFFFFF' : 'gray'}
              />
              {route.name == 'Home' ? (
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: focused ? '#FFFFFF' : 'gray',
                  }}>
                  Home
                </Text>
              ) : route.name === 'LikesScreen' ? (
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: focused ? '#FFFFFF' : 'gray',
                  }}>
                  Likes
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: RFValue(10),
                    color: focused ? '#FFFFFF' : 'gray',
                  }}>
                  Profile
                </Text>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          shadowColor: '#FFFFFF',
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreenNavigation}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
      <Tab.Screen
        name="LikesScreen"
        component={LikeScreen}
        options={{
          headerShown: false,
          headerBackButtonDisplayMode: 'generic',
          tabBarShowLabel: false,
          headerTitle: 'Liked Post',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false, tabBarShowLabel: false}}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBarStyle: {
    borderRadius: 100,
    backgroundColor: '#495ECA',
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 40,
    width: 100,
  },
  tabBarStyle: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    height: 40,
    width: 100,
  },
});

export default HomeNavigation;
