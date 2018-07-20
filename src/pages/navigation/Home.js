/**
 * Created by ChengJuan by 18-03-15
 */
import React from 'react';
import {Root} from "native-base";
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

import HomePage from './../home/HomeContent';
import Login from './../home/login/Login'
import signUp from './../home/login/signUp'
import forget from './../home/login/forget'
import column from './../home/column/column'
import commodityDetails from './../common/commodityDetails/commodityDetails'
import store from './../common/store/store'
import productCode from './../common/productCode/productCode'
import news from './../home/news/news'
import search from './../home/search/Search'
import comment from './../common/comment/comment/comment'
import commentDetails from './../common/comment/commentDetails/commentDetails'
import locationCity from './../home/location/locationCity'
import locationProvince from './../home/location/locationProvince'
import authorization from "../home/login/authorization";
import newsDetails from "../home/news/newsDetails";
import ShopCar from '../shopping/shopCar/ShopCar';
import ConfirmOrder from '../shopping/ConfirmOrder/ConfirmOrder';
import BatchOrderList from '../shopping/ConfirmOrder/BatchOrderList'; //批量订单列表
import Invoice from '../shopping/Invoice/Invoice';

import ConfirmPay from '../shopping/ConfirmPay/ConfirmPay';
import PaySuccess from '../shopping/PaySuccess/PaySuccess';
import Address from './../common/address/Address';
import AddAddress from './../common/address/AddAddress';  //新增收货地址
import SelectProAddress from './../common/address/SelectProAddress';  //新增收货地址
import SelectCityAddress from './../common/address/SelectCityAddress';  //新增收货地址
import SelectAreaAddress from './../common/address/SelectAreaAddress';  //新增收货地址
import CouponTab from './../common/Coupon/CouponTab';
import QRcode from './../home/QRcode/QRcode'
import LuckDraw from './../home/luckDraw/luckDraw'
import Test from './../../js/test'
const HomePages = StackNavigator({
    Home: {screen: HomePage},

    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            tabBarVisible: false
        },
    },

    // Test: {screen: Test},
    // Home: {screen: HomePage},
    LuckDraw:{screen:LuckDraw},
    locationCity: {screen: locationCity},
    locationProvince: {screen: locationProvince},
    news:{screen: news},
    newsDetails:{screen:newsDetails},
    search:{screen: search},
    column:{screen: column},
    comment:{screen: comment},
    commentDetails:{screen: commentDetails},
    authorization:{screen:authorization},
    signUp: {screen: signUp},
    forget: {screen: forget},
    commodityDetails:{screen:commodityDetails},
    store: {screen: store},
    productCode:{screen:productCode},
    ShopCar: {screen: ShopCar,navigationOptions: { header: null},},
    ConfirmOrder: {screen: ConfirmOrder},
    BatchOrderList: {screen: BatchOrderList},
    Invoice: {screen: Invoice},
    ConfirmPay: {screen: ConfirmPay,},
    PaySuccess: {screen: PaySuccess,},
    Address: {screen: Address,},
    AddAddress: {screen: AddAddress,},
    SelectProAddress: {screen: SelectProAddress,},
    SelectCityAddress: {screen: SelectCityAddress,},
    SelectAreaAddress: {screen: SelectAreaAddress,},
    CouponTab: {screen: CouponTab,},
    QRcode:{screen:QRcode}

}, {
    headerMode: 'float',
    transitionConfig: () => ({
        screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
}, {
    initialRouteName: "Home"
});
export default HomePages;