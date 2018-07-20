/**
 * Created by Zero on 2018/3/22
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
import { Toast} from 'antd-mobile';
import SettingStyle from './../../../js/SettingStyle';
import styles from './InvoiceStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
export  default class VatInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            taxId:null,  //增票资质id
            data:null, // 增值税信息
            isBack:null, //判断是否提交增值税id
        }
    }
    componentDidMount(){
        this.getTaxInfo()
    }
    //返回确认订单页面
    _back(routName,invoice){
        const navigation = this.props.navigation;
        navigation.navigate(routName,{
            invoice:invoice,
        });
    }
    //获取增票资质
    getTaxInfo() {
        let params = {
            pageCurrent:1,
            pageSize:10,
        };
        let that = this;
        http.postData("userInfo/taxInfo",params,
            function(res){
                console.log(res)
                if(res.code===0){
                    for(let i in res.object){
                        if(res.object[i].checkIdea){
                            that.state.data = res.object[i]
                            that.setState({
                                isBack : true ,
                            })
                        }else{
                            that.setState({
                                isBack : false ,
                            });
                            Toast.info('增值税发票暂未审核通过，无法添加！');
                        }
                    }
                }
            })
    }
    //增值税发票
    addOrInvoive() {
        if(this.state.isBack){
            let params = {
                billType:2,
                billHeadType:"",  //抬头类型
                billContentType: "",  //内容类型
                billHeadName:"", //抬头名称
                taxpayersNo:"", //税号
                taxId:this.state.taxId,
            };
            console.log(params)
            let that = this;
            http.postData("userInfo/billInfoAdd",params,
                function(res){
                    console.log(res)
                    if(res.code===0){
                        that.props.back(params)
                    }
                })
        }else{
            this.props.back()
        }
    }
    render() {
        return (
            <View>
                <View style={styles.InvoiceWrap}>
                    <Text style={[SettingStyle.font14,styles.InvoiceTitle]}>增票资质</Text>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>单位名称：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]}  placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>纳税人识别号：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]} placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>注册地址：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]} placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>注册电话：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]} placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>开户银行：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]} placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                    <View style={styles.vatWrap}>
                        <Text style={[SettingStyle.font14,styles.vatName]}>银行账号：</Text>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]} placeholdertTextColor="#b3b3b3"
                               placeholder="上海千穆计算机技术有限公司"/>
                    </View>
                </View>
                <View style={{backgroundColor:"#fff"}}>
                    <View style={{flexDirection: 'row',
                        borderBottomWidth:1,borderBottomColor:"#b3b3b3",
                        alignItems:"center",paddingTop:8,paddingBottom:8,paddingLeft:15}}>
                        <Text style={[SettingStyle.font14,{}]}>发票内容</Text>
                        <Text style={[SettingStyle.font12,{color:"#b3b3b3",marginLeft:20}]}>（增值税发票内容只支持明细）</Text>
                    </View>
                    <View style={{paddingTop:8,paddingBottom:8,paddingLeft:15}}>
                        <Text style={[SettingStyle.font14]}>明细</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this.addOrInvoive()}
                    style={{   width:"100%", height:35, marginLeft:"1%", marginRight:"1%", marginTop:"15%"}}>
                    <ImageBackground style={{flex:1}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                        <View style={{width:"100%",height:"100%", flexDirection: 'row',
                            alignItems:"center",
                            justifyContent:"center",}}>
                            <Text style={{color:'#fff'}}>确定</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}
