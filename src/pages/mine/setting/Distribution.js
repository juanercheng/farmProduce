/**
 * Created by juaner by 18-03-27
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
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
import LoginView from './../../common/LoginView'

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util'
import global from "../../../js/global";
import http from "../../../js/http";

const Url = 'cfg/findAdvertisementDetail';

export  default class Distribution extends Component{
    static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,  //隐藏导航栏
    headerTitle: ("分销权益"),
    headerStyle: {
        backgroundColor: "#20a200",
        elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff",
        alignSelf: 'center',
    },
    headerLeft:(
        <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
            <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/go-back-white.png')} />
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
            integral:true,
            loaded: false,
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

    fetchData() {
        let params ={param:'分销卡权益',type:1}
        let _this = this
        http.postData( Url,params,
            function(res){
                _this._data = res.object;
                _this._data.content=_this._data.content.replace(/<\/?.+?>/g,"");
                _this._data.content=_this._data.content.replace(/ /g,"");
                _this._data.content=_this._data.content.replace(/&nbsp;/ig, "");
                _this.setState({
                    dataSource: _this._data,
                    loaded: true,
                });
            }
        )
    }

    render(){
        if (!this.state.loaded ) {
            return <LoginView/>
        }
        return this.renderView()
    }

    renderView() {
        return (
            <Container style={{paddingTop:15,backgroundColor:'#fff'}}>
                <ScrollView style={{width:Util.width}}>
                    <Text style={{fontSize:18,textAlign:'center'}}>{this.state.dataSource.name}</Text>
                    <Text style={{fontSize:13,textAlign:'center',color:'#999',marginTop:10,marginBottom:12}}>{this.state.dataSource.modifytime}</Text>
                    <Text style={{marginLeft:15,marginRight:15}}>{this.state.dataSource.content}</Text>
                </ScrollView>
            </Container>
        );
    }
}
