import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import Avatar from '../components/Avatar/Avatar';
import DetailSection from '../components/DetailSection/DetailSection';
import RightArrow from '../../../../assets/images/right-arrow.png';

const UserDetail = () => {
    const route = useRoute();
    const {user} = route.params;  
    const navigation = useNavigation();
    const accessData = [
        {key:'1', value:'Admin'},
        {key:'2', value:'General'},
        {key:'3', value:'View Only'},
    ]
    const relationshipData = [
        {key:'1', value:'Father'},
        {key:'2', value:'Daughter'},
        {key:'3', value:'Other'},
    ]

    return (
        <ScrollView style={styles.page}>
            <Pressable onPress={() => navigation.goBack()} style={{ padding: 0, zIndex: 100}}>
                <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 55, marginLeft: 20,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
            </Pressable>
            <View style={styles.container}>
                <View style={styles.avatar}>
                    <Avatar width={110} height={110} image={user.avatar} />
                </View>
                <Text style={styles.name}>{user.name}</Text>
            </View>
            <DetailSection title="Level of Access" label={user.access} data={accessData} />
            <DetailSection title="Relationships" label={user.relationship}  data={relationshipData}/>
        </ScrollView>
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