import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData, storeData} from '../../utils';
import {Fire} from '../../config/Fire';
import {getDatabase, ref, update} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import {launchImageLibrary} from 'react-native-image-picker';
import {ILNullPhoto} from '../../assets';
import {getAuth, onAuthStateChanged, updatePassword} from 'firebase/auth';

const database = getDatabase(Fire);
const auth = getAuth(Fire);

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      setPhoto({uri: res.photo});
      setProfile(data);
    });
  }, []);

  const updateHandler = () => {
    console.log('profile:', profile);

    console.log('new password :', password);
    if (password.length > 0) {
      if (password.length < 6) {
        ShowMessage({
          message: 'Password kurang dari 6 karakter',
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      } else {
        // update password
        handlerUpdatePassword();
        updateProfileData();
        navigation.replace('MainApp_Screen');
      }
    } else {
      updateProfileData();
      navigation.replace('MainApp_Screen');
    }
  };

  const handlerUpdatePassword = () => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // console.log('user:', user);

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        updatePassword(user, password)
          .then(() => console.log('success'))
          .catch(err => {
            ShowMessage({
              message: err.message,
              type: 'default',
              backgroundColor: colors.error,
              color: colors.white,
            });
          });
        // ...
      }
    });
  };

  const updateProfileData = () => {
    const data = profile;
    data.photo = photoForDB;
    update(ref(database, 'users/' + profile.uid + '/'), data)
      .then(() => {
        console.log('success:', data);
        storeData('user', data);
      })
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  const getImage = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      respone => {
        if (respone.didCancel) {
          showMessage({
            message: 'oops, sepertinya anda tidak memilih foto nya?',
            type: 'default',
            backgroundColor: colors.error,
            color: colors.white,
          });
          return;
        }
        console.log(respone.assets);
        setPhotoForDB(
          `data:${respone.assets[0].type};base64, ${respone.assets[0].base64}`,
        );
        const source = {uri: respone.assets[0].uri};
        setPhoto(source);
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={photo} onPress={getImage} />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={profile.profession}
            onChangeText={value => changeText('profession', value)}
          />
          <Gap height={24} />
          <Input
            label="Email Address"
            placeholder="ashayna@google.com"
            value={profile.email}
            disable
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={password}
            secureTextEntry
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={updateHandler} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  content: {padding: 40, paddingTop: 0},
});
