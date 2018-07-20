/**
 * Created by juaner by 18-03-22
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
     ImageBackground,
     TouchableOpacity,
     ViewPagerAndroid,
     ScrollView,
     TouchableHighlight,
}from 'react-native';
import { Toast,  WhiteSpace, WingBlank,  Modal,} from 'antd-mobile';
import LoginView from './../../common/LoginView'

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle';
import http from './../../../js/http';
import global from "../../../js/global";

const Url = 'user/updateUserInfo';

export  default class UserInfoChange extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '修改'+ navigation.state.params.Type ,
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
            Info:null,   //昵称
            mobile:null,
            password:null,
            code:null,
            ItemIndex:null,
            showToast: false,
            codeMsg:'获取验证码',
            loaded: true
        };
    }

    componentDidMount(){
        this.setState({
            Info:this.props.navigation.state.params.Info,
            ItemIndex:this.props.navigation.state.params.ItemIndex,
        })
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
//        this.fetchData();
    }

     goBack = () => {
        let _this = this
        const { goBack,navigate,state } = _this.props.navigation;
        let params ={
             name:_this.state.Info
        };
        if(_this.state.ItemIndex == 2){
            if(!_this.state.Info){
               Toast.info('请输入昵称！')
               return
            }
            http.postData( Url,params,
               function(res){
                   console.log(res)
                   if(res.code===0){
                       state.params.refresh(res.object.name);
                       Toast.info(res.msg,2, () => {
                           goBack ()
                       });
                   }

               }
            )
        }else{
            goBack ()
        }

    }

    render(){
        if (!this.state.loaded ) {
             return <LoginView/>
        }
        return this.renderView();
    }

    renderView() {
         return (
            <Container style={this.state.ItemIndex == 3||this.state.ItemIndex == 4?styles.contentChange:null}>
                {
                      this.state.ItemIndex == 2?(
                         <Form>
                             <InputGroup inlineLabel style={styles.inputF}>
                                 <Input value={this.state.Info} style={SettingStyle.font14}
                                  onChangeText={(Info) => this.setState({Info})}
                                  maxLength={25}
                                  placeholder="修改昵称" placeholderTextColor="#dadada"/>
                              </InputGroup>
                         </Form>
                      ):(
                        this.state.ItemIndex == 3?(
                            <Form>
                                 <InputGroup inlineLabel style={styles.input} >
                                    <View style={styles.borderRight}>
                                        <Image  source={require('./../../../../images/mine/dianhua.png')} style={styles.iconImg}/>
                                    </View>
                                    <Input
                                       placeholder="请输入手机号" placeholderTextColor="#dadada"
                                       keyboardType='phone-pad' style={SettingStyle.font14}
                                       maxLength={20}
                                       onChangeText={(mobile) => this.setState({mobile})}
                                    />
                                 </InputGroup>
                                 <InputGroup inlineLabel style={styles.inputCenter}>
                                     <View style={styles.borderRight}>
                                         <Image  source={require('./../../../../images/mine/shoujiyanzhengma.png')} style={styles.iconImg} />
                                     </View>
                                     <Input
                                         maxLength={8}
                                         onChangeText={(code) => this.setState({code})} style={SettingStyle.font14}
                                         placeholder="请输入验证码" placeholderTextColor="#dadada"/>
                                         <Button small  bordered dark style={styles.borderedButton} onPress={()=>this._code()} >
                                             <Text style={SettingStyle.font14}> {this.state.codeMsg} </Text>
                                         </Button>
                                 </InputGroup>
                                 <InputGroup inlineLabel style={styles.input}>
                                     <View style={styles.borderRight} >
                                         <Image  source={require('./../../../../images/mine/yaoshi.png')} style={styles.iconImg}/>
                                     </View>
                                     <Input
                                         maxLength={10}
                                         secureTextEntry={true} style={SettingStyle.font14}
                                         onChangeText={(password) => this.setState({password})}
                                         placeholder="请输入新密码" placeholderTextColor="#dadada"/>
                                 </InputGroup>
                            </Form>
                        ):(
                            <Form>
                                  <InputGroup inlineLabel style={styles.input}>
                                     <View style={styles.borderRight}>
                                         <Image  source={require('./../../../../images/mine/dianhua.png')} style={styles.iconImg}/>
                                     </View>
                                     <Input placeholder="请输入新的手机号"
                                         placeholderTextColor="#dadada"
                                         maxLength={20}
                                         keyboardType='phone-pad' style={SettingStyle.font14}
                                         onChangeText={(mobile) => this.setState({mobile})}/>
                                  </InputGroup>
                                  <InputGroup inlineLabel style={styles.input}>
                                      <View style={styles.borderRight}>
                                          <Image  source={require('./../../../../images/mine/shoujiyanzhengma.png')} style={styles.iconImg}/>
                                      </View>
                                      <Input
                                        maxLength={8}
                                        placeholder="请输入验证码" placeholderTextColor="#dadada" style={SettingStyle.font14}
                                        onChangeText={(code) => this.setState({code})}/>
                                      <Button small bordered dark style={styles.borderedButton}>
                                          <Text style={SettingStyle.font14}> {this.state.codeMsg} </Text>
                                      </Button>
                                  </InputGroup>
                            </Form>
                        )
                      )
                }
                {
                   this.state.ItemIndex == 3||this.state.ItemIndex == 4?(
                      <View style={{marginLeft:15,marginRight:15,marginTop:75}}>
                           <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                 <Button block style={{backgroundColor:'transparent'}} onPress={this.confirm}>
                                       <Text style={{color:'#fff',textAlign:'center'}}>完成</Text>
                                 </Button>
                           </ImageBackground>
                       </View>
                   ):null
                }
            </Container>
         );
    }

    //DES加密
    encryptByDES(message, key) {
        var CryptoJS = require("crypto-js");
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    _code () {
        if (this.state.mobile == null || !this.state.mobile){
            // return Toast.info('请输入手机号！')
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
            // return Toast.info('请输入正确的手机号！')
        }else {
            let data = {};
            //DES加密
            data.mobileEncrypt = encodeURIComponent(this.encryptByDES(this.state.mobile,'mdi1f84h60gj68e3hdkgt74gg13``》《《《《*&&*****./,..,y'));

            //赋值
            data.mobile = this.state.mobile;
            if (Platform.OS == 'android') {
                data.driverName = 2;
            }else if(Platform.OS == 'ios'){
                data.driverName = 1;
            }
            this.fetchCode(data);
        }
    };
    //手机验证码接口
    fetchCode(data){
        console.log(data);
        return fetch( Util.Path + 'user/getMobileCode?mobile=' + data.mobile + '&mobileEncrypt='
            + data.mobileEncrypt +  '&type=3' + '&driverName=' + data.driverName + '&userId=' + global.login.userId,{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded"
            },
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            if(responseJson.code == 0){
                Toast.info('验证码已发送请注意查收');
                let that = this;
                let timer = setInterval(function () {
                    let codeTime = that.state.codeTime - 1;
                    that.setState({
                        codeMsg:codeTime + 'S后重新获取'
                    });
                    if(that.state.codeTime===0){
                        clearInterval(timer);
                        that.setState({
                            codeMsg:'获取验证码',
                            codeTime:60
                        });
                    }
                }, 1000);
            }else {
                Toast.info(responseJson.msg)
            }
        })
        .catch(function(err){
            Toast.info('发送失败请检查网络设置')
            console.log("Fetch错误:"+err);
        });
    }

    confirm = () => {
        if(this.state.ItemIndex ===3 ){
            if (this.state.mobile == null || !this.state.mobile){
                return Toast.info('请输入手机号！')
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
                return Toast.info('请输入正确的手机号！')
            }
            if(!this.state.code){
               Toast.info('请输入验证码！')
               return
            }
            if(!this.state.password){
               Toast.info('请输入新密码！')
               return
            }
            this.state.password  = encodeURIComponent(this.encryptByDES(this.state.password,'DES_KEY_PASSWORD'));
            fetch( Util.Path + 'user/pwdUpdate?mobile=' + this.state.mobile + '&msgcode='
                + this.state.code + '&password=' + this.state.password ,{
                method:"post",
                headers:{
                    "Content-type":"application:/x-www-form-urlencoded"
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.code == 0){
                        Toast.info(responseJson.msg);
                        const { goBack,navigate,state } = this.props.navigation;
                        goBack()
                    }else{
                        Toast.info(responseJson.msg);
                    }
                })
                .catch(function(err){
                    console.log("Fetch错误:"+err);
                });
        }
        if(this.state.ItemIndex ===4 ){
            if (this.state.mobile == null || !this.state.mobile){
                return Toast.info('请输入手机号！')
            }
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
                return Toast.info('请输入正确的手机号！')
            }
            if(!this.state.code){
               Toast.info('请输入验证码！');
               return
            }
            fetch( Util.Path + 'user/mobileUpdate?mobile=' + this.state.mobile + '&msgcode='
                + this.state.code + '&id=' + global.login.userId + '&userType=0' ,{
                method:"post",
                headers:{
                    "Content-type":"application:/x-www-form-urlencoded"
                },
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    if(responseJson.code == 0){
                        Toast.info(responseJson.msg);
                        const { goBack,navigate,state } = this.props.navigation;
                        goBack()
                    }else{
                        Toast.info(responseJson.msg);
                    }
                })
                .catch(function(err){
                    console.log("Fetch错误:"+err);
                });
        }
    }

 }
