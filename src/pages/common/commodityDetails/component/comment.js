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
import styles from './style'
import px2dp from './../../../../js/px2dp'
import global from './../../../../js/global'

export default class comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            comment:[]
        }
    }
    //点击进入品论页面
    _comment(name){
        console.log(name);
    }

    render() {
        let comment = this.props.comment;
        global.home.comment = comment.momentSize;
        return (
            comment.momentSize===0?
                <View style={{backgroundColor:'#ffffff',paddingBottom:15,borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                    <View style={styles.comment}>
                        <View style={styles.allNum}>
                            <Image source={require('./../../../../../images/pinglun.png')}
                            />
                            <Text style={styles.allText}>评论 ({comment.momentSize})</Text>
                        </View>
                        <TouchableOpacity  onPress={()=>this.props._comment('comment')}>
                            <Image source={require('./../../../../../images/fanhui.png')}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{alignItems:'center',marginTop:20}}>
                        <Text style={{color:'#dddddd',fontSize:13}}>本商品还没有人评论</Text>
                    </View>
                </View>:
                <View style={{backgroundColor:'#ffffff',paddingBottom:15,borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                    <View style={styles.comment}>
                        <View style={styles.allNum}>
                            <Image source={require('./../../../../../images/pinglun.png')}
                            />
                            <Text style={styles.allText}>评论 ({comment.momentSize})</Text>
                        </View>
                        <TouchableOpacity  onPress={()=>this.props._comment('comment')}>
                            <Image source={require('./../../../../../images/fanhui.png')}/>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.commentContent}>
                        <View style={styles.commentUser}>
                            <Image source={{uri:comment.moment.photos}} style={{width: 35, height: 35}}/>
                            <View style={styles.commentStart}>
                                <Text style={styles.userName}>{comment.moment.nickName}</Text>
                                <View style={styles.userStar}>
                                    <Image source={require('./../../../../../images/xingxing.png')}
                                           style={{width: 11, height: 11}}/>
                                    <Image source={require('./../../../../../images/xingxing.png')}
                                           style={{width: 11, height: 11,marginLeft:5}}/>
                                    <Image source={require('./../../../../../images/xingxing.png')}
                                           style={{width: 11, height: 11,marginLeft:5}}/>
                                    <Image source={require('./../../../../../images/xingxing.png')}
                                           style={{width: 11, height: 11,marginLeft:5}}/>
                                    <Image source={require('./../../../../../images/xingxing.png')}
                                           style={{width: 11, height: 11,marginLeft:5}}/>
                                </View>
                            </View>
                        </View>
                        <View style={styles.commentTime}>
                            <Text style={{color:"#999999",fontSize:10}}>{comment.moment.createtime}</Text>
                            {/*<Text style={{color:"#999999",fontSize:10,marginLeft:9}}>12:30</Text>*/}
                        </View>
                    </View>
                    <View style={{marginLeft:15,marginRight:15}}>
                        <Text style={{fontSize:13}}>{comment.moment.content}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:'center'}}>
                        <Button onPress={()=>this.props._comment('comment')} style={styles.commentBotton}><Text style={styles.commentBottonText}>查看全部评价</Text></Button>
                    </View>
                </View>
        )
    }
}