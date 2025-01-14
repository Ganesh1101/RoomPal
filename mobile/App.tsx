// app.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/reducers/store';

// Import authentication screens
import LoginScreen from './src/Screens/Authn/LoginScreen';
import RegisterScreen from './src/Screens/Authn/RegisterScreen';
import VerificationScreen from './src/Screens/Authn/VerificationScreen';
import ForgotPassword from './src/Screens/Authn/ForgotPassword';
import ResetPasswordScreen from './src/Screens/Authn/ResetPasswordScreen';
import SucessPasswordScreen from './src/Screens/Authn/SuccessPasswordScreen';
import UnsuccessPasswordScreen from './src/Screens/Authn/UnsuccessPasswordScreen';
import RoomPalIntro from './src/Screens/Authn/IntroScreen';

// Import Landing screens
import RoomDetails from './src/Screens/Landing/RoomDetails';
import RoomCreateScreen from './src/Screens/Landing/RoomCreateScreen';
import ListOfRooms from './src/Screens/Landing/ListOfRooms';
import FilterScreen from './src/Screens/Landing/FilterScreen';
import ProfileScreen from './src/Screens/Landing/ProfileScreen';
import Dashboard from './src/Screens/Landing/Dashboard';

const Stack = createStackNavigator();

// Authentication stack
const AuthStack = createStackNavigator();

const Authn = () => (
  <Stack.Navigator initialRouteName="Intro" headerMode="none">
    <Stack.Screen name="Intro" component={RoomPalIntro} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
    <Stack.Screen name="SucessPasswordScreen" component={SucessPasswordScreen} />
    <Stack.Screen name="UnsuccessPasswordScreen" component={UnsuccessPasswordScreen} />
  </Stack.Navigator>
);

const Landing = () => (
  <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="RoomDetails" component={RoomDetails} />
    <Stack.Screen name="RoomCreateScreen" component={RoomCreateScreen} />
    <Stack.Screen name="ListOfRooms" component={ListOfRooms} />
    <Stack.Screen name="FilterScreen" component={FilterScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing" headerMode="none">
          <Stack.Screen name="Authn" component={Authn} />
          <Stack.Screen name="Landing" component={Landing} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
