import { View, Text, StyleSheet, Pressable, Image, FlatList } from 'react-native'
import React from 'react';
import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import RightArrow from '../../../../assets/images/right-arrow.png';
import groupsData from '../data/groupsData';
import GroupItem from '../components/GroupItem/GroupItem';

const GroupScreen = () => {
    return (
        <View style={styles.page}>
            <Pressable style={{ padding: 0, zIndex: 100}}>
                <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 15, marginLeft: 10,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
            </Pressable>
            <Text style={styles.title}>My Groups</Text>
            <FlatList
                data={groupsData}
                renderItem={({item}) => <GroupItem item={item} />}
                style={{ marginTop: 25}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 50,
        padding: 15,
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        textAlign: 'center',
        margin: 10,
        fontSize: 18,
        fontWeight: fonts.weight.bold,
    }
});

export default GroupScreen