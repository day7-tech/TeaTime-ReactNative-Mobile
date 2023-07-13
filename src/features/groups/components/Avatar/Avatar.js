import { Image } from 'react-native'
import React from 'react'

const Avatar = ({ image, width, height }) => {
    return (
        <Image source={image} style={{ width: width, height: height, borderRadius: 150, resizeMode: 'contain' }}/>
    )
}

export default Avatar