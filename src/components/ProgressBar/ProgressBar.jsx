import React from 'react';
import {Box, Progress, Center, NativeBaseProvider} from 'native-base';

/**
 * ProgressBar component displays a progress bar.
 * @param {number} value - The value of the progress bar (between 0 and 1).
 */
export default function ProgressBar({value}) {
  return (
    <NativeBaseProvider>
      {/* Center the progress bar */}
      <Center>
        <Center w="100%">
          {/* Use a Box component to constrain the width */}
          <Box w="100%" maxW="400">
            {/* Progress component to display the progress bar */}
            <Progress value={value} colorScheme="secondary" />
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
