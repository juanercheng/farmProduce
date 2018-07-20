/**
 * Created by Zero on 2018/3/23
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,List,ListItem, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    Image,
    Linking,
    TouchableOpacity,
    ViewPagerAndroid,
    StyleSheet,
    TouchableHighlight,
    ImageBackground
}from 'react-native';
import SettingStyle from './../../js/SettingStyle';
export  default class Empty extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
    }
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


