// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import AddScreen from '../screens/Add';

const tabBarIcon = ({route, focused, color, size}: any) => {
  let iconName = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Add') {
    iconName = focused ? 'add' : 'add';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const screenOptions = ({route}: any) => ({
  tabBarIcon: ({focused, color, size}: any) =>
    tabBarIcon({
      route,
      focused,
      color,
      size,
    }),
  tabBarActiveTintColor: '#007BFF',
  tabBarInactiveTintColor: 'gray',
});

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function UserRoutes(props: any) {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={props}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
