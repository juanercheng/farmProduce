/**
 * Created by juaner by 18-03-15
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Right,
    Button,
    Footer,
    FooterTab,
    Title,
    Text,
    Icon,
    Item,
    Input
} from 'native-base';
import {
    Alert,
    TextInput,
    View,
    Platform,
    Image,
    Linking,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import Util from './../../js/util';
import global from './../../js/global';
import http from './../../js/http';
import Swiper from 'react-native-swiper';
import styles from './HomeStyle';
import commodityDetails from "../common/commodityDetails/commodityDetails";
import LoginView from './../common/LoginView'
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';

const bannerUrl = Util.rootPath + 'banner/findBannerList?type=6';
const newsUrl = 'cfg/messageCount';

export default class HomeContent extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            dataLow: null,
            loade: true,
            newsNum:false,
            cityName:'定位',
            bursting:[],
            promotion:[],
            refreshing:false
        };
    }

    //componentDidMount 执行一次，在初始化render之前执行，如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    componentDidMount(){
        //轮播图：
        // this.fetchData();
        //消息未读条数：
        this.newsNum();
        //定位
        this._location();
    }

    //在组件销毁的时候要将其移除
    componentWillUnmount(){

    };
    //定位
    _location(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let longitude = JSON.stringify(position.coords.longitude);//精度
                let latitude = JSON.stringify(position.coords.latitude);//纬度
                let params;
                if (this.props.navigation.state.params === undefined){
                    params = {
                        longitude:116.386446,
                        latitude:39.939281,
                        distance:10000
                    };
                }else{
                    params = {
                        cityId:this.props.navigation.state.params.cityid
                    };
                    this.setState({
                        cityName:this.props.navigation.state.params.cityname
                    })
                }
                //这是获取当前所在城市的接口
                fetch('https://api.map.baidu.com/geocoder/v2/?output=json&ak=cDCkkEQi3R9SjxEOxUI70liDMGiGzNO0&location=34.939281,108.386446&qq-pf-to=pcqq.c2c')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                        console.log(responseJson.result.addressComponent.city);
                        if(this.props.navigation.state.params === undefined){
                            this.setState({
                                cityName:responseJson.result.addressComponent.city
                            })
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                //获取附近店铺
                let that = this;
                http.postNoTokenData("shop/getShopForNearby",params,
                    function(res){
                        console.log(res);
                        console.log(res.object[0].id);
                        if (res.code == 0){
                            let content = {
                                pageCurrent:1,
                                pageSize:10,
                                shopId:global.home.shopId
                                // shopId: res.object[0].id,
                            };
                            // global.home.shopId = res.object[0].id;
                            that._homeDetails(content);
                            that.setState({
                                shop:res.object[0],
                                // loade:false
                            })
                        }else{
                            console.log(res.msg)
                        }
                    })
            },
            (error) =>{
                console.log(error);
            },
            {enableHighAccuracy: true, timeout: 5000, maximumAge: 1000}
        );
    }
    //首页详情
    _homeDetails(content){
        console.log(content);
        let that = this;
        http.getNoTokenData("producte/home",content,
            function(res){
                console.log(res);
                // console.log(res.object[0]);
                if (res.code == 0){
                    that.setState({
                        dataSource: res.object.headBanner,
                        bursting:res.object.baokuan,
                        column:res.object.zhuanlan,
                        loade: false,
                    });
                }else{
                    console.log(res.msg)
                }
            })
        http.getNoTokenData("producte/saleOrders",content,
            function(res){
                console.log(res);
                // console.log(res.object[0]);
                if (res.code == 0){
                    that.setState({
                        promotion: res.object
                    });
                }else{
                    console.log(res.msg)
                }
            })
    }
    //跳转到商品详情
    _next(id,productType) {
        console.log(id,productType);
        const navigation = this.props.navigation;
        navigation.navigate('commodityDetails',{
            productId:id,
            productType:productType
        });
    }
    _news(name){
        const navigation = this.props.navigation;
        navigation.navigate(name);
    }
    //跳转到专栏下的所有分类的页面
    _column(title,id) {
        console.log(title);
        const navigation = this.props.navigation;
        navigation.navigate('column',{
            title: title,
            Id:id
        });
    }
    //添加到购物车
    _add(id){
        console.log('添加至购物车');
        let params = {
            productId:id,
            number:1
        };
        http.postData("producteCar/addShopCart",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    Toast.info('加入购物车成功');
                    DeviceEventEmitter.emit('shopCarRefresh', res.code);
                }else{
                    if(res.msg === '购物车中该商品购买数量已大于库存剩余数量'){
                        Toast.info('库存不足',2);
                    }else{
                        Toast.info(res.msg,2);
                    }
                }
            })
    }

    newsNum(){
        let params ={}
        let _this = this
        http.postData( newsUrl,params,
           function(res){
               _this._data = res.object;
               console.log(_this._data)
               if(_this._data){
                  _this.setState({
                      newsNum: true,
                  });
               }
           }
        )
    }
    //二维码跳转
    _QRcode(){
        const navigation = this.props.navigation;
        navigation.navigate('QRcode');
    }

    render() {
        if (this.state.loade) {
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }else{
            return this.renderView();
        }
    }
    //轮播图
    _renderSwiper(){
        let swiper = this.state.dataSource;
        return(
            <View style={styles.SwiperContainer}>
                <Swiper style={styles.wrapper}
                        height={150}
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={4}
                        paginationStyle={{bottom: 10}}
                        dot={<View style={{           //未选中的圆点样式
                            backgroundColor: 'rgba(0,0,0,.5)',
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
                        swiper.map((rowData, index) => (
                            <View style={styles.slide} key={index}
                            >
                                <Image resizeMode='stretch' style={styles.wrapperImage}
                                       source={{uri: rowData.advertisementimg}}/>
                            </View>
                        ))
                    }
                </Swiper>
            </View>
        )
    }
    //爆款
    _renderExplosion(){
        let bursting = this.state.bursting;
        return(
            <ScrollView style={[styles.explosionTwo,{flexDirection: 'row'}]}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}>
                {
                    bursting.map((value, index)=>{
                        return(
                            <View style={{flexDirection: 'row',paddingLeft:10}} key={index}>
                                <TouchableOpacity style={styles.explosionType}  onPress={() => this._next(value.id,value.productType)}>
                                    <Image source={{uri:value.picture}}
                                           style={{width:98,height:98}}/>
                                    <Text style={{fontSize:13,marginTop:13}}>{value.productName}</Text>
                                    <View style={styles.explosionPrice}>
                                        <Text style={{color:'red',fontSize:11}}>￥{value.price}</Text>
                                        <TouchableOpacity onPress={()=>this._add(value.id)}>
                                            <Image source={require('./../../../images/tianjia.png')}
                                                   style={{width: 22, height: 22}}/>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        )
    }
    _renderPList(item,index){
        return(
            <TouchableOpacity style={styles.promotionOneA} key={index} onPress={() => this._next(item.id,item.productType)}>
                <Image source={{uri:item.picture}}
                       style={{width: 150, height: 150}}/>
                <Text style={{marginTop: 10, fontSize: 13}}>{item.productName}</Text>
                <View style={styles.price}>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{color: 'red', fontSize: 13}}>￥{item.price}</Text>
                        <Text style={styles.priceOne}>￥{item.finalPrice}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this._add(item.id)}>
                        <Image source={require('./../../../images/tianjia.png')}
                               style={{width: 22, height: 22}}/>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }
    keyExtractor = (item) => item.id;
    _renderPromotionList(){
        let promotionList = this.state.promotion;
        return(
            <FlatList data={promotionList}
                      renderItem={({item,index}) => this._renderPList(item,index)}
                      keyExtractor={ this.keyExtractor }
                      numColumns={2}
                      onEndReachedThreshold={10}
                      onEndReached={this._what.bind(this)}
                      refreshing={this.state.refreshing}
                      onRefresh={()=>this._doing()}
            />
        )
    }
    _what(){
        console.log('what are you doing')
    }
    _doing(){
        if(!this.state.refreshing){
            console.log('???')
        }
    }
    _renderPromotion(){
        return(
            <View style={styles.promotion}>
                <View style={styles.promotionOne}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require('./../../../images/home/mendianlv.png')}
                               />
                        <Text style={{fontSize: 14, marginLeft: 8, color: '#000000'}}>促销</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this._column('促销',5)}>
                        <Image source={require('./../../../images/fanhui.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{display:'flex',flexDirection:'row'}}>
                    {this._renderPromotionList()}
                </View>
            </View>
        )
    }
    //专栏
    _rendercolumn(){
        let column = this.state.column;
        return(
            <View style={styles.column}>
                <View style={styles.columnOne}>
                    <Image source={require('./../../../images/home/like.png')}
                    />
                    <Text style={{fontSize: 14, marginLeft: 8, color: '#000000'}}>专栏</Text>
                </View>
                <View style={styles.columnTwo}>
                    <TouchableOpacity style={styles.columnLeft} onPress={()=>this._column('会员精选',1)}>
                        <Text style={{
                            marginTop: 9,
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#ff7e00'
                        }}>{column[0].advertisementtitle}</Text>
                        <Text style={{marginTop: 8, fontSize: 12, paddingBottom: 105}}>每日13：00多款干货超值抢购</Text>
                        <Image source={{uri:column[0].advertisementimg}}
                               style={{
                                   width: 100,
                                   height: 100,
                                   marginTop: 4,
                                   position: 'absolute',
                                   bottom: 0,
                                   right: 0
                               }}/>
                    </TouchableOpacity>
                    <View style={styles.columnRight}>
                        <TouchableOpacity style={styles.columnRightOne} onPress={()=>this._column('减满专栏',2)}>
                            <View style={{paddingLeft: 15}}>
                                <Text style={{
                                    marginTop: 9,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#58cf01'
                                }}>{column[1].advertisementtitle}</Text>
                                <Text style={{marginTop: 8, fontSize: 12, paddingBottom: 30}}>新鲜生活</Text>
                            </View>
                            <Image source={{uri:column[1].advertisementimg}}
                                   style={{width: 56, height: 56, position: 'absolute', bottom: 0, right: 0}}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.columnRightTwo} onPress={()=>this._column('满赠专栏',3)}>
                            <View style={{paddingLeft: 15}}>
                                <Text style={{
                                    marginTop: 9,
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    color: '#ff528b'
                                }}>{column[2].advertisementtitle}</Text>
                                <Text style={{marginTop: 8, fontSize: 12, paddingBottom: 30}}>满60立减10元</Text>
                            </View>
                            <Image source={{uri:column[2].advertisementimg}}
                                   style={{width: 56, height: 56, position: 'absolute', bottom: 0, right: 0}}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    //整体结构
    renderView() {
        return (
            <Container>
                <Header searchBar rounded style={styles.header}>
                    <TouchableOpacity onPress={()=>this._next('locationProvince')} style={{flexDirection:'row',alignItems:'center',marginRight:16}}>
                        <Text>{this.state.cityName}</Text>
                        <Image source={require('./../../../images/home/xiala.png')} style={{marginLeft: 5}}/>
                    </TouchableOpacity>
                    <Item style={{
                        backgroundColor:"#f0f1f2",
                        height:30,
                        borderRadius:15,
                        }}>
                        <Image source={require('./../../../images/sousuo.png')}
                            style={{marginLeft: "3%"}}/>
                        <Input onFocus={()=>this._next("search")}
                               placeholder="搜索关键字"
                               underlineColorAndroid='transparent'
                                style={{width:50}}/>
                    </Item>
                    <TouchableOpacity onPress={()=>this._QRcode()} style={{marginLeft:13,}}>
                        <Image source={require('./../../../images/home/saoyisao.png')}
                               style={{marginLeft: "2%"}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._news('news')} style={{marginLeft:13,position:'relative'}}>
                        <Image source={require('./../../../images/home/xiaoxi.png')}
                               style={{marginLeft: "2%"}}/>
                        {
                            this.state.newsNum?(<Image source={require('./../../../images/header/news.png')}
                               style={styles.newsNum} />):null
                        }
                    </TouchableOpacity>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {this._renderSwiper()}
                    <View style={styles.explosion}>
                        <View style={styles.explosionOne}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('./../../../images/home/hot.png')}
                                       />
                                <Text style={{marginLeft: 8, fontSize: 15}}>爆款</Text>
                            </View>
                            <TouchableOpacity onPress={()=>this._column('爆款',4)}>
                                <Image source={require('./../../../images/fanhui.png')}
                                />
                            </TouchableOpacity>
                        </View>
                        {this._renderExplosion()}
                    </View>
                    <View style={styles.line}></View>
                    {this._rendercolumn()}
                    <View style={styles.line}></View>
                    {this._renderPromotion()}
                </ScrollView>
            </Container>
        );
    }
}
