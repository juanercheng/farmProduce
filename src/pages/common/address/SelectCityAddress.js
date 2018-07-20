/**
 * Created by Zero on 2018/3/30
 */
/**
 * Created by juaner by 18-03-20
 */
import React, { Component } from 'react';
import { Container, Header, Left, Right,List,ListItem, Button, Switch,Title, Text ,Icon,Item,Input} from 'native-base';
import Swiper from 'react-native-swiper';
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
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
import LoginView from "./../../../pages/common/LoginView"

export  default class SelectCityAddress extends Component{

    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '所在地区',
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
            areaList:[],
            code:this.props.navigation.state.params.code,
            loaded:false,

        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
        this.fetchData();
    }
    goBack = () => {
        const { goBack,navigate,state } = this.props.navigation
        state.params.refresh({
            province:this.props.navigation.state.params.province,
            city:this.state.city
        });
        goBack ()
    };
    _next(routName,code,city){
        const navigation = this.props.navigation;
        let _this = this;
        navigation.navigate(routName,{
            code:code,
            city:city,
            province:this.props.navigation.state.params.province,
            id:this.props.navigation.state.params.id  || null ,
            ids:this.props.navigation.state.params.ids || null ,
            money:this.props.navigation.state.params.money || null ,
            accountData:this.props.navigation.state.params.accountData || null ,
            consigneeName:this.props.navigation.state.params.consigneeName || null,
            mobile:this.props.navigation.state.params.mobile || null,
            defaults:this.props.navigation.state.params.defaults || 0,
            detailAddress:this.props.navigation.state.params.detailAddress || null,
            key:this.props.navigation.state.params.key,
            refresh: function (res) {
                console.log(res)
                _this.setState({
                    province:res.province,
                    city:res.city
                });
            }
        });
    }

    fetchData() {
        let that = this
        let params ={
            parameter:this.state.code,
            type : 0,
        };
        http.getData( 'cfg/areaCityList',params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that.setState({
                        areaList:res.object,
                        loaded:true,
                    })
                }

            }
        )
    }

    render() {
        if(!this.state.loaded){
            return < LoginView/>
        }
        return (
            <Container >
                <ScrollView style={{backgroundColor:"#f0f2f5"}}>
                    <View style={{marginTop:10,backgroundColor:"#fff"}}>
                        <List style={{marginLeft:0,}}>
                            {
                                this.state.areaList.map((item,index)=>(
                                    <ListItem style={{marginLeft:0,paddingLeft:15,}} key={item.cityid}
                                              onPress={()=>(this._next("SelectAreaAddress",item.cityid,item.cityname))} >
                                        <Text style={{color:"#444"}}>{item.cityname}</Text>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
