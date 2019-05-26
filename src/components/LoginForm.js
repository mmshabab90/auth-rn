import React, { Component } from 'react'
import { Text } from 'react-native'
import firebase from 'firebase'
import { Button, Card, CardSection, Input, Spinner } from './common'

export default class LoginForm extends Component {

    // state to handle user feedback
    state = { email: '', password: '', error: '', loading: false };

    // firebase authentication
    // first verify user, if user doesn't exist then 
    // create user if valid inforamtion is given else
    // throw error
    onButtonPress() {
        const { email, password } = this.state;

        this.setState( {error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this));
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size = "small"/>
        }

        return( 
            <Button onPress = { this.onButtonPress.bind(this) }>
                Log In / Sign Up
            </Button>
        );
    }

    // loign success helper method
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
    }

    // login failed helper method
    onLoginFailed() {
        this.setState({
            loading: false,
            error: 'Authentication Failed!'
        });
    }

    render() {
        return (
            <Card>
                {/* // section for user email */}
                <CardSection>
                    <Input 
                        label = "Email"
                        value = { this.state.email }
                        onChangeText = { email => this.setState({ email })}
                        placeholder = "User@gmail.com"
                        />
                </CardSection>
                
                {/* //section for user password */}
                <CardSection>
                <Input 
                        label = "Password"
                        value = { this.state.password }
                        onChangeText = { password => this.setState({ password })}
                        placeholder = "Password (Min. 8 character)"
                        secureTextEntry
                        />
                </CardSection>

                <Text style = { styles.errorTextStyle }>
                    {this.state.error}
                </Text>
                
                {/* //section for button hides on button action */}
                <CardSection>
                    { this.renderButton() }
                </CardSection>
            </Card>
        )
    }
}

const styles ={
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    },
}