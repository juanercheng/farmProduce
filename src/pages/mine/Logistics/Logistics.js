/**
 * Created by Zero on 2018/3/28
 */
import React, { Component } from 'react';
import { Container, Header, Left, Body, Right,List,ListItem, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base';
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
    StyleSheet
}from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import http from "../../../js/http";

const getLogisticsInfoByOrderNo = 'driverLogistics/getLogisticsInfoByOrderNo';

export  default class Logistics extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        title: '查看物流',
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
            message:'正在加载数据...',
            data:null,
            loaded: false,
            logisticsDetail:null,

            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 116.373798,
                latitude: 39.919583
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 116.373798,
                latitude: 39.919583,
                title: "Window of the world"
            }]
        };
    }

    componentDidMount(){
        this.fetchData();
        this.props.navigation.setParams({
            navigatePressBack:this.goBack,
        })
        Geolocation.getCurrentPosition().then(
            (data) => {
                this.setState({
                    zoom:18,
                    markers:[{
                        latitude:data.latitude,
                        longitude:data.longitude,
                        title:'我的位置'
                    }],
                    center:{
                        latitude:data.latitude,
                        longitude:data.longitude,
                    }
                })
                console.log( data)
            }
        ).catch(error => {
            console.warn(error,'error')
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    }

    fetchData() {
        console.log(this.props.navigation.state.params.orderNo)
        let params ={
            orderNo:this.props.navigation.state.params.orderNo,
        };
        let _this = this;
        http.getData( getLogisticsInfoByOrderNo,params,
            function(res){
                console.log(res);
                if(res.code===0){
                    _this._data = res.object;
                    _this.setState({
                        loaded: true,
                        data:_this._data.logistics,
                        logisticsDetail:_this._data.logisticsDetail,
                    });
                    for (var i in logisticsDetail){
                        this.setState({
                            zoom:18,
                            markers:[{
                                latitude:logisticsDetail[0].latitude,
                                longitude:logisticsDetail[0].longitude,
                                title:'我的位置'
                            }],
                            center:{
                                latitude:logisticsDetail[0].latitude,
                                longitude:logisticsDetail[0].longitude,
                            }
                        })
                    }
                }else if(res.code===500){
                    _this.setState({
                        loaded: true,
                        data:null
                    })
                }
            }
        )
    }

    _next(routName){
        const navigation = this.props.navigation;
        navigation.navigate( routName);
    }

    render() {
        let rowData = this.state.data;
        if (!this.state.loaded ) {
            return this.renderLoadingView();
        }
        return (
            <Container>
                <View>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        markers={this.state.markers}
                        style={styles.map}
                        onMapClick={(e) => {
                        }}
                    >
                    </MapView>
                </View>
                <View style={styles.Maprow}>
                    <Button title="Normal" onPress={() => {
                        this.setState({
                            mapType: MapTypes.NORMAL
                        });
                    }}> </Button>
                    <Button   title="Satellite" onPress={() => {
                        this.setState({
                            mapType: MapTypes.SATELLITE
                        });
                    }}> </Button>

                    <Button  title="Locate" onPress={() => {
                        Geolocation.getCurrentPosition().then(
                            (data) => {
                                this.setState({
                                    zoom:18,
                                    markers:[{
                                        latitude:data.latitude,
                                        longitude:data.longitude,
                                        title:'我的位置'
                                    }],
                                    center:{
                                        latitude:data.latitude,
                                        longitude:data.longitude,
                                    }
                                })
                            }
                        ).catch(error => {
                            console.warn(error,'error')
                        })
                    }}>
                    </Button>
                </View>

                <View style={styles.Maprow}>
                    <Button title="Zoom+" onPress={() => {
                        this.setState({
                            zoom: this.state.zoom + 1
                        });
                    }}> </Button>
                    <Button title="Zoom-" onPress={() => {
                        if(this.state.zoom > 0) {
                            this.setState({
                                zoom: this.state.zoom - 1
                            });
                        }
                    }}> </Button>
                </View>

                <View style={styles.Maprow}>
                    <Button title="Traffic" onPress={() => {
                        this.setState({
                            trafficEnabled: !this.state.trafficEnabled
                        });
                    }}> </Button>

                    <Button title="Baidu HeatMap" onPress={() => {
                        this.setState({
                            baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled
                        });
                    }}> </Button>
                </View>
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
}
const styles = StyleSheet.create({
    wrap:{
        width:Util.width,
        backgroundColor:"#fff",
        flexDirection:"row",
        padding:15,
        marginBottom:10,
    },
    Maprow: {
        flexDirection: 'row',
        justifyContent:'center',
        height: 40,
        marginTop:20
    },
    img:{
        width:70,
        height:70,
        marginRight:10,
    },
    logBottom:{
        padding:15,
        marginBottom:10,
        width:Util.width,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"#e6e6e6"
    },
    logWrap:{
        width:Util.width,
        flexDirection:"row",
    },
    leftWrap:{
        height:175,
        width:25,
        paddingTop:10,
        flex:1,
        // backgroundColor:"blue",

    },
    greenImg:{
        height:"100%",
        width:"100%",
    },
    greyImg:{
        height:85,
        width:25,
        paddingTop:5,
        flex:1,
    },
    timeWrap:{
        flex:3,
        // marginRight:20,
        // backgroundColor:"red",
        paddingLeft:5,
        paddingRight:5,
    },
    rightWrap:{
        paddingTop:8,
        flex:9,
    },
    mapWrap:{
        width:"100%",
        height:125,
        marginTop:5,
    },
    map:{
        width:"100%",
        height:"100%",
    }

})
