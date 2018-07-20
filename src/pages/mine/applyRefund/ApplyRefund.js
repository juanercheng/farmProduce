/**
 * Created by Zero on 2018/3/27
 */
import React, { Component } from 'react';
import { Container,  Button, Text ,Input ,Spinner} from 'native-base';
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
    StyleSheet,

}from 'react-native';
import { Toast, Modal,ActionSheet} from 'antd-mobile';
import ImagePicker from 'react-native-image-picker';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './../../shopping/shopCar/ShopCarStyle';
import refundStyle from "./ApplyRefundStyle"
import http from "./../../../js/http";

const Url='order/findOrderByNo';
const subOrderRefund = 'orderRefund/subOrderRefund';
const UrlImg = 'http://47.100.34.60/farmproduct/api/fileUploads';

//图片选择器参数设置
let options = {
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
export  default class ApplyRefund extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '申请退款',
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
            type:this.props.navigation.state.params.type, //1 仅退款  2 退货退款
            data:null,
            loaded: false,
            message:'正在加载数据...',
            cargoStatus: null,
            refund_reason_type:'请选择',
            cargoStatusText:'请选择',
            refund_notes:null,
            refund_notes_imgarr:[],
            avatarSource:[]
        }
    }

    componentDidMount(){
       this.fetchData();
       this.props.navigation.setParams({
            navigatePressBack:this.goBack,
       })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation;
         goBack ()
    };

    fetchData() {
        let params ={
            orderNo:this.props.navigation.state.params.orderNo,
        };
        let _this = this;
        http.getData( Url,params,
            function(res){
                console.log(res);
               if(res.code===0){
                   _this._data = res.object;
                   _this.setState({
                       loaded: true,
                       data:_this._data,
                   });
               }
            }
        )
    }

    _next(routName,page){
        const navigation = this.props.navigation;
        navigation.navigate(routName,{
            page:page
        });
    }

    showActionSheet(e) {
        if(e === 1){
            const BUTTONS = ['已收到货', '未收到货'];
            ActionSheet.showActionSheetWithOptions({
                title:null,
                message: '',
                options: BUTTONS,
            }, (buttonIndex) => {
                this.setState({ cargoStatus: buttonIndex +1,cargoStatusText:BUTTONS[buttonIndex]});
                console.log(buttonIndex)
            });
        }else {
            const BUTTONS = ['退款原因1', '退款原因2','退款原因3'];
            ActionSheet.showActionSheetWithOptions({
                title:null,
                message: '',
                options: BUTTONS,
            }, (buttonIndex) => {
                this.setState({ refund_reason_type:BUTTONS[buttonIndex]});
            });
        }

    };

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
                    refund_notes_imgarr:_this._data
                });
            })
            .catch((err)=> {
                console.log('err', err);
            });
    }

    render() {
        var rowData = this.state.data;
        if (!this.state.loaded ) {
             return this.renderLoadingView();
        }
        return this.renderTypeView(rowData);
    }

    renderTypeView(rowData) {
        let busOrderDetailsVoList = rowData.busOrderDetailsVoList;
        let _this = this;
        return (
            <Container>
                <ScrollView>
                    {
                        busOrderDetailsVoList.map(function (item,index) {
                            return(
                                <View key={index} style={[styles.goodsWrap,{ borderTopWidth:1,borderTopColor:"#e6e6e6",backgroundColor:"#f9f9f9",}]} >
                                    <View style={[styles.goodsImgWrap,{marginRight:5,}]}>
                                        <Image  style={[styles.goodsImg,{width:70,height:70,}]}  source={{uri: item.picture}} />
                                    </View>
                                    <View style={[styles.goodsTitleWrap,{width:"73%"}]}>
                                        <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                                            <Text style={[styles.goodsTitle]} ellipsizeMode='tail'
                                                numberOfLines={2}>{item.productName }</Text>
                                        </View>
                                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                            <Text style={[SettingStyle.font14,styles.Color99]}>规格：{item.standardName}</Text>
                                            <Text style={[SettingStyle.font14,styles.Color99]}>x {item.productNumber}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    {
                        _this.state.type===1?
                            <TouchableOpacity style={styles.list} onPress={()=>_this.showActionSheet(1)} >
                                <Text style={SettingStyle.font14}>货物状态</Text>
                                <View style={{flexDirection: 'row',alignItems:"center"}}>
                                    <Text style={[SettingStyle.font14,{color:"#999"}]}>{_this.state.cargoStatusText}</Text>
                                    <Image  style={{width:8,height:8,marginLeft:10}}  source={require("./../../../../images/shop/arrow-left.png")} />
                                </View>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.list}  onPress={()=>_this.showActionSheet(2)} >
                                <Text style={SettingStyle.font14}>退款原因</Text>
                                <View style={{flexDirection: 'row',alignItems:"center"}}>
                                    <Text style={[SettingStyle.font14,{color:"#999"}]}>{_this.state.refund_reason_type}</Text>
                                    <Image  style={{width:8,height:8,marginLeft:10}}  source={require("./../../../../images/shop/arrow-left.png")} />
                                </View>
                            </TouchableOpacity>
                    }
                    <View style={[refundStyle.list, {flexDirection:"row",justifyContent:"space-between",}]}  >
                        <Text style={SettingStyle.font14}>退款金额</Text>
                        <View style={{flexDirection: 'column',justifyContent:"flex-end"}}>
                            <Text style={[SettingStyle.font14 ,{textAlign:"right"}]}>￥{rowData.orderTotalPirce}</Text>
                            <Text style={[SettingStyle.font12 ,{color:"#999"}]}>
                                最多￥{rowData.orderTotalPirce}，含发货运费￥{rowData.postage?rowData.postage:0}
                            </Text>
                        </View>
                    </View>
                    <View style={refundStyle.list}  >
                        <Text style={[SettingStyle.font14]}>退款说明</Text>
                        <View style={refundStyle.refundInputWrap}>
                            <Input style={refundStyle.refundInput} placeholder="选填"
                                   value={_this.state.refund_notes}
                                   multiline = {true} underlineColorAndroid="transparent"
                                   onChangeText={(refund_notes) => _this.setState({refund_notes})}
                                   placeholdertTextColor="#999"/>
                        </View>
                    </View>
                    <View style={[refundStyle.list,{marginTop:10,}]}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Text  >上传凭证</Text>
                            <Text style={[SettingStyle.font12,{color:"#999",marginLeft:15, }]}>(最多6张)</Text>
                        </View>
                        <View>
                            <View style={refundStyle.imgBox}>{_this._renderImage()}</View>
                            {_this._renderAddImage()}
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>_this.send()}   style={{   width:"100%", height:35,  marginTop:40,paddingLeft:15,paddingRight:15 }}>
                        <ImageBackground  style={{width:"100%"  }} source={require('./../../../../images/mine/btn.png')} resizeMode='cover'>
                            <View style={{width:"100%",height:"100%", flexDirection: 'row',
                                alignItems:"center",
                                justifyContent:"center", }}>
                                <Text style={{color:'#fff'}}>提交</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                    {
                        _this.state.spinnerShow ?
                            <Spinner color='blue' style={{position:"absolute",zIndex:999,top:"25%",left:"45%",opacity:1,}}/>
                            :null
                    }
                </ScrollView>
            </Container>
        );
    }

    renderLoadingView() {
        return (
            <View style={SettingStyle.LoadingView}>
                   <Text style={{textAlign:'center',marginTop:20}}>{this.state.message}</Text>
            </View>
        );
   }

   _renderAddImage(){
        return (
            <View  style={refundStyle.imgWrap}>
                <TouchableOpacity onPress={this.choosePic.bind (this)}>
                    <Image  style={refundStyle.img}  source={require("./../../../../images/mine/shangchuangpingzheng.png")} />
                </TouchableOpacity>
            </View>
        )
   }

   _renderImage = () => {
        let arr = [];
        if(this.state.avatarSource!=''){
            for (let index = 0; index < this.state.avatarSource.length; index++) {
                arr.push(
                    <View style={refundStyle.imgItem} key={index}>
                        <Image source={this.state.avatarSource[index]}
                               key={index}
                               style={refundStyle.imageL}/>
                        <TouchableOpacity onPress={()=>this.deleteLoadedImage(index)} style={refundStyle.rightDelButton}>
                            <Image source={ require ('./../../../../images/delete.png')} style={{width:15,height:15,}}  />
                        </TouchableOpacity>
                    </View>)
            }
            return arr;
        }
   };

   send(){
        let _this = this;
        let rowData = this.state.data;
        if(this.props.navigation.state.params.type===1){
            if(!_this.state.cargoStatus){
                return Toast.info('请选择货物状态！')
            }
        }
        let photos = _this.state.refund_notes_imgarr.join(',');
        let params ={
            orderNo:this.props.navigation.state.params.orderNo,
            orderDetailId:rowData.id,
            serviceType:_this.state.type,
            cargoStatus:_this.state.cargoStatus,
            refund_reason_type:'',
            refund_notes:_this.state.refund_notes,
            imgs:photos //上传凭证，字段名:imgs,多个直接用逗号隔开
        };
        http.postData(subOrderRefund,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    Toast.info(res.msg,2, () => {
                        const { goBack } = _this.props.navigation
                        goBack (_this.props.navigation.state.params.key)
                    });
                }
            }
        )
   }

   deleteLoadedImage(index){
        Modal.alert('温馨提示', ('确定删除吗？'), [
            { text: '取消', onPress: () => console.log('cancel')},
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
                    if(this.state.avatarSource.length!=0){
                        this.uploadImage();
                    }
                    this.uploadImage();
                }}
        ]);
   };
}

