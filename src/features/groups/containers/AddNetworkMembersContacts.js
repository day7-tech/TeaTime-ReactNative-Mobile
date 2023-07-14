import { View, Text, TextInput, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import colors from '../../../theme/color';
import users from '../data/data';
import RightArrow from '../../../../assets/images/right-arrow.png';

import ContactListItem from '../components/ContactListItem/ContactListItem';
import SearchImage from '../../../../assets/images/search-icon.png';
import fonts from '../../../theme/fonts';
import { useNavigation } from '@react-navigation/native';

const AddNetworkMembersContacts = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.page}>
            <Pressable onPress={() => navigation.goBack()} style={{ padding: 0, zIndex: 100}}>
                <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 15, marginLeft: 20,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
            </Pressable>
            <Text style={styles.title}>Add Network Members</Text>
            <View style={styles.container}>
                <Image source={SearchImage} style={{ width: 20, height: 20, resizeMode: 'contain', marginLeft: 10}} />
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
        marginTop: 50,
        height: 30,
        flex: 1,
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontWeight: fonts.weight.bold,
    },
    container: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginVertical: 20,
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