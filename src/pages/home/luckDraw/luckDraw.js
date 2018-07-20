import React, {Component} from 'react';
import { Button } from 'native-base';
import { View, Text, ScrollView,WebView,Image,ImageBackground,StyleSheet,TouchableOpacity,Animated,AppRegistry,Easing } from 'react-native';
import SettingStyle from "../../../js/SettingStyle";
import Util from './../../../js/util'
import http from './../../../js/http'
import global from "../../../js/global";
import LoginView from './../../common/LoginView'

export default class LuckDraw extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("会员福利"),
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
            <View><Text>

            </Text></View>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            integral: null,
            loade:true
        };
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack:this.goBack});
        this.spin()
        let that = this;
        http.getData("userDrawLottery/drawInterface",'',
            function(res){
                if (res.code == 0){
                    console.log(res.object.userLotteryRuleEntitys,'抽奖');
                    that.setState({
                        integral:res.object.userLotteryRuleEntitys,
                        loade:false
                    })
                }else{
                    console.log(res.msg);
                }
            })
    }

    spin () {
        this.spinValue.setValue(0)
        Animated.decay(
            this.spinValue,
            {
                velocity: 10,
                deceleration: 0.9,
                useNativeDriver: true
            }
        ).start(() => this.spin())
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation;
        goBack ()
    };
    _start(){
        console.log(123)
        let params = {
            userId:global.login.userId
        }
        http.postData("userDrawLottery/drawLottery",params,
            function(res){
                console.log(res,'开始抽奖');
                if (res.code == 0){
                }else{
                    console.log(res.msg);
                }
            })
    }
    render(){
        if (this.state.loade){
            return <LoginView></LoginView>
        } else{
            return this._render()
        }
    }
    _render() {
        const spin = this.spinValue.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg']
            })

        let integral = this.state.integral
        return (
            <View>
                <ImageBackground source={require('./../../../../images/home/bg.png')}
                                 style={styles.all}>
                    <View style={styles.title}>
                        <Image source={require('./../../../../images/home/lucky.png')} />
                        <Text style={styles.titleText}>恭喜您获得一次抽奖机会</Text>
                        <Animated.View style={{
                            transform: [{rotate: spin}]
                            }}>
                            <Image source={require('./../../../../images/home/circle.png')} />
                            {/*<View style={{flexDirection:'row',marginLeft:10}}>*/}
                                {/*<Text>{integral[0].score}积分</Text>*/}
                                {/*<Text>{integral[1].score}积分</Text>*/}
                                {/*<Text>{integral[2].score}积分</Text>*/}
                                {/*<Text>{integral[3].score}积分</Text>*/}
                                {/*<Text>{integral[4].score}积分</Text>*/}
                                {/*<Text>谢谢参与</Text>*/}
                            {/*</View>*/}
                        </Animated.View>
                        <View style={styles.cursor}>
                            <Image source={require('./../../../../images/home/pin.png')} />
                        </View>

                        <TouchableOpacity style={styles.start} onPress={()=>this._start()}>
                            <Image source={require('./../../../../images/home/start.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rule}>
                        <Text style={styles.ruleTitle}>抽奖规则</Text>
                        <Text style={styles.ruleText}>1.为保证抽奖的绝对公平，我们的抽奖需要首先确认共同的参与人数，在确立一个随机数，并依据
                            随机数计算中奖号</Text>
                        <Text style={styles.ruleText}>2.为保证抽奖的绝对公平，我们的抽奖需要首先确认共同的参与人数，在确立一个随机数，并依据
                            随机数计算中奖号</Text>
                    </View>
                </ImageBackground>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    cursor:{
        position:'absolute',
        // marginTop:245,
        marginTop:'25%'
    },
    start:{
        position:'absolute',
        // marginTop:245,
        marginTop:'65%'
    },
    all:{
        height:Util.size.height,
        width:Util.size.width
    },
    title:{
        marginTop:24,
        alignItems:'center'
    },
    titleText:{
        marginTop:11,
        fontSize:15,
        color:'#c9e7d0',
        marginBottom:25
    },
    rule:{
        marginTop:15,
        marginRight:15,
        marginLeft:15
    },
    ruleTitle:{
        color:'#fff',
        fontSize:14
    },
    ruleText:{
        color:'#fff',
        fontSize:12,
        marginTop:12
    }
})