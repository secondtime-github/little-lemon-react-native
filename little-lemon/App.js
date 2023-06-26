import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = React.useState({
    isOnboardingCompleted: true,
  });


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        {state.isOnboardingCompleted ? (
          // Onboarding completed, user is signed in
          <Stack.Screen name="Profile" component={Profile} />
        ) : (
          // User is NOT signed in
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}