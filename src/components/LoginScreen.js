import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View, Text, Button, Dimensions, Image, ImageBackground } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { LinearGradient } from 'expo';
import { Icon, Content, Toast, Button as BaseButton } from 'native-base';
import SvgUri from 'react-native-svg-uri';

import { Field, reduxForm } from 'redux-form'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: '100%'
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        flex: 0.9,  
        justifyContent: 'flex-start', 
        alignSelf: 'flex-start',
        paddingLeft: '10%'
    },
    icon: {
        padding: 10, 
        paddingTop: 25, 
        paddingLeft: 0, 
        paddingBottom: 0, 
        color: '#F4F4F4'  
    },
    button: {
        backgroundColor: 'blue',
        color: 'white',
        height: 30,
        lineHeight: 30,
        marginTop: 10,
        textAlign: 'center',
        width: 250
    },
    inputText: {
        color: '#F4F4F4', 
        fontSize: 20 
    },
    forgotPassword: {
        backgroundColor: '#FFF',
        color: 'black'
    }
});
const iconStyle = { padding: 10, paddingTop: 25, paddingLeft: 0, paddingBottom: 0, color: '#F4F4F4' }

const validate = (values) => {
    const errors = {};
    errors.email = !values.email ? 
        'Email field is required' : (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) ? 
        'Email format is invalid' : undefined;

    errors.password = !values.password ? 
        'Password field is required' : values.password.length < 8 ? 
        'Password must be at least 8 characters long': undefined;

    return errors;
}


class LoginScreen extends Component{
    state = {
        error: {email: '', password: ''},
        showToast: false,
        portrait: Dimensions.get('screen').height >= Dimensions.get('screen').width
    }

    componentWillMount = () => {
        Dimensions.addEventListener('change', () => {
            this.setState({
                portrait: this.isPortrait()
            });
        });
    }

    componentWillReceiveProps = (nextProps, nextState) => {
        if(nextProps.auth.error && nextProps.auth.error !== this.props.auth.error){
            Toast.show({
                text: nextProps.auth.error.message,
                duration: 3000,
                position: "top",
            })
        }
    }

    isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    }
    renderInput = ({ input: { onChange, ...restInput }, label, type, meta: { touched, error }, width }) => {
        

        return <Hoshi
                    style={{ width }}
                    label={label}
                    labelStyle={styles.inputText}
                    inputStyle={styles.inputText}
                    borderColor={'#23CF5F'}
                    onChangeText={onChange} {...restInput}/>
    }
    handleSignIn = () => {
        const { navigation, form } = this.props
        const { syncErrors, values } = form
   
        if (syncErrors.email || syncErrors.password){
                Toast.show({
                    text: `${syncErrors.email ? syncErrors.email: ''}\n${syncErrors.password ? syncErrors.password: ''}`,
                    duration: 3000,
                    position: "top",   
                })
        }else{
            console.log(values)
            navigation.dispatch({ type: 'Login_async', payload: values })
        }
    }
    handleSignUp = () => {
        const { navigation } = this.props
        navigation.dispatch({ type: 'SignUp'})
    }
    render(){
        const { navigation, handleSubmit } = this.props
        const { portrait } = this.state

        const dim = Dimensions.get('screen');
        return(
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../img/BG.png')}>
                <View style={styles.logo}>
                    <SvgUri
                        width="150"
                        height="50"
                        source={require('../img/trucknet_logo.svg')}
                        />
                </View>
                
                <LinearGradient 
                    colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                    style={styles.backgroundImage}>
                     
                        <View style={{ flex: portrait ? 0.8 : 1, flexDirection: 'column', justifyContent: 'flex-end', width: '80%'}} >
                            <View style={{flex: portrait ? 0.5 : 1, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Icon name="ios-mail-outline" style={{ ...iconStyle, fontSize: 40}}/>
                                <Field name="email" label="Email" component={this.renderInput} width={(0.8 * dim.width)-40}/>
                            </View>
                            <View style={{flex: portrait ? 0.2 : 0.7, flexDirection: 'row', alignItems: 'flex-end'}}>
                                <Icon name="ios-lock-outline" style={{ ...iconStyle, fontSize: 48}}/>
                                <Field type="password" name="password" label="Password" component={this.renderInput} width={(0.8 * dim.width)-40}/>
                            </View>
                            <View style={{flex: portrait ? 0.2 : 0.7, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                <BaseButton 
                                    transparent
                                    onPress={()=>navigation.dispatch({ type: 'ForgotPassword'})}>
                                    <Text style={{color: '#F4F4F4'}}>Forgot your password?</Text>
                                </BaseButton>
                            </View>
                            <BaseButton
                                style={{marginBottom: 5, backgroundColor: '#23CF5F'}}
                                onPress={()=>this.handleSignIn()}
                                block>
                                <Text style={{color: '#FAFAFA', fontWeight: 'bold'}}>SIGN IN</Text>
                            </BaseButton>
                            <BaseButton
                                style={{backgroundColor: 'rgba(244,244,244,0.1)'}}
                                onPress={()=>navigation.dispatch({ type: 'SignUp'})}
                                block
                                bordered success>
                                <Text style={{color: '#23CF5F', fontWeight: 'bold'}}>SIGN UP</Text>
                            </BaseButton>
                        </View>
                    
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }
}



LoginScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

LoginScreen.navigationOptions = {
    title: 'Log In',
};

const mapStateToProps = ({form, auth}) => {
    return { 
        form: form.loginForm,
        auth
    }
}


const wrappedLoginScreen = connect(mapStateToProps)(LoginScreen);  

export default reduxForm({ form: 'loginForm', validate })(wrappedLoginScreen)