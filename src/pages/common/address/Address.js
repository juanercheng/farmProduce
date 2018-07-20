/**
 * Created by juaner by 18-03-20
 */
import React, { Component } from 'react';
import { Container, SwipeRow, Button,   Text ,Icon,Item,Input} from 'native-base';
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
     DeviceEventEmitter,
     ListView
}from 'react-native';
import { Toast, Modal,ActionSheet} from 'antd-mobile';
import { SwipeListView } from 'react-native-swipe-list-view';

import LoginView from './../LoginView'
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import global from './../../../js/global';
import styles from './AddressStyle'
import http from './../../../js/http'

export  default class Address extends Component{

    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: navigation.state.params.title,
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
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listViewData: null,
            isDefault:null,
            loaded: false,
            ids:this.props.navigation.state.params.ids || null , //购物车id
            money:this.props.navigation.state.params.money || null , //总金额,
            accountData:this.props.navigation.state.params.accountData || null, //结算带过来的所有信息
            emptyCode:false
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        });
        DeviceEventEmitter.addListener('refresh',(dic)=>{
            this.setState({
                loaded: false,
            });
            this.fetchData();
        });
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation;
        goBack ()
    };

    _next(routName,type,id){
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
            Type:type,
            id: id,
            ids:this.state.ids,   //店铺id
            money:this.state.money,
            accountData:this.state.accountData,
        });
    }

    _goBack(info){
        const { goBack,state } = this.props.navigation;
        state.params.refresh(info);
        goBack ()
    }

    fetchData() {
        let params ={
            pageCurrent:1,
            pageSize:10,
            userids:global.login.userId,
        };
        let that = this;
        http.postData("userInfo/addressInfo",params,
            function(res){
            console.log(res)
                if(res.code===0){
                    that._data=res.object
                    console.log(  res.object )
                    for(let i in that._data){
                        if(that._data[i].defaults===1){
                            that.setState({
                                isDefault: that._data[i].id,
                            });
                        }
                    }
                    that.setState({
                        listViewData: that._data,
                        loaded: true,
                    });
                }else if(res.code === 500){
                    that.setState({
                        emptyCode: true,
                        loaded: true,
                    });
                }
            })
    }

    //删除地址
    deleteRow(id) {
        let params ={ids:id}
        let that = this
        Modal.alert('温馨提示', ('确定删除吗？'), [
            { text: '取消', onPress: () => console.log('cancel')},
            { text: '确认', onPress: () =>{
                    http.postData( "userInfo/addressDel",params,
                        function(res){
                            console.log(res)
                            if(res.code===0){
                                that.setState({
                                    loaded: false,
                                });
                                that.fetchData();
                            }
                        }
                    )
                }}
        ]);
    }

    render(){
        if (!this.state.loaded ) {
            return <LoginView/>
        }else if(this.state.emptyCode){
            return this.emptyRender()
        }
        return this.renderView();
    }
    emptyRender(){
        return (
            <View style={[SettingStyle.emptyWrap ]}>
                <Image source={require('./../../../../images/weitianjiadizhi.png')} />
                <Text style={[SettingStyle.font14,{color:"#999",marginTop:5,}]}>您还没有添加地址</Text>
                <TouchableOpacity  onPress={()=>this._next('AddAddress','新增')} style={{   width:"50%", height:40, marginLeft:"25%",
                    marginRight:"25%", marginTop:"10%",borderRadius:5,}}>
                    <ImageBackground
                        style={{flex:1,flexDirection: 'row',alignItems:"center",justifyContent:"center"}} source={require('./../../../../images/mine/btn.png')} resizeMode='cover'>
                        <Text style={{color:'#fff'}}>增加新地址</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    renderView() {
         return (
            <Container>
                <SwipeListView
                    dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                    renderRow={ rowData => (
                        <View  style={{marginBottom:5,}} >
                            <View style={styles.addressContent}>
                                <TouchableOpacity onPress={this.props.navigation.state.params.title==='管理收货地址'?null:()=>this._goBack(rowData.id)} style={styles.addressContentActive}>
                                    {
                                        this.state.isDefault==rowData.id?<Image  style={{marginRight:10}} source={require('./../../../../images/gouxuan.png')} />:null
                                    }
                                    <View >
                                        <View style={this.state.isDefault==rowData.id?styles.addressCenter:styles.addressCenters}>
                                            <Text>
                                                <Text style={ SettingStyle.font14}>{rowData.consigneeName}</Text>        <Text style={ SettingStyle.font14 }>{rowData.mobile}</Text>
                                            </Text>
                                            <Text  style={[{color:'#bbb',textAlign:'left',marginTop:9,marginBottom:15,},SettingStyle.font14]}>
                                                {rowData.province + rowData.city + rowData.area + rowData.detailAddress }
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.addressCheckImgR}>
                                    <TouchableOpacity onPress={()=>this._next('AddAddress','编辑',rowData.id)}>
                                        <Image  style={{ marginLeft:10 }}
                                                source={require('./../../../../images/bianji.png')}  />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                this.state.isDefault==rowData.id?
                                    <ImageBackground style={{width:"100%",height:3, }}    source={require('./../../../../images/shop/line.png')} resizeMode='cover'/>
                                    :null
                            }
                        </View>
                    )}
                    renderHiddenRow={ (rowData) => (
                        <TouchableOpacity style={styles.rowBack} onPress={()=>this.deleteRow(rowData.id)} >
                            <View style={[styles.backRightBtn, styles.backRightBtnRight]}  >
                                <Icon  style={{color:"#fff"}} active name="trash" />
                            </View>
                        </TouchableOpacity>
                    )}
                    rightOpenValue={-75}
                />
                <View style={{marginLeft:15,marginRight:15,marginBottom:15}}>
                        <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                              <Button block style={{backgroundColor:'transparent'}} onPress={()=>this._next('AddAddress','新增',)}>
                                    <Text style={{color:'#fff',textAlign:'center'}}>增加新地址</Text>
                              </Button>
                        </ImageBackground>
                </View>
            </Container>
         );
    }
 }
