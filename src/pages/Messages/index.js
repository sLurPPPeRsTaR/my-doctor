import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {List} from '../../components';
import {colors, fonts} from '../../utils';
import {DummyDoctor1, DummyDoctor2, DummyDoctor3} from '../../assets';

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
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {doctors.map(doctor => {
          return (
            <List
              key={doctor.id}
              profile={doctor.profile}
              name={doctor.name}
              desc={doctor.desc}
              onPress={()=>navigation.navigate('Chatting_Screen')}
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
