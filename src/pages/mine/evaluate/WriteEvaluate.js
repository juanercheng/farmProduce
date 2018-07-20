/**
 * Created by juaner by 18-03-28
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
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
    ListView,
    TouchableHighlight,
}from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Toast,  WhiteSpace, WingBlank,  Modal,} from 'antd-mobile';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './WriteStyle'
import http from "../../../js/http";

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
const Url= 'producte/info';
const UrlImg = 'http://47.100.34.60/farmproduct/api/fileUploads';
const addMomentUrl = 'moments/addMoment';

export  default class WriteEvaluate extends Component{
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
            <Button transparent style={SettingStyle.Back}  onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight:(
           <Button transparent  onPress={()=>navigation.state.params.navigatePress()}>
               <Text style={styles.headerText}>发布</Text>
           </Button>
        )
    });

    constructor(props,context){
        super(props, context);
        this.state = {
            data:null,
            message:'正在加载数据...',
            content:null,
            imgarr:[],
            totalScore1: 5, // 总分值
            totalScore2: 5, // 总分值
            totalScore3: 5, // 总分值
            currentScore1: 5, // 分值
            currentScore2: null, // 分值
            currentScore3: null, // 分值
            loaded: false,
            avatarSource:[]
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
           navigatePress:this.send,
           navigatePressBack:this.goBack,
        })
    }

    fetchData() {
        let params ={
            productId:this.props.navigation.state.params.orderNo,
            productType:10000,
        };
        let _this = this;
        http.postData( Url,params,
            function(res){
                _this._data = res.object;
                console.log(res);
                if(res.code===0){
                    _this.setState({
                        data:_this._data,
                        loaded: true,
                    })
                }
            }
        )
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        
        Modal.alert('温馨提示', ('确定取消发布吗？'), [
            { text: '确认取消', onPress: () => { goBack ()} },
            { text: '继续发布', onPress: () =>{
                console.log('继续发布')
            }}
        ]);
    };

    changCon(event){
        this.props.navigation.setParams({
            content:event.nativeEvent.text,
        })
    }

    // 选择照片按钮点击
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

              let source;
              if (Platform.OS === 'ios') {
                  source = {uri: response.uri.replace ('file://', ''),type: 'application/octet-stream', name: 'image.jpg'};
              } else {
                  source = {uri: response.uri,type: 'multipart/form-data',type: 'application/octet-stream', name: 'image.jpg'};
              }
              let imageArray = this.state.avatarSource;
              imageArray.push (source);
              this.setState ({
                  avatarSource: imageArray,
              });
              this.uploadImage() //上传
          }
        });
    }

    uploadImage(e){
        let _this = this
        _this.setState({
            spinnerShow: true,  //显示加载中
        });
        let formData = new FormData();
        let file;
        for(var i in _this.state.avatarSource){
            file=_this.state.avatarSource[i];
            formData.append("myfile", file);
        }
        fetch( UrlImg, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        })
        .then((response) => response.json())
        .then((responseData)=> {
            _this.setState({
                spinnerShow:false, //隐藏加载中动画
            });
            _this._data = responseData.object;
            _this.setState({
                imgarr:_this._data
            });
        })
        .catch((err)=> {
            console.log('err', err);
        });
    }

    send = () => {
        let _this = this
        if(!_this.state.content){
            Toast.info('请输入内容！');
            return
        }
        if(!_this.state.currentScore2){
            Toast.info('请对物流服务进行评分！');
            return
        }
        if(!_this.state.currentScore3){
            Toast.info('请对服务态度进行评分！');
            return
        }
        let photos = _this.state.imgarr.join(',');
        let params ={
            momentInfo:{
                "productionId":this.props.navigation.state.params.Id,
                "photos":photos,
                "type":2,
                "content":_this.state.content,
                "rate1":_this.state.currentScore1,
                "rate2":_this.state.currentScore2,
                "rate3":_this.state.currentScore3,
                "userTypes":0
            }
        };
        params.momentInfo=encodeURI(JSON.stringify(params.momentInfo))
        http.postData( addMomentUrl,params,
            function(res){
                console.log(res)
                if(res.code===0){
                    _this.props.navigation.state.params.key= _this.props.navigation.state.params.key?_this.props.navigation.state.params.key:''
                    const { goBack,navigate } = _this.props.navigation
                    goBack (_this.props.navigation.state.params.key)
                }else {
                    Toast.info(res.msg);
                }
            }
        )
    };

    deleteLoadedImage(index){
        Modal.alert('温馨提示', ('确定删除吗？'), [
            { text: '取消', onPress: () => { goBack ()} },
            { text: '确认', onPress: () =>{
                var arr = this.state.avatarSource;
                if(isNaN(index)||index>=arr.length){
                    return false;
                }
                for(var i=0,n=0;i<arr.length;i++){
                    if(arr[i]!=arr[index]){
                        arr[n++]=arr[i];
                    }
                }
                arr.length-=1;
                this.setState({
                    avatarSource:arr, //隐藏加载中动画
                });
                if(this.state.avatarSource.length!=0){
                    this.uploadImage();
                }
            }}
        ]);
    };

    render() {
        let rowData = this.state.data;
        if (!this.state.loaded ) {
            return this.renderLoadingView();
        }
        return (
            <Container >
                <ScrollView>
                    <View style={{backgroundColor:'#fff'}}>
                        <View style={styles.TopBox}>
                            <Image  source={{uri: rowData.picture}}
                             style={styles.img}/>
                             <View style={{flexDirection:'row'}}>
                                <Text style={[SettingStyle.font14,{marginRight:8,marginLeft:11}]}>描述相符</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>{this.renderBody1()}</View>
                             </View>
                        </View>
                        <View style={styles.writeCon}>
                              <TextInput
                                    style={{height: 200,paddingTop:15,paddingLeft:15,paddingRight:15}}
                                    multiline = {true}
                                    underlineColorAndroid="transparent"
                                    placeholder="宝贝满足您的期待吗？说说它的优点和美中不足的地方吧"
                                    onChange={this.changCon.bind(this)}
                                    onChangeText={(content) => this.setState({content}) }
                                    value={this.state.content}
                              />
                              {/*{*/}
                                  {/*!this.state.imgarr?(*/}
                                      {/*this.state.imgarr.map(function (item) {*/}
                                          {/*<Image style={{height:100,width:100,margin:20}} source={{uri:item}} />*/}
                                      {/*})*/}
                                  {/*):null*/}
                              {/*}*/}
                              {/*<Button transparent onPress={this.choosePic.bind(this)} >*/}
                                  {/*<Image style={styles.addImg}*/}
                                       {/*source={require("./../../../../images/mine/shangchuangpingzheng.png")} />*/}
                              {/*</Button>*/}
                              <View style={styles.imgBox}>{this._renderImage()}</View>
                              {this._renderAddImage()}
                        </View>
                        <View style={styles.store}>
                            <View style={{flexDirection:'row',marginBottom:19}}>
                                <Image  source={require("./../../../../images/mine/mendian.png")}/>
                                <Text style={[SettingStyle.font14,{marginRight:8,marginLeft:11}]}>店铺评分</Text>
                            </View>
                            <View style={{flexDirection:'row',marginBottom:19}}>
                                <Text style={[SettingStyle.font14,{marginRight:8}]}>物流服务</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>{this.renderBody2()}</View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <Text style={[SettingStyle.font14,{marginRight:8}]}>服务态度</Text>
                                <View style={{flexDirection:'row',alignItems:'center'}}>{this.renderBody3()}</View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                 {
                    this.state.spinnerShow ?
                        <Spinner color='blue' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
                    :null
                 }
             </Container>
        );
    }

    _renderAddImage(){
        return (
            <View style={styles.addImg}>
                <TouchableOpacity onPress={this.choosePic.bind (this)}>
                    <Image source={require ('./../../../../images/mine/shangchuangpingzheng.png')} />
                </TouchableOpacity>
                {/*<Text style={styles.normalTitle}>上传图片</Text>*/}
            </View>
        )
    }

    _renderImage = () => {
        let arr = [];
        if(this.state.avatarSource!=''){
            for (let index = 0; index < this.state.avatarSource.length; index++) {
                arr.push(
                    <View style={styles.imgItem} key={index}>
                        <Image source={this.state.avatarSource[index]}
                               key={index}
                               style={styles.imageL}/>
                        <TouchableOpacity onPress={()=>this.deleteLoadedImage(index)} style={styles.rightDelButton}>
                            <Image source={ require ('./../../../../images/delete.png')} style={{width:15,height:15,}}  />
                        </TouchableOpacity>
                    </View>)
            }
            return arr;
        }
    };

    renderBody1() {
        let images = [];
        for (var i = 1; i <= this.state.totalScore1; i++) {
                let currentCount = i;
                images.push(
                    <View key={"i" + i}>
                        <TouchableOpacity onPress={(i) => {this._score1(currentCount)}}>
                            <Image style={styles.star}
                                source={require("./../../../../images/mine/kongxinxing.png")} />
                            {this._renderYellowStart1(i)}
                        </TouchableOpacity>
                    </View>
                );
        }
        return images;
    }
    renderBody2() {
        let images = [];
        for (var i = 1; i <= this.state.totalScore2; i++) {
                let currentCount = i;
                images.push(
                    <View key={"i" + i}>
                        <TouchableOpacity onPress={(i) => {this._score2(currentCount)}}>
                            <Image style={styles.star}
                                source={require("./../../../../images/mine/kongxinxing.png")} />
                            {this._renderYellowStart2(i)}
                        </TouchableOpacity>
                    </View>
                );
        }
        return images;
    }
    renderBody3() {
        let images = [];
        for (var i = 1; i <= this.state.totalScore3; i++) {
                let currentCount = i;
                images.push(
                    <View key={"i" + i}>
                        <TouchableOpacity onPress={(i) => {this._score3(currentCount)}}>
                            <Image style={styles.star}
                                source={require("./../../../../images/mine/kongxinxing.png")} />
                            {this._renderYellowStart3(i)}
                        </TouchableOpacity>
                    </View>
                );
        }
        return images;
    }

    _renderYellowStart1(count) {
        if (count <= this.state.currentScore1) {
            return (
                <Image source={require('./../../../../images/mine/xingxing.png')} style={[styles.star,{ position: 'absolute'}]}/>
            );
        }
    }
    _renderYellowStart2(count) {
        if (count <= this.state.currentScore2) {
            return (
                <Image source={require('./../../../../images/mine/xingxing.png')} style={[styles.star,{ position: 'absolute'}]}/>
            );
        }
    }
    _renderYellowStart3(count) {
        if (count <= this.state.currentScore3) {
            return (
                <Image source={require('./../../../../images/mine/xingxing.png')} style={[styles.star,{ position: 'absolute'}]}/>
            );
        }
    }

    _score1(i) {
        this.setState({
            currentScore1: i
        });
//        this.props.selectIndex(i);
        console.log(i)
    }
    _score2(i) {
        this.setState({
            currentScore2: i
        });
//        this.props.selectIndex(i);
        console.log(i)
    }
    _score3(i) {
        this.setState({
            currentScore3: i
        });
//        this.props.selectIndex(i);
        console.log(i)
    }

    renderLoadingView(){
        return (
            <View style={SettingStyle.LoadingView}>
                 <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
            </View>
         );
    }

}
