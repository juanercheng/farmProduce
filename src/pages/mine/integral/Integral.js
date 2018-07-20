/**
 * Created by juaner by 18-03-26
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity,
    DeviceEventEmitter,
    ViewPagerAndroid,
    ScrollView,
    TouchableHighlight,
}from 'react-native';
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './IntegralStyle'
import IntegralList from'./IntegralList'


export  default class Integral extends Component{
    static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,  //隐藏导航栏
    headerTitle: ("积分明细"),
    headerStyle: {
        backgroundColor: "#20a200",
        elevation: 0
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        color: "#fff",
        alignSelf: 'center',
    },
    headerLeft:(
        <Button transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
            <Image style={SettingStyle.headerBack} source={require('./../../../../images/header/go-back-white.png')} />
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
            scroeIn:null,
        };
    }

    componentDidMount(){
        this.props.navigation.setParams({
             navigatePressBack:this.goBack,
        })

        DeviceEventEmitter.addListener('scroeIn',(value)=>{
           this.setState({
               scroeIn:value,
           })
        })
    }

    goBack = () => {
         const { goBack,navigate } = this.props.navigation
         goBack ()
    }


    render(){
        return this.renderView()
    }


    endClick(routName,id) {
       const { navigate } = this.props.navigation;
       navigate( routName ,{
          Id:id,
       })
    }

    renderView() {

        return (
            <Container>
                 <View style={styles.headerBox}>
                     <View style={{flex:1}}></View>
                     <View style={styles.headerCenter}>
                          <View style={{ flexDirection:'row',alignItems:'center',marginBottom:21}}>
                             <Image style={{width:16,height:14,marginRight:8}} source={require('./../../../../images/mine/jifenmy.png')} />
                             <Text style={[{fontSize:33},styles.write]}>{this.state.scroeIn}</Text>
                          </View>
                     </View>
                     <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row'}}>
                         <TouchableOpacity onPress={()=>this.endClick('IntegralRule')}><Text style={[styles.write,SettingStyle.font12]}>积分规则</Text></TouchableOpacity>
                     </View>
                 </View>
                 <Tabs style={styles.tab} tabBarPosition="top"
                         tabBarUnderlineStyle={{backgroundColor:"#23a300",width:"2%", marginLeft:"11%"}}
                         initialPage={0}>
                      <Tab heading='全部' textStyle={[{color:'#999'},SettingStyle.font14]}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                            <IntegralList incomeExpensesType=' ' onClick={this.endClick} nextClick={(routName,id,title) => {this.endClick(routName,id)}} />
                      </Tab>
                      <Tab heading='收入' textStyle={[{color:'#999'},SettingStyle.font14]}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                            <IntegralList incomeExpensesType='1' onClick={this.endClick}  nextClick={(routName,id,title) => {this.endClick(routName,id)}}/>
                      </Tab>
                      <Tab heading='支出' textStyle={[{color:'#999'},SettingStyle.font14]}
                             tabStyle={{backgroundColor:'#fff'}}
                             activeTabStyle={{backgroundColor:'#fff'}}
                             activeTextStyle={[{color:'#333',fontWeight:'normal'},SettingStyle.font14]}>
                            <IntegralList incomeExpensesType='-1' onClick={this.endClick} nextClick={(routName,id,title) => {this.endClick(routName,id)}}/>
                      </Tab>
                 </Tabs>
            </Container>
        )
    }
}
