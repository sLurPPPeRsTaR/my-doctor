import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {colors, getData} from '../../utils';
import {Fire} from '../../config/Fire';
import {getDatabase, ref, update} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

const database = getDatabase(Fire);

const UpdateProfile = ({navigation}) => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    email: '',
  });
  const [password, setPassword] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photo = {uri: res.photo};
      setProfile(data);
    });
  }, []);

  const updateHandler = () => {
    console.log('profile:', profile);
    const data = profile;
    data.photo = profile.photo.uri;
    update(ref(database, 'users/' + profile.uid + '/'), profile)
      .then(res => console.log('success:', res))
      .catch(err => {
        showMessage({
          message: err.message,
          type: 'default',
          backgroundColor: colors.error,
          color: colors.white,
        });
      });

    // navigation.goBack('UserProfile_Screen')
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value,
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile isRemove photo={profile.photo} />
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
          <Input label="Password" value={password} />
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
