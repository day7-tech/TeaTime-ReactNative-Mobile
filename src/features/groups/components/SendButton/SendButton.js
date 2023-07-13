import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../../theme/color';
import fonts from '../../../../theme/fonts'

const SendButton = ({ valid}) => {
  return (
    <View style={[styles.container, { backgroundColor: valid ? colors.primary : colors.lightgray }]}>
        <Text style={[styles.text, { color: valid ? colors.white : colors.grey }]}>Send</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: fonts.weight.bold,
    }
})

export default SendButton