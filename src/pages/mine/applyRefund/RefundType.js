/**
 * Created by Zero on 2018/3/28
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
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './../../shopping/shopCar/ShopCarStyle';
import refundStyle from "./ApplyRefundStyle"
import http from "./../../../js/http";

const Url='order/findOrderByNo';

export  default class RefundType extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '选择服务类型',
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
            data:null,
            loaded: false,
            message:'正在加载数据...',
        }

    }

    componentDidMount(){
        this.fetchData()
        this.props.navigation.setParams({
                navigatePressBack:this.goBack,
        })
    }

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
                       data:_this._data,
                   });
               }
            }
        )
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    _next(routName,type,orderNo){
        const navigation = this.props.navigation;
        navigation.navigate( routName,{
            type:type, // 1 仅退款  2 退货退款
            orderNo:orderNo,
            key:this.props.navigation.state.params.key
        });
    }

    render() {
        var rowData = this.state.data;
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return this.renderTypeView(rowData);
    }

    renderTypeView(rowData){
        let busOrderDetailsVoList = rowData.busOrderDetailsVoList;
        let _this = this;
        return (
            <Container>
                {
                    busOrderDetailsVoList.map(function (item,index) {
                        return(
                            <View key={index} style={[styles.goodsWrap,{ borderTopWidth:1,borderTopColor:"#e6e6e6",backgroundColor:"#f9f9f9",}]} >
                                <View style={[styles.goodsImgWrap,{marginRight:5,}]}>
                                    <Image  style={[styles.goodsImg,{width:70,height:70,}]}  source={{uri: item.picture}} />
                                </View>
                                <View style={[styles.goodsTitleWrap,{width:"73%"}]}>
                                    <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                                        <Text style={[styles.goodsTitle]} ellipsizeMode='tail'
                                            numberOfLines={2}>{item.productName }</Text>
                                    </View>
                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <Text style={[SettingStyle.font14,styles.Color99]}>规格：{item.standardName}</Text>
                                        <Text style={[SettingStyle.font14,styles.Color99]}>x {item.productNumber}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }

                <TouchableOpacity  onPress={()=>this._next("ApplyRefund",1,rowData.orderNo)}  style={[refundStyle.list, {flexDirection:"row",justifyContent:"space-between",}]}   >
                    <View style={{flexDirection:"row"}}>
                        <Image style={{width:20,height:20,marginRight:10}}  source={require("./../../../../images/mine/moren.png")} />
                        <View  >
                            <Text style={SettingStyle.font14}>仅退款</Text>
                            <Text style={[SettingStyle.font12,{color:"#999",marginTop:3,}]}>未收到货（包含未签收），或卖家协商同意前提下</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems:"center"}}>
                        <Image  style={{width:8,height:8,marginLeft:10}}  source={require("./../../../../images/shop/arrow-left.png")} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._next("ApplyRefund",2,rowData.orderNo)}   style={[refundStyle.list, {flexDirection:"row",justifyContent:"space-between",}]}   >
                    <View style={{flexDirection:"row"}}>
                        <Image style={{width:20,height:20,marginRight:10}}  source={require("./../../../../images/mine/moren.png")} />
                        <View  >
                            <Text style={SettingStyle.font14}>退货退款</Text>
                            <Text style={[SettingStyle.font12,{color:"#999",marginTop:3,}]}>已收到货，需要退还已收到的货物</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',alignItems:"center"}}>
                        <Image  style={{width:8,height:8,marginLeft:10}}  source={require("./../../../../images/shop/arrow-left.png")} />
                    </View>
                </TouchableOpacity>
            </Container>
        );
    }

    renderLoadingView(){
        return (
            <View style={SettingStyle.LoadingView}>
                   <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
            </View>
        );
   }
}

