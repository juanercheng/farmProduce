/**
 * Created by Zero on 2018/3/16
 */

import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,Title, Text ,Input} from 'native-base';
import {
    StyleSheet,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    DeviceEventEmitter,
    AppRegistry,
    Alert,
    TextInput ,
    Platform,
    Linking,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
    Picker,
    ImageBackground
}from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'

import LoginView from './../../common/LoginView'
import SettingStyle from './../../../js/SettingStyle';
import styles from './ShopCarStyle';
import Util from './../../../js/util';
import http from './../../../js/http';
import global from './../../../js/global';

export  default class ShopCar extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
            totalMoney :0,
            data:null,
            loaded:false,
            isSel : false, //店铺
            isSelGoods:false, //商品
            allSelect:false, //全选
            selNum :null,
            goodNum:null, // 结算商品个数
            accountData:null, //结算带到订单页面的信息
        }
    }
    componentDidMount() {
        this.fetchData()
        DeviceEventEmitter.addListener('shopCarRefresh',(dic)=>{
            this.setState({
                loaded: false,
            });
            this.fetchData();
        });
    };
    componentWillUnmount(){
        console.log('out')
    }

    //购物车列表
    fetchData() {
        let params ={
            pageCurrent:1,
            pageSize:10,
        };
        let that = this;
        http.postData("producteCar/shopCars",params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that._data=res.object;

                    that._data["isAllSelect"] = false;
                    for(let i in that._data.shopInfo){
                        that._data.shopInfo[i]["isSelectStore"] = false;
                        that._data.shopInfo[i]["money"] = 0;
                        for(let j in that._data.shopInfo[i].goodsList){
                            that._data.shopInfo[i].goodsList[j]["isSelect"] = false
                        }
                    }
                    // console.log(that._data);
                    that.setState({
                        data:  that._data,
                        loaded: true,
                    });
                }
        })
    }
    //删除购物车
    removeCar(){
        console.log(global.shop.shopCarIds);
        let params ={
            shopIds:encodeURI(global.shop.shopCarIds.toString()),
        };
        console.log(params.shopIds);
        let that = this;
        http.postData("producteCar/deleteShopCar",params,
            function(res){
                console.log( res )
                if(res.code===0){
                    that.fetchData()
                }
            })
    }
    itemIncrease = (i,id,item) => {
        // console.log(item)
        i++;
        this.setState({
            selNum:i
        })
        item.number  = i;
        this.changeNumberData(id,i)
    };

    itemReduce = (i,id,item) => {
        if (i <= 1) {
            return;
        }
        i--;
        this.setState({
        })
        item.number  = i;
        this.changeNumberData(id,i)
    };
    //修改购物车数量
    changeNumberData(id,number) {
        let datas =  encodeURI(JSON.stringify([{id:id,number:number}]));
        let params = {
            shopCart:datas
        };
        let that = this;
        http.postData("producteCar/changeShoppingCart",params,
            function(res){
                console.log(res)
                if(res.code===0){
                    that.totalMoney ()
                }
            })
    }
    //点击隐藏结算 显示删除
    showEditClick = () => {
        this.state.show = !this.state.show;
        this.setState({
            show: this.state.show,
        })
    };
    _next (routName,accountData,ids) {
        const { navigate } = this.props.navigation;
        navigate(routName,{
            accountData:accountData,
            ids:ids,
        })
    }
    //店铺选择
    selectItem  (item)  {
        item.isSelectStore = !item.isSelectStore
        this.setState({ isSel : !this.state.isSel })

        for(let i in item.goodsList){
            // console.log(item.isSelectStore)
            item.goodsList[i].isSelect = item.isSelectStore
        }
        //获取选择店铺所属商品总金额
        //删除数组某一项
        Array.prototype.remove = function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        if(item.isSelectStore===true){
            for(let i in item.goodsList){
                global.shop.shopCarIds.push(item.goodsList[i].id)
            }
        }else{
            for(let i in item.goodsList){
                global.shop.shopCarIds.remove(item.goodsList[i].id)
                // debugger
            }
        }
        console.log(item.shopId)
        this.totalMoney (item.shopId)
    }
    //商品选择
    selectGoodsItem  (item)  {
        console.log(item);
        console.log(this.state.data)
        //合计
        let list = this.state.data.shopInfo;
        for(let i in list){
            for(let j in list[i].goodsList){
                if(list[i].goodsList[j].isSelect){
                    if(list[i].shopId ===  list[i].goodsList[j].shopId){
                        list[i].money +=   parseFloat((list[i].goodsList[j].number *  list[i].goodsList[j].productPrice).toFixed(2));
                    }
                }

            }
        }
        console.log(this.state.data)
        item.isSelect = !item.isSelect
        this.setState({ isSelGoods : !this.state.isSelGoods });

        //获取选择商品的总金额
        Array.prototype.remove = function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
        if(item.isSelect===true){
            global.shop.shopCarIds.push(item.id)
        }
        if(item.isSelect===false ){
            global.shop.shopCarIds.remove(item.id)
        }
        this.totalMoney ()
    }
    //获取的总金选中额
    totalMoney (e){
        let params ={
            shopCarIds:encodeURI(global.shop.shopCarIds.toString()),
        };
        console.log(params.shopCarIds);
        let that = this;
        http.postData("producteCar/getProductCarPrice",params,
            function(res){
                console.log( res )
                if(res.code===0){
                    that.setState({
                        totalMoney : res.object
                    },function () {
                        // that.state.data.shopInfo.money=res.object
                    })

                }
            })
    }
    //全选
    allSelect (item) {
        item.isAllSelect = !item.isAllSelect
        this.setState({allSelect:!this.state.allSelect})
        for(let i in item){
            item[i].isSelectStore =  item.isAllSelect
            for(let j in item[i].goodsList){
                item[i].goodsList[j].isSelect =  item.isAllSelect
                //提交选中商品id
                if(item[i].goodsList[j].isSelect===true){
                    global.shop.shopCarIds.remove(item[i].goodsList[j].id)
                    global.shop.shopCarIds.push(item[i].goodsList[j].id)
                }
                if(item[i].goodsList[j].isSelect===false ){
                    global.shop.shopCarIds.remove(item[i].goodsList[j].id)
                }
            }
        }
    };
    //点击结算提交数据
    _accounts(item){
         console.log(item)
         let arr=[];
         for(let i in item.goodsList){
             console.log(item.goodsList[i].id)
              if(item.goodsList[i].isSelect){
                  arr.push(item.goodsList[i].id)
              }
         }
         if(arr.length>0){
             let params ={
                 shopCarIds:encodeURI(arr.toString()),
                 shopId:item.shopId,
             };
             console.log(params);
             let that = this;
             http.postData("order/settlementOrder",params,
                 function(res){
                     console.log( res )
                     if(res.code===0){
                         that.setState({
                             accountData:res.object
                         });
                         that._next('ConfirmOrder',that.state.accountData,params.shopCarIds)
                     }
                 })
         }else{
             this.refs.toast.show('请选择要结算的商品！');
         }
    }
    _text(text){
        text = text.replace(/\D/g,'');
        return text
    }
    keyExtractor = (item) => item.shopId;
    keyExtractor1 = (item) => item.id;
    _renderStore(){

        return(
            <FlatList data={this.state.data.shopInfo}
                      renderItem={({item}) => this._renderStoreView(item)}
                      keyExtractor={ this.keyExtractor }
                      extraData={this.state}
            />
        )
    }
    _renderStoreView(item){

        if (item.goodsList !== null){
            // let money = item.money
            // item.goodsList.map((value,index)=>{
            //     console.log(value,'value')
            //     if(value.isSelect){
            //         money = money +  parseFloat((value.number *  value.productPrice).toFixed(2));
            //         debugger
            //         console.log(item.money,'item.money')
            //     }
            //
            // })
            // item.money = money
            return (
                <View style={{backgroundColor:"#f0f2f5"}}>
                    <View style={{ paddingBottom:0 }}>
                        <View style={styles.goodsListWrap} >
                            <View style={styles.storesWrap} >
                                <View style={styles.storesRadioWrap}>
                                    <TouchableOpacity  onPress={() => this.selectItem(item)}  >
                                        <Image
                                            source={ item.isSelectStore  ?  require('./../../../../images/xuanzhong.png')
                                                : require('./../../../../images/weixuanzhong.png') }/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.storesTitleWrap}>
                                    <Image   source={require("./../../../../images/shop/mendian.png")} />
                                    <Text style={styles.storesTitle} >{ item.shopName }</Text>
                                </View>
                            </View>
                            {this._renderGoods(item)}
                            {/*结算按钮*/}
                            {
                                this.state.show ?
                                    <View  style={[styles.footer,{justifyContent:"space-between"}]} >
                                        <View style={styles.allWrap}>
                                            <Text>合计:<Text style={{color:"#ff4e3c",}}>￥{ item.money}</Text> </Text>
                                            <Text style={{color:"#4d4d4d",fontSize:14,marginLeft:"5%"}}>(免运费)</Text>
                                        </View>
                                        {/*<TouchableOpacity  style={styles.goBtn} onPress={ global.shop.shopCarIds.length>0?*/}
                                        {/*()=>this._next("ConfirmOrder",global.shop.shopCarIds,this.state.totalMoney)*/}
                                        {/*:()=>this._toast()}>*/}
                                        <View style={styles.goBtnWrap}>
                                            <TouchableOpacity  style={styles.goBtnd} onPress={
                                                ()=>this._accounts(item)}>
                                                <ImageBackground style={{flex:1,flexDirection:"row",alignItems:"center"}}
                                                                 source={require('./../../../../images/mine/btn.png')} resizeMode='cover'>
                                                    <Text style={styles.goText}  >去结算</Text>
                                                </ImageBackground>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    :null
                            }
                        </View>
                    </View>
                </View>
            );
        }
    }
    _renderGoods(item){
        return(
            <FlatList data={item.goodsList}
                      renderItem={({ item,index}) => this._renderGoodsView(item,index)}
                      keyExtractor1={ this.keyExtractor1 }
                      extraData={this.state}
            />
        )
    }
    _renderGoodsView(item,index){
        return(
            <View style={styles.goodsWrap}>
                <View style={styles.goodsRadioWrap}>
                    <TouchableOpacity   onPress={() => this.selectGoodsItem(item)} >
                        <Image    source={ item.isSelect  ?  require('./../../../../images/xuanzhong.png')
                            : require('./../../../../images/weixuanzhong.png') }/>
                    </TouchableOpacity>
                </View>
                <View style={styles.goodsImgWrap}>
                    <Image  style={styles.goodsImg}  source={{ uri : item.productImg }}/>
                </View>
                <View style={styles.goodsTitleWrap}>
                    <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                        <Text style={styles.goodsTitle}>{  item.productName }</Text>
                    </View>
                    <Text style={styles.goodsColorText}>{  item.standardName }</Text>
                    <View style={styles.moneyWrap}>
                        <View style={{ flexDirection: 'row',flex:1}}>
                            <Text style={styles.moneyDis}><Text style={{color:"#ff4e3c",fontSize:12}}>￥</Text>{   item.productPrice }</Text>
                        </View>
                        <View style={styles.moneyWrapRight}>
                            <TouchableOpacity style={  [styles.reduceNum,{ backgroundColor : item.number <= 1 ? '#dcdcdc' : '#20a200' }] }
                                              onPress={() => this.itemReduce(item.number,item.id,item)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>-</Text>
                            </TouchableOpacity>
                            <View style={ styles.numTextWrap }>
                                <Input style={styles.selNumText}
                                       value={ `${ item.number}`}     keyboardType='numeric'   maxLength={3}
                                       onChangeText={(text) => this.setState({selNum:this._text(text)})} />
                            </View>
                            <TouchableOpacity style={  [styles.reduceNum,{backgroundColor:"#20a200"}] }
                                              onPress={() => this.itemIncrease(item.number,item.id,item)}>
                                <Text style={[styles.numText,{color:"#fff"}] }>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        if (!this.state.loaded ) {
            return <LoginView/>
        }
        return this.renderView();
    }
    renderView() {
        let { allSelect, totalMoney } = this.state;
        return (
            <Container style={{backgroundColor:"#f0f2f5"}} >
                <Header  style={{backgroundColor:"#fff",justifyContent:"space-between"}} >
                    <Left style={{flex:1}}>
                    </Left>
                    <Body style={{flex:1 }}>
                    <Title style={{color:"#000",textAlign:"center",width:"100%"}}>购物车</Title>
                    </Body>
                    <Right style={{flex:1}}>
                        <TouchableOpacity  onPress={()=>this.showEditClick()} >
                            <Text>{this.state.show ? <Text>编辑</Text> : <Text>完成</Text>}</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>

                {this._renderStore()}

                { this.state.show ?null
                    :
                    <View  style={[styles.footer,{ height:50,justifyContent:"space-between",borderTopWidth:1,borderTopColor:"#dadada"}]}>
                        <View style={styles.allBtn}>
                            <TouchableOpacity
                                onPress={() => this.allSelect(this.state.data.shopInfo)} >
                                <Image  source={ this.state.allSelect ?
                                    require('./../../../../images/xuanzhong.png')
                                    : require('./../../../../images/weixuanzhong.png') }/>
                            </TouchableOpacity>
                            <Text style={{fontSize:14,marginLeft:15, }}>全选</Text>
                        </View>
                        <View style={styles.allWrap}></View>
                        <TouchableOpacity onPress={() => this.removeCar()}
                                          style={[styles.goBtn,{backgroundColor:"#ff4e3c"}]}>
                            <Text style={styles.goText}   >删除</Text>
                        </TouchableOpacity>
                    </View>
                }
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                />
            </Container>
        );
    }
}
