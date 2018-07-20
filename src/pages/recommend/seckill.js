/**
 * Created by yangHL on 2018/3/22.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Footer,
    FooterTab,
    Title,
    Text,
    Tab,
    TabHeading,
    Tabs,
    Icon,
    Item,
    Input
} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    DeviceEventEmitter,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { Toast,ActionSheet} from 'antd-mobile';

import styles from './seckillStyle'
import commodityDetails from "../common/commodityDetails/commodityDetails";
import http from "../../js/http";
import LoginView from './../common/LoginView';
import NoDataView from './../common/NoDataView';
import LoadingDataView from './../common/LoadingDataView';
import ErrorView from './../common/ErrorView';
import global from "../../js/global";
import SettingStyle from "../../js/SettingStyle";

const seckillProduct = 'producte/seckillProduct';

let pageNo = 1;//当前第几页
let totalElements;//总的页数

export default class Seckill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            id: 0,
            loaded:false,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            refreshing: false,
            error: false,
            dataArray: [],
            errorInfo: null,
            showToast: false,
        }
    }

    componentDidMount() {
        this.fetchData(pageNo);

    }
    componentWillUnmount(){
        pageNo = 1
    }

    fetchData(pageNo) {
        let params ={
            pageCurrent:pageNo,
            pageSize:10,
            shopId:global.home.shopId
        };
        let _this = this;
        http.getData( seckillProduct,params,
            function(res){
                console.log(res)
                if(res.code===0){
                    _this._data = res.object;
                    let data =  _this._data.seckillList
                    let dataBlob = [];
                    if(data.length>0){
                        data.map(function (item) {
                            dataBlob.push(item)
                        });
                    }

                    if( pageNo === 1){
                        _this.setState({
                            loaded: true,
                            headImgs:res.object.headImgs[0].advertisementimg,
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
                }else {
                    console.log(res)
                }
            }
        )
    }

    _cart(id){
        console.log(id);
        let params = {
            productId:id,
            number:1
        };
        http.postData("producteCar/addShopCart",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    Toast.info('加入购物车成功');
                    DeviceEventEmitter.emit('shopCarRefresh', res.code);
                }else{
                    Toast.info(res.msg);
                }
            })
    }
    
    //进入商品详情页面
    _commodityDetails(id,productType){
        const navigation = this.props.navigation;
        navigation.navigate( 'commodityDetails',{productId:id,productType:1000});
    }

    countdown(time) {
        // 渲染倒计时时钟
        this.dateformat(time);
        console.log(time)
        if (time <= 0) {
            // timeout则跳出递归
            return console.log('结束')
        }
        let that = this;
        var t = setTimeout(function () {
            // 放在最后--
            time -= 10;
            that.countdown(time);
        }, 10)
    }

    dateformat(micro_second) {
        // 秒数
        var second = Math.floor(micro_second / 1000);
        // 小时位
        var hr = Math.floor(second / 3600);
        // 分钟位
        var min = Math.floor((second - hr * 3600) / 60);
        // 秒位
        var sec = (second - hr * 3600 - min * 60);
        // 毫秒位，保留2位
        var micro_sec = Math.floor((micro_second % 1000) / 10);
        sec < 10 && (sec = "0" + sec);
        hr < 10 && (hr = "0" + hr);
        min < 10 && (min = "0" + min);
        return hr + ":" + min + ":" + sec
    }

    keyExtractor = (item, index) => index;

    _renderCommodityList(item,index){
        let remakrs2 =  parseInt(item.remakrs2);
        let arr = item.salesPercentage.split('.');
        let num = parseInt(arr[0]);
        let timeStart = new Date(item.seckillStartTime);
        let timeEnd = new Date(item.seckillStartTime2);
        let time = timeEnd - timeStart;
        this.countdown(time);

        return (
            <TouchableOpacity onPress={()=>this._commodityDetails(item.id)}
                style={styles.list} key={index} >
                <View style={styles.listLeft}>
                    <Image source={{uri:item.picture}} style={{width:'100%', height:'100%',borderRadius:5,}}/>
                    <View style={styles.red}>
                        <Text style={{fontSize:10,color:'#fff',marginRight:3}}>距结束</Text>
                        <View style={{flexDirection: 'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={styles.redText}>01</Text>
                            <Text style={{color:'#fff',marginLeft:1,marginRight:1}}>:</Text>
                            <Text style={styles.redText}>25</Text>
                            <Text style={{color:'#fff',marginLeft:1,marginRight:1}}>:</Text>
                            <Text style={styles.redText}>23</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.listRight}>
                    <View>
                        <Text style={{fontSize: 13}}>{item.productName}</Text>

                    </View>
                    <View style={styles.progress}>
                        <View style={{width: num + '%', backgroundColor: 'red', height: 12}}></View>
                        <View style={{width: 100 - num + '%', backgroundColor: '#ffcece', height: 12}}></View>
                        <Text style={styles.percent}>{arr[0]}%</Text>
                    </View>
                    <View style={styles.price}>
                        <View style={{flexDirection: 'row',alignItems:'flex-end'}}>
                            <Text style={{fontSize: 13, color: 'red'}}>￥{item.seckillPrice}</Text>
                            <Text style={{
                                fontSize: 10,
                                color: '#999999',
                                textDecorationLine: 'line-through',
                                marginLeft: 12
                            }}>￥{item.price}</Text>
                        </View>
                        {
                            remakrs2 === item.selledNum ?
                                <Image source={require('./../../../images/wufajiaxuan.png')}/>
                                :
                                <TouchableOpacity onPress={()=>this._cart(item.id)}>
                                    <Image source={require('./../../../images/tianjia.png')}
                                    />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
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
    }

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

    _keyExtractor = (item, index) => index;

    createEmptyView() {
        return (
            <View style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
                <Image source={require('./../../../images/mine/zanshimeiyoushoucang.png')} />
                <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>暂时没有秒杀商品</Text>
            </View>
        );
    }

    render(){
        if (!this.state.loaded && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }
        let headImgs = this.state.headImgs;
        let _commodity = this.state.dataArray;
        return (
            <Container>
                <View style={styles.header}>
                    <Image source={{uri:headImgs}}
                           style={{height: 144}}/>
                </View>
                    <FlatList data={_commodity}
                              ListFooterComponent={this._renderFooter.bind(this)}
                              ListEmptyComponent={this.createEmptyView()}
                              onEndReachedThreshold={1}
                              onEndReached={this._onEndReached.bind(this)}
                              renderItem={({item,index}) => this._renderCommodityList(item,index)}
                              keyExtractor={ this.keyExtractor }
                              refreshing={this.state.refreshing}
                              onRefresh={() => this._onRefresh()}
                    />
            </Container>
        );
    }
}