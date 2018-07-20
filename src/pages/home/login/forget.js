/**
 * Created by yangHL on 2018/3/16.
 */
import React, { Component } from 'react';
import { Container,InputGroup, Left, Body, Right, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base'
import styles from './styles'
import px2dp from './../../../js/px2dp'
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import Util from "../../../js/util";
import Toast, {DURATION} from 'react-native-easy-toast'
import SettingStyle from "../../../js/SettingStyle";

export default class forget extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (""),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTitleStyle: {
            color: "#000",
            alignSelf:'center'
        },
        headerTintColor:"#000",
        tabBarVisible: false,
        headerLeft:(
            <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight: (
            <View>

            </View>
        )
    })
    constructor(props){
        super(props);
        this.state = {
            mobile:null,
            newPassword:null,
            code:null,
            chartCode:null,
            codeS:true,
            codeTime:60
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
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
    //获取验证码
    _code(){
        if (this.state.mobile == null || !this.state.mobile){
            return this.refs.toast.show('请输入手机号');
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
            return this.refs.toast.show('请输入正确的手机号')
        }else {
            this.setState({
                codeS:!this.state.codeS
            });
            let that = this;
            let timer = setInterval(function () {
                let codeTime = that.state.codeTime - 1;
                that.setState({
                    codeTime:codeTime
                });
                if(that.state.codeTime===0){
                    clearInterval(timer);
                    that.setState({
                        codeS:!that.state.codeS,
                        codeTime:60
                    });
                }
            }, 1000);
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
            data.type = 2;
            this.fetchCode(data);
        }
    }
    //手机验证码接口
    fetchCode(data){
        return fetch( Util.Path + 'user/getMobileCode?mobile=' + data.mobile + '&mobileEncrypt='
            + data.mobileEncrypt +  '&type=' + data.type + '&driverName=' + data.driverName,{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // this.refs.toast.close();
                if(responseJson.code == 0){
                    this.refs.toast.show('验证码已发送请注意查收');
                }else {
                    this.refs.toast.show(responseJson.msg)
                }
                console.log(responseJson);
            })
            .catch(function(err){
                this.refs.toast.show('发送失败请检查网络设置');
                console.log("Fetch错误:"+err);
            });
    }

    _login(){
        let dataForget = {};
        dataForget.mobile = this.state.mobile;
        dataForget.code = this.state.code;
        dataForget.newPassword = this.state.newPassword;
        if (this.state.mobile == null  || !this.state.mobile){
            return this.refs.toast.show('请输入手机号');
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
            return this.refs.toast.show('请输入正确的手机号')
        }
        if (this.state.code == null  || !this.state.code){
            return this.refs.toast.show('请输入验证码');
        }
        if (this.state.newPassword == null  || !this.state.newPassword){
            return this.refs.toast.show('请输入新密码');
        }
        else{
            //密码DES加密
            dataForget.newPassword = encodeURIComponent(this.encryptByDES(this.state.password,'DES_KEY_PASSWORD'));
            this.fetchSignUp(dataForget);
            this.refs.toast.show('正在修改', DURATION.FOREVER);
        }
    }
    //忘记密码接口
    fetchSignUp(data){
        return fetch( Util.Path + 'user/pwdForget?mobile=' + data.mobile + '&msgcode='
            + data.code + '&newPassword=' + data.newPassword + '&userType=0',{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded"
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.refs.toast.close();
                if(responseJson.code == 0){
                    this.refs.toast.show(responseJson.object);
                    const { navigate } = this.props.navigation;
                    navigate( 'Login' )
                }else{
                    this.refs.toast.show(responseJson.msg);
                }
            })
            .catch(function(err){
                console.log("Fetch错误:"+err);
            });
    }




    render() {
        return (
            <Container style={styles.Container}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                />
                <View style={styles.titleOther}>
                    <Text style={styles.titleName}>忘记密码</Text>
                </View>
                <View style={styles.forgetInput}>
                    <InputGroup>
                        <View style={styles.imageLogin}>
                            <Image source={require('./../../../../images/login/dianhua.png')}/>
                        </View>
                        <Input placeholder="请输入手机号码"
                               onChangeText={(mobile) => this.setState({mobile})}
                               keyboardType='phone-pad'
                               placeholderTextColor="#888888"/>
                    </InputGroup>
                    <InputGroup>
                        <View style={styles.imageLogin}>
                            <Image source={require('./../../../../images/login/yaoshi.png')}/>
                        </View>
                        <Input placeholder="请输入验证码"
                               onChangeText={(code) => this.setState({code})}
                               placeholderTextColor="#888888"
                               ref="bottomInput"/>
                        {
                            this.state.codeS?
                                <TouchableOpacity onPress={()=>this._code()} style={{borderWidth:1,borderColor:'#000',borderRadius:3}}>
                                    <Text style={{padding:2,fontSize:12}}>获取验证码</Text>
                                </TouchableOpacity>:
                                <TouchableOpacity onPress={()=>this._code()} style={{borderWidth:1,borderColor:'#dcdcdc',borderRadius:3}}>
                                    <Text style={{padding:2,fontSize:12,color:'#dcdcdc'}}>{this.state.codeTime}s后重新获取</Text>
                                </TouchableOpacity>
                        }

                    </InputGroup>
                    <InputGroup>
                        <View style={styles.imageLogin}>
                            <Image source={require('./../../../../images/login/suo.png')}/>
                        </View>
                        <Input placeholder="请输入新密码"
                               onChangeText={(newPassword) => this.setState({newPassword})}
                               placeholderTextColor="#888888"
                               secureTextEntry={true}
                               ref="bottomInput"/>
                    </InputGroup>
                    <View>
                        <TouchableOpacity style={{borderRadius:10,marginTop:'10%'}} onPress={() => this._login()}>
                            <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                             style={{
                                                 height: 50,
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 borderRadius:50
                                             }}>
                                <Text style={{color: '#fff'}}>登录</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}