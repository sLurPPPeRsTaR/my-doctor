import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {List} from '../../components';
import {colors, fonts, getData} from '../../utils';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';
import {getDatabase, onValue, ref} from 'firebase/database';
import {Fire} from '../../config/Fire';

const database = getDatabase(Fire);

const Messages = ({navigation}) => {
  const [doctors] = useState([
    {
      id: 1,
      profile: DummyDoctor1,
      name: 'Alexander Jannie',
      desc: 'Baik ibum terima kasih banyak atas wakt...',
    },
    {
      id: 2,
      profile: DummyDoctor2,
      name: 'Nairobi Putri Hayza',
      desc: 'Baik ibum terima kasih banyak atas wakt...',
    },
    {
      id: 3,
      profile: DummyDoctor3,
      name: 'John McParker Steve',
      desc: 'Baik ibum terima kasih banyak atas wakt...',
    },
  ]);

  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    onValue(ref(database, urlHistory), snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const data = [];
        Object.keys(dataSnapshot).map(key => {
          data.push({
            id: key,
            ...dataSnapshot[
              key
            ] /* THIS ONE IS MORE READABLE AND EZ TO INVOKE BY : StackOverflow*/,
            // data: dataSnapshot[key],
          });
        });
        setHistoryChat(data);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {historyChat.map(chat => {
          return (
            <List
              key={chat.id}
              profile={chat.uidPartner}
              name={chat.uidPartner}
              desc={chat.lastContentChat}
              onPress={() => navigation.navigate('Chatting_Screen')}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Messages;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.secondary, flex: 1},
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
