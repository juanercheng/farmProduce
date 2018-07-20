/**
 * Created by yangHL on 2018/3/26.
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
    TextInput,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './storeStyle'
import px2dp from './../../../js/px2dp'
import SettingStyle from "../../../js/SettingStyle";
import http from "../../../js/http";
import global from "../../../js/global";
import LoginView from './../../common/LoginView'

export default class store extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("商家简介"),
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
            <View style={{marginRight: 10}}>
                <Image source={require('./../../../../images/fenxiang.png')}
                      />
            </View>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            loade:true,
            comment:[],
            shopDetails:null
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        let params = {
            shopId:global.home.shopId
        };
        let that = this;
        http.getData("shop/detail",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    console.log('OK');
                    that.setState({
                        loade:false,
                        shopDetails:res.object
                    })
                }else{
                    console.log(res.msg)
                }
            })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }

    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }

    _render() {
        let shopDetails = this.state.shopDetails;
        return (
            <Container>
                <ScrollView>
                <View>
                    <Image source={{uri:shopDetails.showImg}}
                           style={{ width:'100%',height: 125}}/>
                    <Image source={{uri:shopDetails.showImg}}
                           style={styles.head}/>
                </View>
                <View style={styles.title}>
                    <View style={styles.titleName}>
                        <Text style={{color:'#000',fontSize:14}}>{shopDetails.shopName}</Text>
                    </View>
                    <Text style={{color:'#434444',fontSize:13,marginTop:15}}>{shopDetails.brief}</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.contact}>
                    <Text style={styles.contactTitle}>联系方式</Text>
                    <View style={styles.contactName}>
                        <View style={{width:20,flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('./../../../../images/yonghu.png')}/>
                        </View>
                        <Text style={[styles.contactNameText,{width:40}]}>{shopDetails.contacts}</Text>
                        <Image style={{width:px2dp(90),height:30,marginLeft:10,borderRadius:3}} source={require('./../../../../images/mine/call.png')}/>
                    </View>
                    <View style={styles.contactName}>
                        <View style={{width:20,flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('./../../../../images/dizhiliang.png')}/>
                        </View>
                        <Text style={styles.contactNameText}>地   址:</Text>
                        <Text style={[styles.contactNameText,{marginLeft:10}]}>{shopDetails.address}</Text>
                    </View>
                    <View style={styles.contactName}>
                        <View style={{width:20,flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('./../../../../images/QQlianxi.png')}/>
                        </View>
                        <Text style={styles.contactNameText}>Q     Q:</Text>
                        <Text style={[styles.contactNameText,{marginLeft:10}]}>{shopDetails.qq}</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'flex-start',marginTop:12}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <View style={{width:20,flexDirection:'row',alignItems:'center'}}>
                                <Image source={require('./../../../../images/weixinlianxi.png')}/>
                            </View>
                            <Text style={styles.contactNameText}>微   信:</Text>
                        </View>
                        <Image style={{width:90,height:90,marginLeft:10,borderWidth:1,borderColor:'#e6e6e6'}} source={require('./../../../../images/mine/QRcode.png')}/>
                    </View>
                </View>
                </ScrollView>
            </Container>
        )
    }
}