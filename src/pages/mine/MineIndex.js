/**
 * Created by juaner by 18-03-15
 */
import React, { Component } from 'react';
import { Container,  Button,Text } from 'native-base';
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    DeviceEventEmitter,
} from 'react-native';
import { Toast, WhiteSpace, WingBlank } from 'antd-mobile';
import SettingStyle from './../../js/SettingStyle';
import styles from './MineStyle'
import http from './../../js/http';
import global from './../../js/global';

const Url = 'user/userInfos';

export  default class MineIndex extends Component{
    static navigationOptions = ({ navigation }) => ({
        header:null
    });

    constructor(props){
        super(props);
        this.state = {
            dataSource: null,
            loaded: false,
            islogin:true
        };
    }

    componentDidMount(){
        // DeviceEventEmitter.addListener('islogin',(value)=>{
        //     this.setState({
        //         islogin:value,
        //     })
        // });
        DeviceEventEmitter.addListener('navigatorBack', () => {
            Toast.hide();
        });
        storage.load({
            key: 'token',
        }).then(ret => {
            if (ret){
                this.setState({
                    islogin:true,
                })
            }
        });
        this.fetchData();
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('navigatorBack');
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    _next(routName,page){
        const navigation = this.props.navigation;
        navigation.navigate(routName,{
            page:page
        });
    }

    goLogin(){
        Toast.info('请先登录！');
        this._next('Login')
    }

    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log(res.object)
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
        return this.renderView();
    }

    renderView() {
         return (
            <Container>
                <ImageBackground style={styles.titleBox}
                        source={require('./../../../images/mine/gerenzhongxinbeijing.png')} resizeMode='cover'>
                    <View style={styles.title}>
                       <Text style={{flex:1}}></Text>
                       <Text style={{color:'#fff',textAlign:'center',flex:6,fontSize:18}}>个人中心</Text>
                       <TouchableOpacity onPress={()=>this._next('Setting')}><Text style={styles.setting}>设置</Text></TouchableOpacity>
                    </View>
                    {this.state.dataSource && this.state.islogin?(
                        <View style={styles.infoBox}>
                            <View style={styles.info}>
                               {
                                  this.state.dataSource.headportraitimg?(
                                      <Image style={styles.infoImg} source={{uri: this.state.dataSource.headportraitimg}}/>
                                  ):  <Image style={styles.infoImg} source={require('./../../../images/mine/touxiang.png')} />
                               }
                               <Text style={[styles.write,SettingStyle.font14]}>{this.state.dataSource.name}</Text>
                            </View>
                            <Button transparent onPress={()=>this._next('Member')}><Text style={styles.integral}>{this.state.dataSource.memberCardLevel?this.state.dataSource.memberCardLevel:'暂无会员等级'}</Text></Button>
                        </View>
                    ):(
                         <View style={styles.infoBox}>
                            <View style={styles.info}>
                                <Image style={styles.infoImg} source={require('./../../../images/mine/touxiang.png')} />
                                <Text style={[styles.write,SettingStyle.font14]} onPress={()=>this._next('Login')}>点击登录</Text>
                            </View>
                         </View>
                    )}
                </ImageBackground>
                <View style={styles.navBox}>
                    <TouchableOpacity   onPress={()=>this.state.islogin?this._next('Collection'):null}>
                        <View style={styles.navItem}>
                           {this.state.dataSource && this.state.islogin?(
                              <Text style={[SettingStyle.fontRed,styles.NavNum]}>{this.state.dataSource.favoriteTotal}</Text>
                           ):<Text style={[SettingStyle.fontRed,styles.NavNum]}>0</Text>}
                           <Text style={{fontSize:13}}>我的收藏</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.state.islogin?this._next("Integral"):null}>
                        <View style={styles.navItem}>
                           {this.state.dataSource && this.state.islogin?(
                             <Text style={[SettingStyle.fontRed,styles.NavNum]}>{this.state.dataSource.remaindermoney}</Text>
                           ):<Text style={[SettingStyle.fontRed,styles.NavNum]}>0</Text>}
                           <Text style={{fontSize:13}}>我的积分</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.state.islogin?this._next("CouponTab"):null}>
                        <View style={styles.navItem}>
                         {this.state.dataSource && this.state.islogin?(
                             <Text style={[SettingStyle.fontRed,styles.NavNum]}>{this.state.dataSource.counpionsTotal}</Text>
                             ):<Text style={[SettingStyle.fontRed,styles.NavNum]}>0</Text>}
                           <Text style={{fontSize:13}}>优惠券</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.orderBox}>
                    <View style={styles.orderTitle}>
                       <Text style={SettingStyle.font14}>我的订单</Text>
                       <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',0):this.goLogin()} style={{flexDirection:'row',alignItems:'center',}}>
                            <Text style={[{color:'#999999'},SettingStyle.font14]}>查看更多订单  </Text>
                            <Image source={require('./../../../images/mine/gengduo.png')} />
                       </TouchableOpacity>
                    </View>
                    <View style={styles.orderItemBox}>
                        <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',1):null}>
                            <View style={styles.orderItem}>
                               <Image style={styles.navImg} source={require('./../../../images/mine/daifukuan.png')} />
                               <Text style={{fontSize:13}}>待付款</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',2):null}>
                            <View style={styles.orderItem}>
                               <Image style={styles.navImg} source={require('./../../../images/mine/daifahuo.png')} />
                               <Text style={{fontSize:13}}>待发货</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',3):null}>
                            <View style={styles.orderItem}>
                                <Image style={styles.navImg} source={require('./../../../images/mine/daishouhuo.png')} />
                                <Text style={{fontSize:13}}>待收货</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',4):null}>
                            <View style={styles.orderItem}>
                                 <Image style={styles.navImg} source={require('./../../../images/mine/daipingjia.png')} />
                                 <Text style={{fontSize:13}}>待评价</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.state.islogin?this._next('OrderIndex',5):null}>
                            <View style={styles.orderItem}>
                                 <Image style={styles.navImg} source={require('./../../../images/mine/tuikuanshouhou.png')} />
                                 <Text style={{fontSize:13}}>退货/售后</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>this._next("Distribution")} style={styles.ListBox}>
                    <View style={{flexDirection:'row',}}>
                        <Image style={styles.ListIcon} source={require('./../../../images/mine/fenxiaoka.png')} />
                        <Text style={SettingStyle.font14}>分销权益</Text>
                    </View>
                    <Image source={require('./../../../images/mine/gengduo.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this._next('Service')} style={[styles.ListBox,{marginTop:0}]}>
                    <View style={{flexDirection:'row',}}>
                        <Image style={styles.ListIcon} source={require('./../../../images/mine/lianxikefu.png')} />
                        <Text style={SettingStyle.font14}>联系客服</Text>
                    </View>
                    <Image source={require('./../../../images/mine/gengduo.png')} />
                </TouchableOpacity>
                {/*<Toast*/}
                    {/*ref="toast"*/}
                    {/*style={{backgroundColor:'#7f7f7f'}}*/}
                    {/*position='top'*/}
                    {/*positionValue={200}*/}
                    {/*fadeInDuration={150}*/}
                    {/*fadeOutDuration={2000}*/}
                    {/*opacity={0.8}*/}
                    {/*textStyle={{color:'#fff'}}*/}
                {/*/>*/}
            </Container>
         );
    }
 }
