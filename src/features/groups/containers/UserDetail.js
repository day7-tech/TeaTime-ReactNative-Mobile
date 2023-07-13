import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import Avatar from '../components/Avatar/Avatar';
import DetailSection from '../components/DetailSection/DetailSection';

const UserDetail = () => {
    const route = useRoute();
    const {user} = route.params;  

    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar width={110} height={110} image={user.avatar} />
                </View>
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <DetailSection title="Level of Access" label={user.access} />
            <DetailSection title="Relationships" label={user.relationship} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        backgroundColor: colors.altBackground,
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        paddingVertical: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: fonts.weight.bold,
    },
});

export default UserDetail