import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {colors, fonts} from '../../../utils';

const Input = ({label, placeholder, onChangeText, value, secureTextEntry}) => {
  const [border, setBorder] = useState(colors.border);
  const handlerOnFocus = () => {
    setBorder(colors.tertiary);
  };
  const handlerOnBlur = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input(border)}
        placeholder={placeholder}
        onBlur={handlerOnBlur}
        onFocus={handlerOnFocus}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[400],
  },
});
