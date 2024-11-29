import React, {useContext} from 'react';
import AuthNavigation from './auth/AuthNavigation';
import HomeNavigation from './private/HomeNavigation';
import {AuthContext} from '../components/authContext/AuthContext';
const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  return authContext?.isAuthenticated ? (
    <HomeNavigation />
  ) : (
    authContext?.isAuthenticated !== null && <AuthNavigation />
  );
};

export default MainNavigation;
