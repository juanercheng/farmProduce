/**
 * Created by yangHL on 2018/3/30.
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
import styles from './newsSyle'
import NewList from './newsComponent/newsList'
import http from './../../../js/http';
import SettingStyle from './../../../js/SettingStyle';
import global from './../../../js/global';
import LoginView from './../../common/LoginView';

const Url = 'cfg/messageDetail';

export default class newsDetails extends Component {
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
    });

    constructor(props) {
        super(props);
        this.state = {
             dataSource: null,
             loaded: false
        }
    }

    componentDidMount() {
         console.log(this.props.navigation.state.params.Id)
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        this.fetchData();
    }

    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }



    fetchData() {
        let params ={messageId:this.props.navigation.state.params.Id}
        let _this = this
        http.postData( Url,params,
           function(res){
               _this._data = res.object;
               console.log(res)
               _this.setState({
                   dataSource: _this._data,
                   loaded: true,
               });
           }
        )
    }

    render() {
        return (
            <View style={{backgroundColor:'#fff',height:'100%',padding:15}}>
                <Text>{this.state.dataSource}</Text>
            </View>
        )
    }
}