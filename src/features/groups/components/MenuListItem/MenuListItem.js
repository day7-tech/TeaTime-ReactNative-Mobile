import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
// import Feather from '@expo/vector-icons/Feather';
// import AntDesign from '@expo/vector-icons/AntDesign';
import colors from '../../../../theme/color';
import fonts from '../../../../theme/fonts';
import RightArrow from '../../../../../assets/images/right-arrow.png';
import { useNavigation } from '@react-navigation/native';

const MenuListItem = ({ item }) => {
    const navigation = useNavigation();
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate(item.target)}>
            <Image source={item.icon} style={{ width: 20, height: 20, resizeMode: 'contain', paddingHorizontal: 20}} />
                <View style={styles.subcontainer}>
                    <View>
                        <Text style={styles.heading}>{item.label}</Text>
                        <Text style={styles.detail}>{item.detail}</Text>
                    </View>
                    <Image source={RightArrow} style={{ marginTop: 5, width: 15, height: 15, resizeMode: 'contain', marginLeft: 'auto'}} />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subcontainer: {
        width: '90%',
        borderBottomColor: colors.verylightgray,
        borderBottomWidth: 1,
        paddingVertical: 10,
        flexDirection: 'row',
    },
    heading: {
        paddingVertical: 2,
        paddingHorizontal: 2,
        fontSize: 17,
        fontWeight: fonts.weight.normal
    },
    detail: {
        fontSize: 13,
        paddingHorizontal: 2,
        color: colors.black
    }
});
export default MenuListItem