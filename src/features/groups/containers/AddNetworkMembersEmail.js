import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../theme/color';
import fonts from '../../../theme/fonts';
import SendButton from '../components/SendButton/SendButton';

const AddNetworkMembersEmail = () => {
    const [text, setText] = useState('');
    return (
        <View style={styles.page}>
            <Text style={styles.heading}>Please enter network member's email address</Text>
            <TextInput onChangeText={setText} placeholderTextColor={colors.grey} placeholder='Email address' style={styles.input} />
            <View style={styles.btn}>
                <SendButton valid={text.length > 0}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: fonts.weight.bold
    },
    input: {
        marginVertical: 20,
        padding: 15,
        backgroundColor: colors.verylightgray,
        borderColor: colors.lightgray,
        borderWidth: 1,
        borderRadius: 7,
        fontSize: 18,
        fontWeight: fonts.weight.bold,
    },
    btn: {
        marginTop: 'auto',
        paddingBottom: 25,
    }
});
export default AddNetworkMembersEmail