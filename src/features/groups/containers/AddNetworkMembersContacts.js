import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import colors from '../../../theme/color';
import users from '../data/data';
import ContactListItem from '../components/ContactListItem/ContactListItem';
const AddNetworkMembersContacts = () => {
    return (
        <View style={styles.page}>
            <View style={styles.container}>
                <TextInput placeholder='Search' style={styles.input} />
            </View>
            <FlatList
                data={users}
                renderItem={({item}) => <ContactListItem item={item} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        height: 30,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        height: 40,
        backgroundColor: colors.verylightgray,
        borderRadius: 10,
        alignItems: 'center'

    },
    input: {
        width: '80%',
        fontSize: 18,
        color: colors.grey,
        borderRadius: 15,
        paddingLeft: 15,
    }
})

export default AddNetworkMembersContacts