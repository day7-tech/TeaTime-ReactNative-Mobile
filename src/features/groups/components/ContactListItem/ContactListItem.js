import { View, Text, ImageSourcePropType, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar'
import checkbox from '../../../../../assets/images/checkbox.png';
import checked from '../../../../../assets/images/checkbox-ticked.png';

const ContactListItem = ({ item }) => {
    const [selected, setSelected] = useState(false);
    return (
        <View style={styles.container}>
            <Avatar image={item.avatar} width={50} height={50} />
            <Text style={styles.name}>{item.name}</Text>
            <Pressable onPress={() => setSelected(v => !v)} style={{marginLeft: 'auto',}}>
                <Image source={selected ? checkbox : checked} style={{ width: 20, height: 20, resizeMode: 'contain'}} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        fontSize: 17,
        marginHorizontal: 15,
    }
});

export default ContactListItem