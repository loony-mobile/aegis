// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Install react-native-vector-icons if you want icons

const tabBarIcon = ({route, focused, color, size}: any) => {
  let iconName = 'home';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Settings') {
    iconName = focused ? 'settings' : 'settings-outline';
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
  tabBarActiveTintColor: 'tomato',
  tabBarInactiveTintColor: 'gray',
});

// Create basic screen components
function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View>
      <Text>Profile Screen</Text>
    </View>
  );
}

// Create a Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function UserRoutes(props: any) {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
