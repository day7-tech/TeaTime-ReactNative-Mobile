import { View, StyleSheet } from 'react-native'
import React from 'react'
import fonts from '../../../theme/fonts';
import colors from '../../../theme/color';
import MenuList from '../components/MenuList/MenuList';

const AddNetworkMembers = () => {
    return (
        <View style={styles.page}>
            <MenuList />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 15,
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        textAlign: 'center',
        margin: 10,
        fontSize: 16,
        fontWeight: fonts.weight.bold,
    },
    heading: {
        paddingTop: 15,
        textAlign: 'left',
        fontSize: 18,
        fontWeight: fonts.weight.full,
    },
    body: {
        fontSize: 18,
        marginVertical: 10,
    }
})


export default AddNetworkMembers