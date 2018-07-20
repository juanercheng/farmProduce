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
     TouchableHighlight,
}from 'react-native';
import LoginView from './../../common/LoginView'
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle';
import http from './../../../js/http';
import global from './../../../js/global';

const Url = 'user/userInfos';

export  default class QRCode extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '我的二维码',
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
    }

    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               for(let i in _this._data ){
                   _this.setState({
                      dataSource: _this._data[0],
                      loaded: true,
                  });
               }
           }
        )
    }


    render(){
        if (!this.state.loaded ) {
             return <LoginView/>
        }
        return this.renderView();
    }

    renderView() {
         return (
            <Container style={styles.QRContent}>
                <View style={styles.QRBox}>
                    {
                       this.state.dataSource.remarks4?(
                           <Image style={{marginTop:26,width:60,height:60,borderRadius:50,}} source={{uri: this.state.dataSource.headportraitimg}}/>
                       ):  <Image style={{marginTop:26,width:60,height:60,borderRadius:50,}} source={require('./../../../../images/mine/touxiang.png')} />
                    }
                    <Text style={{marginTop:15}}>{this.state.dataSource.name}</Text>
                    {
                       this.state.dataSource.remarks4?(
                           <Image style={styles.QRCodeImg} source={{uri: this.state.dataSource.remarks4}}/>
                       ): (null)
                    }
                    <Text style={{color:'#999999',fontSize:1}}>我的二维码</Text>
                    <Text style={{marginTop:30,marginBottom:10,fontSize:16,marginTop:52,marginBottom:20}}>邀请码</Text>
                    <Text style={{fontWeight:'bold'}}>{this.state.dataSource.usercode}</Text>
                </View>
            </Container>
         );
    }

 }
