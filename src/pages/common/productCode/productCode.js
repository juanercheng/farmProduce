/**
 * Created by yangHL on 2018/3/27.
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
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './productCodeStyle'
import px2dp from './../../../js/px2dp'

export default class productCode extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("产品二维码"),
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
        headerRight: (
            <View style={{marginRight: 10}}>
            </View>
        )
    })

    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            comment:[]
        }
    }


    render() {
        return (
            <Container style={{position:"relative",flexDirection:"row",justifyContent:"center"}}>
                <Image style={styles.head} source={require('./../../../../images/mine/touxiang.png')}/>

                <View style={styles.allContent}>
                        <View style={{paddingTop:85,paddingLeft:30,paddingRight:30,paddingBottom:42,alignItems:'center'}}>
                            <Text style={{textAlign:'center',fontSize:14}}>农聚源花菇250g 香菇新鲜菌菇新鲜美味 农聚源花菇250g</Text>
                            <Image style={styles.code} source={require('./../../../../images/mine/QRcode.png')}/>
                            <Text style={{color:'#949494',fontSize:12,marginTop:10}}>扫一扫查看更多</Text>
                            <TouchableOpacity style={{borderRadius:5}}>
                                <ImageBackground source={require('./../../../../images/mine/btn.png')}
                                             style={styles.button} >
                                    <Text style={{color:'#fff',fontSize:16}}>分享二维码</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
            </Container>
        )
    }
}