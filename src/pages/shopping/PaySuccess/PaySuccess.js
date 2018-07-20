/**
 * Created by Zero on 2018/3/27
 */
import React, { Component } from 'react';
import {   Button,   Text , } from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    Image,
    Linking,
    TouchableOpacity,
    ViewPagerAndroid,
    StyleSheet,
    TouchableHighlight,
    ImageBackground
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
export  default class PaySuccess extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '支付成功',
        headerStyle: {
            backgroundColor: "#fff",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
            color: "#000",
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
    }
    _next (routName) {
        const { navigate } = this.props.navigation;
        navigate(routName)
    }
    render() {
        return (
            <View style={SettingStyle.emptyWrap}>
                <ImageBackground style={SettingStyle.emptyImg} resizeMode='contain'
                                 source={require('./../../../../images/shop/nocoupon.png')} />
                <Text style={[SettingStyle.font16,{color:"#000"}]}>支付成功</Text>
                <TouchableOpacity style={{paddingTop:5,paddingBottom:5,paddingLeft:25,paddingRight:25,
                borderWidth:1,borderColor:"#000",borderRadius:3 ,marginTop:40,}}
                 onPress={()=>this._next("Home")}
                >
                    <Text>返回首页</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


