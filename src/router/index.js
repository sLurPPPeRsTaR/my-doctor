import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {
  GetStarted,
  Register,
  Splash,
  Login,
  UploadPhoto,
  Doctor,
  Messages,
  Hospitals,
  ChooseDoctor,
  Chatting,
  UserProfile,
  UpdateProfile,
  DoctorProfile,
} from '../pages';
import {BottomNavigator} from '../components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen
        name="Doctor"
        component={Doctor}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Hospitals"
        component={Hospitals}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Splash_Screen"
      initialRouteName="UploadPhoto_Screen">
      <Stack.Screen
        name="Splash_Screen"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted_Screen"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register_Screen"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login_Screen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadPhoto_Screen"
        component={UploadPhoto}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChooseDoctor_Screen"
        component={ChooseDoctor}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chatting_Screen"
        component={Chatting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile_Screen"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfile_Screen"
        component={UpdateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DoctorProfile_Screen"
        component={DoctorProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp_Screen"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
