/**
 * Created by Zero on 2018/3/16
 */

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,   Button,  Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter,
    AppRegistry,
    Alert,
    TextInput ,
    Platform,
    Linking,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
    Picker,
    ImageBackground
}from 'react-native';
import PropTypes from 'prop-types';

import SettingStyle from './../../../js/SettingStyle';
import styles from './ShopCarStyle';
import Util from './../../../js/util';
import global from './../../../js/global';
import http from './../../../js/http';
export  default class CheckItem extends Component{

    constructor(props){
        super(props)
        this.state = {
            isSelGoods: props.isSelGoods,
            selNum:null,
        }

    }
    componentDidMount() {
        // this.setState({
        //     data:this.props.data
        // },()=>{
        //     console.log(this.state.data)
        // })

    };
    componentWillUnmount() {
    };
    _next (routName) {
        const { navigate } = this.props.navigation;
        navigate(routName)
    }
    //修改购物车数量
    changeNumberData(id,number) {
        let datas =  encodeURI(JSON.stringify([{id:id,number:number}]));
        let params = {
            shopCart:datas
        };
        let that = this;
        http.postData("producteCar/changeShoppingCart",params,
            function(res){
                console.log(res)
                if(res.code===0){
                    // that.totalMoney ()
                }
            })
    }
    itemIncrease = (i,id,item) => {
        console.log(item)
        i++;
        this.setState({
            selNum:i
        })
        item.number  = i;
        this.changeNumberData(id,i)
    };

    itemReduce = (i,id,item) => {
        if (i <= 1) {
            return;
        }
        i--;
        this.setState({
        })
        item.number  = i;
        this.changeNumberData(id,i)
    };
    _text(id,text){
        console.log(id)
        console.log(text)
        this.changeNumberData(id,text)
        text = text.replace(/\D/g,'');
        return text
    }
    render(){
        // this.state.selNum = item.number;
        let item = this.props.data
        return (
            <View style={styles.goodsWrap}>
                <View style={styles.goodsRadioWrap}>
                    <TouchableOpacity   onPress={() => this.props.selectGoods(item)} >
                        <Image    source={ item.isSelect  ?  require('./../../../../images/xuanzhong.png')
                            : require('./../../../../images/weixuanzhong.png') }/>
                    </TouchableOpacity>
                </View>
                <View style={styles.goodsImgWrap}>
                    <Image  style={styles.goodsImg}  source={{ uri : item.productImg }}/>
                </View>
                <View style={styles.goodsTitleWrap}>
                    <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                        <Text style={styles.goodsTitle}>{  item.productName }</Text>
                    </View>
                    <Text style={styles.goodsColorText}>{  item.standardName }</Text>
                    <View style={styles.moneyWrap}>
                        <View style={{ flexDirection: 'row',flex:1}}>
                            <Text style={styles.moneyDis}><Text style={{color:"#ff4e3c",fontSize:12}}>￥</Text>{   item.productPrice }</Text>
                        </View>
                        <View style={styles.moneyWrapRight}>
                            <TouchableOpacity style={  [styles.reduceNum,{ backgroundColor : item.number <= 1 ? '#dcdcdc' : '#20a200' }] }
                                              onPress={() => this.itemReduce(item.number,item.id,item)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>-</Text>
                            </TouchableOpacity>
                            <View style={ styles.numTextWrap }>
                                <Input style={styles.selNumText}
                                       value={ `${ item.number }`}     keyboardType='numeric'   maxLength={3}
                                       onChangeText={(text) => this._text(item.id,text)} />
                            </View>
                            <TouchableOpacity style={  [styles.reduceNum,{backgroundColor:"#20a200"}] }
                                              onPress={() => this.itemIncrease(item.number,item.id,item)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

