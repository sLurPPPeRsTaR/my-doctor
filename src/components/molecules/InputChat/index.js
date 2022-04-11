import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Button} from '../../atoms';
import {colors, fonts} from '../../../utils';

const InputChat = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Tulis Pesan Untuk Nairobi" />
      <Button type="btn-icon-send" />
    </View>
  );
};

export default InputChat;

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary[400],
    maxHeight: 45,
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
