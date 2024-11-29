import React from 'react';
import MainNavigation from './src/navigation/MainNavigation';
import {AuthProvider} from './src/components/authContext/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import 'react-native-gesture-handler';
import store, {persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <NavigationContainer>
            <MainNavigation />
          </NavigationContainer>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
