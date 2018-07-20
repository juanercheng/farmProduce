/**
 * Created by Zero on 2018/3/26
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
    ScrollView,
    TouchableHighlight,
    StyleSheet,
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import confirmStyles from './ConfirmOrderStyle';
import styles from '../shopCar/ShopCarStyle';
import Util from './../../../js/util';


export  default class OneOrderComponent extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }

    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate(routName);
    }
    render() {
        let data = this.props.data[0];
        return (
            <View style={[styles.goodsWrap,{ borderTopWidth:1,borderTopColor:"#f0f2f5"}]} >
                <View style={[styles.goodsImgWrap,{marginRight:10,}]}>
                    <Image  style={styles.goodsImg}  source={{ uri : data.productImg }} />
                </View>
                { console.log('商品',data)}
                <View style={[styles.goodsTitleWrap,{width:"73%"}]}>
                    <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                        <Text style={[styles.goodsTitle]} ellipsizeMode='tail'
                              numberOfLines={2}>{data.productName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:"space-between"}}>
                        <Text style={styles.goodsColorText}>{data.productSku}</Text>
                        <Text style={styles.goodsColorText}>x{data.number}</Text>
                    </View>
                    <View style={styles.moneyWrap}>
                        <View style={{ flexDirection: 'row',flex:1}}>
                            <Text style={styles.moneyDis}><Text style={{color:"#ff4e3c",fontSize:12}}>￥</Text>{data.buyPriceSingle}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
