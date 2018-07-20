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
    ImageBackground,
    TextInput,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './newsSyle'
import px2dp from './../../../js/px2dp'
import NewList from './newsComponent/newsList'
import SettingStyle from "../../../js/SettingStyle";
import http from './../../../js/http';
import global from './../../../js/global';

const newsUrl = 'cfg/messageCountByType';

export default class news extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("消息"),
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
            <View>
            </View>
        )
    })

    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        this.newsNum();
        this.subscription = DeviceEventEmitter.addListener('type',(type) =>{
            this.setState({
                tabType:type
            })
        })
    }

    componentWillUnmount(){
        this.subscription && this.subscription.remove();
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            newsNum1:false,
            newsNum2:false,
            newsNum3:false,
            tabType:10003,
        }
    }

    _newsDetails(name,id){
        const navigation = this.props.navigation;
        navigation.navigate(name,{
            Id:id
        });
    }

    newsNum(){
        let params ={}
        let _this = this
        http.postData( newsUrl,params,
           function(res){
               _this._data = res.object;
               if(_this._data[10001] > 0){
                    _this.setState({newsNum1:true});
               }
               if(_this._data[10002] > 0){
                   _this.setState({newsNum2:true});
               }
               if(_this._data[10003] > 0){
                   _this.setState({newsNum3:true});
               }
           }
        )
    }

    render() {
        return (
            <Container style={{position:'relative'}}>
                <View style={{flexDirection: 'row',justifyContent: 'space-around',backgroundColor:'#fff'}}>
                    <TouchableOpacity onPress={()=>this.tabsChange('10003')}>
                          {
                            this.state.newsNum1?(<Image source={require('./../../../../images/header/news.png')}
                             style={styles.newsNum} />):null
                          }
                          <Text style={this.state.tabType==10003?styles.activeTextStyle:styles.tabsText}>订单消息</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.tabsChange('10002')}>
                        {
                            this.state.newsNum2?(<Image source={require('./../../../../images/header/news.png')}
                             style={styles.newsNum} />):null
                        }
                        <Text style={this.state.tabType==10002?styles.activeTextStyle:styles.tabsText}>积分消息</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.tabsChange('0')}>
                        {
                            this.state.newsNum3?(<Image source={require('./../../../../images/header/news.png')}
                            style={styles.newsNum} />):null
                        }
                        <Text style={this.state.tabType==0?styles.activeTextStyle:styles.tabsText}>系统消息</Text>
                    </TouchableOpacity>
                </View>
                <NewList _details={(name,id)=>{this._newsDetails(name,id)}} onClick={this._newsDetails}/>
            </Container>
        )
    }

    tabsChange(type){
        DeviceEventEmitter.emit('type', type);
        this.setState({
            tabType:type
        })
    }

}