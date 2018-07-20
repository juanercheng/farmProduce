/**
 * Created by juaner by 18-03-27
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header,ScrollableTab, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
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

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './OrderStyle'

import OrderAll from'./OrderAll'
import OrderObligation from'./OrderObligation'
import OrderBack from'./OrderBack'
import OrderReceived from'./OrderReceived'
import OrderEvaluated from'./OrderEvaluated'
import OrderRefund from'./OrderRefund'

const Url = Util.rootPath + 'user/findUserDetail?id=1';

export  default class OrderIndex extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("我的订单"),
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
            page:0,
            loaded: false,
        };
    }

    componentDidMount(){
        this.setState({
             page:this.props.navigation.state.params.page,
        });
        this.props.navigation.setParams({
                navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };


    render(){
        return this.renderView()
    }

    endClick(routName,orderNo,type) {
       const { navigate } = this.props.navigation;
       navigate( routName ,{
           orderNo:orderNo,
           type:type
       })
    }

    renderView() {
        return (
            <Container >
                <Tabs tabBarPosition="top" renderTabBar={()=> <ScrollableTab />}
                       tabBarUnderlineStyle={{backgroundColor:"#23a300",height:2, }}
                       initialPage={0}>
                    <Tab heading='全部' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderAll onClick={this.endClick} nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}} />
                    </Tab>
                    <Tab heading='待付款' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderObligation  onClick={this.endClick}  nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}}/>
                    </Tab>
                    <Tab heading='待发货' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderBack onClick={this.endClick} nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}}/>
                    </Tab>
                    <Tab heading='待收货' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderReceived onClick={this.endClick} nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}}/>
                    </Tab>
                    <Tab heading='待评价' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderEvaluated onClick={this.endClick} nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}}/>
                    </Tab>
                    <Tab heading='退款/售后' textStyle={[{color:'#999'},SettingStyle.font14]}
                           tabStyle={{backgroundColor:'#fff'}}
                           activeTabStyle={{backgroundColor:'#fff'}}
                           activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                          <OrderRefund onClick={this.endClick} nextClick={(routName,orderNo,type) => {this.endClick(routName,orderNo,type)}}/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}
