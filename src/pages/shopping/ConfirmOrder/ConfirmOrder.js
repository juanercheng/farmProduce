/**
 * Created by Zero on 2018/3/21
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, ListItem, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
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
    StyleSheet,
    ImageBackground
}from 'react-native';
import { Toast, Modal,} from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import confirmStyles from './ConfirmOrderStyle';
import OneOrderComponent from './OneOrderComponent';
import styles from '../shopCar/ShopCarStyle';
import http from './../../../js/http';

const checkedImage=require('./../../../../images/shop/piaoju-weixuanzhong.png');
const checkImage=require('./../../../../images/shop/xuanzhong.png');
export  default class ConfirmOrder extends Component{

    static navigationOptions = ({ navigation }) => ({
        headerTitle: ("确认订单"),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTintColor: "#333",
        headerTitleStyle: {
            color: "#333",
            alignSelf: 'center',
        },
        tabBarVisible: false,
        headerLeft:(
            <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight:(
            <Button transparent></Button>
        )
    });

    constructor(props, context){
        super(props, context);
        this.state = {
            ids:this.props.navigation.state.params.ids || null, //购物车id
            id: this.props.navigation.state.params.accountData.addressEntity.id||null,   //选择地址id
            money:this.props.navigation.state.params.money || null, //总金额
            isChecked: this.props.isChecked ||false , //是否抵扣
            myCouponId:'',//优惠券
            invoice: this.props.navigation.state.params.invoice ||{ billType : 0}, //是否开票
            coupon:'不使用优惠',
            accountData:this.props.navigation.state.params.accountData || null, //结算带过来的所有信息
            productId:this.props.navigation.state.params.productId || "", //商品id ,点击立即购买带过来的
            deliveryStatus:null, //判断是否可派送
            address:null,//地址
            consigneeName:null,
            mobile:null,
            addressNone:false,  //用户是否有收获地址
            billType: '不开发票' , //发票类型

        };
    }

    componentDidMount() {
        this.props.navigation.setParams({
            navigatePressBack: this.goBack,
        })
        this._data();
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation;
        goBack ()
    };

    _next(routName,title){
        const navigation = this.props.navigation;
        let that = this
        navigation.navigate( routName,{
            title:title,
            ids:this.state.ids,
            money:this.state.money,
            accountData:this.state.accountData,  //结算带过来的所有信息
            refresh: function (res) {
                that.setState({
                    invoice: res, //是否开票
                },function () {
                    console.log(that.state.invoice.billType)
                    if(that.state.invoice.billType===0){
                        that.setState({
                            billType:'不开发票'
                        })
                    }else if(that.state.invoice.billType===1){
                        that.setState({
                            billType:'普通发票'
                        })
                    }else if(this.state.invoice.billType === 2){
                        that.setState({
                            billType:'增值税'
                        })
                    }
                });
            }
        });
    }

    //店铺优惠券
    _next2(routName,title){
        const navigation = this.props.navigation;
        let that = this
        navigation.navigate( routName,{
            refresh: function (info) {
                that.setState({
                    myCouponId:info,
                },function () {
                    if(that.state.myCouponId){
                        that.setState({
                            coupon:'已优惠'
                        })
                    }
                })
            }
        });
    }
    //收货地址
    _next1(routName,title){
        const navigation = this.props.navigation;
        let that = this
        navigation.navigate( routName,{
            title:title,
            refresh: function (res) {
                that.setState({
                    id: res,
                },function () {
                    that.isDelivery();
                });
            }
        });
    }

    _goPay(routName,orderNo){
        const navigation = this.props.navigation;
        navigation.navigate( routName,{
            orderNo :orderNo,
            money:this.state.money,
        });
    }

    //接受结算数据
    _data(){
        //判断是否携带结算接口返回的数据
        if(this.state.accountData){
            // console.log(this.state.accountData)
            this.setState({
                deliveryStatus:this.state.accountData.deliveryStatus,
                money: this.state.accountData.orderTotalPirce, //总价钱
            },()=>{

            });
            //显示结算接口带过来的默认地址
            if(this.state.accountData.addressEntity ){
                let address=this.state.accountData.addressEntity
                this.setState({
                    address: address.province + address.city +
                    address.area + address.detailAddress,
                    consigneeName: address.consigneeName,
                    mobile:address.mobile,
                });
            }else{
                //如果没有地址 显示请添加地址样式
                this.setState({
                    addressNone:true,
                })
            }
        }
    }
    //修改地址后判断是否可配送
    isDelivery() {
        let params = {
            addressId:this.state.id,
            shopId:this.state.accountData.fianlOrderVos[0].shopId
        };
        let that = this;
        http.postData("order/addressDisStatus",params,
            function(res){
                console.log(res)
                if(res.code===0){
                   that.setState({
                       deliveryStatus: res.object
                   })
                }
            })
    }
    //提交订单
    placeOrder(){
        //如果用户修改了地址，则传修改后的地址id
        if(this.state.deliveryStatus === false){
            return Toast.info('配送地址不在范围内，请重新选择！')
        }

        let score = "";  //积分数量
        let invoice = {}; //发票信息

        if(this.state.accountData.remaindermoney){
            score = this.state.accountData.remaindermoney
        }

        let params = {
            addressId:this.state.id,
            productId:this.state.productId,
            carIds:this.state.ids,
            postage:"",
            score:score,
            myCouponId:this.state.myCouponId,
            orderBillEntityJson: encodeURI(JSON.stringify(this.state.invoice))
        };
        let that = this;
        http.postData("order/placeOrder",params,
            function(res){
                if(res.code===0){
                    that._goPay("ConfirmPay",res.object.orderNo)
                }
        })
    }
    //是否抵扣
    checkClick() {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <View>
                        <TouchableOpacity onPress={()=>this._next1('Address','选择收货地址')}>
                            <View style={confirmStyles.addressWrap} >
                                {
                                    this.state.addressNone ?





                                        <View style={{flexDirection:"row",alignItems:"center"}}>
                                            <Image  source={require('./../../../../images/shop/addicon.png')}  />
                                            <Text style={{marginLeft:10,}}>添加地址</Text>
                                        </View>



                                        : this.state.deliveryStatus === false?
                                        <View >
                                            <View style={{flexDirection:"row",alignItems:"center",}}>
                                                <Text  style={{color:"#333",fontSize:14}}> 配送地址不在范围内，请重新选择！</Text>
                                            </View>
                                        </View>
                                        :
                                        <View >
                                            <View style={{flexDirection:"row",marginBottom:10,}}>
                                                <View style={{width:"10%"}}></View>
                                                <Text style={{fontSize:14}}>{this.state.consigneeName} </Text><Text style={{marginLeft:25,fontSize:14}}>{this.state.mobile}</Text>
                                            </View>
                                            <View style={{flexDirection:"row",alignItems:"center",}}>
                                                <View style={{width:"10%"}}>
                                                    <Image  source={require('./../../../../images/shop/weizhi.png')}  />
                                                </View>
                                                <Text  style={{color:"#333",fontSize:14}}>{this.state.address}</Text>
                                            </View>
                                        </View>
                                }
                                <View  >
                                    <Image    source={require("./../../../../images/fanhui.png")} />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <ImageBackground style={{width:"100%",height:3, }}    source={require('./../../../../images/shop/line.png')} resizeMode='cover'/>
                        {/*商品    */}
                        <View style={[styles.goodsListWrap,{marginTop:10}]}  >
                            {
                                this.state.accountData.fianlOrderVos.length>1 ?
                                    <TouchableOpacity  style={[confirmStyles.muchGoodsWrap]}
                                                       onPress={()=>this._next("BatchOrderList",this.state.accountData.fianlOrderVos)}>
                                        <View style={[confirmStyles.muchGoodsImgWrap]}>
                                            {
                                                this.state.accountData.fianlOrderVos.map((item,index)=>(
                                                    <Image key={item.productId}  style={[ confirmStyles.muchGoodsImg]}
                                                            source={{uri : item.productImg}} />
                                                ))
                                            }
                                        </View>
                                        <TouchableOpacity  >
                                            <Image    source={require("./../../../../images/fanhui.png")} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    // <MuchOrderComponent data={this.state.accountData.fianlOrderVos}
                                    //                     next={(routName,data) => {this.next(routName,data)}}/>
                                :
                                <OneOrderComponent data={this.state.accountData.fianlOrderVos}  />
                            }

                        </View>
                        {/*配送方式*/}
                        <View style={styles.list}>
                            <Text style={SettingStyle.font14}>配送方式</Text>
                            <View>
                                <Text  style={SettingStyle.font14}>商家配送</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.list}  onPress={()=>this._next2("CouponTab")}>
                            <Text style={SettingStyle.font14}>店铺优惠</Text>
                            <View style={{flexDirection: 'row',alignItems:"center"}}>
                                <Text style={SettingStyle.font14}>{this.state.coupon}</Text>
                                <Image  style={{ marginLeft:10}}  source={require("./../../../../images/fanhui.png")} />
                            </View>
                        </TouchableOpacity>
                        {/*<View style={[styles.list]}>*/}
                            {/*{ this.state.isChecked? <Text style={SettingStyle.font14}>商家不参与积分抵扣</Text>*/}
                               {/*:<Text style={SettingStyle.font14}>可用20积分抵扣</Text>*/}
                            {/*}*/}
                            {/*<View>*/}
                                {/*<TouchableOpacity onPress={() => this.checkClick()}>*/}
                                    {/*<Image source={this.state.isChecked?checkedImage:checkImage}  />*/}
                                {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {
                            this.state.accountData.deductedMoney ?
                                <View style={styles.list} >
                                    <Text style={SettingStyle.font14}>积分抵扣</Text>
                                    <View style={{flexDirection: 'row',alignItems:"center"}}>
                                        <Text style={SettingStyle.font14}>{this.state.accountData.remaindermoney }</Text>
                                    </View>
                                </View>
                                : null
                        }
                        {
                            this.state.accountData.activitiCutPrice ?
                                <View style={styles.list} >
                                    <Text style={SettingStyle.font14}>满减</Text>
                                    <View style={{flexDirection: 'row',alignItems:"center"}}>
                                        <Text style={SettingStyle.font14}>￥{this.state.accountData.activitiCutPrice}</Text>
                                    </View>
                                </View>
                                :null
                        }

                        <TouchableOpacity style={[styles.list,{marginTop:10,}]} onPress={()=>this._next("Invoice")}>
                            <Text style={SettingStyle.font14}>发票</Text>
                            <View style={{flexDirection: 'row',alignItems:"center"}}>
                                {/*<Text style={SettingStyle.font14}>{this.state.invoice} <Text style={[SettingStyle.font14,{color:"#666"}]}>(商品明细-个人)</Text> </Text>*/}
                                <Text style={SettingStyle.font14}>{ this.state.billType}</Text>
                                <Image  style={{ marginLeft:10}}  source={require("./../../../../images/fanhui.png")} />
                            </View>
                        </TouchableOpacity>
                        {/*批量商品显示件数*/}
                        <View >
                            <Text style={[SettingStyle.font12,{textAlign:"right",paddingRight:15,marginTop:10,}]}>
                                共{this.state.accountData.fianlOrderVos.length}件商品  小计:￥{this.state.money}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.footer,{justifyContent:"space-between"}]}>
                    <View style={styles.allBtn}>
                    </View>
                    <View style={[styles.allWrap,{flexDirection: 'row',alignItems:"center",marginRight:10,}]}>
                        <Text style={[SettingStyle.font14,{marginRight:10,}]}>共{this.state.accountData.fianlOrderVos.length}件商品</Text>
                        <Text style={SettingStyle.font14}>小计:<Text style={[SettingStyle.font14,{color:"#ff4e3c"}]}>￥{this.state.money}</Text></Text>
                    </View>
                    <TouchableOpacity style={[styles.goBtn]} onPress={()=>this.placeOrder()}>
                        <ImageBackground style={{width:"100%",height:"100%", flexDirection : 'row', alignItems:"center"}}
                                         source={require('./../../../../images/shop/tijiaobg.png')} resizeMode='cover'>
                            <Text style={styles.goText}  >提交订单</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}
