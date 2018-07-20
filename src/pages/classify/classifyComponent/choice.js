/**
 * Created by yangHL on 2018/3/20.
 */
import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Footer, FooterTab, Title, Text, Tab, TabHeading, Tabs, Icon, Item, Input} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TextInput,
    FlatList,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import styles from './../classifyStyle'
import http from "../../../js/http";
import LogintView from './../../common/LoginView'
import global from "../../../js/global";
// import Toast, {DURATION} from 'react-native-easy-toast'

export default class choice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            type: [],
            sortID:global.sortID,
            shop:[],
            three:false,
            first:true,
            // sort:this.props.secondModel[0].categoryId
        }
    }
    componentDidMount() {}
    //添加商品至购物车
    _add(id){
        console.log(id);
        let params = {
            productId:id
        };
        http.postData("producteCar/addShopCart",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    Toast.info('加入购物车成功');
                    DeviceEventEmitter.emit('shopCarRefresh', res.code);
                }else{
                    console.log(res.msg);
                    // this.refs.Toast.show(res.msg)
                }
            })
    }
    //种类
    _renderType(){
        var _type = this.props.secondModel;
        return(
            _type.map((value,index)=>{
                return(
                    global.classify.id === index ?
                        <TouchableOpacity style={[styles.leftContent, {backgroundColor: '#ffffff'}]}
                                          onPress={() => this.props._typeChoice(value.categoryId,index,
                                              this.setState({sort:value.categoryId}),global.classify.id = index,global.classify.sortID = 0)} key={index}>
                            <Text style={[styles.leftContentText,{borderLeftWidth:2,borderLeftColor:"red", color:"red"}]}>{value.categoryName}</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.leftContent}
                                          onPress={() => this.props._typeChoice(value.categoryId,index,
                                              this.setState({id:index,sort:value.categoryId}),global.classify.id = index,global.classify.sortID = 0)} key={index}>
                            <Text style={styles.leftContentText}>{value.categoryName}</Text>
                        </TouchableOpacity>
                )
            })
        )
    }
    //商品
    _renderCommodity(item,index){
        return(
                <TouchableOpacity style={styles.commodity} key={index} onPress={()=>this.props._commodityDetails('commodityDetails',item.id,item.productType)}>
                    <Image source={require('./../../../../images/loginBanner.png')}
                           style={styles.commodityImage}/>
                    <View style={styles.commodityRight}>
                        <View>
                            <Text style={{fontSize: 13}}>{item.productName}</Text>
                        </View>
                        <View style={styles.commodityPrice}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color: "red", fontSize: 12}}>￥{item.price}</Text>
                                <Text style={{
                                    color: "#999999",
                                    fontSize: 12,
                                    marginLeft: 8,
                                    textDecorationLine: 'line-through'
                                }}>￥{item.original}</Text>
                                <Text style={styles.commodityPriceText}>{item.activity}</Text>
                            </View>

                            <TouchableOpacity onPress={()=>this._add(item.id)}>
                                <Image source={require('./../../../../images/tianjia.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
        )
    }
    keyExtractor = (item) => item.id;
    _renderShop(){
        let shopList = this.props.shopList;
        // let id = Number(shopList[0].categoryId);
        return(
            <FlatList data={shopList}
                      renderItem={({item,index}) => this._renderCommodity(item,index)}
                      keyExtractor={ this.keyExtractor }
                      onEndReachedThreshold={0.5}
                      onEndReached={this.props._hello}
            />
        )
    }
    _renderSort(){
        let sortList = ['综合排序','销量排序','价格排序'];
        return (
            sortList.map((value, index)=>(
                global.classify.sortID === index ?
                        <Text onPress={() => this.props._sort(index,global.classify.sortID = index)} key={index} style={[styles.comprehensiveSort,{color: 'red'}]}>{value}</Text>:
                        <Text onPress={() => this.props._sort(index,global.classify.sortID = index)} key={index} style={styles.comprehensiveSort}>{value}</Text>
                )
            )
        )
    }
    render() {

        return (
            <Container style={{backgroundColor:"#fff",height:'100%'}}>
                <View style={styles.content}>
                    <View style={styles.left}>
                        <ScrollView style={{marginBottom:40}} showsVerticalScrollIndicator={false}>
                            {this._renderType()}
                        </ScrollView>
                    </View>
                    <View style={styles.right}>
                        <View style={styles.rightSort}>
                            {this._renderSort()}
                        </View>
                        <View style={{marginBottom:40}}>
                            {this._renderShop()}
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}