/**
 * Created by juaner by 18-03-22
 */
import React, { Component } from 'react';
import { Container,Button, Text ,Item,Input} from 'native-base';
import {
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Toast,  WhiteSpace, WingBlank,  Modal,} from 'antd-mobile';

import LoginView from './../../common/LoginView'
import http from './../../../js/http';
import global from './../../../js/global';
import SettingStyle from './../../../js/SettingStyle';
import styles from '../MineStyle'

const Url = 'user/userInfos';
const realNameAuthentication = 'user/realNameAuthentication';

export  default class Certification extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("实名认证"),
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
            username:null,
            businessType:null,
            identity:null, //身份证
            idcardimg1:null,
            idcardimg2:null,
            manageClasses:null,
            businesslicenseimg:null,
            bankCard:null,
            isIdentification:null,  // 用户认证类型(0,未认证，1：已申请 2：已认证 3：认证未通过) ,
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
         const { goBack } = this.props.navigation
         goBack ()
    }

    _next(routName,type){
        let _this = this
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
          type: type,
          refresh: function (res) {
              if(res.id===1){
                  _this.setState({
                      idcardimg1:res.data1,
                      idcardimg2:res.data2,
                  });
              }else if(res.id===2){
                  _this.setState({
                      businesslicenseimg:res.data,
                  });
              }else if(res.id===3){
                  _this.setState({
                      manageClasses:res.data,
                  });
              }
          }
        });
    }

    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log(res.object)
               _this.setState({
                   loaded: true,
               });
               for(let i in _this._data ){
                    _this.setState({
                       dataSource: _this._data[0],
                       loaded: true,
                       isIdentification:_this._data[0].identification,
                       username:_this._data[0].realname,
                       identity:_this._data[0].idcard,
                       bankCard:_this._data[0].remarks1,
                       idcardimg1:_this._data[0].idcardimg1,
                       idcardimg2:_this._data[0].idcardimg2,
                       businesslicenseimg:_this._data[0].businesslicenseimg,
                       manageClasses:_this._data[0].manageClasses
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
            <Container>
              <ScrollView>
                <Text style={[SettingStyle.font14,{marginLeft:15,marginTop:15,marginBottom:11}]}>个人信息<Text style={[SettingStyle.font14,{color:'#999'}]}>（必填项）</Text></Text>
                {
                   this.state.isIdentification === 2 ? (
                       <View style={styles.realName}>
                            <Item inlineLabel style={styles.inputRealName}>
                                 <Input value={this.state.username} style={SettingStyle.font14}
                                  disabled placeholderTextColor="#dadada"/>
                            </Item>
                            <Item inlineLabel style={styles.inputRealName}>
                                  <Input value={this.state.identity} style={SettingStyle.font14}
                                   disabled placeholderTextColor="#dadada"/>
                            </Item>
                            <Item inlineLabel style={styles.inputRealName}>
                               <Input value={this.state.bankCard} style={SettingStyle.font14}
                                disabled placeholderTextColor="#dadada"/>
                            </Item>
                            <TouchableOpacity onPress={()=>this._next('UploadRealNameInfo','上传证件')}
                                 style={styles.settinglistItem}>
                              <Text style={ SettingStyle.font14 }>查看身份证</Text>
                              <Image source={require('./../../../../images/mine/gengduo.png')} />
                            </TouchableOpacity>
                       </View>
                   ):(
                        <View style={styles.realName}>
                             <Item inlineLabel style={styles.inputRealName}>
                                  <Input
                                      value={this.state.username} style={SettingStyle.font14}
                                       maxLength={25}
                                       onChangeText={(username) => this.setState({username})}
                                       placeholder="请填写姓名" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                   <Input
                                        maxLength={18}
                                        value={this.state.identity} style={SettingStyle.font14}
                                        onChangeText={( identity) => this.setState({ identity})}
                                        placeholder="请填写身份证号" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                <Input
                                     maxLength={30}
                                     value={this.state.bankCard} style={SettingStyle.font14}
                                     onChangeText={( bankCard) => this.setState({ bankCard})}
                                     placeholder="请填写银行卡号" placeholderTextColor="#dadada"/>
                             </Item>
                             <TouchableOpacity onPress={()=>this._next('UploadRealNameInfo','上传证件')}
                                  style={styles.settinglistItem}>
                               <Text style={ SettingStyle.font14}>上传身份证</Text>
                               <Image source={require('./../../../../images/mine/gengduo.png')} />
                             </TouchableOpacity>
                        </View>
                   )
                }

                <Text style={[SettingStyle.font14,{marginLeft:15,marginTop:15,marginBottom:11}]}>店铺信息<Text style={[SettingStyle.font14,{color:'#999'}]}>（非必填项）</Text></Text>
                <View style={styles.realName}>
                     <TouchableOpacity onPress={()=>this._next('UploadRealNameInfo','经营主类')}
                             style={styles.settinglistItem}>
                          <Text style={ SettingStyle.font14 }>经营主类</Text>
                          <Image source={require('./../../../../images/mine/gengduo.png')} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>this._next('UploadRealNameInfo','上传营业执照')}
                              style={styles.settinglistItem}>
                           <Text style={ SettingStyle.font14 }>上传营业执照</Text>
                           <Image source={require('./../../../../images/mine/gengduo.png')} />
                     </TouchableOpacity>
                </View>
                {
                     !this.state.isIdentification || this.state.isIdentification===0?(
                        <View style={{marginLeft:15,marginRight:15,marginTop:75}}>
                            <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                  <Button block style={{backgroundColor:'transparent'}} onPress={this.confirm}>
                                        <Text style={{color:'#fff',textAlign:'center'}}>提交</Text>
                                  </Button>
                            </ImageBackground>
                        </View>
                     ):(
                        this.state.isIdentification === 1?(
                            <View style={{marginLeft:15,marginRight:15,marginTop:75}}>
                                  <Button block disabled>
                                        <Text style={{color:'#fff',textAlign:'center'}}>已申请</Text>
                                  </Button>
                            </View>
                        ):(
                            this.state.isIdentification === 3?(
                                <View style={{marginLeft:15,marginRight:15,marginTop:75}}>
                                    <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                          <Button block style={{backgroundColor:'transparent'}} onPress={this.confirm}>
                                                <Text style={{color:'#fff',textAlign:'center'}}>重新提交</Text>
                                          </Button>
                                    </ImageBackground>
                                </View>
                            ):null
                        )
                     )
                }
              </ScrollView>
            </Container>
         );
    }

    confirm = () => {
        let _this = this
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!_this.state.username){
           Toast.info('请填写姓名！');
           return
        }
        if(!_this.state.identity){
            Toast.info('请填写身份证号！');
            return
        }
        if(!reg.test(_this.state.identity)){
            Toast.info('请填写正确的身份证号！');
            return
        }
        if(!_this.state.bankCard){
            Toast.info('请填写银行卡号！');
            return
        }
        let params ={
            realname:_this.state.username,
            idcard:_this.state.identity,
            bankCardNumber:_this.state.bankCard,
            idcardimg1:_this.state.idcardimg1,
            idcardimg2:_this.state.idcardimg2,
            manageClasses:_this.state.manageClasses,
            businesslicenseimg:_this.state.businesslicenseimg,
        };
        console.log(params)
        http.PutData( realNameAuthentication,params,
            function(res){
                console.log(res)
                if(res.code===0){
                    Toast.info('已认证！');
                    _this.goBack()
                }else {
                    Toast.info(res.msg);
                }
            })
    }

 }
