import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {ChatItem, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';

const Chatting = ({navigation, route}) => {
  const dataDoctor = route.params;

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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.chatDate}>Senin, 21 Maret, 2020</Text>
          <ChatItem isMe />
          <ChatItem />
          <ChatItem isMe />
        </ScrollView>
      </View>
      <InputChat
        value=""
        onChangeText={() => alert('onChangeText!')}
        onPress={() => alert('onPress!')}
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
