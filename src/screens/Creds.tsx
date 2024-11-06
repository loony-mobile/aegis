import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../components/Text';
import {createStackNavigator} from '@react-navigation/stack';
import Edit from './Edit';
import {theme} from '../styles';
const Stack = createStackNavigator();

const Card = (props: any) => {
  const {item, index, navigation} = props;

  const [isHidden, setIsHidden] = useState(true);

  const viewPassword = () => {
    setIsHidden(!isHidden);
  };

  const handleDelete = () => {
    firestore()
      .collection('credentials')
      .doc(item.id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(),
          style: 'destructive',
        },
      ],
    );
  };

  const navEdit = () => {
    navigation.navigate('Edit', item);
  };

  return (
    <View key={index} style={[theme.dark.card, styles.card]}>
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
      <View style={styles.flexRow}>
        <Text style={styles.label}>Password</Text>
        <View style={[styles.flexRow, styles.spaceBetween]}>
          <View style={styles.flexRow}>
            {isHidden ? <Text>********</Text> : <Text>{item.password}</Text>}
          </View>
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.label}>{}</Text>
        <View style={[styles.flexRow]}>
          <TouchableOpacity onPress={viewPassword} style={styles.button}>
            <Icon
              name={isHidden ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={navEdit} style={styles.button}>
            <MaterialCommunityIcons
              name="pencil-outline"
              size={18}
              color="gray"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete} style={styles.button}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={18}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Creds = (props: any) => {
  const [creds, setCreds] = useState<any[] | null>(null);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const credentials = await firestore().collection('credentials').get();
    setCreds(credentials.docs.map(x => ({...x.data(), id: x.id})));
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  return (
    <View style={[theme.dark.con, styles.container]}>
      <FlatList
        data={creds}
        renderItem={(item: any) => <Card {...item} {...props} />}
        keyExtractor={(item: any) => item.name}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Creds"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Creds" component={Creds} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 16,
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
  button: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
