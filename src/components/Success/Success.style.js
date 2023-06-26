import {StyleSheet} from 'react-native';
import {
  horizontalPaddingValue,
  verticalPaddingValue,
} from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: horizontalPaddingValue,
    paddingVertical: verticalPaddingValue,
  },
  image: {
    marginTop: '35%',
    height: 180,
    width: 180,
  },
  title: {
    fontWeight: 700,
    fontSize: 34,
    lineHeight: 41,
    marginVertical: 16,
  },
  subtitle: {
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 24,
  },
});

export default styles;
