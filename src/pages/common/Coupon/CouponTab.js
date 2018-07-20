/**
 * Created by Zero on 2018/3/23
 */
import React, { Component } from 'react';
import { Container, Button, Header, Tab, Tabs, TabHeading,Text ,Icon, } from 'native-base';
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
import styles from './CouponStyle';
import CouponList from './CouponList';
import Util from './../../../js/util';
export  default class CouponTab extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '优惠券',
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerTintColor: "#333",
        headerTitleStyle: {
            color: "#333",
            alignSelf: 'center',
        },
        headerLeft:(
            <Button transparent style={{height:"100%"}} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={[SettingStyle.headerBack ]} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight: (
            <Button transparent></Button>
        )
    });
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }
    goBack = () => {
        const { goBack,navigate,state } = this.props.navigation
        goBack ()
    }

    _next(info){
        const { goBack,state } = this.props.navigation;
        state.params.refresh(info);
        goBack ()
    }

    render() {
        return (
            <Container  >
                <Tabs tabStyle={{backgroundColor:"#fff",shadowOffset: {width: 0, height: 0},
                    shadowOpacity:0,elevation:0,borderWidth:0,shadowRadius: 0}}
                      tabBarPosition="top"
                      tabBarUnderlineStyle={{backgroundColor:"#23a300",width:"2%", marginLeft:"11%"}}
                      initialPage={0}>
                    <Tab heading='未使用'
                         tabStyle={{backgroundColor:"#fff"}}
                         activeTabStyle={{backgroundColor:"#fff"}}
                         textStyle={{color:"#999",fontSize:14}}
                         activeTextStyle={{color:"#333",fontSize:14}}>
                        <CouponList type="0"  nextClick={(info) => {this._next(info)}}/>
                    </Tab>
                    <Tab heading='已使用'
                         tabStyle={{backgroundColor:"#fff"}}
                         activeTabStyle={{backgroundColor:"#fff"}}
                         textStyle={{color:"#999",fontSize:14}}
                         activeTextStyle={{color:"#333",fontSize:14}}>
                        <CouponList type="1" nextClick={(info) => {this._next(info)}}/>
                    </Tab>
                    <Tab heading='已过期'
                         tabStyle={{backgroundColor:"#fff"}}
                         activeTabStyle={{backgroundColor:"#fff"}}
                         textStyle={{color:"#999",fontSize:14}}
                         activeTextStyle={{color:"#333",fontSize:14}}>
                        <CouponList type="2" nextClick={(info) => {this._next(info)}}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
