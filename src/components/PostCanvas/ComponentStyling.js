import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    draggable: {
        position: 'absolute',
        padding: 30,
        backgroundColor: '#00000077',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    },
    input: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default styles;
