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
import SettingStyle from './../../../js/SettingStyle';
import styles from './InvoiceStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
const nocheckImage=require('./../../../../images/shop/piaoju-weixuanzhong.png');

export  default class NoInvoice extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
    }
    //不开发票
    NoInvoive() {
        let params = {
            billType:0,
            billHeadType:"",  //抬头类型
            billContentType: "",  //内容类型
            billHeadName:"", //抬头名称
            taxpayersNo:"", //税号
            taxId:"",
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
    }
    render() {
        const ticketTitle=[{value:"个人"},{value:"单位"}]
        const ticketMsg=[{value:"商品明细"},{value:"商品类别"}]
        return (
            <View>
                <View style={styles.InvoiceWrap}>
                    <Text style={[SettingStyle.font14,styles.InvoiceTitle]}>发票抬头</Text>
                    <View style={[styles.InvoiceTop,styles.InvoiceUnitWrap]}>
                        {
                            ticketTitle.map((item,index)=>(
                                <TouchableOpacity style={styles.radioWrap}  key={index}>
                                    <Image source={ nocheckImage}  />
                                    <Text  style={[SettingStyle.font14,{marginLeft:15,}]}>{item.value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View style={styles.InvoiceInputWrap}>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]}
                               placeholder="张晓天"/>
                    </View>
                    <View style={styles.InvoiceInputWrap}>
                        <Input style={[styles.InvoiceInput,SettingStyle.font14]}
                               placeholdertTextColor="#b3b3b3"
                               placeholder="请在此填写纳税人识别号"/>
                        <Image   source={require("./../../../../images/shop/shuoming.png") }/>
                    </View>
                </View>
                <View style={[styles.InvoiceWrap]}>
                    <Text  style={[SettingStyle.font14,styles.InvoiceTitle]}>收票信息</Text>
                    <View style={[styles.InvoiceTop,{paddingTop:10,paddingBottom:10}]}>
                        {
                            ticketMsg.map((item,index)=>(
                                <TouchableOpacity   key={index}
                                                  style={  styles.InvoiceTextWrap}>
                                    <Text style={ [SettingStyle.font14,styles.textGray]}>{item.value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <Text style={[SettingStyle.font12,{color:"#b3b3b3"}]}>提示：发票内容将显示详细商品名称与价格信息</Text>
                </View>
                <TouchableOpacity  onPress={()=>this.NoInvoive()}
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
