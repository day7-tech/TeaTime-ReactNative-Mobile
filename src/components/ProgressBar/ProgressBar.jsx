import React from 'react';
import { Box, Progress, Center, NativeBaseProvider } from 'native-base';

export default function ProgressBar({ value }) {
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Center w='100%'>
                    <Box w='100%' maxW='400'>
                        <Progress value={value} colorScheme='secondary' />
                    </Box>
                </Center>
            </Center>
        </NativeBaseProvider>
    );
}
