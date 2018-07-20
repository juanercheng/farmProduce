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
    FlatList,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    DeviceEventEmitter,
    TouchableHighlight
} from 'react-native';
import moment from 'moment';
import Toast, {DURATION} from 'react-native-easy-toast'
import Popup from 'react-native-popup';

import styles from './../newsSyle'
import commentDetails from "../../../common/comment/commentDetails/commentDetails";
import http from './../../../../js/http';
import SettingStyle from './../../../../js/SettingStyle';
import global from './../../../../js/global';
import LoginView from './../../../common/LoginView';
import NoDataView from './../../../common/NoDataView';
import LoadingDataView from './../../../common/LoadingDataView';
import ErrorView from './../../../common/ErrorView';

const Url = 'cfg/messagetList';
const UrlDelete = 'cfg/messageDelete';

let pageNo = 1;//当前第几页
let totalElements;//总的页数

export default class newsList extends Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: ("消息详情"),
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
            <View>
            </View>
        )
    })

     constructor(props,context){
        super(props, context);
        this.state = {
            loaded: false,
            refreshing: false,
            error: false,
            dataArray: [],
            errorInfo: null,
            mask:null,
            messagetype:10001,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        }
    }

    componentDidMount(){
        this.fetchData(pageNo,10003);
        this.subscription = DeviceEventEmitter.addListener('type',(type) =>{
            this.fetchData(1,type);
            this.setState({
                mask:null
            })
        })
    }

    componentWillUnmount(){
        pageNo = 1
        this.subscription && this.subscription.remove();
    }

    fetchData(pageNo,type) {
        let params ={
            pageCurrent:pageNo,
            pageSize:10,
            messagetype:type
        }
        let _this = this
        http.postData( Url,params,
           function(res){
                 _this._data = res.object;
                 let data =  _this._data
                 let dataBlob = [];
                 console.log(res)

                 if(data.length>0){
                     data.map(function (item) {
                         item.messagecontent=item.messagecontent.replace(/<\/?.+?>/g,"").replace(/ /g,"")
                         item.modifytime=moment(item.modifytime).format('YYYY-MM-DD')
                         dataBlob.push(item)
                     });
                 }

                 if( pageNo === 1){
                    _this.setState({
                        loaded: true,
                        dataArray: dataBlob
                    })
                 }else{
                   _this.setState({
                       dataArray:_this.state.dataArray.concat(dataBlob),
                       loaded: true,
                   })
                 }

                 totalElements = dataBlob.length
                 if( totalElements <10){
                     _this.setState({showFoot:1});
                 }

                 data = null;
                 dataBlob = null;
           }
        )
    }

    render(){
        if (!this.state.loaded && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }
        return (
            <View style={this.state.dataArray.length == '0'?{height:'100%',backgroundColor:'#fff'}:{backgroundColor:'#f0f2f5'}}>
                <FlatList
                   data={this.state.dataArray}

                   //使用 ref 可以获取到相应的组件
                   //ref={(flatList) => this._flatList = flatList}
                   //ListHeaderComponent={this._header}//header头部组件

    //               ListFooterComponent={this._renderFooter.bind(this)}

                   //ItemSeparatorComponent={ItemDivideComponent}//分割线组件

                   //空数据视图,可以是React Component,也可以是一个render函数，或者渲染好的element。
                   ListEmptyComponent={this.createEmptyView()}

                   keyExtractor={this._keyExtractor}

                   //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                   //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                   //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
    //                      getItemLayout={(data, index) => ( {length: 44, offset: (44 + 1) * index, index} )}

                   //决定当距离内容最底部还有多远时触发onEndReached回调。
                   //注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
                   onEndReachedThreshold={0.5}
                   //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                   onEndReached={this._onEndReached.bind(this)}

                   //下拉刷新
                   refreshing={this.state.refreshing}
                   onRefresh={() => this._onRefresh()}
                   //渲染列表数据
                   renderItem={({ item ,index}) => this._renderItem(item,index)}
                 />
             <Toast
                     ref="toast"
                     style={{backgroundColor:'#7f7f7f'}}
                     position='top'
                     positionValue={200}
                     fadeInDuration={150}
                     fadeOutDuration={8200}
                     opacity={0.8}
                     textStyle={{color:'#fff'}}
                 />
                 {/** Popup component */}
                    <Popup ref={popup => this.popup = popup }/>
                 {/** or <Popup ref={popup => this.popup = popup } isOverlay={false} isOverlayClickClose={false}/> */}
             </View>
         );
    }

    _renderFooter(){
        if (this.state.showFoot === 1) {
            return (
                <NoDataView />
            );
        } else if(this.state.showFoot === 2) {
            return (
                <LoadingDataView />
            );
        } else if(this.state.showFoot === 0){
            return (
                <View style={styles.footer}>
                    <Text></Text>
                </View>
            );
        }
    }

    createEmptyView() {
        return (
          <View style={{backgroundColor:'#fff',height:'100%'}}>
               <View style={{backgroundColor:'#fff',alignItems:'center',paddingTop:50}}>
                   <Image source={require('./../../../../../images/mine/wujifen.png')} />
                   <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>暂无消息</Text>
               </View>
          </View>
        );
    }

    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            this.fetchData(pageNo);
        }
    }

    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot != 0 ){
            return ;
        }
        this.setState({showFoot:2});
        pageNo++;
        //获取数据
        this.fetchData( pageNo );
    }

    //此函数用于为给定的item生成一个不重复的key
    //若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
    _keyExtractor = (item, index) => index;

    _renderItem = (value, index) => {
        return (
                <View style={{backgroundColor:'#f0f2f5'}} key={index}>
                    {
                      this.state.mask===index?(
                          <View style={styles.containers}>
                               <TouchableOpacity onPress={()=>this._delete(value.messageid)} style={{alignItems:'center'}}>
                                    <Text style={styles.msg}>删除</Text>
                                    <View style={styles.triangle}></View>
                               </TouchableOpacity>
                           </View>):null
                    }
                    <TouchableOpacity onPress={()=> this.setState({mask:index})}>
                        <View style={[styles.news,this.state.mask===index?{marginTop:0}:{marginTop:15}]}>
                            <View style={styles.newOne}>
                                <Text style={styles.top}>{value.messagetitle}</Text>
                                <Text style={styles.date}>{value.modifytime}</Text>
                                <View style={styles.content}>
                                    <Text style={{fontSize:13}}>{value.messagecontent}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={()=>this.props._details('newsDetails',value.messageid)}><Text style={styles.newsDetails} >查看详情</Text></TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
        );
    }

    _delete(id){
        let params ={messageId:id}
        let _this = this
        _this.popup.confirm({
            title: '温馨提示',
            content: ['确定删除吗'],
            ok: {
                text: '确定',
                style: {
                },
                boxstyle:{
                    backgroundColor:"#20a200",
                    width:"100%",
                    height:"100%",
                    color: '#fff',
                    fontSize:18,
                    alignItems:"center",
                    paddingTop:13,
                },
                callback: () => {
                    http.postData( UrlDelete,params,
                       function(res){
                           console.log(res)
                           http.postData( UrlDelete,params,
                              function(res){
                                  console.log(res)
                                  if(res.code===0){
                                     _this.fetchData(1)
                                     _this.setState({mask:null});
                                  }
                              }
                           )
                       }
                    )
                }
            },
            cancel: {
                text: '取消',
                style: {
                },
                boxstyle:{
                    color: '#000',
                    fontSize:18,
                },
                callback:()=>{
                    console.log('cancel')
                }
            }
        });
    }

}