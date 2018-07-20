import React,{Component} from 'react';
import {StackNavigator} from 'react-navigation';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// import RecCommission from './../recommend/RecCommission';
import Seckill from './../recommend/seckill'
import commodityDetails from "../common/commodityDetails/commodityDetails";
import commentDetails from "../common/comment/commentDetails/commentDetails";
import comment from "../common/comment/comment/comment";
import store from "../common/store/store";
import productCode from "../common/productCode/productCode";
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
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
const Recommend = StackNavigator({
    // RecCommission: {screen: RecCommission},
    Seckill:{
        screen:Seckill,
        navigationOptions: {
            header: null
        }},
    commodityDetails:{screen:commodityDetails},
    comment:{screen: comment},
    commentDetails:{screen: commentDetails},
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
})
export default Recommend;
