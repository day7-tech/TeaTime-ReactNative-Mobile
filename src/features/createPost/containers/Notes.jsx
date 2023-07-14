import React, {useCallback, useState} from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import BackIcon from '../../../../assets/images/back.png';
import AppTextInput from '../../../components/AppTextInput';
import GradientBtn from '../../../components/Buttons/GradientBtn';
import GradientSwitch from '../../../components/GradientSwitch';
import Typography from '../../../components/Typography/Typography';
import {HORIZONTAL_MARGIN} from '../../../utils/constants';
import {Colors} from '../../../utils/styles';
import {useNavigation} from '@react-navigation/native';
const Notes = ({onSavePress}) => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState('');

  const handleOutsidePress = () => {
    Keyboard.dismiss();
  };

  const onSharePress = useCallback(() => {
    console.log('onSharePress');
  }, []);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <View style={styles.topButtonContainer}>
            <Pressable
              onPress={() => navigation.navigate('home_screen')}
              style={styles.saveButton}>
              <Typography style={styles.saveText}>Save</Typography>
            </Pressable>
          </View>
          <View>
            <AppTextInput
              value={notes}
              onChangeText={setNotes}
              textStyle={styles.textStyle}
              multiline
              placeholder="Add your note"
              placeholderTextColor="#6F6F6F"
              inputTextColor={Colors.white}
              containerStyle={styles.textContainer}
            />
            <View style={styles.comment}>
              <Typography style={styles.commentRadioText}>
                Allow comment
              </Typography>
              <GradientSwitch />
            </View>
            <Typography style={styles.title}>Post to account</Typography>
            <Pressable style={styles.comment}>
              <Typography style={styles.commentRadioText}>
                Send to Family group
              </Typography>
              <Image source={BackIcon} style={styles.backIcon} />
            </Pressable>
            <View style={styles.buttonStyle}>
              <GradientBtn
                btnInfo="Share"
                btnTextColor="white"
                onPress={onSharePress}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: HORIZONTAL_MARGIN,
  },
  textContainer: {
    backgroundColor: '#FFFFFF0F',
    borderRadius: 8,
    height: 130,
    alignItems: 'flex-start',
    padding: 20,
  },
  textStyle: {
    color: Colors.white,
  },
  saveText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  topButtonContainer: {
    padding: HORIZONTAL_MARGIN,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    marginVertical: 10,
  },
  comment: {
    backgroundColor: '#FFFFFF0F',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  commentRadioText: {
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
  },
  backIcon: {
    transform: [{rotate: '180deg'}],
    tintColor: Colors.white,
  },
  buttonStyle: {
    marginTop: 15,
  },
});
