import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, Button } from 'react-native';

import LoginStatusMessage from './LoginStatusMessage';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const MainScreen = ({user, navigation}) => (
    <View style={styles.container}>
        <Text>Hello, I am: {user ? user.data.name : 'undefind'}</Text>
        <LoginStatusMessage />
        <Button title="Login Page" onPress={() => navigation.dispatch({ type: 'Logout' })} />
    </View>
);

MainScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    user: PropTypes.object
};
const mapStateToProps = (state) => (
    { user: state.auth.user }
)

export default connect(mapStateToProps)(MainScreen);