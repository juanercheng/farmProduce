/**
 * Created by yangHL on 2018/3/28.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
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
    FlatList,
    TouchableOpacity
} from 'react-native';
import styles from './../commentDetails/commentDetailsStyle'
import px2dp from './../../../../js/px2dp'
import SettingStyle from "../../../../js/SettingStyle";
import LoginView from './../../../common/LoginView'
import global from './../../../../js/global'
import http from './../../../../js/http'
import { Button } from 'antd-mobile';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class commentDetails extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: ("评论详情"),
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
            <TouchableOpacity transparent style={SettingStyle.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                <Image style={SettingStyle.headerBack} source={require('./../../../../../images/header/fanhui.png')} />
            </TouchableOpacity>
        ),
    })

    constructor(props) {
        super(props);
        this.state = {
            loade:true,
            momentInfo:null,
            productInfo:null,
            momentsInteractionInfo:null,
            userMomentStatus:null,
            images:[
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png',
                './../../../../../images/xingxing.png'
            ],
            startIndex:999,
            endIndex:1,
            content:null
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack: this.goBack});
        let params = {
            momentId:this.props.navigation.state.params.momentId,
            pageCurrent:1,
            pageSize:10
        };
        this.setState({
            productId:params.momentId,
        });
        console.log(params)
        this.commentDetailsFetchData(params)
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    };
    commentDetailsFetchData(params){
        let that = this;
        http.getData("moments/info",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        loade:false,
                        momentInfo:res.object.momentInfo,
                        productInfo:res.object.productInfo,
                        momentsInteractionInfo:res.object.momentsInteractionInfo,
                        userMomentStatus:res.object.momentInfo.userMomentStatus
                    })
                    // that.refs.toast.show(res.msg)
                }else{
                    console.log(res.msg);
                    that.refs.toast.show(res.msg)
                }
            })
    }
    _goodButton(id,userMomentStatus){
        if (userMomentStatus){
            let params = {
                momentId:id,
                type:1,
                content:1
            };
            let that = this;
            http.postData("moments/cancelApprove",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            userMomentStatus:!that.state.userMomentStatus
                        });
                        that.refs.toast.show('已取消')
                    }else{
                        console.log(res.msg);
                        that.refs.toast.show(res.msg)
                    }
                })
        }else{
            let params = {
                momentId:id,
                type:1,
                content:1
            };
            let that = this;
            http.postData("moments/addMmiInfo",params,
                function(res){
                    console.log(res);
                    if (res.code == 0){
                        that.setState({
                            userMomentStatus:!that.state.userMomentStatus
                        })
                        that.refs.toast.show('已点赞')
                    }else{
                        console.log(res.msg);
                        that.refs.toast.show(res.msg)
                    }
                })
        }

    }
    _renderCommodity(item,index){
        return (
            <View style={styles.commentAll}>
                <View style={styles.commentListOne}>
                    <View style={styles.commentOneLeft}>
                        <Image source={{uri:item.headImg}}
                               style={{width: 35, height: 35}}/>
                        <Text style={[styles.userName, {marginLeft: 16}]}>{item.nickName}</Text>

                    </View>
                    <View style={styles.commentOneRight}>
                        <Text style={{color: '#949191', fontSize: 9}}>{item.createtime}</Text>
                    </View>
                </View>
                <Text style={{fontSize: 13, marginTop: 15,}}>{item.content}</Text>
            </View>
        )
    }

    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }
    _commodityRender(){
        let productInfo = this.state.productInfo;
        return (
            <View style={styles.commodity}>
                <View style={styles.commodityOne}>
                    <Text style={{color: '#a09ca3', fontSize: 12}}>购买了</Text>
                    <Text style={{color: '#a09ca3', marginLeft: 13, fontSize: 12}}>规格:{productInfo.standardName}</Text>
                </View>
                <View style={styles.commodityTwo}>
                    <Image source={{uri:productInfo.picture}}
                           style={{width: px2dp(70), height: px2dp(70)}}/>
                    <View style={styles.commodityDescribe}>
                        <Text style={{fontSize: 13}}>{productInfo.productName}{productInfo.standardName}</Text>
                        <Text style={{fontSize: 12, color: 'red', marginTop: 17}}>￥{productInfo.price}</Text>
                    </View>
                </View>
            </View>
        )
    }
    keyExtractor = (item) => item.id;
    _commentRender(){
        let momentsInteractionInfo = this.state.momentsInteractionInfo;
        return (
            <View style={{marginBottom:50}}>
                <Text style={styles.commentTitle}>{momentsInteractionInfo.length} 条评论</Text>
                <FlatList data={momentsInteractionInfo}
                          renderItem={({item,index}) => this._renderCommodity(item,index)}
                          keyExtractor={ this.keyExtractor }
                />
            </View>
        )
    }
    _render() {
        let momentInfo = this.state.momentInfo;
        let images = this.state.images;
        let star = momentInfo.rate2;
        return (
            <View style={{backgroundColor: '#fff', height: '100%', borderTopWidth: 1, borderTopColor: '#e6e6e6'}}>
                <Toast
                    ref="toast"
                    position='top'
                    positionValue={200}
                />
                <ScrollView>
                    <View style={styles.commentList}>
                        <View style={styles.commentOne}>
                            <View style={styles.commentOneLeft}>
                                <Image source={{uri:momentInfo.headImg}}
                                       style={{width: 35, height: 35}}/>
                                <View style={styles.user}>
                                    <Text style={styles.userName}>{momentInfo.nickName}</Text>
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
                                <Text style={{color: '#949191', fontSize: 9}}>{momentInfo.createtime}</Text>
                                {/*<Text style={{color: '#949191', fontSize: 9, marginLeft: 9}}>12:30</Text>*/}
                            </View>
                        </View>
                        <Text style={styles.commentContent}>{momentInfo.content}</Text>
                        <View style={styles.imgesAll}>
                            {
                                momentInfo.pictures.map((value,index)=>(
                                    <View style={styles.imagesSingle} key={index}>
                                        <Image source={{uri:value}}
                                               style={{width: px2dp(105), height: px2dp(105)}}/>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    {this._commodityRender()}
                    <View style={styles.line}></View>
                    {this._commentRender()}
                </ScrollView>
                <View style={[styles.button,{zIndex:this.state.startIndex}]}>
                    <TouchableOpacity style={[styles.buttonContent,{borderRightWidth:1,borderRightColor:'#e6e6e6'}]}
                                      onPress={()=>this._goodButton(momentInfo.id,this.state.userMomentStatus)}>
                        {
                            this.state.userMomentStatus?
                            <Image source={require('./../../../../../images/good.png')}/>:
                                <Image source={require('./../../../../../images/zan.png')}/>
                        }
                        <Text style={styles.buttonText}>点赞</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this._startIndex()} style={styles.buttonContent}>
                        <Image source={require('./../../../../../images/pinglunyuan.png')}
                               />
                        <Text style={styles.buttonText}>评论</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.button,{zIndex:this.state.endIndex,alignItems:'center',}]}>
                    <TextInput style={{width:'80%'}}
                               onChangeText={(content) => this.setState({content})}/>
                    <Button type="ghost" inline size="small" style={{ marginLeft: 4,padding:4 }} onClick={()=>this._endIndex(momentInfo.id)}>评论</Button>
                </View>
            </View>
        );
    }

    _startIndex(){
        this.setState({
            startIndex: 1,
            endIndex: 999
        })
    }
    _endIndex(id){
        let params = {
            momentId:id,
            replyToUserId:global.login.userId,
            type:1,
            content:this.state.content
        };
        let that = this;
        http.postData("moments/addMmiInfo",params,
            function(res){
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        startIndex: 999,
                        endIndex: 1
                    })
                    that.componentDidMount()
                }else{
                    console.log(res.msg);
                }
            })
    }
}