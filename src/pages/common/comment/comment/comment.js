/**
 * Created by yangHL on 2018/3/28.
 */
import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Footer, FooterTab, Title, Text, Tab, TabHeading, Tabs, Icon, Item, Input} from 'native-base';
import {
    ScrollView,
    StyleSheet,
    View,
    Image,
    TextInput,
    FlatList,
    TouchableOpacity
} from 'react-native';
import styles from './../comment/commentStyle'
import px2dp from './../../../../js/px2dp'
import commentDetails from "../commentDetails/commentDetails";
import SettingStyle from "../../../../js/SettingStyle";
import global from './../../../../js/global'
import http from './../../../../js/http'
import LoginView from './../../../common/LoginView'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class comment extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (global.home.comment + "条评论"),
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
                <Image style={SettingStyle.headerBack} source={require('./../../../../../images/header/fanhui.png')} />
            </Button>
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            loade:true,
            good:false,
            images:[
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png'
            ],
            userMomentStatus:true
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        let params = {
            productId:this.props.navigation.state.params.productId,
            pageCurrent:1,
            pageSize:10
        };
        this.setState({
            productId:params.productId,
        });
        this.commentFetchData(params)
    }
    commentFetchData(params){
        console.log(params);
        let that = this;
        http.getData("moments/list",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        loade:false,
                        comment:res.object
                    });
                    // that.refs.toast.show(res.msg)
                }else{
                    console.log(res.msg);
                    that.refs.toast.show(res.msg)
                }
            })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };
    //跳转评论详情
    _commentDetails(id){
        const navigation = this.props.navigation;
        navigation.navigate('commentDetails',{momentId:id});
    }
    _good(item){
        console.log(item.userMomentStatus);
        if (item.userMomentStatus){
            let params = {
                momentId:item.id,
                type:1,
                content:1
            };
            let that = this;
            http.postData("moments/cancelApprove",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        item.userMomentStatus = !item.userMomentStatus;
                        that.setState({
                            good:!that.state.good
                        });
                        that.refs.toast.show('已取消')
                    }else{
                        console.log(res.msg);
                        that.refs.toast.show(res.msg)
                    }
                })
        }else{
            let params = {
                momentId:item.id,
                type:1,
                content:1
            };
            let that = this;
            http.postData("moments/addMmiInfo",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        item.userMomentStatus = !item.userMomentStatus;
                        that.setState({
                            good:!that.state.good
                        });
                        that.refs.toast.show('已点赞')
                    }else{
                        console.log(res.msg);
                        that.refs.toast.show(res.msg)
                    }
                })
        }
    }
    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }
    _renderCommodity(item,index){
        let image = item.photos;
        let star = item.rate1;
        let images = this.state.images;
        image = image.split(',');
        return (
            <View style={styles.commentList}>
                <View style={styles.commentOne}>
                    <View style={styles.commentOneLeft}>
                        <Image source={{uri:item.headImg}}
                               style={{width: 35, height: 35}}/>
                        <View style={styles.user}>
                            <Text style={styles.userName}>{item.nickName}</Text>
                            <View style={styles.userStar}>
                                {
                                    images.map((value,index)=>{
                                        if (index >= star) {
                                            return <View key={index}><Text></Text></View>
                                        }else {
                                            return <Image key={index} source={require('./../../../../../images/xingxing.png')}/>
                                        }
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.commentOneRight}>
                        <Text style={{color:'#949191',fontSize:9}}>{item.createtime}</Text>
                        {/*<Text style={{color:'#949191',fontSize:9,marginLeft:9}}>12:30</Text>*/}
                    </View>
                </View>
                <Text style={styles.commentContent}>{item.content}</Text>
                <View style={styles.imgesAll}>
                    {
                        image.map((value,index)=>(
                            <View style={styles.imagesSingle} key={index}>
                                <Image source={{uri:value}}
                                       style={{width:px2dp(105),height:px2dp(105)}}/>
                            </View>
                        ))
                    }
                </View>
                <View style={styles.commentTwo}>
                    <View style={styles.Fabulous}>
                        <TouchableOpacity onPress={()=>this._good(item)}>
                            {
                                item.userMomentStatus?<Image source={require('./../../../../../images/good.png')}/>:
                                    <Image source={require('./../../../../../images/zan.png')}/>
                            }
                        </TouchableOpacity>
                        <Text style={{fontSize:10,marginLeft:5,color:'#ffad3a'}}>{item.approveCount}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>this._commentDetails(item.id)} style={styles.commentDetails}>
                        <Image source={require('./../../../../../images/pinglunyuan.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    keyExtractor = (item) => item.id;
    _render() {
        let comment = this.state.comment;
        return (
            <View style={{backgroundColor:'#fff',height:'100%',borderTopWidth:1,borderTopColor:'#e6e6e6'}}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                    fadeOutDuration={2000}
                />
                <ScrollView>
                    <FlatList data={comment}
                              renderItem={({item,index}) => this._renderCommodity(item,index)}
                              keyExtractor={ this.keyExtractor }
                    />
                </ScrollView>
            </View>
        )
    }
}