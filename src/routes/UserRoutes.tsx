import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/Creds';
import ProfileScreen from '../screens/Profile';
import AddScreen from '../screens/Add';
import {useTheme} from '../context/AppProvider';
import {STYLES} from '../styles';

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

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function UserRoutes(props: any) {
  const appTheme = useTheme();
  const theme = STYLES[appTheme];

  const screenOptions = ({route}: any) => ({
    headerStyle: theme.headerStyle,
    headerTintColor: theme.headerTintColor,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    tabBarShowLabel: false,
    tabBarIcon: ({focused, size}: any) =>
      tabBarIcon({
        route,
        focused,
        color: theme.tabBarIconColor,
        size,
      }),
    tabBarActiveTintColor: theme.tabBarActiveTintColor,
    tabBarInactiveTintColor: theme.tabBarInactiveTintColor,
    tabBarStyle: theme.tabBarStyle,
    headerShadowVisible: true,
  });

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} initialParams={props} />
        <Tab.Screen name="Add" component={AddScreen} initialParams={props} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={props}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
