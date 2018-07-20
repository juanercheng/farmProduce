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
    ScrollView,
    TouchableHighlight,
    ImageBackground
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import styles from './CouponStyle';
import Util from './../../../js/util';
import http from './../../../js/http'
import Empty from './../Empty';
import LoginView from './../LoginView'

const coupon1= require('./../../../../images/shop/dianpuyouhuijuan.png')
const coupon2= require('./../../../../images/shop/yiyong.png')
const coupon3= require('./../../../../images/shop/shixiao.png')
export  default class couponList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list:null,
            loaded:false
        }
    }
    componentDidMount(){
        this.fetchData(this.props.type)
    }

    fetchData(type) {
        console.log(type)
        let params ={
            pageCurrent:1,
            pageSize:10,
            useStatus:type
        };
        let that = this;
        http.postData("coupon/mycoupons",params,
            function(res){
                if(res.code===0){
                    that._data=res.object
                    console.log(that._data )
                    that.setState({
                        list: that._data,
                        loaded: true,
                    });
                }else {
                    console.log(res)
                }
            })
    }
    emptyRender(){
        return (
            <View style={[SettingStyle.emptyWrap ]}>
                <Image source={require('./../../../../images/shop/youhuijuanweikong.png')} />
                <Text style={[SettingStyle.font14,{color:"#999",marginTop:5,}]}>暂无优惠券</Text>
            </View>
        )
    }
    render() {
        if (!this.state.loaded ) {
            return <LoginView/>
        }else if(  this.state.list.length<1){
            return this.emptyRender()
        }
        return (
            <ScrollView style={{backgroundColor:"#f2f4f7"}}>
                <View style={styles.couponWrap}>
                    {
                        this.state.list.map((item,index)=>(
                            <View style={styles.couponList} key={index} >
                                <ImageBackground style={styles.couponBg}  resizeMode='contain'
                                source={ item.usestatus===0 ? coupon1 :item.usestatus===1 ? coupon2:item.usestatus===2 ? coupon3 :null }>
                                    <View style={styles.couponListWrap}>
                                        <View style={styles.couponLeftWrap}>
                                            <View style={styles.moneyWrap}>
                                                <Text style={[SettingStyle.font14,{color:"#fff" }]}>
                                                    ￥<Text style={{fontSize:24,color:"#fff"  }}>{item.couponsEntity.discountmoney}</Text>
                                                </Text>
                                            </View>
                                            <Text style={[SettingStyle.font14,{color:"#fff",marginTop:3}]}>满{item.couponsEntity.condition}使用</Text>
                                        </View>
                                        {
                                            item.usestatus === 0 ?
                                                <View style={styles.couponRightWrap}>
                                                    <View style={styles.couponTitle}>
                                                        <Text
                                                            style={SettingStyle.font14}>{item.couponsEntity.discountname}</Text>
                                                    </View>
                                                    <View style={styles.couponDateWrap}>
                                                        <Text
                                                            style={[SettingStyle.font12, {color: "#23a300"}]}>有效期:{item.couponsEntity.termofvalidity}</Text>
                                                        <TouchableOpacity style={styles.useBtn}
                                                                          onPress={() => this.props.nextClick(item.memberid)}>
                                                            <Text style={[{fontSize: 12, color: "#23a300"}]}>立即使用</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                                :
                                                <View style={[styles.couponRightWrap,styles.couponUsedRightWrap]}>
                                                    <View style={styles.couponTitle}>
                                                        <Text style={SettingStyle.font14}>{item.couponsEntity.discountname}</Text>
                                                    </View>
                                                    <View style={[styles.couponDateWrap,styles.couponUsedDateWrap]}>
                                                        <Text  style={[SettingStyle.font12,{color:"#999"}]}>有效期:{item.couponsEntity.termofvalidity}</Text>
                                                    </View>
                                                </View>
                                        }
                                    </View>

                                </ImageBackground>
                            </View>
                       ))
                    }
                </View>
            </ScrollView>
        );
    }
}
