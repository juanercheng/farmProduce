/**
 * Created by yangHL on 2018/5/29.
 */
import React, {Component} from 'react';
import {
    Container,
    InputGroup,
    Left,
    Body,
    Header,
    Right,
    Button,
    Footer,
    FooterTab,
    Title,
    Icon,
    Item,
    Input
} from 'native-base'
import styles from './columnStyle'
import px2dp from './../../../js/px2dp'
import http from "../../../js/http";
import global from "../../../js/global";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    ImageBackground,
    Image,
    ScrollView,
    DeviceEventEmitter,
    TextInput
} from 'react-native';
import { Toast,WhiteSpace, WingBlank } from 'antd-mobile';
import LoginView from './../../common/LoginView';
import SettingStyle from "../../../js/SettingStyle";
import NoDataView from './../../common/NoDataView';
import LoadingDataView from './../../common/LoadingDataView';


export default class column extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
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
        headerLeft: (
            <Button transparent style={SettingStyle.Back} onPress={() => navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/fanhui.png')}/>
            </Button>
        ),
        headerRight: (
            <View>
            </View>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            mobile: null,
            type: ['全部', '销量', '价格', '筛选'],
            id: 0,
            columnId: null,
            loade:true,
            sort:true,
            refreshing:false,
            pageCurrent:1,
            pageSize:10,
            details:[],
            showFoot:0
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        let columnId = this.props.navigation.state.params.Id;
        this.setState({
            columnId: columnId,
            sort: 'default',
            pageCurrent:1
        });

        console.log(this.props.navigation.state.params.Id);
        //参数：会员精选和满减参数一致
        let params = {
            pageCurrent: 1,
            pageSize: this.state.pageSize,
            sort: 'default',
            shopId: global.home.shopId
        };
        if (columnId == 1) {
            //会员精选
            this._columnPostMember(params, 'producte/memberProduct')
        } else if (columnId == 2) {
            params.type = 1;
            //满减专栏
            this._columnPost(params, 'producte/discountsProduct')
        } else if (columnId == 3) {
            //满赠专栏
            params.type = 2;
            this._columnPost(params, 'producte/discountsProduct')
        } else if (columnId == 4) {
            params = {
                pageCurrent: 1,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId
            };
            //爆款
            this._columnGet(params, 'producte/getHotProductList')
        } else if (columnId == 5) {
            params = {
                pageCurrent: 1,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId,
            };
            //促销
            this._columnGet(params, 'producte/saleOrders')
        }
    }

    _columnPostMember(params, url) {
        console.log(params);
        let that = this;
        http.postData(url, params,
            function (res) {
                console.log(res);
                let details = that.state.details;
                Toast.hide();
                if (res.code == 0) {
                    if (res.object.length<=0){
                        that.setState({
                            showFoot:1
                        })
                    }else{
                        if(params.pageCurrent == 1){
                            console.log(123);
                            that.setState({
                                details: res.object,
                                loade: false
                            })
                        }else{
                            res.object.map((value,index)=>{
                                console.log(value);
                                details.push(value)
                            })
                            console.log(details);
                            that.setState({
                                details: details,
                                loade: false,
                                showFoot:0
                            })
                        }
                    }

                } else {
                    console.log(res.msg);
                }
            })
    }
    _columnPost(params, url) {
        console.log(params);
        let that = this;
        http.postNoTokenData(url, params,
            function (res) {
                console.log(res);
                let details = that.state.details;
                Toast.hide();
                if (res.code == 0) {
                    if (res.object.length<=0){
                        that.setState({
                            showFoot:1
                        })
                    }else{
                        if(params.pageCurrent == 1){
                            console.log(123);
                            that.setState({
                                details: res.object,
                                loade: false
                            })
                        }else{
                            res.object.map((value,index)=>{
                                console.log(value);
                                details.push(value)
                            })
                            console.log(details);
                            that.setState({
                                details: details,
                                loade: false,
                                showFoot:0
                            })
                        }
                    }

                } else {
                    console.log(res.msg);
                }
            })
    }

    _columnGet(params, url) {
        console.log(params);
        let that = this;
        http.getNoTokenData(url, params,
            function (res) {
                let details = that.state.details;
                console.log(details,'details');
                Toast.hide();
                    if (res.code == 0) {
                        if(res.object.length<=0){
                            that.setState({
                                showFoot:1
                            })
                        }else {
                            if (params.pageCurrent == 1) {
                                that.setState({
                                    details: res.object,
                                    loade: false
                                })
                            } else {
                                res.object.map((value, index) => {
                                    details.push(value)
                                });
                                that.setState({
                                    details: details,
                                    loade: false,
                                    showFoot:0
                                })
                            }
                        }
                    } else {
                        console.log(res.msg);
                    }

            })
    }

    goBack = () => {
        const {goBack, navigate} = this.props.navigation;
        goBack()
    };

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
                if (res.code === 0){
                    Toast.info('加入购物车成功');
                    DeviceEventEmitter.emit('shopCarRefresh', res.code);
                }else{
                    Toast.info(res.msg);
                }
            })
    }

    _typeChoice(index) {
        Toast.loading('加载中...', 0, () => {
            console.log('加载完成!!!');
        });
        this.setState({
           id:index
        });
        this.state.pageCurrent = 1;
        let params = {
            pageCurrent: this.state.pageCurrent,
            pageSize: this.state.pageSize,
            sort: 'default',
            shopId: global.home.shopId
        };
        console.log(params,'canshu')
        if(index === 0){
            params.sort = 'default';
            this.setState({
                sortType:'default',
            });
        }else if(index === 1){
            params.sort = 'sales';
            this.setState({
                sortType:'sales'
            });
        }else if(index === 2){
            if(this.state.sort){
                params.sort = 'price_asc';//正序
                this.setState({
                   sort:!this.state.sort,
                    sortType:'price_asc'
                });
            }else{
                params.sort = 'price_desc';//倒叙
                this.setState({
                    sort:!this.state.sort,
                    sortType:'price_desc'
                });
            }
        }

        console.log(params);
        if (this.state.columnId == 1) {
            //会员精选
            this._columnPostMember(params, 'producte/memberProduct')
        } else if (this.state.columnId == 2) {
            params.type = 1;
            //满减专栏
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 3) {
            //满赠专栏
            params.type = 2;
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 4) {
            let param = {
                pageCurrent:this.state.pageCurrent,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId,
            };
            //爆款
            this._columnGet(param, 'producte/getHotProductList')
        } else if (this.state.columnId == 5) {
            let param = {
                pageCurrent: 1,
                pageSize: 10,
                shopId:global.home.shopId,
            };
            //促销
            this._columnGet(param, 'producte/saleOrders')
        }
    }

    _back(routName) {
        const navigation = this.props.navigation;
        navigation.navigate(routName);
    }

    //进入商品详情页面
    _details(id,productType){
        const navigation = this.props.navigation;
        navigation.navigate( 'commodityDetails',{productId:id,productType:1000});
    }

    _renderPromotion(item, index) {
        return (
            <TouchableOpacity style={styles.promotionOneA} key={index} onPress={() => this._details(item.id)}>
                <Image source={item.type === undefined ? {uri:item.picture} : {uri:item.productPicture}}
                       style={{width: 150, height: 150}}/>
                <Text style={{marginTop: 10, fontSize: 13}}>{item.productName}{item.standardName}</Text>
                <View style={styles.price}>
                    <View style={{flexDirection: 'row',alignItems: 'flex-end'}}>
                        <Text style={{color: 'red', fontSize: 13}}>￥ {item.type === undefined ? item.price : item.productPrice}</Text>
                        {
                            item.type === undefined ? <Text>hello</Text> :item.type === 1 ? <Text>满减</Text> : <Text>满赠</Text>
                        }
                    </View>
                    <TouchableOpacity onPress={()=>this._add(item.id)}>
                        <Image source={require('./../../../../images/tianjia.png')}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    keyExtractor = (item) => item.id;

    _renderList() {
        let details = this.state.details;
        return (
            <FlatList data={details}
                      renderItem={({item, index}) => this._renderPromotion(item, index)}
                      keyExtractor={this.keyExtractor}
                      numColumns={2}
                      ListFooterComponent={this._renderFooter.bind(this)}
                      onEndReachedThreshold={0.5}
                      onEndReached={this._refresh.bind(this)}
                      refreshing={this.state.refreshing}
                      onRefresh={()=>this._load()}
            />
        )
    }
    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <NoDataView />
            );
        } else if(this.state.showFoot === 2) {
            return (
                <LoadingDataView />
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }
    _refresh(){
        this.setState({
            showFoot:2
        })
        let pageCurrent = this.state.pageCurrent + 1;
        this.setState({
            pageCurrent:pageCurrent
        })
        let params = {
            pageCurrent:pageCurrent,
            pageSize: this.state.pageSize,
            sort:this.state.sort,
            shopId: global.home.shopId
        }
        if (this.state.columnId == 1) {
            //会员精选
            this._columnPostMember(params, 'producte/memberProduct')
        } else if (this.state.columnId == 2) {
            params.type = 1;
            //满减专栏
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 3) {
            //满赠专栏
            params.type = 2;
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 4) {
            let param = {
                pageCurrent:pageCurrent,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId
            };
            //爆款
            this._columnGet(param, 'producte/getHotProductList')
        } else if (this.state.columnId == 5) {
            let param = {
                pageCurrent: pageCurrent,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId
            };
            //促销
            this._columnGet(param, 'producte/saleOrders')
        }
    }
    _load(){
        let pageCurrent = 1;
        this.setState({
            pageCurrent:pageCurrent
        })
        let params = {
            pageCurrent:pageCurrent,
            pageSize: this.state.pageSize,
            sort:this.state.sort,
            shopId: global.home.shopId
        }
        if (this.state.columnId == 1) {
            //会员精选
            this._columnPostMember(params, 'producte/memberProduct')
        } else if (this.state.columnId == 2) {
            params.type = 1;
            //满减专栏
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 3) {
            //满赠专栏
            params.type = 2;
            this._columnPost(params, 'producte/discountsProduct')
        } else if (this.state.columnId == 4) {
            let param = {
                pageCurrent:pageCurrent,
                pageSize: this.state.pageSize
            };
            //爆款
            this._columnGet(param, 'producte/getHotProductList')
        } else if (this.state.columnId == 5) {
            let param = {
                pageCurrent: pageCurrent,
                pageSize: this.state.pageSize,
                shopId:global.home.shopId,
            };
            //促销
            this._columnGet(param, 'producte/saleOrders')
        }
    }
    render(){
        if(this.state.loade){
           return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }else{
            return this._renderAll()
        }
    }
    _renderAll() {
        let type = this.state.type;
        return (
            <Container>
                <View style={{backgroundColor: '#fff', height: '100%'}}>
                    <View style={styles.tabsClick}>
                        {
                            type.map((value, index) => (
                                index === this.state.id ?
                                    <TouchableOpacity style={styles.tabsView} key={value}
                                                      onPress={() => this._typeChoice(index)}>
                                        <Text style={[styles.tabsText, {
                                            color: '#000',
                                            borderBottomWidth: 3,
                                            borderBottomColor: '#20a200'
                                        }]}>{value}</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.tabsView} key={value}
                                                      onPress={() => this._typeChoice(index)}>
                                        <Text style={styles.tabsText}>{value}</Text>
                                    </TouchableOpacity>
                            ))
                        }
                    </View>
                    {this._renderList()}
                </View>
            </Container>
        );
    }
}