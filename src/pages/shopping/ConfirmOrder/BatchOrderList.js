/**
 * Created by Zero on 2018/3/26
 */
import React, { Component } from 'react';
import { Container,  Text ,Button } from 'native-base';
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
    StyleSheet,
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import confirmStyles from './ConfirmOrderStyle';


import styles from '../shopCar/ShopCarStyle';
import Util from './../../../js/util';


export  default class ConfirmOrder extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle: ("确认订单"),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTintColor: "#333",
        headerTitleStyle: {
            color: "#333",
            alignSelf: 'center',
        },
        tabBarVisible: false,
        headerLeft:(
            <Button transparent style={{height:"100%"}} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={[SettingStyle.headerBack ]} source={require('./../../../../images/header/fanhui.png')} />
            </Button>
        ),
        headerRight:(
            <View>
                <Text style={{marginRight:15}}>共{navigation.state.params.length}件</Text>
            </View>
        )
    });

    constructor(props){
        super(props);
        this.state = {
            data: this.props.navigation.state.params.title
        };
        console.log(this.state.data)
    }

    componentDidMount(){
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
            length:this.state.data.length
        })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };
    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate(routName);
    }

    fetchData() {
    }
    render() {
        return (
            <Container>
                <ScrollView>
                    <View>
                        {
                            this.state.data.map((item,index)=>(
                                <View key={index} style={[styles.goodsWrap,{ borderTopWidth:1,borderTopColor:"#f0f2f5"}]} >
                                    <View style={[styles.goodsImgWrap,{marginRight:10,}]}>
                                        <Image  style={styles.goodsImg}  source={{ uri : item.productImg }} />
                                    </View>
                                    <View style={[styles.goodsTitleWrap,{width:"73%"}]}>
                                        <View style={{ flexDirection: 'row',justifyContent:"space-between",height:38,}}>
                                            <Text style={[styles.goodsTitle]} ellipsizeMode='tail'
                                                  numberOfLines={2}>{item.productName}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row',justifyContent:"space-between"}}>
                                            <Text style={styles.goodsColorText}>{item.productSku}</Text>
                                            <Text style={styles.goodsColorText}>x{item.number}</Text>
                                        </View>
                                        <View style={styles.moneyWrap}>
                                            <View style={{ flexDirection: 'row',flex:1}}>
                                                <Text style={styles.moneyDis}><Text style={{color:"#ff4e3c",fontSize:12}}>￥</Text>{item.buyPriceSingle}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center",marginTop:10,}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Image   source={require("./../../../../images/shop/tishi.png")} />
                            <Text style={[SettingStyle.font12,{ paddingLeft:10}]}>若对价格存有疑问，可返回查看详情</Text>
                        </View>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
