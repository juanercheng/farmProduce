/**
 * Created by ChengJuan by 18-03-15
 */
import React from 'react';
import { Root } from "native-base";

import {StackNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import ShopCar from '../shopping/shopCar/ShopCar';
// import Test from '../shopping/shopCar/test';
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


const MinePages = StackNavigator({
    // Test: {screen: Test,navigationOptions: { header: null},},

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

},{
    headerMode: 'float',
    transitionConfig:()=>({
        screenInterpolator:CardStackStyleInterpolator.forHorizontal,
    })
},{
    initialRouteName:"ShopCar"
});
export default MinePages;