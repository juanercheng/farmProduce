/**
 * Created by juaner by 18-03-19
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
     Linking,
     TouchableOpacity,
     ViewPagerAndroid,
     ScrollView,
     TouchableHighlight,
}from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LoginView from './../../common/LoginView'
import http from './../../../js/http';
import global from './../../../js/global';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle'

const Url = 'user/userInfos';
const UrlImg = 'http://39.104.116.24:8080/farmproduct/api/fileUpload';
const UrlUpdateImg = 'user/updateUserInfo';

//图片选择器参数设置
var options = {
  title: '请选择',
  cancelButtonTitle:'取消',
  takePhotoButtonTitle:'拍照',
  chooseFromLibraryButtonTitle:'从相册中选择',
  quality:0.75,
  allowsEditing:true,
  noData:false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
export  default class UserInfo extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("个人信息"),
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
            dataSource: null,
            photos:null,
            name:null,
            spinnerShow:false ,
            loaded: false
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

    _next(routName,type,info,num){
        let _this = this
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
          Type: type,
          Info: info,
          ItemIndex:num,
          refresh: function (res) {
             console.log(res)
             _this.setState({
                name:res,
             });
          }
        })
    }

    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log(res)
               for(let i in _this._data ){
                   _this.setState({
                      dataSource: _this._data[0],
                      photos:_this._data[0].headportraitimg,
                      name:_this._data[0].name,
                      loaded: true,
                  });
               }
           }
        )
    }

    fetchHeadportraitimg(headportraitimg) {
        let params ={headportraitimg:headportraitimg}
        let _this = this
        http.postData( UrlUpdateImg,params,
           function(res){
               console.log(res)
               let data = res
               _this.setState({
                     photos:  _this._data,
                     spinnerShow:false, //隐藏加载中动画
               });
           }
        )
    }
    //选择照片按钮点击
    choosePic() {
          ImagePicker.showImagePicker(options, (response) => {
          console.log( response);
          if (response.didCancel) {
            console.log('用户取消了选择！');
          }
          else if (response.error) {
            alert("ImagePicker发生错误：" + response.error);
          }
          else if (response.customButton) {
            alert("自定义按钮点击：" + response.customButton);
          }
          else {
              let path
              let source = { uri: response.uri };
              var source = null;
              if (Platform.OS === 'ios') {
                  source = {uri: response.uri.replace('file://', ''), isStatic: true};
                  path=response.uri
              } else {
                  source = {uri: response.uri, isStatic: true};
                  path=response.path
              }
              this.setState({
                  photos:path
              });
              console.log(response)
              this.uploadImage() //上传
          }
        });
    }

    uploadImage(){
           let _this = this
           _this.setState({
               spinnerShow: true,  //显示加载中
           });
           let formData = new FormData();
           let path=  'file://'+ _this.state.photos
           let file = {uri:  path, type: 'application/octet-stream', name: 'image.jpg'};
           formData.append("myfile", file);

           fetch( UrlImg, {
               method: 'POST',
               headers: {
                   'Content-Type': 'multipart/form-data;charset=utf-8',
               },
               body: formData,
           })
           .then((response) => response.json())
           .then((responseData)=> {
                 _this._data = responseData.object;
                 _this.fetchHeadportraitimg(_this._data)
           })
           .catch((err)=> {
               console.log('err', err);
           });
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
                <View style={styles.settingList}>
                     <View>
                        <TouchableOpacity onPress={this.choosePic.bind(this)}
                            style={[styles.settinglistItem,{paddingTop:0,paddingBottom:0}]} >
                            <Text style={SettingStyle.font14}>修改头像</Text>
                            <View style={{flexDirection:'row',alignItems:'center',marginBottom:7.5}}>
                               {
                                  this.state.photos?(
                                      <Image style={styles.infoImg2} source={{uri:this.state.photos}}/>
                                  ):  <Image style={styles.infoImg2} source={require('./../../../../images/mine/touxiang.png')} />
                               }
                               <Image source={require('./../../../../images/mine/gengduo.png')} />
                            </View>
                        </TouchableOpacity>
                     </View>
                     <TouchableOpacity
                            style={styles.settinglistItem}>
                         <Text style={ SettingStyle.font14 }>会员名称</Text>
                         <Text><Text style={ SettingStyle.font14 }> {this.state.dataSource.username} </Text>
                         <Text style={{color:'#999'}}>   </Text></Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>this._next('UserInfoChange','昵称',this.state.name,2)}
                             style={styles.settinglistItem}>
                          <Text style={ SettingStyle.font14 }>修改昵称</Text>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={ [SettingStyle.font14,{marginRight:10}] }> {this.state.name} </Text>
                            <Image source={require('./../../../../images/mine/gengduo.png')} />
                          </View>
                     </TouchableOpacity>
                </View>
                <View style={styles.settingList}>
                     <TouchableOpacity onPress={()=>this._next('UserInfoChange','密码',this.state.dataSource.memo,3)}
                             style={styles.settinglistItem}>
                          <Text style={ SettingStyle.font14 }>修改密码</Text>
                          <Image source={require('./../../../../images/mine/gengduo.png')} />
                     </TouchableOpacity>
                     <TouchableOpacity onPress={()=>this._next('UserInfoChange','手机号',this.state.dataSource.memo,4)}
                              style={styles.settinglistItem}>
                           <Text style={ SettingStyle.font14 }>绑定手机号</Text>
                           <View style={{flexDirection:'row',alignItems:'center'}}>
                               <Text style={ [SettingStyle.font14,{marginRight:10}] }> {this.state.dataSource.userName} </Text>
                               <Image source={require('./../../../../images/mine/gengduo.png')} />
                           </View>
                     </TouchableOpacity>
                     <TouchableOpacity  onPress={()=>this._next('QRCode')}
                              style={styles.settinglistItem}>
                           <Text style={ SettingStyle.font14 }>我的二维码</Text>
                           <Image source={require('./../../../../images/mine/gengduo.png')} />
                     </TouchableOpacity>
                </View>
                {
                    this.state.spinnerShow ?
                        <Spinner color='blue' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
                    :null
                }
             </ScrollView>
            </Container>
         );
    }
 }
