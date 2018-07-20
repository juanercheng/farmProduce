/**
 * Created by Zero on 2018/3/27
 */

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,List,ListItem, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    Image,
    Linking,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
    ImageBackground,
    StyleSheet
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';


export  default class Service extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '联系客服',
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
        }
    }
    componentDidMount(){
        this.props.navigation.setParams({
                navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    }

    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate( routName);
    }
    render() {
        return (
            <Container>
                <View style={styles.wrap}>
                    <ImageBackground style={styles.serviceBg}
                                     source={require('./../../../../images/mine/kefu-beijing.png')} resizeMode='cover'>
                        <View style={styles.serviceBox}>
                            <Image style={styles.avatar}  source={require("./../../../../images/mine/kefutouxiang.png")} />
                            <Text style={[SettingStyle.colorWhite,SettingStyle.font14]}>为了快速的解决您的问题，请正确的咨询相关问题</Text>
                            <TouchableOpacity style={styles.linkBtn}>
                                <Image style={styles.linkIcon}  source={require('./../../../../images/mine/dianhua-bai.png')}/>
                                <Text style={[SettingStyle.colorWhite,SettingStyle.font14]}>一键拨打</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    wrap:{
        width:Util.width,
        height:"100%",
        backgroundColor:"#fff",
    },
    serviceBg:{
        width:"100%",

    },
    serviceBox:{
        width:"100%",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:20,
        paddingBottom:20,
    },
    avatar:{
        marginBottom:15,
    },
    linkBtn:{
        marginTop:"10%",
        flexDirection:"row",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:25,
        paddingRight:15,
        borderWidth:1,
        borderColor:"#fff",
        borderRadius:5,
        alignItems:"center"

    },
    linkIcon:{
        marginRight:10,

    }
})
