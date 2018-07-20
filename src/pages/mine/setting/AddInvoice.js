/**
 * Created by juaner by 18-03-22
 */
import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import Swiper from 'react-native-swiper';
//import TabNavigator from 'react-native-tab-navigator';
import {
     Alert,
     TextInput ,
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
import global from './../../../js/global';

const Url = 'userInfo/taxInfo';
const UrlAdd ='userInfo/taxInfoAdd';
const UrlDelete = 'userInfo/taxInfoDel';
const UrlUpdate = 'userInfo/taxInfoUpdate'
export  default class AddInvoice extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("增票资质"),
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
            id:null,
            isnew:false,
            isSuccess:false,
            billHeadName:null,
            taxpayersNo:null, //身份证
            companyAdress:null,
            companyTel:null,
            companyBankName:null,
            coppnayCarid:null,
            showToast: false,
            loaded: true
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

    _next(routName,type){
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
          type: type,
        });
    }
    //思路：进入之后先判断是否有增票，如果有，就显示，如果没有，就新增：对应的按钮新增、修改和删除

    fetchData() {
        let params ={
            pageCurrent:1,
            pageSize:10,
        }
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log( res)
               if(res.code===500){
                    _this.setState({
                        isnew:true,
                        isSuccess:false
                    })
               }else if(res.code===0){
                    let data = null
                    let status = null
                    for(var i in  _this._data){
                        data = _this._data[0]
                        status = _this._data[0].status
                    }
                    _this.setState({
                        id:data.taxid,
                        billHeadName:data.billHeadName,
                        taxpayersNo:data.taxpayersNo,
                        companyAdress:data.companyAddress,
                        companyTel:data.companyTel,
                        companyBankName:data.compnayBankName,
                        coppnayCarid:data.coppnayCarid,
                    })
                    if(status===2){
                        _this.setState({
                            isSuccess:true
                        })
                    }else{
                        _this.setState({
                            isSuccess:false
                        })
                    }
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
                {
                    this.state.isSuccess===true?(
                       <View>
                           <View style={{backgroundColor:'#20a200',paddingLeft:15,paddingTop:11,paddingBottom:11, flexDirection:'row',alignItems:'center',}}><Image style={{marginRight:10,width:11.5,height:17.5}} source={require('./../../../../images/mine/lingdang.png')} /><Text style={[SettingStyle.font14,{color:'#fff'}]}>已通过审核</Text></View>
                           <View style={styles.realName}>
                                 <Item inlineLabel style={styles.inputRealName}>
                                      <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>单位名称</Text>
                                      <Input
                                           maxLength={50}
                                           value={this.state.billHeadName} style={SettingStyle.font14}
                                           disabled placeholder="请填写单位名称" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                       <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>纳税人识别号</Text>
                                       <Input
                                            maxLength={50} value={this.state.taxpayersNo} style={SettingStyle.font14} disabled
                                            placeholder="请填写纳税人识别号" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                    <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>注册地址</Text>
                                    <Input
                                         maxLength={50} value={this.state.companyAdress} style={SettingStyle.font14} disabled
                                         placeholder="请填写注册地址" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                     <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>注册电话</Text>
                                     <Input
                                          maxLength={25} value={this.state.companyTel} style={SettingStyle.font14} disabled
                                          placeholder="请填写注册电话" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                   <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>开户银行</Text>
                                   <Input
                                        maxLength={30} value={this.state.companyBankName} style={SettingStyle.font14} disabled
                                        placeholder="请填写开户银行" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                    <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>银行账号</Text>
                                    <Input
                                         maxLength={30} value={this.state.coppnayCarid} style={SettingStyle.font14} disabled
                                         placeholder="请填写银行账号" placeholderTextColor="#dadada"/>
                                 </Item>
                                 <Item inlineLabel style={styles.inputRealName}>
                                      <Text style={{color:'red',fontSize:12,marginTop:10,marginBottom:15}}>提示：本页面信息仅供增值税专用发票-资质审核使用，切勿进行 支付相关业务，谨防上当受骗。</Text>
                                 </Item>
                           </View>
                       </View>
                    ):(
                        <View style={styles.realName}>
                             <Item inlineLabel style={styles.inputRealName}>
                                  <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>单位名称</Text>
                                  <Input maxLength={50} value={this.state.billHeadName} style={SettingStyle.font14}
                                   onChangeText={(billHeadName) => this.setState({billHeadName})}
                                   placeholder="请填写单位名称" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                   <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>纳税人识别号</Text>
                                   <Input maxLength={50} value={this.state.taxpayersNo} style={SettingStyle.font14}
                                    onChangeText={( taxpayersNo) => this.setState({ taxpayersNo})}
                                    placeholder="请填写纳税人识别号" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>注册地址</Text>
                                <Input maxLength={50} value={this.state.companyAdress} style={SettingStyle.font14}
                                 onChangeText={( companyAdress) => this.setState({ companyAdress})}
                                 placeholder="请填写注册地址" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                 <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>注册电话</Text>
                                 <Input maxLength={20} value={this.state.companyTel} style={SettingStyle.font14}
                                  onChangeText={( companyTel) => this.setState({ companyTel})}
                                  keyboardType='phone-pad'
                                  placeholder="请填写注册电话" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                               <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>开户银行</Text>
                               <Input maxLength={30} value={this.state.companyBankName} style={SettingStyle.font14}
                                onChangeText={( companyBankName) => this.setState({ companyBankName})}
                                placeholder="请填写开户银行" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                <Text style={[SettingStyle.font14,{color:'#999',marginRight:25}]}>银行账号</Text>
                                <Input maxLength={30} value={this.state.coppnayCarid} style={SettingStyle.font14}
                                 onChangeText={( coppnayCarid) => this.setState({ coppnayCarid})}
                                 placeholder="请填写银行账号" placeholderTextColor="#dadada"/>
                             </Item>
                             <Item inlineLabel style={styles.inputRealName}>
                                  <Text style={{color:'red',fontSize:12,marginTop:10,marginBottom:15}}>提示：本页面信息仅供增值税专用发票-资质审核使用，切勿进行 支付相关业务，谨防上当受骗。</Text>
                             </Item>
                        </View>
                    )
                }
                {
                     this.state.isnew === true?(
                        <View style={{marginLeft:15,marginRight:15,marginTop:50}}>
                           <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                 <Button block style={{backgroundColor:'transparent'}} onPress={this.confirm}>
                                     <Text style={{color:'#fff',textAlign:'center'}}>确定</Text>
                                 </Button>
                           </ImageBackground>
                        </View>
                     ):null
                }
                {
                    this.state.isSuccess===false&&this.state.isnew === false?(
                        <View style={{marginLeft:55,marginRight:55,marginTop:50,flexDirection:'row'}}>
                              <Button bordered dark block style={{backgroundColor:'#fff',marginBottom:50,flex:1,marginRight:18}} onPress={()=>this.confirm(this.state.id)}>
                                  <Text>修改</Text>
                              </Button>
                              <Button bordered dark block style={{backgroundColor:'#fff',marginBottom:50,flex:1}} onPress={()=>this.deleteData(this.state.id)}>
                                  <Text>删除</Text>
                              </Button>
                        </View>
                    ):null
                }
             </ScrollView>
             </Container>
         );
    }

    confirm = (id) => {
        let _this = this

        if(!_this.state.billHeadName){
           Toast.info('请填写单位名称!')
           return
        }
        if(!_this.state.taxpayersNo){
           Toast.info('请填写纳税人识别号!')
           return
        }
        if(!_this.state.companyAdress){
           Toast.info('请填写注册地址!')
           return
        }
        if(!_this.state.companyTel){
           Toast.info('请填写注册电话!')
           return
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(_this.state.companyTel))) {
            return Toast.info('请输入正确的手机号')
        }
        if(!_this.state.companyBankName){
           Toast.info('请填写开户银行!');
           return
        }
        if(!_this.state.coppnayCarid){
           Toast.info('请填写银行账号!');
           return
        }
        let params ={
            taxId:id,
            userid:global.userId,
            billHeadName:_this.state.billHeadName,
            taxpayersNo:_this.state.taxpayersNo,
            companyAdress:_this.state.companyAdress,
            companyTel:_this.state.companyTel,
            companyBankName:_this.state.companyBankName,
            coppnayCarid:_this.state.coppnayCarid,
        }
        if(this.state.isnew === true){
            http.postData( UrlAdd,params,
               function(res){
                   if(res.code === 0){
                        Toast.info(res.object)
                       _this.goBack ()
                   }else{
                        Toast.info(res.object)
                   }
               }
            )
        }else{
            http.postData( UrlUpdate,params,
               function(res){
                   console.log(res)
                   if(res.code === 0){
                       Toast.info(res.object)
                       _this.goBack ()
                   }else{
                        Toast.info(res.object)
                   }
               }
            )
        }
    }

    deleteData = (id) => {
        let params ={
            taxId:id,
        }
        let _this = this;
        Modal.alert('温馨提示', ('确定删除吗？'), [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                    http.postData( UrlDelete,params,
                        function(res){
                            console.log(res)
                            if(res.code === 0){
                                Toast.info(res.object)
                                _this.goBack ()
                            }else{
                                Toast.info(res.object)
                            }
                        }
                    )
                }}
        ]);
    }

 }
