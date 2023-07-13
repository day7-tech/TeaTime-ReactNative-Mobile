import { View, StyleSheet, Pressable, Image, Text } from 'react-native'
import React from 'react'
import fonts from '../../../theme/fonts';
import colors from '../../../theme/color';
import RightArrow from '../../../../assets/images/right-arrow.png';
import MenuList from '../components/MenuList/MenuList';
import { useNavigation } from '@react-navigation/native';

const AddNetworkMembers = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.page}>

            <Pressable onPress={() => navigation.goBack()} style={{ padding: 0, zIndex: 100}}>
                <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 15, marginLeft: 10,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
            </Pressable>
            <Text style={styles.title}>Add Network Members</Text>

            <MenuList />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 15,
        marginTop: 50,
        flex: 1,
        backgroundColor: colors.white
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
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