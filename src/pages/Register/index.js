import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Header, Input} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, showError, storeData, useForm} from '../../utils';

const auth = getAuth(Fire);
const database = getDatabase(Fire);

const Register = ({navigation}) => {
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        const user = userCredential.user;
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: user.uid,
        };
        // Signed in
        dispatch({type: 'SET_LOADING', value: false});

        setForm('reset');
        set(ref(database, 'users/' + user.uid + '/'), data);
        storeData('user', data);
        navigation.navigate('UploadPhoto_Screen', data);
        // ...
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        dispatch({type: 'SET_LOADING', value: false});

        showError(errorMessage);
        // ..
      });
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Profession"
            value={form.profession}
            onChangeText={value => setForm('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            secureTextEntry
            onChangeText={value => setForm('password', value)}
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {backgroundColor: colors.white, flex: 1},
  content: {padding: 40, paddingTop: 0},
});
