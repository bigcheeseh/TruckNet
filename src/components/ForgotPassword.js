import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Text, Button } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

const ForgotPassword = (props) => {

    return(
        <View style={styles.container}>
            <Text>This is Forgot Pass button</Text>
            <Button title="Login Page" onPress={()=>props.navigation.dispatch({ type: 'Logout'})}/>
        </View>
    )
};

ForgotPassword.propTypes = {
    navigation: PropTypes.object.isRequired
};



export default ForgotPassword;