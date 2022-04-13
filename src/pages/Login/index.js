import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref} from 'firebase/database';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ILLogo} from '../../assets';
import {Button, Gap, Input, Link, Loading} from '../../components';
import {Fire} from '../../config/Fire';
import {colors, fonts, storeData, useForm} from '../../utils';

const database = getDatabase(Fire);
const auth = getAuth(Fire);

const Login = ({navigation}) => {
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);

        onValue(
          ref(database, `users/${user.uid}/`),
          resDB => {
            console.log(resDB.val());
            if (resDB.val()) {
              storeData('user', resDB.val());
              navigation.replace('MainApp_Screen');
            }
            // ...
          },
          {
            onlyOnce: true,
          },
        );

        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        showMessage({
          message: errorMessage,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <>
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <ILLogo />
          <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
          <Input
            label="Email Address"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={login} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register_Screen')}
          />
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {padding: 40, backgroundColor: colors.white, flex: 1},
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153,
  },
});
