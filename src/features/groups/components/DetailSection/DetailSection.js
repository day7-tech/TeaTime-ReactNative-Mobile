import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import colors from '../../../../theme/color';
import fonts from '../../../../theme/fonts'
import { SelectList } from 'react-native-dropdown-select-list'
import RightArrow from '../../../../../assets/images/right-arrow.png';

const DetailSection = ({ title, label, data }) => {


    const [selected, setSelected] = useState(data[0].value);


    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.dropdown}>
            <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder={selected}
                boxStyles={{ marginLeft: 25, paddingTop: 13,right: 25, width: '90%', paddingRight: 20, borderColor: colors.grey, height: 50 }}
                dropdownItemStyles={{ borderWidth: 0, borderColor: colors.grey}}
                dropdownStyles={{  borderColor: colors.grey }}
                arrowicon={<Image source={RightArrow} style={{ marginTop: 5,marginHorizontal: -7, width: 10, height: 10, resizeMode: 'contain' }} />}
                inputStyles={{ width: 300, fontSize: 17}}
                search={false}
            />
            </View>
            <View style={styles.textContainer}>
                <Text>Lorem Ipsum</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: fonts.weight.bold,
        padding: 20,
    },
    dropdown: {
        backgroundColor: colors.grey,

        width: '90%',
        alignSelf: 'center',
        borderColor: colors.grey,
        borderRadius: 7,
        flexDirection: 'row',
    },
    dropdowntext: {
        fontSize: 18,
        marginTop: 4,
    },
    textContainer: {
        padding: 20,
        borderBottomColor: colors.lightgray,
        borderBottomWidth: 1,
    }
});

export default DetailSection