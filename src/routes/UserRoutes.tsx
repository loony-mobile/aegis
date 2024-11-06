import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Creds';
import ProfileScreen from '../screens/Profile';
import AddScreen from '../screens/Add';

const tabBarIcon = ({route, focused, color, size}: any) => {
  let iconName = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Add') {
    iconName = 'add';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const screenOptions = ({route}: any) => ({
  headerStyle: {
    backgroundColor: '#363636',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  tabBarShowLabel: false,
  tabBarIcon: ({focused, color, size}: any) =>
    tabBarIcon({
      route,
      focused,
      color: '#cccccc',
      size,
    }),
  tabBarActiveTintColor: '#cccccc',
  tabBarInactiveTintColor: '#cccccc',
  tabBarStyle: {backgroundColor: '#2d2d2d'},
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
