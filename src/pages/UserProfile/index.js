import {getAuth, signOut} from 'firebase/auth';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Gap, Header, List, Profile} from '../../components';
import {colors, showError} from '../../utils';

const auth = getAuth();

const UserProfile = ({navigation, route}) => {
  const profile = route.params;

  const handlerSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.\O
        navigation.replace('GetStarted_Screen');
      })
      .catch(error => {
        // An error happened.
        showError(error.message);
      });
  };

  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.profession}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Edit Profile"
        desc="Last Update Yesterday"
        type="next"
        icon="edit-profile"
        onPress={() => navigation.navigate('UpdateProfile_Screen')}
      />
      <List
        name="Language"
        desc="Available 12 languages"
        type="next"
        icon="language"
      />
      <List
        name="Give Us Rate"
        desc="On Google Play Store"
        type="next"
        icon="rate"
      />
      <List
        name="Sign Out"
        desc="Read our guidelines"
        type="next"
        icon="help"
        onPress={handlerSignOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
});
