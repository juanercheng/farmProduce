/**
 * Created by juaner  2018/3/29
 */
import React, { Component } from 'react';
import { Container,  Button, Text ,Input } from 'native-base';
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
    ImageBackground,
    StyleSheet,

}from 'react-native';
import moment from 'moment';
import { Toast } from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import styles from "./ApplyRefundStyle"
import http from "../../../js/http";

const nocheckImage=require('./../../../../images/mine/unChecked.png');
const checkImage=require('./../../../../images/mine/checked.png');
const updateTakeTime = 'orderRefund/updateTakeTime';

export  default class ChooseAddress extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '选择退款时间',
        headerStyle: {
            backgroundColor: "#fff",
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
        let date = moment(new Date().getTime()+1000*60*60*24).format('YYYY-MM-DD')
        this.state = {
            loaded: true,
            data: null,
            date:date,
            time:'09:00-11:00'
        }
        console.log(this.props.navigation.state.params.orderNo)
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


    _next(routName,title){
        const navigation = this.props.navigation;
        navigation.navigate( routName,{
            title:title,
        });
    }

    renderLoadingView(){
         return (
             <View style={SettingStyle.LoadingView}>
                    <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
             </View>
         );
    }

    getMyDay(date){
        var week;
        if(date.getDay()==0)          week="周日"
        if(date.getDay()==1)          week="周一"
        if(date.getDay()==2)          week="周二"
        if(date.getDay()==3)          week="周三"
        if(date.getDay()==4)          week="周四"
        if(date.getDay()==5)          week="周五"
        if(date.getDay()==6)          week="周六"
        return week;
    }

    render() {
        let date = moment(new Date().getTime()+1000*60*60*24).format('YYYY-MM-DD')
        let date1 = moment(new Date().getTime()+1000*60*60*24*2).format('YYYY-MM-DD')
        let date2 = moment(new Date().getTime()+1000*60*60*24*3).format('YYYY-MM-DD')
        var rowData1  = [
            {
                name:this.getMyDay(new Date(date)),
                date:date
            },
            {
                name:this.getMyDay(new Date(date1)),
                date:date1
            },
            {
                name:this.getMyDay(new Date(date2)),
                date:date2
            }
        ];

        var rowData2 = [
            '09:00-11:00','11:00-13:00','13:00-15:00','15:00-17:00','17:00-19:00'
        ];
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return (
            <Container>
                <ScrollView>
                    <View style={styles.DateContent}>
                        <Text style={SettingStyle.font14}>选择日期</Text>
                        <View style={styles.dayBox}>
                            {
                                rowData1.map((rowData, index) => (
                                    <View style={styles.dateItem} key={rowData.id}>
                                        <TouchableOpacity onPress={()=>this._check1(rowData.date)} >
                                            <Image style={{width:20,height:20,marginRight:10}}
                                                   source={this.state.date===rowData.date ? checkImage : nocheckImage} />
                                        </TouchableOpacity>
                                        <Text style={SettingStyle.font14}>{rowData.name}   {rowData.date}</Text>
                                    </View>
                                ))
                            }
                        </View>
                        <Text style={SettingStyle.font14}>选择时间</Text>
                        <View style={styles.dayBox}>
                            {
                                rowData2.map((rowData, index) => (
                                    <View style={styles.dateItem} key={index}>
                                        <TouchableOpacity onPress={()=>this._check2(rowData)} >
                                            <Image style={{width:20,height:20,marginRight:10}}
                                                   source={this.state.time===rowData ? checkImage : nocheckImage} />
                                        </TouchableOpacity>
                                        <Text style={{flexDirection:'row',fontSize:14}}>{rowData}</Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={{marginLeft:15,marginRight:15,marginTop:50}}>
                           <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                 <Button block style={{backgroundColor:'transparent'}} onPress={()=>this.send()     }>
                                       <Text style={{color:'#fff',textAlign:'center'}}>确定</Text>
                                 </Button>
                           </ImageBackground>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }

    send = () => {
        let _this = this;
        let date = this.state.date +' '+ _this.state.time;
        if(_this.props.navigation.state.params.orderNo){
            let time = date;
            let year = time.slice(0,time.indexOf(' '));
            let takeStartTime = year + time.substring(time.indexOf(' '),time.lastIndexOf('-'))+':00';
            let takeEndTime = year + ' ' + time.substring(time.lastIndexOf('-')+1)+':00';
            let params={
                refundNo:_this.props.navigation.state.params.orderNo,
                takeStartTime:takeStartTime,
                takeEndTime:takeEndTime
            };
            http.postData( updateTakeTime ,params,
                function(res){
                console.log(res)
                if(res.code===0){
                    Toast.info('提交成功',2, () => {
                        const { goBack } = _this.props.navigation
                        goBack (_this.props.navigation.state.params.key)
                    });
                }
            })
        }else {
            const { goBack,navigate,state } = _this.props.navigation;
            state.params.refresh(date);
            goBack ();
        }
    };

    _check1(id){
        this.setState({
            date:id,
        })
    }
    _check2(id){
        console.log(id)
        this.setState({
            time:id,
        })
    }

}

