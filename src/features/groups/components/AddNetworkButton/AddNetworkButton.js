import { Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import colors from '../../../../theme/color';
import fonts from '../../../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_ADD_NETWORK_MEMBERS } from '../../../../navigators/RouteNames';

const AddNetworkButton = () => {
    const navigation = useNavigation();
    const navigateToAddMembers = () => {
        navigation.navigate(ROUTE_ADD_NETWORK_MEMBERS)
    }
    
    return (
        <Pressable style={styles.container} onPress={() => navigateToAddMembers()}>
            <Text style={styles.text}>Add Network Members</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 15,
        borderWidth: 2,
        borderRadius: 7,
        padding: 17,
        borderColor: colors.accent
    },
    text: {
        color: colors.accent,
        fontSize: 18,
        fontWeight: fonts.weight.bold,
        textAlign: 'center',
    }
});

export default AddNetworkButton