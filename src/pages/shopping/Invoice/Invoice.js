/**
 * Created by Zero on 2018/3/22
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,List,ListItem, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
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
import styles from './InvoiceStyle';
import Util from './../../../js/util';
import global from './../../../js/global';
import NoInvoice from "./NoInvoice"
import OrdinaryInvoice from "./OrdinaryInvoice"
import VatInvoice from "./VatInvoice"

export  default class Invoice extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '发票内容',
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
            ticketType: 0, //发票类型
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };

    back(info){
        const { goBack,state } = this.props.navigation;
        state.params.refresh(info);
        goBack ()
    }

    //发票类型单选
    _check1(index,value){
        this.setState({
            ticketType:index,
        })
        global.shop.ticketType = {
            id:index,
            value:value,
        };
    }

    render() {
        const ticketType=[{id:0,value:"不开发票"},{id:1,value:"普通发票"},{id:2,value:"增值税专用发票"}]

        return (
            <Container>
                <ScrollView>
                    <View style={[styles.InvoiceWrap,styles.InvoiceTop]}>
                        {
                            ticketType.map((item,index)=>(
                                <TouchableOpacity onPress={() => this._check1(index,item.value)}
                                                  style={ this.state.ticketType === index ?
                                                      [styles.InvoiceTextWrap,styles.InvoiceTextActiveWrap]:styles.InvoiceTextWrap} key={index}>
                                    <Text style={ this.state.ticketType === index ?
                                        [SettingStyle.font14,styles.textActive]:[SettingStyle.font14,styles.textGray]}>{item.value}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    <View>
                        {
                            this.state.ticketType===0 ? <NoInvoice  back={(invoice)=>{this.back(invoice)}} /> :
                                this.state.ticketType===1 ? <OrdinaryInvoice back={(invoice)=>{this.back(invoice)}}  /> :
                                    this.state.ticketType===2 ? <VatInvoice  back={(invoice)=>{this.back(invoice)}} /> : null
                        }
                    </View>
                    {/*<TouchableOpacity   */}
                        {/*style={{   width:"100%", height:35, marginLeft:"1%", marginRight:"1%", marginTop:"15%"}}>*/}
                        {/*<ImageBackground style={{flex:1}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>*/}
                            {/*<View style={{width:"100%",height:"100%", flexDirection: 'row',*/}
                                {/*alignItems:"center",*/}
                                {/*justifyContent:"center",}}>*/}
                                {/*<Text style={{color:'#fff'}}>确定</Text>*/}
                            {/*</View>*/}
                        {/*</ImageBackground>*/}
                    {/*</TouchableOpacity>*/}
                </ScrollView>
            </Container>
        );
    }
}
