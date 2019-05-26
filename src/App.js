import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


export default class App extends Component {

    state = { loggedIn: null };

    // lifecycle method
    componentWillMount() {
        // firebase initialization
        firebase.initializeApp({
            apiKey: 'AIzaSyAsytNAKP67J1lNVnigfbxiF0LFmRyaaF8',
            authDomain: 'rn-auth-22274.firebaseapp.com',
            databaseURL: 'https://rn-auth-22274.firebaseio.com',
            projectId: 'rn-auth-22274',
            storageBucket: 'rn-auth-22274.appspot.com',
            messagingSenderId: '860070661301',
            appId: '1:860070661301:web:32cd9506c8c240a1'
          });

          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  this.setState({ loggedIn: true });
              } else {
                  this.setState({ loggedIn: false });
              }
          });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress = { () => firebase.auth().signOut() }>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case false:
                return <LoginForm />;
            default:
                return (
                    <View style = {styles.spinnerStyle}>
                        <Spinner size = "large"/>
                    </View>
                );
        }        
    }

    render() {
        return (
            <View>
                <Header headerText = "Firebase Authentication" />
                { this.renderContent() }
            </View>
        )
    }
}

const styles = {
    spinnerStyle: {
        alignSelf: 'center',
    }
}
