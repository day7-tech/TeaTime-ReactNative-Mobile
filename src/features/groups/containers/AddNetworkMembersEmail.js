import { View, Text, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import SendButton from '../components/SendButton/SendButton';
import RightArrow from '../../../../assets/images/right-arrow.png';
import { useNavigation } from '@react-navigation/native';

const AddNetworkMembersEmail = () => {
    const [text, setText] = useState('');
    const navigation = useNavigation();
    return (
        <View style={styles.page}>
            <Pressable onPress={() => navigation.goBack()} style={{ padding: 0, zIndex: 100}}>
                <Image source={RightArrow} style={{ transform: [{ rotate: '180deg'}], marginTop: 15, marginLeft: 10,  width: 15, height: 15, resizeMode: 'contain', position: 'absolute' }} />
            </Pressable>
            <Text style={styles.title}>Add Network Members</Text>

            <Text style={styles.heading}>Please enter network member's email address</Text>
            <TextInput onChangeText={setText} placeholderTextColor={colors.textgrey} placeholder='Email address' style={styles.input} />
            <View style={styles.btn}>
                <SendButton valid={text.length > 0}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        marginTop: 50,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: fonts.weight.normal,
        marginTop: 30,
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 16,
        fontWeight: fonts.weight.bold,
    },
    input: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: colors.verylightgray,
        borderColor: colors.lightgray,
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 18,
        fontWeight: fonts.weight.normal,
    },
    btn: {
        marginTop: 'auto',
        paddingBottom: 25,
    }
});
export default AddNetworkMembersEmail