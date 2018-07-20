/**
 * Created by yangHL on 2018/3/23.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Footer,
    FooterTab,
    Title,
    Text,
    Tab,
    TabHeading,
    Tabs,
    Icon,
    Item,
    Input
} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    WebView,
    ImageBackground,
    DeviceEventEmitter,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Modal from 'antd-mobile/lib/modal';
import { Toast,ActionSheet} from 'antd-mobile';

import Swiper from 'react-native-swiper';
import styles from './commodityDetailsStyle'
import px2dp from './../../../js/px2dp'
import Comment from './component/comment'
import Details from './component/details'
import ShopCar from "../../shopping/shopCar/ShopCar";
import store from "../store/store";
import http from "../../../js/http";
import LoginView from './../../common/LoginView'
import SettingStyle from "../../../js/SettingStyle";
import Util from "../../../js/util";
import global from "../../../js/global";

export default class commodityDetails extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("详情"),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTitleStyle: {
            color: "#000",
            alignSelf: 'center'
        },
        headerTintColor: "#000",
        tabBarVisible: false,
        headerLeft:(
            <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight: (
            <TouchableOpacity onPress={()=>navigation.state.params.navigatePress()} style={{marginRight: 10}}>
                <Image source={require('./../../../../images/home/erweima.png')}
                       />
            </TouchableOpacity>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            favoriteShopStatus :null,
            followBool:true,
            modal1: false,
            modal2: false,
            selNum:1,
            details:null,
            loade:true
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack:this.goBack,navigatePress: this._code});
        let params = {
            productId:this.props.navigation.state.params.productId,
            productType:this.props.navigation.state.params.productType
        };
        if (params.productType === '10004'){
            console.log('秒杀');
        }
        console.log(params);
        this.setState({
            productId:params.productId,
            productType:params.productType
        });
        this.detailsFetchData(params)
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation;
        goBack ()
    };

    //二维码
    _code = () => {
        this.props.navigation.navigate('productCode');
    };

    detailsFetchData(params){
        let that = this;
        http.postData("producte/info",params,
            function(res){
                console.log(global.login.token);
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        details:res.object,
                        followBool:res.object.favoriteGoodStatus,
                        favoriteShopStatus :res.object.favoriteShopStatus,
                        loade:false
                    })
                }else{
                    console.log(res.msg);
                }
            })
    }
    //弹窗
    showModal(){
        this.setState({
            modal1: true,
        });
    }
    //关闭弹窗
    onClose(){
        this.setState({
            modal1: false,
        });
    }

    onWrapTouchStart = (e) => {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    };

    //加入购物车
    _addShop(id) {
        let params = {
            productId:id,
            number:this.state.selNum
        };
        let that = this;
        http.postData("producteCar/addShopCart",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    Toast.info('加入购物车成功');
                    DeviceEventEmitter.emit('shopCarRefresh', res.code);
                }else{
                    console.log(res.msg);
                    Toast.info(res.msg);
                }
            })
    }
    //立即购买
    _buyShop(id){
        let params = {
            productId:id,
            shopId:global.home.shopId,
            number:this.state.selNum
        };
        console.log(params);
        let that = this;
        http.postData("order/buyNowSettlement",params,
            function(res){
            console.log(res)
                if (res.code == 0){
                    const navigation = that.props.navigation;
                    navigation.navigate('ConfirmOrder',{accountData:res.object});
                }else{
                    console.log(res.msg);
                }
            })

    }
    //评论页面
    _commentPage(name,id){
        const navigation = this.props.navigation;
        navigation.navigate(name,{productId:id});
    }
    //关注
    _followGood(id){
        console.log(123)
        if(this.state.followBool){
            console.log('取消');
            let that = this;
            let params = {
                favoriteGoodId:id
            };
            console.log(params);
            http.postData("producte/cancelGoodFavorite",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            followBool:!that.state.followBool
                        });
                    }else{
                        console.log(res.msg);
                        Toast.info(res.msg)
                    }
                })
        }else{
            console.log('收藏');
            let that = this;
            let params = {
                productId:id
            };
            console.log(params);
            http.postData("producte/addMyFavoriteGoods",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            followBool:!that.state.followBool
                        });
                    }else{
                        console.log(res.msg);
                        Toast.info(res.msg)
                    }
                })
        }

    }
    //店铺收藏
    _followShop(id){
        if(this.state.favoriteShopStatus){
            console.log(this.state.favoriteShopStatus);
            let that = this;
            let params = {
                favoriteShopId:id
            };
            console.log(params);
            http.deleteData("shop/cancelFavoriteShop",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            favoriteShopStatus :!that.state.favoriteShopStatus
                        });
                    }else{
                        console.log(res.msg);
                        Toast.info(res.msg)
                    }
                })
        }else{
            console.log(this.state.favoriteShopStatus);
            let that = this;
            let params = {
                shopId:id
            };
            console.log(params);

            http.postData("shop/addUserFavoriteShop",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            favoriteShopStatus :!that.state.favoriteShopStatus
                        });
                    }else{
                        console.log(res.msg);
                    }
                })
        }
    }
    //商品数量
    itemIncrease = (i) => {
        i++;
        this.setState({selNum : i});
    };
    itemReduce = (i) => {
        if (i <= 1) {
            if(this.state.isSel){
                this.setState({isSel :!this.state.isSel});
                this.setMoney(-this.state.money)
            }
            return;
        }
        i--;
        this.setState({ selNum : i });
    };
    //商品数量输入框正则
    _text(text){
        text = text.replace(/\D/g,'');
        return text
    }
    //进入店铺详情
    _store(){
        console.log('商店');
        const navigation = this.props.navigation;
        navigation.navigate('store');
    }

    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }

    _render() {
        let details = this.state.details;
        let momentMap = details.momentMap;
        let image = details.pictures?details.pictures:details.picture;
        if(image){
            image = image.split(',');
        }
        return (
            <Container>
                <ScrollView style={{marginBottom:50}}>
                    <Swiper height={215} style={styles.swiper}
                            autoplay={true}
                            paginationStyle={{bottom: 10}}
                            dot={<View style={{           //未选中的圆点样式
                                backgroundColor: 'rgba(0,0,0,.2)',
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 10,
                            }}/>}
                            activeDot={<View style={{    //选中的圆点样式
                                backgroundColor: '#ffffff',
                                width: 6,
                                height: 6,
                                borderRadius: 3,
                                marginLeft: 10,
                            }}/>}>
                        {
                            image.map((value,index)=>{
                                return (
                                    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'transparent',}} key={index}>
                                        <Image resizeMode='stretch' style={{width: Util.size.width, flex: 1}}
                                               source={{uri:value}}/>
                                    </View>
                                )
                            })
                        }
                    </Swiper>
                    <View style={styles.content}>
                        <View style={styles.contentTitle}>
                            <Text style={styles.titleText}>
                                {details.labelName}{details.standardName}
                            </Text>
                        </View>
                        <View style={styles.contentPrice}>
                            <View style={styles.contentLeft}>
                                <Text style={styles.priceText}>￥{details.price}</Text>
                                <Text style={styles.priceTypeText}>包邮</Text>
                                {/*<Text style={styles.priceVIPText}>会员价:￥88.90</Text>*/}
                            </View>
                            <Text style={styles.surplusText}>库存 {details.inventory}</Text>
                        </View>
                    </View>
                    <View style={styles.activity}>
                        <Text style={styles.activityTitle}>促销</Text>
                        <View style={styles.activityContent}>
                            <View style={styles.activityType}>
                                <Text style={styles.activityTypeOne}>满赠</Text>
                                <Text style={styles.activityTypeContent}>购买100元即可赠送5元抵扣卷，限部分商品</Text>
                            </View>
                            <View style={[styles.activityType, {marginTop: 7}]}>
                                <Text style={styles.activityTypeTwo}>满减</Text>
                                <Text style={styles.activityTypeContent}>满49元反99减10元，可购买菌菇类部收到商品</Text>
                            </View>
                            <View style={[styles.activityType, {marginTop: 7}]}>
                                <Text style={styles.activityTypeThree}>积分</Text>
                                <Text style={styles.activityTypeContent}>购买可得50积分</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.showModal()}>
                            <Image source={require('./../../../../images/home/cuxiaogengduo.png')}
                                   style={{marginLeft: 10}}/>
                        </TouchableOpacity>
                        <Modal
                            visible={this.state.modal1}
                            popup
                            animationType="slide-up"
                            maskClosable={false}
                            title="Title"
                            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                        >
                            <View>
                                <View style={styles.modalAll}>
                                    <Text style={{marginTop:25,marginBottom:15,marginLeft:15,color:'#999999',fontSize:13}}>促销</Text>
                                    <View style={styles.activityContent}>
                                        <View style={styles.activityType}>
                                            <Text style={styles.activityTypeOne}>满赠</Text>
                                            <Text style={styles.activityTypeContent}>购买100元即可赠送5元抵扣卷，限部分商品</Text>
                                        </View>
                                        <View style={[styles.activityType, {marginTop: 7}]}>
                                            <Text style={styles.activityTypeTwo}>满减</Text>
                                            <Text style={styles.activityTypeContent}>满49元反99减10元，可购买菌菇类部收到商品</Text>
                                        </View>
                                        <View style={[styles.activityType, {marginTop: 7}]}>
                                            <Text style={styles.activityTypeThree}>积分</Text>
                                            <Text style={styles.activityTypeContent}>购买可得50积分</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity  onPress={()=>this.onClose()}>
                                    <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                                     style={{height:50,alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{color:'#fff',fontSize:15}}>完成</Text>
                                    </ImageBackground>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <View style={styles.service}>
                        <View style={styles.serviceContent}>
                            <Image source={require('./../../../../images/home/zhichituihuo.png')}
                                   />
                            <Text style={{fontSize: 12, marginLeft: 8}}>支持7天无理由退换货</Text>
                        </View>
                        <View style={[styles.serviceContent, {marginLeft: 15}]}>
                            <Image source={require('./../../../../images/home/zhichituihuo.png')}
                                   />
                            <Text style={{fontSize: 12, marginLeft: 8}}>商家包邮</Text>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.specifications}>
                        <View style={styles.specificationsContent}>
                            <Text style={styles.specificationsChoice}>已选</Text>
                            <Text style={styles.specificationsText}>{details.productName}{details.standardName},1件</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={  [styles.reduceNum,{ backgroundColor : this.state.selNum <= 1 ? '#dcdcdc' : '#20a200' }] }
                                              onPress={() => this.itemReduce(this.state.selNum)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>-</Text>
                            </TouchableOpacity>
                            <View style={ styles.numTextWrap }>
                                <Input style={styles.selNumText}
                                       value={`${this.state.selNum}`} keyboardType='numeric' maxLength={3}
                                       onChangeText={(text) => this.setState({selNum:this._text(text)})}/>
                            </View>
                            <TouchableOpacity style={  [styles.reduceNum,{backgroundColor:"#20a200"}] }
                                              onPress={() => this.itemIncrease(this.state.selNum)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={[styles.specifications, {paddingTop: 10, paddingBottom: 10}]}>
                        <View style={styles.specificationsContent}>
                            <Image source={require('./../../../../images/home/mendianlv.png')}
                                   />
                            <Text style={{fontSize: 13, marginLeft: 10}}>{details.shopName}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Button style={styles.specificationsButton} onPress={()=>this._followShop(details.shopId)}>
                                <Text style={{color: '#000', fontSize: 13}}>{this.state.favoriteShopStatus ?'已关注': '关注'}</Text>
                            </Button>
                            <TouchableOpacity onPress={()=>this._store()}>
                                <Image source={require('./../../../../images/home/cuxiaogengduo.png')}
                                        />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <Comment  _comment={(name)=>{this._commentPage(name,details.id)}}
                              comment={momentMap}/>
                    <View style={styles.line}></View>


                    {/*<Details style={{flex:1}} details={details.detailIntroduce}/>*/}
                </ScrollView>
                <View style={{flex: 1,
                    backgroundColor: '#fff'}}>
                    <WebView
                        style={{
                            backgroundColor: '#ffffff',
                            height: 100,
                        }}
                        ref='webview'
                        automaticallyAdjustContentInsets={false}
                        // style={styles.webView}
                        source={{html: details.detailIntroduce, baseUrl: 'https://baidu.com'}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        onShouldStartLoadWithRequest={() => true}
                        onNavigationStateChange={this.onNavigationStateChange}
                        startInLoadingState={true}
                        scalesPageToFit={true}
                    />
                </View>
                <View style={styles.shop}>
                    <TouchableOpacity   onPress={()=>this._followGood(details.id)} style={styles.collection}>
                        <Image source={this.state.followBool?require('./../../../../images/home/like.png')
                        :require('./../../../../images/shoucang.png')}/>
                        <Text style={{fontSize: 13, marginTop: 5}}>{this.state.followBool?'已收藏':'收藏'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._addShop(details.id)} style={styles.add}>
                        <Text style={{fontSize: 15}}>加入购物车</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this._buyShop(details.id)} style={{flex: 4}}>
                        <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                         style={styles.background}>
                            <Text style={{fontSize: 15, color: '#ffffff'}}>立即购买</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </Container>
        )
    }
}