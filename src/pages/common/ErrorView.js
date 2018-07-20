import React, { Component } from 'react';
import { Container,Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    View,
    Image,
    TouchableOpacity,
    ViewPagerAndroid,
    StyleSheet,
    TouchableHighlight,
    ImageBackground
}from 'react-native';

export default class ErrorView extends Component {
    render() {
        return (
            <View style={SettingStyle.emptyWrap}>
                <ImageBackground style={SettingStyle.emptyImg} resizeMode='contain'
                                 source={require('./../../../images/shop/nocoupon.png')} />
                <Text style={[SettingStyle.font14,{color:"#999"}]}>您还没有优惠券</Text>
            </View>
        );
    }
}

module.exports = ErrorView;