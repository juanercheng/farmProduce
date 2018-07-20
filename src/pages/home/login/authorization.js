/**
 * Created by yangHL on 2018/3/30.
 */
import React, { Component } from 'react';
import { Container,InputGroup, Left, Body, Right, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base'
import styles from './styles'
import px2dp from './../../../js/px2dp'
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';
import SettingStyle from "../../../js/SettingStyle";


export default class authorization extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (""),
        headerStyle: {
            backgroundColor: "#fff",
            elevation: 0
        },
        headerTitleStyle: {
            color: "#000",
            alignSelf:'center'
        },
        headerTintColor:"#000",
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
    constructor(props){
        super(props);
        this.state = {
            mobile:null,
            newPassword:null,
            code:null,
            chartCode:null
        };
    }
    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }
    _login(){
        const navigation = this.props.navigation;
        navigation.navigate('Home');
    }
    render() {
        return (
            <Container style={styles.Container}>
                <View style={styles.titleOther}>
                    <Text style={styles.titleName}>绑定手机号</Text>
                </View>
                <View style={styles.forgetInput}>
                    <InputGroup>
                        <View style={styles.imageLogin}>
                            <Image source={require('./../../../../images/login/dianhua.png')}/>
                        </View>
                        <Input placeholder="请输入手机号码"
                               onChangeText={(mobile) => this.setState({mobile})}
                               keyboardType='phone-pad'
                               placeholderTextColor="#888888"/>
                    </InputGroup>
                    <InputGroup>
                        <View style={styles.imageLogin}>
                            <Image source={require('./../../../../images/login/yaoshi.png')}/>
                        </View>
                        <Input placeholder="请输入验证码"
                               onChangeText={(code) => this.setState({code})}
                               placeholderTextColor="#888888"
                               secureTextEntry={true}
                               ref="bottomInput"/>
                        <TouchableOpacity style={{borderWidth:1,borderColor:'#000',borderRadius:3}}>
                            <Text style={{padding:2,fontSize:12}}>获取验证码</Text>
                        </TouchableOpacity>
                    </InputGroup>
                    <View>
                        <TouchableOpacity onPress={()=>this._login()} style={{marginTop:'10%'}}>
                            <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                             style={{height:50,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:15}}>绑定</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }
}