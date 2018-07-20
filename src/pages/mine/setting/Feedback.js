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

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle'
import http from './../../../js/http';
import global from './../../../js/global';

const Url = 'cfg/userFeedback';

export  default class Certification extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("意见反馈"),
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
            feedbackcontent:null,
            feedbackfsource:null,
            loaded: false
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        });
        if (Platform.OS === 'ios') {
              this.setState({
                 feedbackfsource:'ios',
              });
        } else {
              this.setState({
                 feedbackfsource:'android',
              });
        }
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    render(){
        return this.renderView();
    }

    renderView() {
         return (
             <Container>
                <View>
                      <TextInput
                           maxLength={300}
                           value={this.state.feedbackcontent}
                           multiline = {true} underlineColorAndroid="transparent"
                           style={[SettingStyle.font14,{backgroundColor:'#fff',width:'100%',height: 200}]} multiline
                           onChangeText={(feedbackcontent) => this.setState({feedbackcontent})}
                           placeholder="请输入您的宝贵意见..."
                           placeholderTextColor="#dadada"/>
                </View>
                 <View style={{marginLeft:15,marginRight:15,marginTop:50}}>
                    <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                         <Button block style={{backgroundColor:'transparent'}} onPress={this.confirm}>
                             <Text style={{color:'#fff',textAlign:'center'}}>提交</Text>
                         </Button>
                    </ImageBackground>
                 </View>
             </Container>
         );
    }

    confirm = () => {
        let _this = this
        let params ={
            feedbackcontent:_this.state.feedbackcontent,
            feedbackfsource:_this.state.feedbackfsource,
            tel:global.mobile,
        }
        if(!_this.state.feedbackcontent){
           Toast.info('请输入您的宝贵意见!');
           return
        }
        http.postData( Url,params,
           function(res){
               console.log(res)
               if(res.code === 0){
                   _this.refs.toast.show(res.object);
                   _this.goBack ()
               }else{
                    _this.refs.toast.show(res.object)
               }
           }
        )
    }

 }
