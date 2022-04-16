import {
  getDatabase,
  limitToLast,
  onValue,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components/';
import {Fire} from '../../config/Fire';
import {colors, fonts, getData} from '../../utils';

const database = getDatabase(Fire);

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getCategoryDoctor();
    getTopRateDoctors();
    getNews();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, []);

  const getTopRateDoctors = () => {
    onValue(
      query(ref(database, 'doctors/'), orderByChild('rate'), limitToLast(3)),
      res => {
        if (res.val()) {
          if (res.val()) {
            const oldData = res.val();
            const data = [];
            Object.keys(oldData).map(item => {
              data.push({
                id: item,
                data: oldData[item],
              });
            });
            setDoctors(data);
          }
        }
        // ...
      },
      {
        onlyOnce: true,
      },
    );
  };

  const getNews = () => {
    onValue(
      ref(database, 'news/'),
      res => {
        if (res.val()) {
          setNews(res.val());
        }
        // ...
      },
      {
        onlyOnce: true,
      },
    );
  };

  const getCategoryDoctor = () => {
    onValue(
      ref(database, 'category_doc/'),
      res => {
        if (res.val()) {
          setCategoryDoctor(res.val());
        }
        // ...
      },
      {
        onlyOnce: true,
      },
    );
  };

  const getUserData = () => {
    getData('user').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(data);
    });
  };

  const [profile, setProfile] = useState({
    photo: ILNullPhoto,
    fullName: '',
    profession: '',
  });
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile
              profile={profile}
              onPress={() => navigation.navigate('UserProfile_Screen', profile)}
            />
            <Text style={styles.welcome}>
              Mau konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() =>
                        navigation.navigate('ChooseDoctor_Screen', item)
                      }
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctors => {
              return (
                <RatedDoctor
                  key={doctors.id}
                  name={doctors.data.fullName}
                  desc={doctors.data.profession}
                  avatar={{uri: doctors.data.photo}}
                  onPress={() =>
                    navigation.navigate('DoctorProfile_Screen', doctors)
                  }
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                date={item.date}
                image={item.image}
              />
            );
          })}

          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 209,
  },
  category: {flexDirection: 'row'},
  wrapperScroll: {marginHorizontal: -16},
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
  wrapperSection: {paddingHorizontal: 16},
});
