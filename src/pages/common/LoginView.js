import React, { Component } from 'react';
import {Spinner} from 'native-base';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

export default class LoginView extends Component {
    render() {
        return (
             <View>
                 <Spinner color='#999' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
             </View>
        );
    }
}

module.exports = LoginView;