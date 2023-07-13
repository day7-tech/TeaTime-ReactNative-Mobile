import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const NotificationItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={item.avatar} style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 50}} />
            <Text style={styles.text}>{item.name} {item.message}</Text>
            <Image source={item.secondary} style={{ width: 50, height: 50, resizeMode: 'contain', borderRadius: 50}} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    text: {
        width: '70%',
        alignSelf: 'center',
        padding: 10,   
    }
});

export default NotificationItem