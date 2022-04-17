import {getDatabase, push, ref, onValue, set} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItem, Header, InputChat} from '../../components';
import {Fire} from '../../config/Fire';
import {
  colors,
  fonts,
  getChatTime,
  getData,
  setDateChat,
  showError,
} from '../../utils';

const database = getDatabase(Fire);

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [chatData, setChatData] = useState([]);

  const chatSend = () => {
    const today = new Date();

    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    const urlChatID = `${user.uid}_${dataDoctor.data.uid}`;
    const urlFirebase = `chatting/${urlChatID}/allChat/${setDateChat(today)}`;
    const urlMessageUser = `messages/${user.uid}/${urlChatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${urlChatID}`;
    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.data.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    push(ref(database, urlFirebase), data)
      .then(() => {
        setChatContent('');
        set(ref(database, urlMessageUser), dataHistoryChatForUser);
        set(ref(database, urlMessageDoctor), dataHistoryChatForDoctor);
      })
      .catch(err => {
        showError(err.message);
      });
  };

  useEffect(() => {
    getDataUserFromLocal();
    getDataChatting();
  }, [user.uid, dataDoctor.data.uid]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  const getDataChatting = () => {
    // const urlChatID = `${user.uid}_${dataDoctor.data.uid}`;
    // const urlFirebase = `chatting/${urlChatID}/allChat/}`;

    onValue(
      ref(database, `chatting/${user.uid}_${dataDoctor.data.uid}/allChat/`),
      snapshot => {
        if (snapshot.val()) {
          const dataSnapshot = snapshot.val();
          const allDataChat = [];
          Object.keys(dataSnapshot)?.map(key => {
            const dataChat = dataSnapshot[key];
            const newDataChat = [];

            Object.keys(dataChat)?.map(itemChat => {
              newDataChat.push({
                id: itemChat,
                data: dataChat[itemChat],
              });
            });

            allDataChat.push({
              id: key,
              data: newDataChat,
            });
          });
          setChatData(allDataChat);
        }
        // ...
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header
        photo={{uri: dataDoctor.data.photo}}
        title={dataDoctor.data.fullName}
        desc={dataDoctor.data.profession}
        type="dark-profile"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scroll => {
            this.scroll = scroll;
          }}
          onContentSizeChange={() => this.scroll.scrollToEnd()}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : {uri: dataDoctor.data.photo}}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        placeholder={`Tulis Pesan Untuk ${dataDoctor.data.fullName}`}
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onPress={chatSend}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
  page: {backgroundColor: colors.white, flex: 1},
  content: {flex: 1},
});
