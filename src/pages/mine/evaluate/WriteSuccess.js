/**
 * Created by juaner by 18-03-23
 */
import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
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

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './WriteStyle'

const Url = Util.rootPath + 'user/findUserDetail?id=1';

export  default class WriteSuccess extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("发表评价"),
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
            loaded: false,
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        });
    }

    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate(routName);
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };

    render(){
        return (
            <Container style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
                <Image style={{width:214,height:125}} source={require('./../../../../images/mine/ok.png')} />
                <Text style={[{marginTop:25},SettingStyle.font14]}>发布成功</Text>
                <TouchableOpacity onPress={()=>this._next('HomePage')}>
                    <Text style={styles.DarkBtn}>返回首页</Text>
                </TouchableOpacity>
            </Container>
        )
    }

 }
