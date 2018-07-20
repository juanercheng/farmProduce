/**
 * Created by juaner by 18-03-23
 */
import React, { Component } from 'react';
import { Container, Button, Text } from 'native-base';
import {
     View,
     Image,
     TouchableOpacity,
     DeviceEventEmitter,
     FlatList,
}from 'react-native';
import { Toast, Modal,ActionSheet} from 'antd-mobile';

import LoginView from './../../common/LoginView';
import NoDataView from './../../common/NoDataView';
import LoadingDataView from './../../common/LoadingDataView';
import ErrorView from './../../common/ErrorView';
import SettingStyle from './../../../js/SettingStyle';
import styles from './collectionStyle'
import http from './../../../js/http';

const Url = 'producte/getMyFavoriteGoods';
const addShopCartUrl = "producteCar/addShopCart";
let pageNo = 1;//当前第几页
let totalElements;//总的页数
export  default class Collection extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        headerTitle: ("我的收藏"),
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
            loaded: false,
            refreshing: false,
            error: false,
            dataArray: [],
            errorInfo: null,
            showToast: false,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
    }

    componentDidMount(){
        this.fetchData(pageNo);
        this.props.navigation.setParams({
             navigatePressBack:this.goBack,
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    };

    componentWillUnmount(){
        pageNo = 1
    }

    //进入商品详情页面
    _commodityDetails(id){
        const navigation = this.props.navigation;
        navigation.navigate( 'commodityDetails',{productId:id,productType:10000});
    }

    _cart(id) {
        console.log(id);
        let params = {
            productId:id,
            number:1
        };
        let that = this;
        http.postData(addShopCartUrl,params,
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

    fetchData(pageNo) {
        let params ={
            pageCurrent:pageNo,
            pageSize:10,
        };
        let _this = this
        http.postData( Url,params,
            function(res){
                if(res.code===0){
                    _this._data = res.object;
                    console.log(res)

                    let data =  _this._data
                    let dataBlob = [];
                    if(data.length>0){
                        data.map(function (item) {
                            dataBlob.push(item)
                        });
                    }

                    if( pageNo === 1){
                        _this.setState({
                            loaded: true,
                            dataArray: dataBlob
                        })
                    }else{
                        _this.setState({
                            dataArray:_this.state.dataArray.concat(dataBlob),
                            loaded: true,
                        })
                    }

                    totalElements = data.length
                    if( totalElements <10){
                        _this.setState({showFoot:1});
                    }
                    data = null;
                    dataBlob = null;
                }else {
                    console.log(res)
                }
            }
        )
    }

    render(){
        if (!this.state.loaded && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }
        return (
            <View>
                <FlatList
                      data={this.state.dataArray}

                      //使用 ref 可以获取到相应的组件
                      //ref={(flatList) => this._flatList = flatList}
                      //ListHeaderComponent={this._header}//header头部组件

                      ListFooterComponent={this._renderFooter.bind(this)}

                      //ItemSeparatorComponent={ItemDivideComponent}//分割线组件

                      //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                      ListEmptyComponent={this.createEmptyView()}

                      keyExtractor={this._keyExtractor}

                      //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                      //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                      //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
//                      getItemLayout={(data, index) => ( {length: 44, offset: (44 + 1) * index, index} )}

                      //决定当距离内容最底部还有多远时触发onEndReached回调。
                      //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                      onEndReachedThreshold={1}
                      //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                      onEndReached={this._onEndReached.bind(this)}

                      //下拉刷新
                      refreshing={this.state.refreshing}
                      onRefresh={() => this._onRefresh()}
                      //渲染列表数据
                      renderItem={({ item ,index}) => this._renderItem(item,index)}
                    />
            </View>
        );
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

    createEmptyView() {
        return (
            <Container style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
               <Image source={require('./../../../../images/mine/zanshimeiyoushoucang.png')} />
               <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>暂时没有收藏</Text>
            </Container>
        );
    }

    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            this.fetchData(pageNo);
        }
    };

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        this.setState({showFoot:2});
        pageNo++;
        //获取数据
        this.fetchData( pageNo );
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _renderItem = (value, index) => {
        return (
           <View
               style={styles.list} key={index}>
               {
                 value.picture?(
                     <Image style={styles.listLeft} source={{uri: value.picture}} onPress={()=>this._commodityDetails(value.id)}/>
                 ):  <Image style={styles.listLeft} source={require('./../../../../images/mine/bg.png')} onPress={()=>this._commodityDetails(value.id)}/>
               }
               {
                  value.inventory <= 0 ?(
                     <Text style={styles.SoldOut}>已售完</Text>
                  ):null
               }
               <View
               style={styles.listRight}>
                   <TouchableOpacity onPress={()=>this._commodityDetails(value.id)}>
                       <Text style={[value.inventory <= 0 ?{fontSize: 13,color:'#999999'}:{fontSize: 13,}]}>{value.productName}</Text>
                   </TouchableOpacity>
                   <View style={styles.price}>
                       <Text style={[value.inventory <= 0?{fontSize: 13, color: '#999'}:{fontSize: 13,color:'red'}]} onPress={()=>this._commodityDetails(value.id)}>￥{value.price}</Text>
                       {
                            value.inventory <= 0 || value.productStatus !=2 ?
                            (
                               <Image source={require('./../../../../images/mine/tianjiashangpinhui.png')}
                                />
                            ):(
                                <TouchableOpacity onPress={() => this._cart(value.id)}>
                                    <Image source={require('./../../../../images/tianjia.png')}/>
                                </TouchableOpacity>
                            )
                       }
                   </View>
               </View>
           </View>
        );
    }

 }
