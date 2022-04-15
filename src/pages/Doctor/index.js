import {getDatabase, onValue, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  ILNullPhoto,
} from '../../assets';
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

  useEffect(() => {
    getNews();
    getCategoryDoctor();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

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
                      onPress={() => navigation.navigate('ChooseDoctor_Screen')}
                    />
                  );
                })}
                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            <RatedDoctor
              name="Alexa Rachel"
              desc="Pediatrician"
              onPress={() => navigation.navigate('DoctorProfile_Screen')}
              avatar={DummyDoctor1}
            />
            <RatedDoctor
              name="Sunny Frank"
              desc="Dentist"
              onPress={() => navigation.navigate('DoctorProfile_Screen')}
              avatar={DummyDoctor2}
            />
            <RatedDoctor
              name="Poe Minn"
              desc="Podiatrist"
              onPress={() => navigation.navigate('DoctorProfile_Screen')}
              avatar={DummyDoctor3}
            />
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
