import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Footer, FooterTab,Title,Tabs,Tab,Text,TabHeading,Icon,Item,Input} from 'native-base'
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    FlatList
} from 'react-native';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation'
import Util from './../../js/util';
import styles from './../recommend/RecomStyle';
import AllPoints from './../recommend/Commission/AllPoints'
import IntegralIncome from './../recommend/Commission/IntegralIncome';
import IntegralSpending from './../recommend/Commission/IntegralSpending';
var url=url=Util.imgPath+"/api/lotteryRule/findLotteryRuleList";
const Table = TabNavigator(
    {
        AllPoints: {
            screen: AllPoints,
            navigationOptions: {
                tabBarLabel: '全部',
            },
        },
        IntegralIncome: {
            screen: IntegralIncome,
            navigationOptions: {
                tabBarLabel: '收入',
            },
        },
        IntegralSpending: {
            screen: IntegralSpending,
            navigationOptions: {
                tabBarLabel: '支出',
            },
        },
    },
    {
        tabBarPosition:'top',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        showLabel:false,
        tabBarOptions: {
            style: {backgroundColor: '#fff',overflow:"hidden",borderBottomWidth:1,borderBottomColor:'#ddd'},
            activeTintColor: '#000000',
            inactiveTintColor: '#999999',
            tabStyle:{
                height:40
            },
            indicatorStyle:{
                width:40,
                backgroundColor:'#23a300',
                justifyContent:'center',
                flexDirection:'row',
                left:45
            },
            labelStyle: {
                fontSize: 12, // 文字大小
                fontWeight:'bold',
                color:'#999'
            },
        }
    }
)
export default class Recommend extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: "积分明细",
        headerStyle:{
            backgroundColor:'#20a200',
            paddingLeft:10,
            paddingRight:15,
            elevation:0,
        },
        headerTitleStyle:{
            flex:2,
            color:'#fff',
            fontSize:16,
            alignSelf:'center'
        },
        headerRight:<Text onPress={()=>{}} style={{fontSize:16,color:'#fff'}}>积分规则</Text>,
        headerTintColor:'#fff',
    })
    constructor (props){
        super(props);
        this.state={
            data:null,
        };
        this.fetchData=this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData();
    }
    fetchData(){
        fetch(url,{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded:charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((responseJson)=>{
                this.setState({
                    data:responseJson.object[0].memo,
                })
            })
    }
    render() {
        return (
            <Container>
                <View style={styles.headerTitle}>
                    <View style={{justifyContent:'center',flexDirection:'row',alignItems:'center',left:-10}}>
                        <Image style={{width:13,height:12,marginRight:10}} source={require('./../../../images/recommend/total_integral_prefix.png')}/>
                        <Text style={{color:'#fff',fontWeight:'bold',fontSize:30}}>{this.state.data}0000</Text>
                    </View>
                    <Text style={{color:'#fff',fontSize:12,borderWidth:1,borderColor:'#fff',paddingLeft:20,paddingRight:20,paddingTop:5,paddingBottom:5}}>去兑换</Text>
                </View>
                <View style={styles.contentMain}>
                    <Table/>
                </View>
            </Container>
        );
    }
}