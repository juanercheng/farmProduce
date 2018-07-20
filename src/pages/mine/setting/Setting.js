/**
 * Created by juaner by 18-03-18
 */
import React, { Component } from 'react';
import { Container, Button, Spinner, Text } from 'native-base';
import {
    View,
    Platform,
    Image,
    Linking,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import { Toast,  WhiteSpace, WingBlank,  Modal,} from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import styles from '../MineStyle'
import http from './../../../js/http';
import global from './../../../js/global';

const Url = 'user/userInfos';
const UrlUpdate = 'cfg/findNewInfVersionInfoEntity';

export  default class Setting extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("设置"),
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

    constructor(props,context){
        super(props, context);
        this.state = {
            dataSource: null,
            notice:true,
            device:null,
            message:null,
            versioncode:null,
            spinnerShow:false ,
            storage:'0',
            tags:null,
            loaded: false,
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
                navigatePressBack:this.goBack,
        });
        if (Platform.OS === 'ios') {
              this.setState({
                 device:'ios',
                 message:'AppStore'
              });
        } else {
              this.setState({
                 device:'android',
                 message:'应用市场'
              });
        }
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

    fetchData() {
        let params ={userids:global.login.userId};
        let data ={device:this.state.device};
        let _this = this;
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
        );
        http.postData( UrlUpdate,data,
           function(res){
               _this._data = res.object;
               if(_this._data ){
                   _this.setState({
                       versioncode : _this._data.versioncode,
                       downloadurl : _this._data.downloadurl
                   });
               }
           }
        )
    }

    render(){
        return this.renderView();
    }

    renderView() {
         return (
            <Container>
                <ScrollView>
                    {
                        global.login.token?(
                            <View style={styles.settingList}>
                                <View>
                                    <TouchableOpacity onPress={()=>this._next('UserInfo')}
                                    >
                                        {this.state.dataSource?(
                                            <View style={[styles.settinglistItem,{paddingTop:0,paddingBottom:0}]} >
                                                <View style={{flexDirection:'row',alignItems:'center',marginBottom:7.5}}>
                                                    {
                                                        this.state.dataSource.headportraitimg?(
                                                            <Image style={styles.infoImg} source={{uri:this.state.dataSource.headportraitimg}}/>
                                                        ):  <Image style={styles.infoImg} source={require('./../../../../images/mine/touxiang.png')} />
                                                    }
                                                    <Text style={{fontSize:12}}>{this.state.dataSource.name} </Text>
                                                </View>
                                                <Image source={require('./../../../../images/mine/gengduo.png')} />
                                            </View>
                                        ):(
                                            <View style={[styles.settinglistItem,{paddingTop:0,paddingBottom:0}]} >
                                                <View style={{flexDirection:'row',alignItems:'center',marginBottom:7.5}}>
                                                    <Image style={styles.infoImg} source={require('./../../../../images/mine/touxiang.png')} />
                                                    <Text style={{fontSize:12}}></Text>
                                                </View>
                                                <Image source={require('./../../../../images/mine/gengduo.png')} />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={()=>this._next('Address','管理收货地址')}  style={styles.settinglistItem}>
                                    <Text style={ SettingStyle.font14 }>我的收货地址</Text>
                                    <Image source={require('./../../../../images/mine/gengduo.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this._next('Certification')}  style={styles.settinglistItem}>
                                    <Text style={ SettingStyle.font14 }>实名认证</Text>
                                    <Image source={require('./../../../../images/mine/gengduo.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this._next('AddInvoice')}  style={styles.settinglistItem}>
                                    <Text style={ SettingStyle.font14 }>增票资质</Text>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#999',fontSize:12,marginRight:10}}>添加增票资质</Text>
                                        <Image source={require('./../../../../images/mine/gengduo.png')} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ):null
                    }
                    <View style={styles.settingList}>
                        {
                            global.login.token?<TouchableOpacity onPress={()=>this._next('Feedback')}  style={styles.settinglistItem}>
                                <Text style={ SettingStyle.font14 }>意见反馈</Text>
                                <Image source={require('./../../../../images/mine/gengduo.png')} />
                            </TouchableOpacity>:null
                        }
                        <TouchableOpacity onPress={this.showAlert.bind(this)}  style={styles.settinglistItem}>
                            <Text style={ SettingStyle.font14 }>清除缓存</Text>
                            <Text style={ SettingStyle.font14 }>{this.state.storage}M</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.Update()} >
                            {
                                this.state.versioncode?(
                                     <View  style={styles.settinglistItem}><Text style={ SettingStyle.font14 }>软件更新</Text><Text style={ SettingStyle.font14 }>{this.state.versioncode}</Text></View>
                                ):(
                                     <View  style={styles.settinglistItem}><Text style={ SettingStyle.font14 }>软件更新</Text><Text style={ SettingStyle.font14 }></Text></View>
                                )
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this._next('About')}  style={styles.settinglistItem}>
                            <Text style={ SettingStyle.font14 }>关于我们</Text>
                            <Image source={require('./../../../../images/mine/gengduo.png')} />
                        </TouchableOpacity>
                    </View>
                    {
                        global.login.token?<View style={{marginLeft:15,marginRight:15,marginTop:50}}>
                            <Button bordered dark block onPress={this.LogOut.bind(this)}
                                    style={{backgroundColor:'#fff',marginBottom:50}}>
                                <Text>退出</Text>
                            </Button>
                        </View>:null
                    }
                    {
                        this.state.spinnerShow ?
                            <Spinner color='blue' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
                        :null
                    }

                </ScrollView>
               </Container>
         );
    }

    Update(){
        Modal.alert('温馨提示', (this.state.versioncode), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    Linking.canOpenURL(this.state.downloadurl).then(supported => {
                        if (!supported) {
                            this.popup.alert('请先安装'+this.state.message)
                        } else {
                            return Linking.openURL(this.state.downloadurl);
                        }
                    }).catch(err => console.error('An error occurred', err));
                }}
        ]);
    }

    showAlert() {
        Modal.alert('温馨提示', ('确定要清除吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    // this.clearCacheSize()
                }}
        ]);
    }

    LogOut() {
        Modal.alert('温馨提示', ('确定要退出吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    global.login.token = ''
                    DeviceEventEmitter.emit('islogin',global.login.token);
                    this.refs.toast.show('已成功退出登录');
                    this.goBack()
                }}
        ]);
    }

 }
