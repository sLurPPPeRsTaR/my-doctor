import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, List} from '../../components';
import {Fire} from '../../config/Fire';
import {colors} from '../../utils';

const database = getDatabase(Fire);

const ChooseDoctor = ({navigation, route}) => {
  const [listDoctor, setListDoctor] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, [itemCategory.category]);

  const callDoctorByCategory = category => {
    onValue(
      query(
        ref(database, 'doctors/'),
        orderByChild('category'),
        equalTo(category),
      ),
      res => {
        if (res.val()) {
          const oldData = res.val();
          const data = [];
          Object.keys(oldData).map(item => {
            data.push({
              id: item,
              data: oldData[item],
            });
          });
          setListDoctor(data);
        }
        // ...
      },
      {
        onlyOnce: true,
      },
    );
  };

  return (
    <View style={styles.page}>
      <Header
        title={`Pilih ${itemCategory.category}`}
        type="dark"
        onPress={() => navigation.goBack()}
      />

      {listDoctor.map(doctor => {
        return (
          <List
            key={doctor.id}
            type="next"
            profile={{uri: doctor.data.photo}}
            name={doctor.data.fullName}
            desc={doctor.data.gender}
            onPress={() => navigation.navigate('DoctorProfile_Screen', doctor)}
          />
        );
      })}
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
