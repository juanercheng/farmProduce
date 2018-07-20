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

export default class NoDataView extends Component {
    render() {
        return (
            <View style={{height:30,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                <Text style={{color:'#666',fontSize:12,marginTop:5,marginBottom:5,}}>
                    没有更多数据了
                </Text>
            </View>
        );
    }
}

module.exports = NoDataView;