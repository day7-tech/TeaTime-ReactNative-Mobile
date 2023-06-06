import React from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import styles from './Success.style';
import Typography from '../Typography/Typography';
import RecogniseIcon from '../../../assets/images/recognise_icon.png';

/**
 * A full-screen component that displays a success message along with custom content.
 *
 * @param {string} props.subtitle The text to display below the title.
 * @param {React.Component} props.content The content to display below the title and subtitle.
 */
export default function Success({content, subtitle}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Linear gradient from bottom-left to top-right */}
      <LinearGradient
        style={styles.gradient}
        colors={['#ff3d00', '#e42982', '#5a189a']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        onTouchStart={navigation.goBack}>
        <Image source={RecogniseIcon} style={styles.image} />
        <Typography style={styles.title}>Success!</Typography>
        <Typography style={styles.subtitle}>{subtitle}</Typography>
        {content}
      </LinearGradient>
    </View>
  );
}
