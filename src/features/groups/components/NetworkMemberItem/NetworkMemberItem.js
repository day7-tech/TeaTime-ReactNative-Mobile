import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import fonts from '../../../../theme/fonts'
import colors from '../../../../theme/color'
import { useNavigation } from '@react-navigation/native'
import Avatar from '../Avatar/Avatar'
import avatar1 from '../../../../../assets/images/avatar1.png';
import { ROUTE_NETWORK_USER_DETAIL } from '../../../../navigators/RouteNames';
import RightArrow from '../../../../../assets/images/right-arrow.png';

const NetworkMemberItem = ({ user }) => {
    const navigation = useNavigation();

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate(ROUTE_NETWORK_USER_DETAIL, { user })}>
            <Avatar image={avatar1} width={50} height={50} />
            <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.access}>{user.access}</Text>
            </View>
            <View style={styles.relationship}>
                <Text style={styles.relationshipLabel}>{user.relationship}</Text>
            </View>
            <Image source={RightArrow} style={{ marginTop: 5, width: 15, height: 15, resizeMode: 'contain' }} />

        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
    },
    name: {
        fontSize: 15,
        fontWeight: fonts.weight.bold,
        paddingVertical: 3,
        paddingHorizontal: 15,
    },
    access: {
        color: colors.black,
        paddingHorizontal: 15,
    },
    relationship: {
        marginLeft: 'auto',
        marginRight: 15,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        backgroundColor: colors.textgrey,
    },
    relationshipLabel: {    
        color: colors.white,
        fontSize: 15,
    }
});
export default NetworkMemberItem