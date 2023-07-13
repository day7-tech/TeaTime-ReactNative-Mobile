import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import newData from '../data/newData';
import todayData from '../data/today';
import yesterdayData from '../data/yesterday';
import NotificationItem from '../components/NotificationItem.js/NotificationItem';
import fonts from '../../../theme/fonts';
const NotificationScreens = () => {
  return (
    <ScrollView>
      <Text style={styles.header}>New</Text>
      <FlatList
        data={newData}
        renderItem={({item}) => <NotificationItem item={item} />}
      />
      <Text style={styles.header}>Today</Text>
      <FlatList
        data={todayData}
        renderItem={({item}) => <NotificationItem item={item} />}
      />
      <Text style={styles.header}>Yesterday</Text>
      <FlatList
        data={yesterdayData}
        renderItem={({item}) => <NotificationItem item={item} />}
      />
    </ScrollView>
  );
};

export default NotificationScreens;

const styles = StyleSheet.create({
  header: {
    fontSize: 17,
    fontWeight: fonts.weight.semi,
    marginHorizontal: 20,
    marginVertical: 10,
  }
});
