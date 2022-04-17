import {async} from '@firebase/util';
import {getDatabase, onValue, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {List} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, fonts, getData} from '../../utils';

const database = getDatabase(Fire);

const Messages = ({navigation}) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  useEffect(() => {
    getDataUserFromLocal();
    const urlHistory = `messages/${user.uid}/`;
    onValue(ref(database, urlHistory), async snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        const data = [];

        const promises = await Object.keys(dataSnapshot).map(async key => {
          const urlUidDoctor = `doctors/${dataSnapshot[key].uidPartner}`;
          let detailDoctor = {};
          await onValue(ref(database, urlUidDoctor), snapshot => {
            detailDoctor = snapshot.val();
          });

          data.push({
            id: key,
            detailDoctor: detailDoctor,
            ...dataSnapshot[key],
          });
        });
        await Promise.all(promises);
        console.log('nu data', data);
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
              profile={{uri: chat.detailDoctor.photo}}
              name={chat.detailDoctor.fullName}
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
