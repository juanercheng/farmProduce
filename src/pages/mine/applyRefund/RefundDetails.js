/**
 * Created by juaner by 18-03-23
 */
import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import {
     Alert,
     TextInput ,
     View,
     Platform,
     Image,
     ImageBackground,
     TouchableOpacity,
     ViewPagerAndroid,
     ScrollView,
     TouchableHighlight,
}from 'react-native';
import { Toast, Modal,} from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './ApplyRefundStyle'
import http from "../../../js/http";

const Url = 'orderRefund/orderRefundInfo';
const cancelOrderRefundNo = 'orderRefund/cancelOrderRefundNo';
const cancelDeliverGoods = 'orderRefund/cancelDeliverGoods';
export  default class RefundDetails extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("退款详情"),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
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

    constructor(props,context){
        super(props,context);
        this.state = {
            dataSource: null,
            message:'正在加载数据...',
            data:null,
            type:null,
            title:null,
            titleSmall:null,
            isPay:null,
            loaded: false,
        };
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params.orderNo)
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        });
        console.log(this.props.navigation.state.key)
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };


    nextClick(routName,orderNo,type) {
        const { navigate } = this.props.navigation;
        navigate( routName ,{
            orderNo:orderNo,
            type:type,
            key:this.props.navigation.state.key
        })
    }

    fetchData() {
        let params ={
            orderNo:this.props.navigation.state.params.orderNo,
        };
        console.log(this.props.navigation.state.params.orderNo)
        let _this = this;
        http.getData( Url,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    _this._data = res.object;
                    _this.setState({
                        loaded: true,
                        data:_this._data,
                        type:_this._data.refundStatus
                    });
                    if(_this.state.type === 80){
                        _this.setState({
                            title:'请等待商家处理',
                            titleSmall:'',
                        })
                    }else if(_this.state.type === 82){
                        _this.setState({
                            title:'审核未通过',
                            titleSmall:'',
                        })
                    }else if(_this.state.type === 86){
                        _this.setState({
                            title:'退款成功',
                            titleSmall:_this._data.createTime,
                        })
                    }else if(_this.state.type === 84){
                        _this.setState({
                            title:'退款中',
                            titleSmall:'上门取件预约成功，请耐心等待快递员上门取件',
                        })
                    }else if(_this.state.type === 88){
                        _this.setState({
                            title:'退款取消',
                            titleSmall:_this._data.createTime,
                        })
                    }else if(_this.state.type === 81){
                        _this.setState({
                            title:'审核已通过',
                            titleSmall:'商家已同意您的退款申请，其请选择上门取件',
                        })
                    }else if(_this.state.type === 85){
                        _this.setState({
                            title:'退款中',
                            titleSmall:'等待商家确认收件',
                        })
                    }
                }
            }
        )
    }

    render(){
        var rowData = this.state.data;
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return this.renderView(rowData);
    }

    renderLoadingView(){
         return (
             <View style={SettingStyle.LoadingView}>
                    <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
             </View>
         );
    }

    renderView(rowData){
        let busOrderDetailsVoList = rowData.busOrderDetailsList;
        var year,time,senderAddress,senderName,senderMobile;
        if(rowData.busOrderRefundDetailEntity){
            year = rowData.busOrderRefundDetailEntity.takeStartTime.substring(0,rowData.busOrderRefundDetailEntity.takeStartTime.indexOf(' '))
            let takeStartTime = rowData.busOrderRefundDetailEntity.takeStartTime.substring(rowData.busOrderRefundDetailEntity.takeStartTime.indexOf(' '),rowData.busOrderRefundDetailEntity.takeStartTime.lastIndexOf(':'))
            let takeEndTime = rowData.busOrderRefundDetailEntity.takeEndTime.substring(rowData.busOrderRefundDetailEntity.takeEndTime.indexOf(' '),rowData.busOrderRefundDetailEntity.takeEndTime.lastIndexOf(':'))
            time= takeStartTime+ ' -' +takeEndTime;
            senderAddress = rowData.busOrderRefundDetailEntity.senderAddress
            senderName = rowData.busOrderRefundDetailEntity.senderName
            senderMobile = rowData.busOrderRefundDetailEntity.senderMobile
            recipientName =  rowData.busOrderRefundDetailEntity.recipientName
            recipientMobile =  rowData.busOrderRefundDetailEntity.recipientMobile
            recipientAddress =  rowData.busOrderRefundDetailEntity.recipientAddress
        }
        return (
          <Container>
            <ScrollView>
                <View style={ styles.detailsTitle}>
                    <Text style={[SettingStyle.font18,SettingStyle.colorWhite,{marginBottom:16}]}>{this.state.title}</Text>
                    <Text style={[SettingStyle.font13,SettingStyle.colorWhite]}>{this.state.titleSmall}</Text>
                </View>
                <View style={this.state.type !== 85?styles.serInfo:styles.serInfos}>
                      {
                        this.state.type === 80?(
                            <View>
                                <View style={{alignItems:'center',flexDirection:'column'}}>
                                    <Text style={[SettingStyle.font14]}>您已成功发起退款，请耐心等待商家处理</Text>
                                    <Text style={[SettingStyle.font14,styles.green,{marginTop:15}]}>商家处理后，请选择上门取件</Text>
                                </View>
                                <Text style={[SettingStyle.font14,styles.Color99,{marginTop:25}]}>提示：商家同意后，请填写上门取件地址，我们会免费上门取件退货</Text>
                            </View>
                        ):(
                            this.state.type === 82?(
                                <Text style={{textAlign:'center',fontSize:14,marginBottom:25}}>
                                    {rowData.reasonNotes?rowData.reasonNotes:'暂无说明'}
                                </Text>
                            ):(
                               this.state.type === 88?(
                                    <Text style={{fontSize:14}}>
                                        您已撤销本次退款申请，问题仍未解决，售后保障期内，您可以重新发起售后申请
                                    </Text>
                               ):(
                                    this.state.type === 84?(
                                        <View>
                                            <Text style={[SettingStyle.font14,{marginBottom:15}]} >取件时间：<Text style={[styles.green,SettingStyle.font14]}>{year} {time}</Text>  (请等待快递员 上门取件)</Text>
                                            <Text style={[SettingStyle.font14]}>取件码：<Text style={[styles.green,SettingStyle.font14]}>{rowData.busOrderRefundDetailEntity.takeCode} </Text> (快递上门前请勿提供)</Text>
                                        </View>
                                    ):(
                                        this.state.type === 81?(
                                            <View style={{alignItems:'center',flexDirection:'column'}}>
                                                <TouchableOpacity onPress={()=>this.nextClick('ChooseAddress',rowData.orderNo)}><Text style={[SettingStyle.font14,styles.green,{marginTop:15,marginBottom:15}]}>请选择上门取件</Text></TouchableOpacity>
                                            </View>
                                        ):(null)
                                    )
                               )
                            )
                        )
                      }
                 </View>
                {
                    this.state.type === 85?(
                        <View style={styles.sendInfo}>
                            <View style={styles.sendItem}>
                                <Text style={[SettingStyle.font14]}>寄件人</Text>
                                <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:12}}>
                                    <Text style={[SettingStyle.font14]}>{senderName}   {senderMobile}</Text>
                                    <Text style={[SettingStyle.font13,{color:'#999'}]}>{senderAddress}</Text>
                                </View>
                            </View>
                            <View style={styles.sendItem}>
                                <Text style={[SettingStyle.font14]}>收件人</Text>
                                <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:12}}>
                                    <Text style={[SettingStyle.font14]}>{recipientName}   {recipientMobile}</Text>
                                    <Text style={[SettingStyle.font13,{color:'#999'}]}>{recipientAddress}</Text>
                                </View>
                            </View>
                        </View>
                    ):(this.state.type === 84?(
                        <View style={styles.sendInfo}>
                            <View style={styles.sendItem}>
                                <Text style={[SettingStyle.font14]}>寄件人</Text>
                                <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:12}}>
                                    <Text style={[SettingStyle.font14]}>{senderName}   {senderMobile}</Text>
                                    <Text style={[SettingStyle.font13,{color:'#999'}]}>{senderAddress}</Text>
                                </View>
                            </View>
                            <View style={styles.sendItem}>
                                <Text style={[SettingStyle.font14]}>收件人</Text>
                                <View style={{flexDirection:'column',alignItems:'flex-start',marginLeft:12}}>
                                    <Text style={[SettingStyle.font14]}>{recipientName}   {recipientMobile}</Text>
                                    <Text style={[SettingStyle.font13,{color:'#999'}]}>{recipientAddress}</Text>
                                </View>
                            </View>
                            <View style={styles.sendBtn}>
                                <Button  bordered dark small  style={{marginRight:8}} onPress={()=>this.PutData(rowData.refundNo)}>
                                    <Text style={styles.btnItm}>取消寄件</Text>
                                </Button>
                                <Button bordered dark  small  onPress={()=>this.nextClick('DateChoose',rowData.refundNo)}>
                                    <Text style={styles.btnItm}>更改寄件时间</Text>
                                </Button>
                            </View>
                        </View>
                    ):null)
                }
                <View style={this.state.type!=86?styles.centers:styles.centers5}>
                    {
                        this.state.type === 86?(
                            <Text style={[SettingStyle.font14,{paddingBottom:15,paddingLeft:15}]}>退款信息</Text>
                        ):null
                    }
                    {
                        busOrderDetailsVoList.map(function (item,index) {
                            return(
                                <View style={styles.centerBox} key={index}>
                                    <View style={[styles.center,{marginBottom:1,alignItems:'flex-start',}]}>
                                        <Image  source={{uri: item.picture}}
                                                style={styles.listLeft}/>
                                        <View style={styles.listRight}>
                                            <Text style={SettingStyle.font14}
                                                  ellipsizeMode='tail' numberOfLines={2}> {item.productName}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
                        <Text style={[SettingStyle.font14,styles.Color99]}>退款金额：￥{rowData.money}</Text>
                        <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>退款原因：{rowData.reasonNotes}</Text>
                        <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>退款件数：{busOrderDetailsVoList.length}</Text>
                        <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>申请时间：{rowData.createTime}</Text>
                        <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>退款编码：{rowData.refundNo}</Text>
                    </View>
                    {
                        this.state.type === 80 || this.state.type === 81 ||  this.state.type === 84 ?(
                            <View style={{flexDirection:'row',justifyContent:'flex-end',marginRight:15,marginTop:5}}>
                                <Button  bordered dark small onPress={()=>this.cancel(rowData.refundNo)}>
                                    <Text style={styles.btnItm}>撤销申请</Text>
                                </Button>
                            </View>
                        ):(null)
                    }
                 </View>
             </ScrollView>
            </Container>
        )
    }

    cancel(id){
        let _this = this;
        const { goBack,navigate } = _this.props.navigation;
        Modal.alert('温馨提示', ('您仅能主动撤销一次，撤销后将不能主动撤销 且超出保保障期后无法再次发起售后'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    let params ={
                        refundNo:id,
                    };
                    http.postData( cancelOrderRefundNo,params,
                        function(res){
                        console.log(res)
                            if(res.code===0){
                                Toast.info('已撤销！');
                                goBack ()
                            }
                    })
            }}
        ]);
    }
    //取消寄件
    PutData(id){
        let _this = this;
        const { goBack } = _this.props.navigation;
        Modal.alert('温馨提示', ('您确定要取消寄件吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    let params ={
                        refundNo:id,
                    };
                    http.PutData( cancelDeliverGoods,params,
                        function(res){
                            console.log(res)
                            if(res.code===0){
                                Toast.info('已取消！');
                                goBack ()
                            }
                        })
                }}
        ]);
    }

 }
