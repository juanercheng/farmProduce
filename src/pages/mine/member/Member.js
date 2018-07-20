/**
 * Created by juaner by 18-03-20
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,InputGroup,List,ListItem,Form, Button, Spinner, Text ,Icon,Item,Input} from 'native-base';
import Swiper from 'react-native-swiper';
//import TabNavigator from 'react-native-tab-navigator';
import {
     Alert,
     TextInput,
     View,
     Platform,
     Image,
     Linking,
     TouchableOpacity,
     ViewPagerAndroid,
     ScrollView,
     ImageBackground,
     TouchableHighlight,
}from 'react-native';
import LoginView from './../../common/LoginView'

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle';
import http from './../../../js/http';
import global from './../../../js/global';

const Url = 'user/userInfos';

export  default class Member extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '会员卡',
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
            memberCardNumber:null,
            dataSource: null,
            loaded: false
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };


    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log(res)
               for(let i in _this._data ){
                  _this.setState({
                     dataSource: _this._data[0].userUpEntity,
                     loaded: true,
                     memberCardNumber: _this._data[0].memberCardNumber
                 });
              }
           }
        )
    }

    render(){
        if (!this.state.loaded ) {
              return <LoginView/>
        }
        let _data=this.state.data2
        return this.renderView(_data);
    }

    renderView() {
         return (
            <Container style={styles.memberContent}>
                <View style={styles.memberBox}>
                    <ImageBackground style={{width:'100%'}}
                         source={{uri:this.state.dataSource.remarks1}}
                         resizeMode='cover'>
                         <Text style={{paddingTop:11,paddingRight:12}}> </Text>
                         <Text style={{fontSize:21,color:'#20a200',paddingLeft:21,paddingBottom:13,textAlign:'left',width:'100%',marginTop:90,}}>{this.state.dataSource.levelName}</Text>
                         <Text style={{fontSize:12,color:'#fff',paddingTop:13,paddingBottom:13,paddingLeft:21,textAlign:'left',backgroundColor:'#3eb121',width:'100%'}}>卡号：{this.state.memberCardNumber}</Text>
                    </ImageBackground>
                </View>
                <Text style={[SettingStyle.font16,{marginBottom:19}]}>会员卡须知</Text>
                <Text style={{fontSize:13}}>1、本卡是打折卡，对特殊顾客使用；</Text>
                <Text style={{fontSize:13}}>2、本卡只在本店铺使用，其他店铺和个人使用无效，不得转借其他店铺和个人；</Text>
                <Text style={{fontSize:13}}>3、本卡不参与积分兑换</Text>
                <Text style={{fontSize:13}}>4、本卡店铺员工及家属不得使用</Text>
                <Text style={{fontSize:13}}>5、一经发现超出本卡的使用规定的故意行为，按公司规章和相关法律处理</Text>
                <Text style={{fontSize:13}}>6、本卡有效期*年，截止到2018年12月31日</Text>
                <Text style={{fontSize:13}}>最终解释权归本APP所有</Text>
            </Container>
         );
    }
 }
