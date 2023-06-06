import React from 'react';
import { View } from 'react-native';
import Typography from '../Typography/Typography';

export default function MomentFavourites() {
    return (
        <>
            <View>
                <Typography style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Favourites</Typography>
            </View>
            <View
                style={{
                    padding: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    borderRadius: 25
                }}
            >
                <Typography
                    style={{
                        color: '#0A0A0A',
                        fontSize: 18,
                        fontWeight: '700'
                    }}
                >
                    Moments
                </Typography>
            </View>
        </>
    );
}
