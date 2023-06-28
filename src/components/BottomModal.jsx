import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {HORIZONTAL_MARGIN} from '../utils/constants';
import {Colors} from '../utils/styles';

/**
 * Component that represents a bottom modal.
 * @param {ReactNode} children - The content of the modal.
 * @param {object} bottomSheetModalRef - The reference to the bottom sheet modal.
 * @param {Function} onClose - The function to be called when the modal is closed.
 * @param {object} containerStyle - The additional styles to apply to the container.
 * @returns {JSX.Element} - The BottomModal component.
 */
const BottomModal = ({
  children,
  bottomSheetModalRef,
  onClose,
  containerStyle,
  bottomSheetContainerStyle,
  snapPoints = ['80%'],
}) => {
  /**
   * Renders the backdrop for the bottom modal.
   * @param {object} props - The props passed to the backdrop component.
   * @returns {JSX.Element} - The rendered backdrop component.
   */
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={[
        styles.bottomSheetContainer,
        bottomSheetContainerStyle,
      ]}>
      <BottomSheetScrollView
        contentContainerStyle={[styles.contentContainer, containerStyle]}
        showsVerticalScrollIndicator={false}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderRadius: 30,
    backgroundColor: Colors.black,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: getBottomSpace(),
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
});
