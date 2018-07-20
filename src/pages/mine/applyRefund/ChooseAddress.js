/**
 * Created by juaner  2018/3/29
 */
import React, { Component } from 'react';
import { Container,  Button, Text ,Input } from 'native-base';
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
    ImageBackground,
    StyleSheet,
}from 'react-native';
import { Toast, Modal,} from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import styles from "./ApplyRefundStyle"
import http from "./../../../js/http";
import global from "../../../js/global";

const Url = 'orderRefund/orderRefundInfo';
const addRefundDetail = 'orderRefund/addRefundDetail';
const getAddressInfo = 'userInfo/getAddressInfo';
const addressInfo = 'userInfo/addressInfo';


export  default class ChooseAddress extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '选择退款方式',
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
            color: "#333",
            alignSelf: 'center',
        },
        headerLeft:(
            <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight: (
            <Button transparent></Button>
        )
    });
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            data: null,
            date:'请选择取件时间',
            info:null,
            addressId:null,
            senderName:null,
            senderAddress:null,
            refundNo:null
        }
    }
    componentDidMount(){
        this.fetchData()
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    fetchData() {
        let params ={
            orderNo:this.props.navigation.state.params.orderNo,
        };
        let _this = this;
        http.getData( Url,params,
            function(res){
                console.log(res);
               if(res.code===0){
                   _this._data = res.object;
                   _this.setState({
                       loaded: true,
                       data:_this._data.busOrderDetailsList,
                       refundNo:_this._data.refundNo
                   });
               }else {
                   _this.setState({
                       loaded: true,
                       data:_this._data.busOrderDetailsList,
                   });
               }
            }
        );
        //退货地址
        let params1 = {
            pageCurrent:1,
            pageSize:10,
            userids:global.login.userId,
        };
        http.postData( addressInfo,params1,
            function(res){
                console.log(res);
                if(res.code===0){
                    _this._data = res.object;
                    for (var i in _this._data){
                        _this.setState({
                            addressId:_this._data[0].id,
                            senderName:_this._data[0].consigneeName,
                            senderAddress:_this._data[0].province+_this._data[0].city+_this._data[0].area
                        });
                    }
                }
            }
        )
    }

    _next(routName,title){
        let _this = this
        const navigation = _this.props.navigation;
        navigation.navigate( routName,{
            title:title,
            refresh: function (res) {
                _this.setState({
                    date:res,
                });
            }
        });
    }

    _next1(routName,title){
        let _this = this
        const navigation = _this.props.navigation;
        navigation.navigate( routName,{
            title:title,
            refresh: function (info) {
                _this.setState({
                    info:info,
                    addressId:info
                },function () {
                    let params = {
                        addressId:_this.state.info
                    }
                    http.postData( getAddressInfo,params,
                        function(res){
                            console.log(res);
                            if(res.code===0){
                                _this._data = res.object;
                                _this.setState({
                                    senderName:_this._data.consigneeName,
                                    senderAddress:_this._data.province+_this._data.city+_this._data.area
                                });
                            }
                        }
                    )
                });
            }
        });

    }

    renderLoadingView(){
         return (
             <View style={SettingStyle.LoadingView}>
                    <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
             </View>
         );
    }

    render() {
        var rowData = this.state.data;
        let busOrderDetailsList = this.state.data;
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return (
            <Container>
                <ScrollView>
                    <View style={styles.chooseItem}>
                        <Text style={SettingStyle.font14}>退货方式</Text>
                        <View style={{alignItems:'flex-end'}}>
                            <Text style={SettingStyle.font14}>快递员上门取件</Text>
                            <Text style={[styles.Color99,SettingStyle.font12]}>订单在72小时之内返还到支付账户</Text>
                        </View>
                    </View>
                    <View style={styles.chooseItem}>
                        <Text style={SettingStyle.font14}>取件时间</Text>
                        <TouchableOpacity onPress={()=>this._next('DateChoose')} >
                            <Text style={[styles.Color99,SettingStyle.font13]}>{this.state.date}  > </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chooseItem}>
                        <Text style={SettingStyle.font14}>取件地址</Text>
                        <TouchableOpacity onPress={()=>this._next1('Address','选择退货地址')} >
                            <View style={{marginLeft:15}}>
                                <Text style={SettingStyle.font14}>{this.state.senderName}</Text>
                                <View style={{flexDirection:"row",justifyContent: 'flex-start',marginTop:15}}>
                                    <Text style={[SettingStyle.font13,{width:'86%'}]} ellipsizeMode='tail' numberOfLines={2}>{this.state.senderAddress}</Text>
                                    <Text style={[styles.Color99,SettingStyle.font13]}> > </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.chooseItemLast,{marginTop:10}]}>
                        <Text style={[SettingStyle.font14,{marginLeft:15,marginBottom:15}]}>寄件商品</Text>
                        {
                            busOrderDetailsList.map(function (item,index) {
                                return(
                                    <View style={styles.centerBox} key={index}>
                                        <View style={[styles.center,{marginBottom:1,alignItems:'flex-start',}]}>
                                            <Image  source={{uri: item.picture}}
                                                    style={styles.listLeft}/>
                                            <View style={styles.listRight}>
                                                <Text style={SettingStyle.font14}
                                                      ellipsizeMode='tail' numberOfLines={2}>{item.productName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{marginLeft:15,marginRight:15,marginTop:50}}>
                       <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                             <Button block style={{backgroundColor:'transparent'}} onPress={()=>this.send()     }>
                                   <Text style={{color:'#fff',textAlign:'center'}}>提交</Text>
                             </Button>
                       </ImageBackground>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    send = () => {
        let _this = this;
        let time = _this.state.date;
        let year = time.slice(0,time.indexOf(' '));
        let takeStartTime = year + time.substring(time.indexOf(' '),time.lastIndexOf('-'))+':00';
        let takeEndTime = year + ' ' + time.substring(time.lastIndexOf('-')+1)+':00';
        if(time === '请选择取件时间'){
            return Toast.info('请选择取件时间！')
        }
        if(!_this.state.addressId){
            return Toast.info('请选择退货地址！')
        }
        let params = {
            refundNo:_this.state.refundNo,
            refundType:0,
            takeStartTime:takeStartTime,
            takeEndTime:takeEndTime,
            id:_this.state.addressId,
        };
        console.log(params);
        http.postData( addRefundDetail,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    Toast.info('提交成功',2, () => {
                        const { goBack } = _this.props.navigation
                        goBack (_this.props.navigation.state.params.key)
                    });
                }
            }
        )
    }


}

