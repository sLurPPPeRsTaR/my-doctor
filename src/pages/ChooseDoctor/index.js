import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DummyDoctor1} from '../../assets';
import {Header, List} from '../../components';
import {colors} from '../../utils';

const ChooseDoctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
        onPress={() => navigation.navigate('Chatting_Screen')}
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
      <List
        type="next"
        profile={DummyDoctor1}
        name="Alexander Janie"
        desc="wanita"
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
