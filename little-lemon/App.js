import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginContext } from './screens/components/LoginContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('@login_key');
        if (value !== null) {
          setLogin(JSON.parse(value));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          {login ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Profile" component={Profile} />
            </>
          ) : (
            <Stack.Screen name="Onboarding" component={Onboarding} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </LoginContext.Provider>
  );
}