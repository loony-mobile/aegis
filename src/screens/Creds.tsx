/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import {createStackNavigator} from '@react-navigation/stack';

import Text from '../components/Text';
import Edit from './Edit';
import {STYLES, styles as defaultStyles} from '../styles';
import {handleError} from '../utils';
import {useTheme} from '../context/AppProvider';
const Stack = createStackNavigator();

const Card = (props: any) => {
  const {item, index, navigation, theme} = props;

  const navEdit = () => {
    navigation.navigate('Edit', item);
  };

  return (
    <TouchableOpacity onLongPress={navEdit}>
      <View key={index} style={[theme.card, styles.card]}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.label}>Username </Text>
          <Text>{item.username}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.label}>Url </Text>
          <Text>{item.url}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Creds = (props: any) => {
  const {appContext, authContext} = props.route.params;
  const user_id = authContext.user.uid;
  const {base_url} = appContext;

  const appTheme = useTheme();
  const theme = STYLES[appTheme];
  const [creds, setCreds] = useState<any[] | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [_, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${base_url}/creds/get/${user_id}`)
      .then(({data}) => {
        setCreds(data);
      })
      .catch(e => {
        handleError(e, setError);
      });
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <View style={[theme.con, styles.container]}>
      <FlatList
        data={creds}
        renderItem={(item: any) => <Card {...item} {...props} theme={theme} />}
        keyExtractor={(item: any) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default function Routes(props: any) {
  return (
    <Stack.Navigator
      initialRouteName="Creds"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Creds"
        component={Creds}
        initialParams={props.route.params}
      />
      <Stack.Screen
        name="Edit"
        component={Edit}
        initialParams={props.route.params}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  flexRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 2,
  },
  spaceBetween: {justifyContent: 'space-between'},
  flexEnd: {justifyContent: 'flex-end'},
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  card: {
    padding: 18,
  },
  image: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: 16,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
