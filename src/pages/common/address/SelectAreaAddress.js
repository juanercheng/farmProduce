/**
 * Created by Zero on 2018/3/30
 */
/**
 * Created by juaner by 18-03-20
 */
import React, { Component } from 'react';
import { Container, Header, Left, Right,List,ListItem, Button, Switch,Title, Text ,Spinner,Item,Input} from 'native-base';
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
    DeviceEventEmitter,
    ScrollView,
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
import LoginView from "./../../../pages/common/LoginView"

export  default class SelectAreaAddress extends Component{

    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '所在地区',
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
            <Button transparent style={{height:"100%"}} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={[SettingStyle.headerBack ]} source={require('./../../../../images/header/fanhui.png')} />
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
            province:this.props.navigation.state.params.province,
            city:this.props.navigation.state.params.city,
            selArea:null,
            area:null,
            loaded:false,
            spinner:false,
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
            city:this.props.navigation.state.params.city,
        });
        goBack ()
    };

    fetchData() {
        console.log(this.state.code)
        let that = this
        let params ={
            parameter:this.state.code,
            type : 0,
        }
        http.getData( 'cfg/areaRegionList',params,
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

    selectArea(index,name){
        let _this = this
        _this.setState({
            selArea:index,
            area:name,
            spinner:true,
        });
        _this.timer= setTimeout(()=>{
                clearTimeout(_this.timer);
                if(_this.state.area){
                    let _data= {
                        province:_this.props.navigation.state.params.province,
                        city:_this.props.navigation.state.params.city,
                        area:_this.state.area,
                    };
                    DeviceEventEmitter.emit('address',_data); //刷新AddAddress.js页面地址
                    const { goBack } = _this.props.navigation;
                    goBack (_this.props.navigation.state.params.key)
                }
            },
            500,
        );
    }
    render() {
        if(!this.state.loaded){
            return < LoginView/>
        }
        return (
            <Container >
                {   this.state.spinner ?
                    <Spinner color='#999' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
                    :null
                }
                <ScrollView style={{backgroundColor:"#f0f2f5"}}>
                    <View style={{marginTop:10,backgroundColor:"#fff"}}>
                        <List style={{marginLeft:0,}}>
                            {
                                this.state.areaList.map((item,index)=>(
                                    <ListItem style={{marginLeft:0,paddingLeft:15,justifyContent:"space-between"}}
                                              onPress={()=>(this.selectArea(item.regionid,item.regionname))}
                                              key={item.regionid} >
                                        <Text style={{color:"#444"}}>{item.regionname}</Text>
                                        {
                                            this.state.selArea === item.regionid ?
                                                <Image   source={require('./../../../../images/wancheng.png')} />
                                            :null
                                        }
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
