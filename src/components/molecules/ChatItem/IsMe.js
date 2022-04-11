import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';

const isMe = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chatContent}>
        <Text style={styles.text}>
          Ibu dokter apakah memakan jeruk tiap hari itu buruk?
        </Text>
      </View>
      <Text style={styles.date}>4.20 AM</Text>
    </View>
  );
};

export default isMe;

const styles = StyleSheet.create({
  container: {marginBottom: 20, alignItems: 'flex-end', paddingRight: 16},
  chatContent: {
    padding: 12,
    maxWidth: '70%',
    paddingRight: 18,
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    borderBottomRightRadius: 0,
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary[400],
    color: colors.text.primary,
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    marginTop: 8,
  },
});
