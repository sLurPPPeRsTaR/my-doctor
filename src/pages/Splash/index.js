import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ILLogo} from '../../assets';
import {colors} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {Fire} from '../../config/Fire';

const auth = getAuth(Fire);

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      onAuthStateChanged(auth, user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          navigation.replace('MainApp_Screen');

          // ...
        } else {
          navigation.replace('GetStarted_Screen');

          // User is signed out
          // ...
        }
      });
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: 20,
  },
});
