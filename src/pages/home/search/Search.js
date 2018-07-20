/**
 * Created by Zero on 2018/3/29
 */
import React, { Component } from 'react';
import {
    Container,
    Header,
    Text,
    List,
    ListItem, } from 'native-base';
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
import Util from './../../../js/util';
import SearchStyles from './SearchStyle';
import styles from "./../../recommend/seckillStyle"
import http from "../../../js/http";
import global from "../../../js/global";
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';

export  default class search extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        header: null
    });
    constructor(props){
        super(props);
        this.state = {
            commodity: [

            ]
        }
    }
    componentDidMount(){

    }
    //搜索事件
    _search(productName){
        console.log(productName);
        if (productName === ''){
            console.log(123)
        } else{
            let params = {
                productName:productName,
                shopId:global.home.shopId,
                sort:'default',
                pageCurrent:1,
                pageSize:30
            };
            let that = this
            http.getNoTokenData( 'producte/list',params,
                function(res){
                    if(res.code == 0){
                        console.log(res);
                        that.setState({
                            commodity:res.object
                        })
                    }
                }
            )
        }

    }
    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate( routName);
    }
    //跳转到商品详情
    _commodityDetails(id,productType) {
        console.log(id,productType);
        const navigation = this.props.navigation;
        navigation.navigate('commodityDetails',{
            productId:id,
            productType:productType
        });
    }
    //添加到购物车
    _add(id){
        console.log('添加至购物车');
        let params = {
            productId:id,
            number:1
        };
        http.postData("producteCar/addShopCart",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    Toast.info('已添加',2);
                }else{
                    if(res.msg === '购物车中该商品购买数量已大于库存剩余数量'){
                        Toast.info('库存不足',2);
                    }else{
                        Toast.info(res.msg,2);
                    }
                }
            })
    }

    //历史搜索
    renderHistory(){
        let _commodity = this.state.commodity;
        if(_commodity.length === 0){
            return (
                <View style={SearchStyles.searchWrap}>
                    <Text style={[SettingStyle.font14,{color:"#999"}]}>历史搜索</Text>
                    <View style={SearchStyles.searchListBox}>
                        <TouchableOpacity style={SearchStyles.textBox}>
                            <Text style={[SettingStyle.font14,{color:"#78797a"}]}>东北黑木耳</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else{
            return <View><Text></Text></View>
        }

    }
    //输入搜索列表
    renderList(){
        let _commodity = this.state.commodity;
        if (_commodity.length === 0){
            return <View><Text></Text></View>
        } else{
            return (
                <View >
                    <List>
                        {
                            _commodity.map((value,index)=>{
                                return (
                                    <ListItem key={index} onPress={()=>this._hello(value.productName)}>
                                        <Text style={{color:"#444"}}>{value.productName}</Text>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </View>
            )
        }
    }
    _hello(productName){
        this.setState({
            value:productName
        })
        this._search(productName);
    }
    //搜索为空
    renderEmpty(){
        return(
            <View style={SettingStyle.emptyWrap}>
                <ImageBackground style={SettingStyle.emptyImg} resizeMode='contain'
                                 source={require('./../../../../images/shop/nocoupon.png')} />
                <Text style={[SettingStyle.font14,{color:"#999"}]}>没有搜索到相关内容</Text>
            </View>
        )
    }
    //搜索商品列表
    _renderCommodity() {
        let _commodity = this.state.commodity;
        if (_commodity.length === 0){
            return <View><Text></Text></View>
        } else{
            return (
                _commodity.map((value, index) => {
                    return (
                        <TouchableOpacity onPress={()=>this._commodityDetails(value.id,value.productType)}
                                          style={styles.list} key={index}>
                            <Image source={{uri:value.picture}}
                                   style={styles.listLeft}/>
                            <View style={styles.listRight}>
                                <View>
                                    <Text style={{fontSize: 13}}>{value.productName}{value.standardName}{value.labelName}</Text>
                                </View>
                                <View style={SearchStyles.labelWrap}>
                                    <Text style={SearchStyles.labelGreen}>本地仓</Text>
                                    <Text style={SearchStyles.labelRed}>自营</Text>
                                </View>
                                <View style={[styles.price,{justifyContent:"space-between" }]}>
                                    <View style={{flexDirection:"row",alignItems:"center"}}>
                                        <Text style={{fontSize: 12, color: 'red'}}>￥<Text style={{fontSize: 18, color: 'red'}}>{value.finalPrice}</Text></Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#999999',
                                            textDecorationLine: 'line-through',
                                            marginLeft: 12
                                        }}>￥{value.price }</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this._add(value.id)}>
                                        <Image source={require('./../../../../images/tianjia.png')}
                                               style={{width: 22, height: 22, }}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            )
        }

    }
    render() {
        return (
            <Container style={{backgroundColor:"#fff"}}>
                <Header searchBar rounded style={SearchStyles.header}>
                    <TextInput placeholder="搜索您喜欢的商品"
                               underlineColorAndroid='transparent'
                               inlineImageLeft='./../../../../images/business.png'
                               style={[SearchStyles.input]}
                               onChangeText={(text) => this._search(text)}
                               value={this.state.value}
                    />
                    <TouchableOpacity onPress={() => this._next("Home")} >
                        <Text>取消</Text>
                    </TouchableOpacity>
                </Header>
                {/*输入搜索列表*/}
                {this.renderList()}
                {/*历史搜索*/}
                {this.renderHistory()}
                {/*搜索商品列表*/}
                <View>
                    {this._renderCommodity()}
                </View>
            </Container>

        );
    }
}
