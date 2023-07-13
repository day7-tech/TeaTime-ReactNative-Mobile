import { View, Text, FlatList } from 'react-native'
import React from 'react'
import list from './data';
import MenuListItem from '../MenuListItem/MenuListItem';

const MenuList = () => {
    return (
        <FlatList
            data={list}
            renderItem={({item}) => <MenuListItem item={item} />}
        />
    )
}

export default MenuList