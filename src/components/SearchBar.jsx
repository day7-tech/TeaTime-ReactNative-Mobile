import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../utils/styles';
import SearchIcon from './../../assets/images/search.png';
import AppTextInput from './AppTextInput';

/**
 * SearchBar component that displays a search input field with an optional prefix component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.searchText - The current search text.
 * @param {function} props.setSearchText - Callback function to set the search text.
 * @param {Object} props.style - Custom style for the search bar container.
 * @param {Object} props.textStyle - Custom style for the search text input.
 * @param {JSX.Element} props.PrefixComponent - Optional prefix component to display before the search icon.
 * @param {Object} props.rest - Additional props passed to the AppTextInput component.
 * @returns {JSX.Element} - SearchBar component.
 */
const SearchBar = ({
  searchText,
  setSearchText,
  style,
  textStyle,
  PrefixComponent,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Display the PrefixComponent if provided, otherwise display the default search icon */}
      {PrefixComponent ?? (
        <Image source={SearchIcon} style={styles.searchIcon} />
      )}
      <View style={styles.inputContainer}>
        <AppTextInput
          value={searchText}
          onChangeText={setSearchText}
          style={[styles.searchText, textStyle]}
          placeholder={'Search'}
          autoCorrect={false}
          {...rest}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginLeft: 18,
  },
  container: {
    height: 50,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    paddingRight: 20,
  },
  searchIcon: {
    tintColor: Colors.darkGrey,
    marginHorizontal: 5,
  },
});

export default SearchBar;
