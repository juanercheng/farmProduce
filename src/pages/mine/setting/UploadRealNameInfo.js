/**
 * Created by juaner by 18-03-23
 */
import React, { Component } from 'react';
import { Container,Content, Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import Swiper from 'react-native-swiper';
//import TabNavigator from 'react-native-tab-navigator';
import {
    Alert,
    TextInput,
    View,
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight, DeviceEventEmitter,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import LoginView from './../../common/LoginView'
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from '../MineStyle'
import global from "../../../js/global";
import http from "../../../js/http";

const Url = 'user/userInfos';
const UrlImg = 'http://47.100.34.60/farmproduct/api/fileUpload';
const dictInfo = 'cfg/dictInfo';

const checkImage=require('./../../../../images/gouxuan.png');

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

export  default class UploadRealNameInfo extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title:  navigation.state.params.type ,
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
            idcardimg1:null,
            idcardimg2:null,
            businesslicenseimg:null,
            TypeTitle:null,
            TypeTitle1:null,
            spinnerShow:false ,
            uploade:null,
            isAuthentication:false,  //先调接口，判断是否认证成功，如果成功，设置true
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
    };

    _next(routName,type,info,num){
        const navigation = this.props.navigation;
        navigation.navigate( routName ,{
          Type: type,
        });
    }

    fetchData() {
        let params ={userids:global.login.userId}
        let _this = this
        http.postData( Url,params,
            function(res){
                _this._data = res.object;
                let data
                for(let i in _this._data ){
                    data = _this._data[0]
                }
                _this.setState({
                    idcardimg1:data.idcardimg1,
                    idcardimg2:data.idcardimg2,
                    businesslicenseimg:data.businesslicenseimg,
                    TypeTitle1:data.remarks2,
                    loaded: true,
                });
                if(data.identification === 2){
                    _this.setState({
                        isAuthentication:true,
                    });
                }else if(data.identification === 3){
                    _this.setState({
                        uploade:false,
                    });
                }
                console.log(data)
            }
        )
        let params1 = {
            code:'TYPE_MANAGE'
        }
        http.getData( dictInfo,params1,
            function(res){
                _this._data = res.object;
                console.log( _this._data)
                _this.setState({
                    TypeTitle: _this._data,
                });
            }
        )
    }

    //选择照片按钮点击
    choosePic(type) {
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
              this.uploadImage(type) //上传
          }
        });
    }

    uploadImage(type){
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
            console.log(_this._data)
            if(type=== 1){
                _this.setState({
                    idcardimg1:_this._data
                })
            }else if(type=== 2){
                _this.setState({
                    idcardimg2:_this._data
                })
            }else if(type===3){
                _this.setState({
                    businesslicenseimg:_this._data
                })
            }
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
            <Container style={{backgroundColor:'#fff'}}>
             <ScrollView>
                <View>
                     {
                        this.props.navigation.state.params.type === '上传证件'?(
                            <View>
                                 <View style={{flexDirection:'column',alignItems:'center'}}>
                                    {
                                        this.state.isAuthentication === true?(
                                             <View>
                                                 <View style={{position:'relative'}}>
                                                    <Image style={styles.uploadImage} source={{uri:this.state.idcardimg1}}/>
                                                    <Image
                                                        source={require('./../../../../images/mine/renzhengchenggong.png')}
                                                        style={{position:'absolute',right:-20,top:3}}/>
                                                 </View>
                                                 <View style={{position:'relative',marginTop:21}}>
                                                     <Image style={styles.uploadImage} source={{uri:this.state.idcardimg2}}/>
                                                     <Image
                                                         source={require('./../../../../images/mine/renzhengchenggong.png')}
                                                         style={{position:'absolute',right:-20,top:3}}/>
                                                 </View>
                                            </View>
                                        ):(
                                         <View>
                                             {
                                                 this.state.uploade === null?<Text style={[SettingStyle.font14,{color:'#999',marginTop:20,marginBottom:10,textAlign:'center'}]}>请上传本人身份证照片</Text> :null
                                             }
                                             {
                                                 this.state.uploade === false?<Text style={[SettingStyle.font14,{color:'red',marginTop:20,marginBottom:10,textAlign:'center'}]}>个人身份认证失败，请重新上传证件认证</Text> :null
                                             }
                                             <TouchableOpacity onPress={()=>this.choosePic(1)}>
                                                  <View>
                                                     {
                                                       this.state.idcardimg1?(
                                                           <Image style={styles.uploadImage} source={{uri: Util.imgPath+this.state.idcardimg1}}/>
                                                       ):(
                                                           <View style={styles.uploadImages}>
                                                             <Image style={{marginTop:25}} source={require('./../../../../images/mine/zhengmianshenfenzheng.png')} />
                                                             <Text style={{color:'#999',marginTop:20,marginBottom:25,fontSize:12}}>点击此处上传人像页照片</Text>
                                                           </View>
                                                       )
                                                     }
                                                 </View>
                                             </TouchableOpacity>
                                             <TouchableOpacity onPress={()=>this.choosePic(2)}>
                                                  <View>
                                                     {
                                                       this.state.idcardimg2?(
                                                           <Image style={styles.uploadImage} source={{uri: Util.imgPath+this.state.idcardimg2}}/>
                                                       ):(
                                                           <View style={styles.uploadImages}>
                                                             <Image style={{marginTop:25 }} source={require('./../../../../images/mine/fanmianzhengjianzhao.png')} />
                                                             <Text style={{color:'#999',marginTop:20,marginBottom:25,fontSize:12}}>点击此处上传国徽页照片</Text>
                                                           </View>
                                                       )
                                                     }
                                                 </View>
                                             </TouchableOpacity>
                                         </View>
                                        )
                                    }
                                 </View>
                                    {
                                         this.state.isAuthentication === true?(null):(
                                             <View style={{marginLeft:60,marginRight:60,marginTop:25}}>
                                                <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                                      <Button block style={{backgroundColor:'transparent'}}
                                                      onPress={this.confirm}>
                                                            <Text style={{color:'#fff',textAlign:'center'}}>确认上传</Text>
                                                      </Button>
                                                </ImageBackground>
                                             </View>
                                         )
                                    }
                            </View>
                        ):(
                            this.props.navigation.state.params.type === '上传营业执照'?(
                                 <View>
                                     <View style={{flexDirection:'column',alignItems:'center'}}>
                                        <Text style={[SettingStyle.font14,{color:'#999',marginTop:20,marginBottom:10,textAlign:'center'}]}>请上传经营店铺营业执照</Text>
                                        <TouchableOpacity onPress={()=>this.choosePic(3)}>
                                             <View>
                                                {
                                                  this.state.businesslicenseimg?(
                                                      <Image style={styles.uploadImage} source={{uri: this.state.businesslicenseimg }}/>
                                                  ):(
                                                      <View style={styles.uploadImages}>
                                                        <Image style={{marginTop:25}} source={require('./../../../../images/mine/yingyezhizhao.png')} />
                                                        <Text style={{color:'#999',marginTop:20,marginBottom:25,fontSize:12}}>点击此处上传营业执照</Text>
                                                      </View>
                                                  )
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{marginLeft:60,marginRight:60,marginTop:25}}>
                                       <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                             <Button block style={{backgroundColor:'transparent'}}
                                             onPress={this.confirm}>
                                                   <Text style={{color:'#fff',textAlign:'center'}}>确认上传</Text>
                                             </Button>
                                       </ImageBackground>
                                    </View>
                                 </View>
                            ):(
                                <View style={styles.realName}>
                                    {
                                        this.state.TypeTitle.map((item,index)=>(
                                           <TouchableOpacity style={styles.settinglistItem} onPress={() => this._checked(item.id)} key={index}>
                                                <Text style={ SettingStyle.font14 }>{item.name}</Text>
                                                <Image source={this.state.TypeTitle1 == item.id? checkImage : null}/>
                                           </TouchableOpacity>
                                        ))
                                    }
                                    <View style={{marginLeft:15,marginRight:15,marginTop:25}}>
                                       <ImageBackground style={{width:'100%'}} source={require('./../../../../images/mine/btn.png')} resizeMode='contain'>
                                             <Button block style={{backgroundColor:'transparent'}}
                                             onPress={this.confirm}>
                                                   <Text style={{color:'#fff',textAlign:'center'}} >确定</Text>
                                             </Button>
                                       </ImageBackground>
                                    </View>
                                </View>
                            )
                        )
                     }
                </View>

             </ScrollView>
            </Container>
         );
    }

    _checked =(index)=>{
        this.setState({
           TypeTitle1:index,
        })
    };

    confirm = () => {
        const {state } = this.props.navigation
        this.goBack();
        if(this.props.navigation.state.params.type === '上传证件'){
            let data={
                id:1,
                data1:this.state.idcardimg1,
                data2:this.state.idcardimg2,
            }
            state.params.refresh(data);
            console.log(data)
        }else if(this.props.navigation.state.params.type === '上传营业执照'){
            let data={
                id:2,
                data:this.state.businesslicenseimg,
            }
            state.params.refresh(data);
        }else if(this.props.navigation.state.params.type === '经营主类'){
            let data={
                id:3,
                data:this.state.TypeTitle1,
            }
            console.log(data)
            state.params.refresh(data);
        }
    }
 }
