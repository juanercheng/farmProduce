/**
 * Created by juaner by 18-03-27
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    ListView,
    TouchableHighlight,
}from 'react-native';
import { Toast,  WhiteSpace, WingBlank,  Modal,} from 'antd-mobile';

import LoginView from './../../common/LoginView'
import NoDataView from './../../common/NoDataView';
import LoadingDataView from './../../common/LoadingDataView';
import ErrorView from './../../common/ErrorView';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './OrderStyle'
import http from './../../../js/http';
import global from './../../../js/global';

const Url = 'order/findMyOrderList';
const cancelOrderUrl ='order/cancelOrder';
const deleteOrderByOrderNo = 'order/deleteOrderByOrderNo';
const cofirmRevice = 'order/cofirmRevice';

let pageNo = 1;//当前第几页
let totalElements;//总的页数

export  default class OrderAll extends Component{

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            refreshing: false,
            error: false,
            dataArray: [],
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
    }

    componentDidMount(){
        this.fetchData(pageNo);
    }

    componentWillUnmount(){
        pageNo = 1
    }

    fetchData() {
        let params ={
            orderState:'',
            orderType:'',
            pageCurrent:pageNo,
            pageSize:10,
        };
        let _this = this;
        http.getData( Url,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    _this._data = res.object;
                    let data =  _this._data;
                    let dataBlob = [];
                    if(data.length>0){
                        data.map(function (item) {
                            dataBlob.push(item)
                        });
                    }

                    if( pageNo === 1){
                        _this.setState({
                            loaded: true,
                            dataArray: dataBlob
                        })
                    }else{
                        _this.setState({
                            dataArray:_this.state.dataArray.concat(dataBlob),
                            loaded: true,
                        })
                    }

                    totalElements = data.length;
                    if( totalElements <10){
                        _this.setState({showFoot:1});
                    }
                    data = null;
                    dataBlob = null;
                }
            }
        )
    }

    render(){
        if (!this.state.loaded && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }
        return (
            <View>
                <FlatList
                    data={this.state.dataArray}

                    //使用 ref 可以获取到相应的组件
                    //ref={(flatList) => this._flatList = flatList}
                    //ListHeaderComponent={this._header}//header头部组件

                    ListFooterComponent={this._renderFooter.bind(this)}

                    //ItemSeparatorComponent={ItemDivideComponent}//分割线组件

                    //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                    ListEmptyComponent={this.createEmptyView()}

                    keyExtractor={this._keyExtractor}

                    //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                    //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                    //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                    //                      getItemLayout={(data, index) => ( {length: 44, offset: (44 + 1) * index, index} )}

                    //决定当距离内容最底部还有多远时触发onEndReached回调。
                    //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                    onEndReachedThreshold={1}
                    //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                    onEndReached={this._onEndReached.bind(this)}

                    //下拉刷新
                    refreshing={this.state.refreshing}
                    onRefresh={() => this._onRefresh()}
                    //渲染列表数据
                    renderItem={({ item ,index}) => this._renderItem(item,index)}
                />
            </View>
        );
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <NoDataView />
            );
        } else if(this.state.showFoot === 2) {
            return (
                <LoadingDataView />
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    };

    createEmptyView() {
        return (
            <View style={{backgroundColor:'#fff',height:'100%'}}>
                <View style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
                    <Image
                        source={require('./../../../../images/mine/dingdanweikong.png')} />
                    <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>没有相关订单</Text>
                </View>
            </View>
        );
    };

    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            this.fetchData(pageNo);
        }
    };

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        this.setState({showFoot:2});
        pageNo++;
        //获取数据
        this.fetchData( pageNo );
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _renderItem = (value, index) => {
        let orderState=''
        switch (value.orderState){
            case 0:
                orderState = '待付款';
                break;
            case 1:
                orderState = '待发货';
                break;
            case 2:
                orderState = '待收货';
                break;
            case 3:
                orderState = '待评价';
                break;
            case 4:
                orderState = '交易完成';
                break;
            case 5:
                orderState = '交易关闭';
                break;
            case 7:
                orderState = '退款/售后';
                break
        }
        let busOrderDetailsVoList = value.busOrderDetailsVoList;
        let routname = value.orderState!=7?'OrderDetails':'RefundDetails'
        return (
            <View style={styles.content}>
                <View style={styles.Item} key={index}>
                    <View style={styles.NoBox}>
                        <Text style={[SettingStyle.font14,styles.Color99]}>订单编号：{value.orderNo}</Text>
                        <Text style={SettingStyle.font14}>{orderState}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.props.nextClick(routname,value.orderNo,value.orderState)}>
                        <View style={busOrderDetailsVoList.length<=1?styles.center:styles.center1}>
                            {
                                busOrderDetailsVoList.length<=1?(
                                    busOrderDetailsVoList.map(function (item,index) {
                                        return(
                                            <View key={index} style={styles.center}>
                                                <Image  source={{uri: item.picture}}
                                                        style={styles.listLeft}/>
                                                <View style={styles.listRight}>
                                                    <Text style={[SettingStyle.font14,{marginBottom:11}]}
                                                          ellipsizeMode='tail' numberOfLines={2}>{item.productName }</Text>
                                                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                        <Text style={[SettingStyle.font14,styles.Color99]}>规格：{item.standardName}</Text>
                                                        <Text style={[SettingStyle.font14,styles.Color99,{marginRight:10}]}>x {item.productNumber}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    })
                                ):(
                                    busOrderDetailsVoList.map(function (item,index) {
                                        if(index<=4){
                                            return(
                                                <Image  source={{uri: item.picture}} key={index}
                                                        style={[styles.listLeft,{marginRight:10}]}/>
                                            )
                                        }

                                    })

                                )
                            }
                        </View>
                    </TouchableOpacity>
                    <Text style={{textAlign:'right',marginRight:15,marginBottom:12.5}}>共{busOrderDetailsVoList.length}件商品 合计: ￥{value.orderTotalPirce}</Text>
                    {
                        value.orderState===0?(
                            <View style={styles.btnBox}>
                                <Button  bordered dark small  style={{marginRight:8}} onPress={()=>this.cancel(value.orderNo)}>
                                    <Text style={styles.btnItm}>取消订单</Text>
                                </Button>
                                <Button bordered success  small onPress={()=>this.props.nextClick('ConfirmPay',value.orderNo,'')}>
                                    <Text style={[styles.btnItm,styles.btnSuccess]}>去付款</Text>
                                </Button>
                            </View>
                        ):value.orderState===2?(
                            <View style={styles.btnBox}>
                                <Button  bordered dark small  style={{marginRight:8}} onPress={()=>this.props.nextClick('Logistics', value.orderNo)}>
                                    <Text style={styles.btnItm}>查看物流</Text>
                                </Button>
                                <Button bordered success  small  onPress={()=>this.confirm(value.orderNo)}>
                                    <Text style={[styles.btnItm,styles.btnSuccess]} >确认收货</Text>
                                </Button>
                            </View>
                        ):(value.orderState===3?(
                                <View style={styles.btnBox}>
                                    <Button  bordered dark small  style={{marginRight:8}} onPress={()=>this.delete(value.orderNo)}>
                                        <Text style={styles.btnItm}>删除订单</Text>
                                    </Button>
                                    <Button bordered success  small  onPress={()=>this.props.nextClick('WriteEvaluate',value.id)}>
                                        <Text style={[styles.btnItm,styles.btnSuccess]} >评价</Text>
                                    </Button>
                                </View>
                            ):(value.orderState===4?(
                                <View style={styles.btnBoxRefund}>
                                    <View style={styles.refund}>
                                        <Text style={{marginRight:13}}>{value.info}</Text>
                                        <Text>{value.name}</Text>
                                    </View>
                                    <Button  bordered dark small onPress={()=>this.props.nextClick(routname,value.orderNo,value.orderState)} >
                                        <Text style={styles.btnItm}>查看详情</Text>
                                    </Button>
                                </View>
                            ):value.orderState===7?(
                                <View style={styles.btnBoxRefund}>
                                    <View style={styles.refund}>
                                        <Text style={{marginRight:13}}>{value.info}</Text>
                                        <Text>{value.name}</Text>
                                    </View>
                                    <Button  bordered dark small onPress={()=>this.props.nextClick(routname, value.orderNo,value.orderState)}>
                                        <Text style={styles.btnItm}>查看详情</Text>
                                    </Button>
                                </View>
                            ):value.orderState===5?(
                                <View style={styles.btnBox}>
                                    <Button  bordered dark small  style={{marginRight:8}} onPress={()=>this.delete(value.orderNo)}>
                                        <Text style={styles.btnItm}>删除订单</Text>
                                    </Button>
                                </View>
                            ):null)
                        )
                    }
                </View>
            </View>
        )
    };

    cancel(orderNo){

        Modal.alert('温馨提示', ('确定取消订单吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () =>{
                let params ={
                    orderNo:orderNo,
                };
                let _this = this;
                http.postData( cancelOrderUrl,params,
                    function(res){
                        console.log(res)
                        if(res.code===0){
                            Toast.info('订单已取消');
                            pageNo = 1;
                            _this.fetchData(pageNo)
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
                                Toast.info('订单已取消', 1);
                                pageNo = 1;
                                _this.fetchData(pageNo)
                            }
                        }
                    )
                }}
        ]);
    }

    delete(orderNo){
        Modal.alert('温馨提示', ('确定删除订单吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () =>{
                    let params ={
                        orderNo:orderNo,
                    };
                    let _this = this;
                    http.postData( deleteOrderByOrderNo,params,
                        function(res){
                            console.log(res)
                            if(res.code===0){
                                Toast.info('订单已删除');
                                pageNo = 1;
                                _this.fetchData(pageNo)
                            }
                        }
                    )
                }}
        ]);
    }

}
