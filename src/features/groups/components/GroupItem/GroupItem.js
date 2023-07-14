import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import colors from '../../../../theme/color';
import fonts from '../../../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_GROUPS_DETAIL_SCREEN } from '../../../../navigators/RouteNames';

const GroupItem = ({ item }) => {
    const navigation = useNavigation();
    return (
            <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTE_GROUPS_DETAIL_SCREEN, { groupName: item.name })}>
                <Image source={item.image} style={{ borderRadius: 50, width: 60, height: 60, resizeMode: 'contain'}} />
                <View style={item.online ? styles.online : styles.offline} />
                <View style={{ paddingVertical: 0}}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.createdBy}>Created by {item.createdBy}</Text>
                </View>
            </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        marginVertical: '5%',
    },
    online: {
        marginLeft: -20,
        marginTop: 40,
        backgroundColor: colors.green,
        width: 17,
        height: 17,
        borderRadius: 20,
        borderColor: colors.white,
        borderWidth: 1,
    },
    offline: {
        marginLeft: -20,
        marginTop: 40,
        backgroundColor: colors.red,
        width: 17,
        height: 17,
        borderRadius: 20,
        borderColor: colors.white,
        borderWidth: 1,
    },
    name: {
        fontSize: 15,
        fontWeight: fonts.weight.semi,
        paddingHorizontal: 20,
        paddingTop: 8,
    },
    createdBy: {
        fontSize: 13,
        fontWeight: fonts.weight.thin,
        paddingHorizontal: 20,
        paddingTop: 5,
        color: colors.lighttextgrey,
    }
});

export default GroupItem