/**
 * Created by juaner by 18-03-20
 */
import React, { Component } from 'react';
import { Container,   Button,Title, Text ,Icon,Item,Input} from 'native-base';
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
     DeviceEventEmitter,
     Switch
}from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import LoginView from './../LoginView'
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './AddressStyle'
import http from './../../../js/http'
import global from './../../../js/global'

export  default class AddAddress extends Component{

    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: navigation.state.params.Type+'收货地址',
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
        this.state = {
            dataSource: null,
            loaded: false,
            falseSwitchIsOn:false,  // 设置默认地址开关
            id:this.props.navigation.state.params.id || null,  //地址id
            consigneeName:this.props.navigation.state.params.consigneeName || null,
            mobile:this.props.navigation.state.params.mobile || null,
            defaults:this.props.navigation.state.params.defaults || 0,

            province: this.props.navigation.state.params.province ||  '',
            city:this.props.navigation.state.params.city || '',
            area:this.props.navigation.state.params.area || '',

            detailAddress:this.props.navigation.state.params.detailAddress || null,
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        });
        if(this.state.id){
            this.addressDetail()
        }
        DeviceEventEmitter.addListener('address',(dic)=>{
            this.setState({
                province:dic.province,
                city:dic.city,
                area:dic.area
            });

        });
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };

    _next(routName){
        const navigation = this.props.navigation;
        let _this = this
        if(this.state.falseSwitchIsOn){
            _this.state.defaults=1
        }else{
            _this.state.defaults=0
        }
        navigation.navigate(routName,{
            id:this.state.id,
            ids:this.props.navigation.state.params.ids || null ,
            money:this.props.navigation.state.params.money || null ,
            accountData:this.props.navigation.state.params.accountData || null ,
            consigneeName:this.state.consigneeName,
            mobile:this.state.mobile,
            defaults:this.state.defaults,
            detailAddress:this.state.detailAddress,
            refresh: function (res) {
                console.log(res)
                _this.setState({
                    province:res.province,
                    city:res.city,
                    area:res.area,
                });
            }
        });
    }
    _address(routName,title){
        const navigation = this.props.navigation;
        navigation.navigate(routName,{
            title:title,
            id:this.state.id,
            ids:this.props.navigation.state.params.ids || null ,
            accountData:this.props.navigation.state.params.accountData || null ,

        });
    }
    //查询地址详情
    addressDetail() {
        let params ={
            addressId:this.state.id,
        };
        console.log(params)
        let that = this;
        http.postData("userInfo/getAddressInfo", params,
            function(res){
                console.log(res )
                if(res.code===0){
                    let data = res.object
                    that.setState({
                        loaded: true,
                        consigneeName:data.consigneeName,
                        mobile:data.mobile,
                        defaults:data.defaults,
                        province:data.province,
                        city:data.city,
                        area:data.area,
                        detailAddress:data.detailAddress,
                    })
                    if(data.defaults === 0){
                        that.setState({
                            falseSwitchIsOn : false,
                        })
                    }else{
                        that.setState({
                            falseSwitchIsOn : true,
                        })
                    }
                }else{
                    this.refs.toast.show(res.msg);
                }
            })
    }
    // 新增收获地址
    addressData(Url) {
        if(!this.state.consigneeName){
            return this.refs.toast.show('请输入收货人姓名');
        }
        if (!this.state.mobile){
            return this.refs.toast.show('请输入手机号');
        }
        if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.state.mobile))) {
            return this.refs.toast.show('请输入正确的手机号')
        }
        if(!this.state.province){
            return this.refs.toast.show('请选择省份');
        }
        if(!this.state.city){
            return this.refs.toast.show('请选择城市');
        }
        if(!this.state.area){
            return this.refs.toast.show('请选择区/县');
        }
        if(!this.state.detailAddress){
            return this.refs.toast.show('请输入详细地址');
        }
        //设置默认地址
        if(this.state.falseSwitchIsOn){
            this.state.defaults=1
        }else{
            this.state.defaults=0
        }
        let params ={
            id:this.state.id,
            userid:global.login.userId,
            consigneeName:this.state.consigneeName,
            mobile:this.state.mobile,
            defaults:this.state.defaults,
            detailAddress:this.state.detailAddress,
            province:this.state.province,
            city:this.state.city,
            area:this.state.area,
        };
        console.log(params)
        let that = this;
        http.postData(Url, params,
            function(res){
                console.log(res )
                if(res.code===0){
                    DeviceEventEmitter.emit('refresh',res.code);
                    that.goBack();
                }else{
                    this.refs.toast.show(res.msg);
                }
            })
    }
    render(){
        if (!this.state.loaded&&this.state.id ) {
             return <LoginView/>
        }
        return this.renderView();
    }
    renderView() {
         return (
            <Container style={{backgroundColor:'#fff'}}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                />
                 <View style={{width:Util.width,height:15,backgroundColor:'#f0f2f5'}}></View>
                 <View style={styles.AddAddressBox}>
                    <View style={styles.addItem}>
                        <Text style={styles.label}>收货人</Text>
                        <Input  style={styles.addInput}  placeholder="请输入姓名"
                                placeholderTextColor="#bbb"
                                onChangeText={(txt) => this.setState({consigneeName:txt})}
                                value={this.state.consigneeName}
                        />
                    </View>
                    <View style={styles.addItem}>
                        <Text style={styles.label}>联系电话</Text>
                        <Input   style={styles.addInput} placeholder="请输入联系电话"   placeholderTextColor="#bbb"
                                 keyboardType='phone-pad'
                                 onChangeText={(mobile) => this.setState({mobile})}
                                 value={this.state.mobile}
                        />
                    </View>
                    <TouchableOpacity onPress={()=>(this._next("SelectProAddress"))} style={[styles.addItem,{paddingRight:10,}]}>
                        <Text style={styles.label}>所在地区</Text>

                        <Input  style={styles.addInput}
                                value={ this.state.province+this.state.city+this.state.area  }
                                placeholder="请选择所在地区"   placeholderTextColor="#bbb" disabled />
                        <Image  source={require('./../../../../images/fanhui.png')} />
                    </TouchableOpacity>
                    <View style={styles.addItem}>
                        <Text style={styles.label}>详细地址</Text>
                        <Input  style={styles.addInput} multiline   placeholderTextColor="#bbb"
                                placeholder="请输入详细地址信息，如道路、门牌号、小区、楼栋号、单元室等"
                                value={this.state.detailAddress}
                                onChangeText={(txt) => this.setState({detailAddress:txt})}
                        />
                    </View>
                    {
                        this.state.id && this.state.defaults===1?(
                            null
                        ):
                            <View style={styles.addItem}>
                                <Text style={styles.label}>设置为默认地址</Text>
                                <Input  style={{flex:1}} disabled />
                                <Switch onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
                                        value={this.state.falseSwitchIsOn}
                                />
                            </View>
                    }
                 </View>
                 <View
                     style={{marginLeft:15,marginRight:15,marginTop:50 }}>
                     <ImageBackground  style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                          <Button block style={{backgroundColor:'transparent'}}
                                  onPress={!this.state.id?()=>(this.addressData("userInfo/addressAdd")) :
                                      ()=>(this.addressData("userInfo/addressUpdate"))
                                  } >
                                <Text style={{color:'#fff',textAlign:'center'}}>保存</Text>
                          </Button>
                     </ImageBackground>
                 </View>
            </Container>
         );
    }
 }
