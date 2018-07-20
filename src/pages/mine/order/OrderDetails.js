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
import styles from './OrderStyle'
import http from "../../../js/http";

const Url='order/findOrderByNo';
const cancelOrderUrl = 'order/cancelOrder';
const cofirmRevice = 'order/cofirmRevice';

export  default class OrderDetails extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("订单详情"),
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

    constructor(props){
        super(props);
        this.state = {
            dataSource: null,
            message:'正在加载数据...',
            data:null,
            type:null,
            title:null,
            billType:null,
            titleSmall:null,
            isPay:null,
            loaded: false,
        };
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params.orderNo)
        console.log(this.props.navigation.state.params.type)
        this.setState({
            type:this.props.navigation.state.params.type
        });
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    _next(routName,orderNo,type) {
        const {navigate} = this.props.navigation;
        navigate(routName, {
            orderNo: orderNo,
            type: type,
            key:this.props.navigation.state.key
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
                       billType:_this._data.billType
                   });
                 
                   _this._data.orderDeadDatetime=new Date(_this._data.orderDeadDatetime).getTime()
                   let orderDeadDatetime=_this.getTimes(_this._data.orderDeadDatetime)
                   
                   if(_this.state.type===0){
                       _this.setState({
                           title:'待付款',
                           titleSmall:'剩余'+orderDeadDatetime+'小时自动关闭',
                           isPay:'需付款'
                       })
                   }else if(_this.state.type===1){
                       _this.setState({
                           title:'买家已付款',
                           titleSmall:'等待卖家发货',
                           isPay:'实付款（含运费）'
                       })
                   }else if(_this.state.type===2){
                       _this.setState({
                           title:'卖家已发货',
                           titleSmall:'还剩'+orderDeadDatetime+'自动确认收货',
                           isPay:'实付款（含运费）'
                       })
                   }else if(_this.state.type===3){
                       _this.setState({
                           title:'交易成功',
                           titleSmall:'待评价',
                           isPay:'实付款（含运费）'
                       })
                   }else if(_this.state.type===4){
                       _this.setState({
                           title:'交易完成',
                           titleSmall:'',
                       })
                   }else if(_this.state.type===5){
                       _this.setState({
                           title:'交易关闭',
                           titleSmall:'超时关闭',
                       })
                   }
               }
            }
        )
    }

    getTimes(date3){
        let res;
        let nowTime = new Date().getTime();
        let days=Math.floor((date3-nowTime)/(24*3600*1000));
        //计算出小时数
        let leave1=date3%(24*3600*1000) ;   //计算天数后剩余的毫秒数
        let hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        let leave2=leave1%(3600*1000) ;       //计算小时数后剩余的毫秒数
        let minutes=Math.floor(leave2/(60*1000));
        //计算相差秒数
        days = days >=0 ? days + "天 " : null;
        return res= days +hours+"小时 "+minutes+" 分钟";
    }

    render(){
        var rowData = this.state.data;
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return this.renderTypeView(rowData);
    }

    renderLoadingView(){
         return (
             <View style={SettingStyle.LoadingView}>
                    <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
             </View>
         );
    }

    renderTypeView(rowData){
        let busOrderDetailsVoList = rowData.busOrderDetailsVoList;
        let _this = this;
        return (
            <ScrollView>
                <View style={styles.detailsTitle}>
                    <Text style={[SettingStyle.font18,SettingStyle.colorWhite,{marginBottom:16}]}>{this.state.title}</Text>
                    <Text style={[SettingStyle.font13,SettingStyle.colorWhite]}>{this.state.titleSmall}</Text>
                </View>
                <View style={styles.serInfo}>
                    <Text style={[SettingStyle.font14,{marginLeft:21}]}>{rowData.consigneeName}   {rowData.consigneeTel}</Text>
                    <View style={styles.location}>
                        <Image source={require('./../../../../images/weizhi.png')}
                              style={{marginRight:8}}/>
                        <Text style={{fontSize:13}}>{rowData.consigneeAdress}</Text>
                    </View>
                </View>
                <ImageBackground style={{width:"100%",height:3, marginBottom:10}}    source={require('./../../../../images/shop/line.png')} resizeMode='cover'/>
                <View style={styles.Item}>
                     <View style={styles.NoBox}>
                         <Text style={[SettingStyle.font14,styles.Color99]}>订单编号：{rowData.orderNo}</Text>
                         <Text style={SettingStyle.font14}>{this.state.title}</Text>
                     </View>
                    {
                        busOrderDetailsVoList.map(function (item,index) {
                            return(
                                <View style={styles.centerBox} key={index}>
                                    <View style={[styles.center,{marginBottom:1}]}>
                                        <Image  source={{uri: item.picture}}
                                                style={styles.listLeft}/>
                                        <View style={styles.listRight}>
                                            <Text style={[SettingStyle.font14,{marginBottom:11}]}
                                                  ellipsizeMode='tail' numberOfLines={2}>{item.productName }</Text>
                                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                <Text style={[SettingStyle.font14,styles.Color99]}>规格：{item.standardName}</Text>
                                                <Text style={[SettingStyle.font14,styles.Color99]}>x {item.productNumber}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {
                                        _this.state.type == 1 || _this.state.type == 2 ?(
                                            <View    style={{marginRight:15,marginBottom:15,}}> 
                                                <Button  bordered dark small  onPress={()=>_this._next('RefundType',rowData.orderNo)}>
                                                    <Text style={styles.btnItm}>退款</Text>
                                                </Button>
                                            </View>
                                        ):null
                                    }
                                </View>
                            )
                        })
                    }
                     <Text style={{textAlign:'right',marginRight:15,marginBottom:8,marginTop:14,fontSize:14}}>共1件商品 合计: ￥{rowData.orderTotalPirce }</Text>
                     <Text style={[styles.Color99,SettingStyle.font12,{textAlign:'right',marginRight:15,marginBottom:15}]}>含积分抵扣 ￥{rowData.deductedMoney}</Text>
                     <View style={styles.isPay}>
                        <Text style={SettingStyle.font14}>{this.state.isPay}</Text>
                        <Text style={[SettingStyle.font14,{color:'#ff4e3c'}]}>￥ {rowData.orderTotalPirce}</Text>
                     </View>
                </View>
                <View style={styles.receipt}>
                    <Text style={[SettingStyle.font14,styles.receiptText]}>返积分68点</Text>
                    {
                       this.state.billType===2?(  //根据发票类型显示对应的内容，下面的是个人
                           <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
                               <Text style={[SettingStyle.font14,styles.Color99]}>发票类型：普通发票</Text>
                               <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>发票抬头：承联信息科技有限公司</Text>
                               <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>发票内容：商品明细</Text>
                               <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>纳税人识别号：9131011532245327XX</Text>
                           </View>
                       ):(this.state.billType===1?(
                               <View>
                                   <Text style={[SettingStyle.font14,styles.Color99,styles.orderTime]}>订单时间：{rowData.createTime}</Text>
                                   <View style={{marginLeft:15,marginRight:15,marginTop:15}}>
                                       <Text style={[SettingStyle.font14,styles.Color99]}>发票类型：普通发票</Text>
                                       <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>发票抬头：个人</Text>
                                       <Text style={[SettingStyle.font14,styles.Color99,{marginTop:14}]}>发票内容：商品明细</Text>
                                   </View>
                               </View>
                           ):null
                       )
                    }
                </View>
                {
                    this.state.type==0?(
                        <View style={[styles.btnBox,styles.detailsBtn]}>
                             <Button  bordered dark small  style={{marginRight:8}} onPress={()=>_this.cancel(rowData.orderNo)}>
                                 <Text style={styles.btnItm}>取消订单</Text>
                             </Button>
                             <Button bordered success  small  onPress={()=>_this._next('ConfirmPay',rowData.orderNo)}>
                                 <Text style={[styles.btnItm,styles.btnSuccess]} >去付款</Text>
                             </Button>
                        </View>
                    ):(this.state.type==2?(
                            <View  style={[styles.btnBox,styles.detailsBtn]}>
                                 <Button   bordered dark small  style={{marginRight:8}} onPress={()=>_this._next('Logistics',rowData.orderNo)}>
                                    <Text style={styles.btnItm}>查看物流</Text>
                                 </Button>
                                 <Button bordered success  small  onPress={()=>_this.confirm(rowData.id)}>
                                     <Text style={[styles.btnItm,styles.btnSuccess]} >确认收货</Text>
                                 </Button>
                            </View>
                       ):(this.state.type==3?(
                            <View style={[styles.detailsBtn,styles.btnBox2]}>
                                <Button bordered dark small  onPress={_this.confirm}>
                                    <Text style={styles.btnItm}>售后</Text>
                                </Button>
                                <View style={{flexDirection:'row',}}>
                                    <Button  bordered dark small  style={{marginRight:8}} onPress={_this.confirm}>
                                        <Text style={styles.btnItm}>删除订单</Text>
                                    </Button>
                                    <Button bordered success  small  onPress={()=>_this._next('WriteEvaluate',rowData.orderNo)}>
                                        <Text style={[styles.btnItm,styles.btnSuccess]} >评价</Text>
                                    </Button>
                                </View>
                            </View>
                          ):(null)
                       )
                    )
                }
            </ScrollView>
        )
    }

    cancel(orderNo){
        Modal.alert('温馨提示', ('确定取消订单吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    let params ={
                        orderNo:orderNo,
                    };
                    let _this = this;
                    http.postData( cancelOrderUrl,params,
                        function(res){
                            if(res.code===0){
                                Toast.info('订单已取消', 1);
                                const { goBack,navigate } = this.props.navigation
                                goBack ()
                            }
                        }
                    )
                }}
        ]);
    }

    confirm(orderNo){
        Modal.alert('温馨提示', ('确定要收货吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    let params ={
                        orderNo:orderNo,
                    };
                    let _this = this;
                    http.postData( cofirmRevice,params,
                        function(res){
                            if(res.code===0){
                                Toast.info('已完成', 1);
                                const { goBack,navigate } = this.props.navigation
                                goBack ()
                            }
                        }
                    )
                }}
        ]);
    }
 }
