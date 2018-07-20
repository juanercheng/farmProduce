/**
 * Created by yangHL on 2018/3/16.
 */
import React, { Component } from 'react';

import { Container,InputGroup, Left, Body, Right, Button, Footer, FooterTab,Title, Text ,Icon,Input} from 'native-base'
import styles from './styles'
import px2dp from './../../../js/px2dp'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    ImageBackground, DeviceEventEmitter
} from 'react-native';
import Util from "../../../js/util";
import global from './../../../js/global'
import './../../../js/storage'
import Toast, {DURATION} from 'react-native-easy-toast'
import LuckDraw from "../luckDraw/luckDraw";
// import { Popover } from 'antd-mobile';
// const Item = Popover.Item;

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            mobile:null,
            password:null
        };
    }
    componentDidMount(){
        console.log(storage)
    };
    //第三方登录
    _otherButton(other){
        console.log(other)
        const navigation = this.props.navigation;
        navigation.navigate('authorization');
    }
    //注册或登录
    _signUpOrForget(name){
        const navigation = this.props.navigation;
        navigation.navigate(name);
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
    //登录
    _login(){
        let data = {};
        data.mobile = this.state.mobile;
        data.password = this.state.password;
        console.log(data);
        if (this.state.mobile == null || !this.state.mobile){
            return this.refs.toast.show('请输入手机号');
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
            return this.refs.toast.show('请输入正确的手机号')
        }
        if (this.state.password == null || !this.state.password){
            return this.refs.toast.show('请输入密码');
        }else {
            data.password = encodeURIComponent(this.encryptByDES(this.state.password,'DES_KEY_PASSWORD'));
            console.log(data)
            this.fetchData(data);
            this.refs.toast.show('正在登录...', DURATION.FOREVER);
        }
    }
    //登录接口
    fetchData(data){
        return fetch( Util.Path + 'user/login?mobile=' + data.mobile + '&userType=0&password=' + data.password,{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded",
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.refs.toast.close();
                console.log(responseJson,111);
                if(responseJson.code == 0){
                    let token = responseJson.object.token;
                    let userId = responseJson.object.userid;
                    let mobile = responseJson.object.mobile;
                    console.log(token,'这里是登录过后的token');
                    storage.save({
                        key: 'token',  // 注意:请不要在key中使用_下划线符号!
                        data: token,
                    });
                    storage.save({
                        key: 'userId',  // 注意:请不要在key中使用_下划线符号!
                        data: userId,
                    });
                    global.login.mobile = mobile;
                    global.login.token = token;
                    global.login.userId = userId;
                    
                    console.log(global.login.token);
                    this.refs.toast.show(responseJson.msg);
                    const navigation = this.props.navigation;
                    navigation.navigate('Home');
                }else {
                    this.refs.toast.show(responseJson.msg)
                }
            })
            .catch(function(err){
                console.log("Fetch错误:"+err);
            });
    }
    //跳转到抽奖转盘
    _luck(){
        const navigation = this.props.navigation;
        navigation.navigate('LuckDraw');
    }
    render() {
        // let overlay = [1, 2, 3].map((i, index) => (<Item key={index} value={`option ${i}`}><Text>option {i}</Text></Item>));
        // overlay = overlay.concat([
        //     <Item key="4" value="disabled" disabled><Text style={{ color: '#ddd' }}>disabled opt</Text></Item>,
        //     <Item key="6" value="button ct" style={{ backgroundColor: '#efeff4' }}><Text>关闭</Text></Item>,
        // ]);
        return (

            <Container style={styles.Container}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                    // fadeOutDuration={2000}
                />
                {/*<View style={styles.title}>*/}
                    {/**/}
                {/*</View>*/}
                {/*<View>*/}
                    {/*<View>*/}
                        {/*<Text style={{ marginTop: 30, marginLeft: 100 }}>选择了：{this.state.selected}</Text>*/}
                    {/*</View>*/}
                    {/*<View style={styles.menuContainer}>*/}
                        {/*<Popover ref="mc" name="m" style={{ backgroundColor: '#eee' }} overlay={overlay} contextStyle={styles.contextStyle} overlayStyle={[styles.overlayStyle, Platform.OS === 'android' && styles.androidOverlayStyle]} triggerStyle={styles.triggerStyle} onSelect={this.onSelect}>*/}
                            {/*<Text>菜单</Text>*/}
                        {/*</Popover>*/}
                    {/*</View>*/}
                {/*</View>*/}
                <Image source={require('./../../../../images/login/denglujiemian.png')}/>
                <View style={styles.input}>
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
                            <Image source={require('./../../../../images/login/suo.png')}/>
                        </View>
                        <Input placeholder="请输入密码"
                               onChangeText={(password) => this.setState({password})}
                               placeholderTextColor="#888888"
                               secureTextEntry={true}
                               ref="bottomInput"/>
                    </InputGroup>
                </View>
                <View style={styles.jump}>
                    <Text style={{fontSize:12}} onPress={()=>this._signUpOrForget('signUp')}>注册</Text>
                    <Text style={{fontSize:12}} onPress={()=>this._signUpOrForget('forget')}>忘记密码</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={()=>this._login()} style={{marginTop:'10%'}}>
                    <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                     style={[styles.loginButton,{height:50,alignItems:'center',justifyContent:'center'}]}>
                            <Text style={{color:'#fff',fontSize:15}}>登录</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                </View>
                <View style={styles.other}>
                    <Text style={{height:1,width:'30%',backgroundColor:'#dcdcdc'}}></Text>
                    <TouchableOpacity onPress={()=>this._luck()}>
                        <Text style={{fontSize:15,color:'#dcdcdc'}}>第三方登录</Text>
                    </TouchableOpacity>
                    <Text style={{height:1,width:'30%',backgroundColor:'#dcdcdc'}}></Text>
                </View>
                <View style={styles.other}>
                    <TouchableOpacity onPress={()=>this._otherButton('微信')}>
                        <Image source={require('./../../../../images/login/weixin.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._otherButton('微博')}>
                        <Image source={require('./../../../../images/login/weibo.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._otherButton('QQ')}>
                        <Image source={require('./../../../../images/login/QQ.png')}/>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}