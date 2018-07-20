/**
 * Created by ChengJuan by 18-03-15
 */
import React from 'react';
import { Root } from "native-base";
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollableTab,
  TouchableHighlight,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ConfirmOrder from './../shopping/ConfirmOrder/ConfirmOrder';  //确认订单
import HomePage from './../home/HomeContent';  //首页
import ConfirmPay from '../shopping/ConfirmPay/ConfirmPay';
import PaySuccess from '../shopping/PaySuccess/PaySuccess';
import Address from './../common/address/Address';  //收货地址
import AddAddress from './../common/address/AddAddress';  //新增收货地址
import SelectProAddress from './../common/address/SelectProAddress';  //新增收货地址
import SelectCityAddress from './../common/address/SelectCityAddress';  //新增收货地址
import SelectAreaAddress from './../common/address/SelectAreaAddress';  //新增收货地址
import CouponTab from './../common/Coupon/CouponTab'; //优惠券
import MineIndex from './../mine/MineIndex';  //个人中心
import Setting from './../mine/setting/Setting';  //设置
import UserInfo from './../mine/setting/UserInfo';  //个人信息
import UserInfoChange from './../mine/setting/UserInfoChange';    //更换用户信息
import Certification from './../mine/setting/Certification';   //实名认证
import UploadRealNameInfo from './../mine/setting/UploadRealNameInfo';   //实名认证
import AddInvoice from './../mine/setting/AddInvoice';  //增票资质
import Feedback from './../mine/setting/Feedback';   //意见反馈
import About from './../mine/setting/About';   //关于我们
import QRCode from './../mine/setting/QRCode';  //二维码
import Distribution from './../mine/setting/Distribution';  //分销权益
import Member from './../mine/member/Member';  //会员卡
import Collection from './../mine/collection/Collection';  //收藏
import Integral from './../mine/integral/Integral'; //我的积分
import IntegralList from './../mine/integral/IntegralList';
import IntegralRule from './../mine/integral/IntegralRule';  //积分规则
import OrderIndex from './../mine/order/OrderIndex';  //我的订单
import OrderAll from './../mine/order/OrderAll';  //我的订单all
import OrderObligation from './../mine/order/OrderObligation';  //我的订单待付款
import OrderBack from './../mine/order/OrderBack';  //我的订单待发货
import OrderReceived from './../mine/order/OrderReceived';  //我的订单待收货
import OrderEvaluated from './../mine/order/OrderEvaluated';  //我的订单待评价
import OrderRefund from './../mine/order/OrderRefund';  //我的订单退款
import OrderDetails from './../mine/order/OrderDetails';  //我的订单详情
import WriteEvaluate from './../mine/evaluate/WriteEvaluate';  //填写评价
import WriteSuccess from './../mine/evaluate/WriteSuccess';  //评价成功
import Service from './../mine/service/Service';//客服
import ApplyRefund from './../mine/applyRefund/ApplyRefund';//申请退款
import RefundDetails from './../mine/applyRefund/RefundDetails';//退款详情
import RefundType from './../mine/applyRefund/RefundType';//退款类型
import ChooseAddress from './../mine/applyRefund/ChooseAddress';//选择寄件地址
import DateChoose from './../mine/applyRefund/DateChoose';//选择寄件时间
import Logistics from './../mine/Logistics/Logistics';//查看物流
import Logistics1 from './../mine/Logistics/Logistics1';//
import commodityDetails from './../common/commodityDetails/commodityDetails'

const MinePages = StackNavigator({
    MineIndex: {screen: MineIndex,},
    Setting: {screen: Setting},
    UserInfo: {screen: UserInfo},
    UserInfoChange: {screen: UserInfoChange},
    QRCode: {screen: QRCode},
    Address: {screen: Address},
    AddAddress: {screen: AddAddress},
    SelectProAddress: {screen: SelectProAddress},
    SelectCityAddress: {screen: SelectCityAddress},
    SelectAreaAddress: {screen: SelectAreaAddress},
    Certification: {screen: Certification},
    UploadRealNameInfo: {screen: UploadRealNameInfo},
    AddInvoice: {screen: AddInvoice},
    Feedback: {screen: Feedback},
    About: {screen: About},
    Member: {screen: Member},
    Collection: {screen: Collection},
    CouponTab: {screen: CouponTab,},
    Integral: {screen: Integral,},
    IntegralList: {screen: IntegralList,},
    IntegralRule: {screen: IntegralRule,},
    OrderIndex: {screen: OrderIndex,},
    OrderAll: {screen: OrderAll,},
    OrderObligation: {screen: OrderObligation,},
    OrderBack: {screen: OrderBack,},
    OrderReceived: {screen: OrderReceived,},
    OrderEvaluated: {screen: OrderEvaluated,},
    OrderRefund: {screen: OrderRefund,},
    ConfirmOrder: {screen: ConfirmOrder},
    OrderDetails: {screen: OrderDetails},
    Service: {screen: Service},
    ApplyRefund: {screen: ApplyRefund},
    WriteEvaluate: {screen: WriteEvaluate},
    WriteSuccess: {screen: WriteSuccess},
    RefundDetails: {screen: RefundDetails},
    Distribution: {screen: Distribution},
    HomePage: {screen: HomePage},
    RefundType: {screen: RefundType},
    ChooseAddress: {screen: ChooseAddress},
    Logistics: {screen: Logistics},
    Logistics1: {screen: Logistics1},
    DateChoose: {screen: DateChoose},
    commodityDetails:{screen:commodityDetails},
    ConfirmPay: {screen: ConfirmPay,},
    PaySuccess: {screen: PaySuccess,},
},{
    headerMode: 'float',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
},{
    initialRouteName:"MineIndex"
});
export default MinePages;