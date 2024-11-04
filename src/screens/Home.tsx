import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import TextComponent from '../components/Text';

const Card = ({item, index}: any) => {
  const [isHidden, setIsHidden] = useState(true);

  const viewPassword = () => {
    setIsHidden(!isHidden);
  };
  return (
    <View key={index} style={styles.card}>
      <View>
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>Username: </Text>
        <TextComponent>{item.username}</TextComponent>
      </View>
      <View style={styles.flexRow}>
        <Text style={styles.label}>Url: </Text>
        <TextComponent>{item.url}</TextComponent>
      </View>
      <View style={styles.passwordContainer}>
        <Text style={styles.label}>Password:</Text>
        <View style={[styles.flexRow, styles.spaceBetween]}>
          {isHidden ? (
            <TextComponent>********</TextComponent>
          ) : (
            <TextComponent>{item.password}</TextComponent>
          )}
          <TouchableOpacity onPress={viewPassword}>
            <Icon
              name={isHidden ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default function Home() {
  const [creds, setCreds] = useState<any[] | null>(null);
  useEffect(() => {
    (async () => {
      const credentials = await firestore().collection('credentials').get();
      setCreds(credentials.docs.map(x => x.data()));
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={creds}
        renderItem={(item: any) => <Card {...item} />}
        keyExtractor={(item: any) => item.name}
      />
    </View>
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
  },
  spaceBetween: {justifyContent: 'space-between'},
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
