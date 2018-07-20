/**
 * Created by juaner by 18-03-22
 */
import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import {
     Image,
     ScrollView,
     Share,
}from 'react-native';
import LoginView from './../../common/LoginView'
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import global from "../../../js/global";
import http from "../../../js/http";

const Url = 'cfg/findAdvertisementDetail';

export  default class About extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("关于我们"),
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
            <Button transparent onPress={()=>navigation.state.params.navigatePress()}>
                <Image style={{ marginRight:15}} source={require('./../../../../images/fenxiang.png')} />
            </Button>
        )
    });

    constructor(props){
        super(props);
        this.state = {
            dataSource: null,
            about:null,
            loaded: false
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
           navigatePress:this._shareText,
           navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    _shareText = () => {
      Share.share({
        message: this.state.about,
        url: 'http://facebook.github.io/react-native/',
        title: '农品天下'
      }, {
        dialogTitle: '关于我们',
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ],
        tintColor: 'green'
      })
      .then(this._showResult)
      .catch((error) => console.log(error.message));
   }

   _showResult(result) {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
           this.refs.toast.show(result.activityType);
        } else {
          this.refs.toast.show('分享成功！');
        }
      } else if (result.action === Share.dismissedAction) {
        this.refs.toast.show('分享失败！');
      }
   }
   _next(routName,type){
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
          type: type,
        });
   }

   fetchData() {
        let params ={param:'关于我们',type:1}
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
        return this.renderView();
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
