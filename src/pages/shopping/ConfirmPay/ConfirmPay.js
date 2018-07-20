/**
 * Created by Zero on 2018/3/22
 */
import React, { Component } from 'react';
import { Container,  Button, Text } from 'native-base';
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
import Popup from 'react-native-popup';
import Toast, {DURATION} from 'react-native-easy-toast'
// import { Modal,  WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import SettingStyle from './../../../js/SettingStyle';
import styles from './ConfirmPayStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
import Alipay from './Alipay';
import *as wechat from 'react-native-wechat'

const nocheckImage=require('./../../../../images/shop/piaoju-weixuanzhong.png');
const checkImage=require('./../../../../images/shop/xuanzhong.png');
const payType=[{
        name:"微信支付",
        src:require("./../../../../images/shop/weixinzhifu.png")
    },
    {
        name:"支付宝支付",
        src:require("./../../../../images/shop/zhifubao.png")
    },
    {
        name:"银联支付",
        src:require("./../../../../images/shop/yinlian.png")
    },
    {
        name:"工行支付",
        src:require("./../../../../images/shop/zhongguoyinhang.png")
    }
    ]
export  default class ConfirmPay extends Component{

    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '确认付款',
        headerStyle: {
            backgroundColor: "#20a200",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff",
            alignSelf: 'center',
        },
        headerLeft:(
            <Button transparent style={{height:"100%"}} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={[SettingStyle.headerBack ]} source={require('./../../../../images/header/go-back-white.png')} />
            </Button>
        ),
        headerRight: (
            <Button transparent></Button>
        )
    });
    constructor(props, context){
        super(props, context);
        this.state = {
            payType:0,
            orderNo:this.props.navigation.state.params.orderNo, //订单号
            money:this.props.navigation.state.params.money, //金额
        }
    }
    componentDidMount(){
        wechat.registerApp('wx546cd3199f03f02f')
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })

        console.log(this.state.orderNo)

    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }
    _check(index){
        this.setState({
            payType:index,
        })
    }

    _next (routName) {
        const { navigate } = this.props.navigation;
        navigate(routName)
    }
    _confirmTest() {
        let _this = this
        this.popup.confirm({
            title: '确认放弃支付吗',
            content: ['您的订单将在11小时55分钟内被取消，请尽快完成支付。'],
            ok: {
                text: '确认离开',
                style: {
                },
                boxstyle:{
                    backgroundColor:"#20a200",
                    width:"100%",
                    height:"100%",
                    color: '#fff',
                    fontSize:18,
                    alignItems:"center",
                    paddingTop:13,
                }
            },
            cancel: {
                text: '继续支付',
                style: {
                },
                boxstyle:{
                    color: '#000',
                    fontSize:18,
                },
                callback: () => {
//                   this._next ("PaySuccess")
                    _this.Pay()

                }
            }
        });
    }
    //支付宝成功支付通知前后台
    successAilpay() {
        console.log('支付宝支付成功')
        let that = this
        let params ={
            orderno:this.state.orderNo,
        }
        http.getData( 'alipay/payNotifyByAppSync',params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that.props.navigation.state.params.key= that.props.navigation.state.params.key?that.props.navigation.state.params.key:''
                    const { goBack,navigate } = that.props.navigation
                    goBack (that.props.navigation.state.params.key)
                }

            }
        )
    }
    //微信支付成功通知前后台
    successWxpay() {
        console.log('微信支付成功')
        let that = this
        let params ={
            orderno:this.state.orderNo,
        }
        http.getData( 'wxpay/payNotifyByAppSync',params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that.props.navigation.state.params.key= that.props.navigation.state.params.key?that.props.navigation.state.params.key:''
                    const { goBack,navigate } = that.props.navigation
                    goBack (that.props.navigation.state.params.key)
                }

            }
        )
    }
    alipay() {
        let params ={orderno:this.state.orderNo}
        let _this = this
        http.postData( 'alipay/getPayParams',params,
           function(res){
                let data=res.object
                if(res.code===0){
                   Alipay.pay(data).then((data) => {
                       console.log(data)
                       if (data.length && data[0].resultStatus) {
                           /*处理支付结果*/
                           switch (data[0].resultStatus) {
                              case "9000":
                                  _this.successAilpay()

                                break;
                              case "8000":
                                _this.refs.toast.show('支付结果未知,请查询订单状态')
                                break;
                              case "4000":
                                _this.refs.toast.show('订单支付失败')
                                break;
                              case "5000":
                                _this.refs.toast.show('重复请求')
                                break;
                              case "6001":
                                _this.refs.toast.show('用户取消')
                                break;
                              case "6002":
                                _this.refs.toast.show('网络连接出错')
                                break;
                              case "6004":
                                _this.refs.toast.show('支付结果未知,请查询订单状态')
                                break;
                              default:
                                _this.refs.toast.show('其他失败原因')
                                break;
                           }
                       } else {
                          _this.refs.toast.show('其他失败原因')
                       }
                   }, (err) => {
                          _this.refs.toast.show('支付失败，请重新支付')
                       }
                   )
                }
           }
        )
    }
    wxpay(){

        let params ={orderno:this.state.orderNo}
        let _this = this
        http.postData( 'wxpay/getPayParams',params,
            function(res){
                let data=res.object
                console.log('微信支付',data)
                if(res.code===0){
                    wechat.isWXAppInstalled()  //检查是否安装了微信
                        .then((isInstalled)=>{
                            if(isInstalled){
                                wechat.openWXApp()
//                                     wechat.shareToSession({
//                                        type: 'text',
//                                        description: '测试微信好友分享文本'
//                                     }).catch((error) => {
//                                       this.refs.toast.show(error);
//
//                                     });
                                     wechat.pay(
                                        {
                                            partnerId: data.partnerid,  // 商家向财付通申请的商家id
                                            prepayId: data.prepayid,   // 预支付订单
                                            nonceStr: data.nonceStr,   // 随机串，防重发
                                            timeStamp: data.timeStamp,  // 时间戳，防重发
                                            package: data.packageValue,    // 商家根据财付通文档填写的数据和签名
                                            sign: data.sign        // 商家根据微信开放平台文档对数据做的签名
                                        }
                                    ).then((success)=>{
                                        console.log(success)
                                         _this.successWxpay();

                                    }).catch((error)=>{
                                        console.log(error)
                                    })

                            }else {
                                this.refs.toast.show('没有安装微信软件,请您安装微信之后再试');
                                console.log('请安装微信')
                            }
                        })
                }
            }
        )
    }
    //立即支付
    pay(){
        if(this.state.payType===0){
            this.wxpay();
        }else if(this.state.payType===1){
            this.alipay();
        }
    }
    render() {
        return (
            <Container style={{backgroundColor:"#fff"}}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                />
                <View style={styles.payTop}>
                    <Text style={[SettingStyle.font14,SettingStyle.colorWhite,SettingStyle.textCenter]}>
                        ￥<Text  style={[SettingStyle.font20,SettingStyle.colorWhite]}>{this.state.money}</Text>
                    </Text>
                    <Text style={[SettingStyle.font14,SettingStyle.colorWhite,SettingStyle.textCenter,{marginTop:7,}]}>剩余支付时间11个小时68分，过时请重新购买</Text>
                </View>
                <View style={styles.payTypeWrap}>
                    <Text style={[SettingStyle.font14,{marginBottom:15,}]}>请选择支付方式</Text>
                    {
                        payType.map((item,index)=>(
                            <View style={styles.payTypeList} key={index}>
                                <View style={{flexDirection:"row",alignItems:"center"}}>
                                    <Image   style={{ marginRight:10, }}
                                                     source={ item.src}  />
                                    <Text>{item.name}</Text>

                                </View>
                                <TouchableOpacity onPress={()=>this._check(index)}>
                                    <Image style={[SettingStyle.radioIcon ]}
                                           source={this.state.payType===index ? checkImage : nocheckImage} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
                {/*<TouchableOpacity onPress={this._confirmTest.bind(this)}  style={{   width:"100%", height:35,  marginTop:15,paddingLeft:15,paddingRight:15 }}>*/}
                <TouchableOpacity onPress={()=>this.pay()}  style={{   width:"100%", height:35,  marginTop:15,paddingLeft:15,paddingRight:15 }}>
                    <ImageBackground  style={{width:"100%"  }} source={require('./../../../../images/mine/btn.png')} resizeMode='cover'>
                        <View style={{width:"100%",height:"100%", flexDirection: 'row',
                            alignItems:"center",
                            justifyContent:"center", }}>
                            <Text style={{color:'#fff'}}>立即支付</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <Popup ref={popup => this.popup = popup }/>
            </Container>
        );
    }
}
