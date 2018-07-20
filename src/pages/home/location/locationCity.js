/**
 * Created by yangHL on 2018/3/29.
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
    Input,
} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    ImageBackground,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import LoginView from './../../common/LoginView'
import Swiper from 'react-native-swiper';
import styles from './locationStyle'
import px2dp from './../../../js/px2dp'
import SettingStyle from "../../../js/SettingStyle";
import http from "../../../js/http";

export default class locationCity extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.provinceName,
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
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            loade:true,
            city:['静安区','闸北区','虹口区','杨浦区','宝山区','嘉定区',]
        }
    }
    componentDidMount () {
        this.props.navigation.setParams({navigatePressBack:this.goBack});
        let params = {
            parameter:this.props.navigation.state.params.provinceId,
            type:0
        };
        console.log(params,'参数')
        let that = this
        http.getNoTokenData("cfg/areaCityList",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        city:res.object,
                        loade:false
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

    _location(cityid,cityname){
        const navigation = this.props.navigation;
        navigation.navigate('Home',{cityid:cityid,cityname:cityname});
    }
    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }
    _render() {
        let _city = this.state.city;
        return (
            <ScrollView style={{backgroundColor:'#fff',height:'100%'}}>
                <View style={styles.line}></View>
                {
                    _city.map((value, index)=>(
                        <TouchableOpacity style={styles.citys} key = {index} onPress={()=>this._location(value.cityid,value.cityname)}>
                            <Text style={styles.cityText}>{value.cityname}</Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }
}