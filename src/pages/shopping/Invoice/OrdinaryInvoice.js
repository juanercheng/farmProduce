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
import global from './../../../js/global';
const nocheckImage=require('./../../../../images/shop/piaoju-weixuanzhong.png');
const checkImage=require('./../../../../images/shop/xuanzhong.png');
export  default class OrdinaryInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {
            ticketTitle:11, //发票抬头 个人or单位
            ticketMsg:21 ,// 收票信息
            billHeadName:null, //发票名称
            taxpayersNo:null, //纳税人识别号
            invoice:null,//成功提交返回的发票信息
        }
    }
    componentDidMount(){
        console.log( global.shop.ticketType)
    }
    //发票抬头单选
    _check2(id){
        this.setState({
            ticketTitle:id,
        })
    }
    //收票信息单选
    _check3(id){
        this.setState({
            ticketMsg:id,
        })
    }
    //普通发票
    addOrInvoive() {
        if (!this.state.billHeadName){
            return Toast.info('请输入名称');
        }
        if(this.state.ticketTitle ===12 ){
            if (!this.state.taxpayersNo){
                return Toast.info('请输入税号');
            }
        }
        let params = {
            billType:1,
            billHeadType:this.state.ticketTitle ,  //抬头类型
            billContentType: this.state.ticketMsg ,  //内容类型
            billHeadName:this.state.billHeadName, //抬头名称
            taxpayersNo:this.state.taxpayersNo, //税号
            taxId:"",
        };
        let that = this;

        http.postData("userInfo/billInfoAdd",params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that.setState({
                        billHeadName:"",
                        taxpayersNo:"",
                    });
                    that.props.back(params)
                    // state.params.refresh(params);
                    // that.props.back ()
                }
            })
    }
    render() {
        const ticketTitle=[{id:11,value:"个人"},{id:12,value:"单位"}]
        const ticketMsg=[{id:21,value:"商品明细"},{id:22,value:"商品类别"}]
        return (
            <View>
                <View style={styles.InvoiceWrap}>
                    <Text style={[SettingStyle.font14,styles.InvoiceTitle]}>发票抬头</Text>
                    <View style={[styles.InvoiceTop,styles.InvoiceUnitWrap]}>
                        {
                            ticketTitle.map((item,index)=>(
                                <TouchableOpacity style={styles.radioWrap} onPress={() => this._check2(item.id)} key={index}>
                                    <Image source={this.state.ticketTitle===item.id ? checkImage : nocheckImage}  />
                                    <Text  style={[SettingStyle.font14,{marginLeft:15,}]}>{item.value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={styles.InvoiceInputWrap}>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]}
                               value={this.state.billHeadName}
                                   onChangeText={(billHeadName) => this.setState({billHeadName})}
                                   placeholder="名称"/>
                    </View>
                    {
                        this.state.ticketTitle ===12 ?
                            <View   style={styles.InvoiceInputWrap} >
                                <Input style={[styles.InvoiceInput,SettingStyle.font14]}
                                       value={this.state.taxpayersNo}
                                       placeholdertTextColor="#b3b3b3"
                                       onChangeText={(taxpayersNo) => this.setState({taxpayersNo})}
                                       placeholder="请在此填写纳税人识别号"/>
                                <Image   source={require("./../../../../images/shop/shuoming.png") }/>
                            </View>
                            :null
                    }
                </View>
                <View style={[styles.InvoiceWrap]}>
                    <Text  style={[SettingStyle.font14,styles.InvoiceTitle]}>收票信息</Text>
                    <View style={[styles.InvoiceTop,{paddingTop:10,paddingBottom:10}]}>
                        {
                            ticketMsg.map((item,index)=>(
                                <TouchableOpacity onPress={()=>this._check3(item.id)} key={index}
                                                  style={ this.state.ticketMsg === item.id ?
                                                      [styles.InvoiceTextWrap,styles.InvoiceTextActiveWrap]:styles.InvoiceTextWrap}>
                                    <Text style={ this.state.ticketMsg === item.id ?
                                        [SettingStyle.font14,styles.textActive]:[SettingStyle.font14,styles.textGray]}>{item.value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <Text style={[SettingStyle.font12,{color:"#b3b3b3"}]}>提示：发票内容将显示详细商品名称与价格信息</Text>
                </View>
                <TouchableOpacity   onPress={()=>this.addOrInvoive()}
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
