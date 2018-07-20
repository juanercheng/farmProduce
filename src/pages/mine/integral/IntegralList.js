/**
 * Created by juaner by 18-03-26
 */
import React, { Component } from 'react';
import { Container,Content, Tabs,Tab, TabHeading,Header, Left, Body, Right,List,ListItem,Switch, Button, Spinner,Title, Text ,Icon,Item,Input} from 'native-base';
import {
    Alert,
    TextInput ,
    View,
    Platform,
    Image,
    ImageBackground,
    TouchableOpacity,
    ViewPagerAndroid,
    ScrollView,
    DeviceEventEmitter,
    ListView,
    FlatList,
    TouchableHighlight,
}from 'react-native';
import Picker from 'react-native-picker';
import Toast, {DURATION} from 'react-native-easy-toast';
import moment from 'moment';

import http from './../../../js/http';
import global from './../../../js/global';
import LoginView from './../../common/LoginView';
import NoDataView from './../../common/NoDataView';
import LoadingDataView from './../../common/LoadingDataView';
import ErrorView from './../../common/ErrorView';
import TimeArray from './../../common/TimeArray';
import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './IntegralStyle'

const Url = 'userInfo/scoreInfos'
let pageNo = 1;//当前第几页
let totalElements;//总的页数

const _integral=null
export  default class IntegralList extends Component{
    static navigationOptions = ({ navigation }) => ({
        tabBarVisible: false,  //隐藏导航栏
        header: null,
    });

    constructor(props){
        super(props);
        this._date=new Date();
        let _dateYear=this._date.getFullYear();
        let _dateMon=this._date.getMonth()+1;
        _dateMon=_dateMon<10?"0"+_dateMon:_dateMon;
        this.state = {
            loaded: false,
            dateYear:_dateYear,
            dateMon:_dateMon,
            incomeExpensesType:null,
            refreshing: false,
            error: false,
            dataArray: [],
            errorInfo: null,
            showToast: false,
            scroeIn:null,
            scroeOut:null,
            showFoot:0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };
    }

    componentDidMount(){
        this.fetchData(pageNo);
    }

    componentWillUnmount(){
        pageNo = 1
    }

    fetchData(pageNo) {
        let params ={
            pageCurrent:pageNo,
            pageSize:10,
            year: this.state.dateYear ,
            month: this.state.dateMon ,
            incomeExpensesType:this.props.incomeExpensesType
        }
        let _this = this
        http.postData( Url,params,
           function(res){
              if(res.code===0){
                 _this._data = res.object;
                 let data =  _this._data.scoreList
                 let dataBlob = [];
                 console.log(res)
                 if(data.length>0){
                     data.map(function (item) {
                         item.createTime=moment(item.createTime).format('YYYY-MM-DD')
                         dataBlob.push(item)
                     });
                 }

                 _this.setState({
                     scroeIn:_this._data.scroeIn,
                     scroeOut:_this._data.scroeOut
                 })

                 DeviceEventEmitter.emit('scroeIn', _this._data.scroeIn);

                 if( pageNo === 1){
                     _this.setState({
                         dataArray: dataBlob,
                         loaded: true,
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
                 }else{
                     _this.setState({showFoot:0});
                 }

                 data = null;
                 dataBlob = null;
              }else {
                 console.log(res)
              }
           }
        )
    }

    _showPicker(){
        let options = TimeArray;
        Picker.init({
            pickerData: options,
            pickerBg:[255,255,255,1],
            selectedValue: [this.state.dateYear+'年',this._date.getMonth()+1+'月'],
            pickerConfirmBtnText:'确定',
            pickerCancelBtnText:'取消',
            pickerTitleText:this.state.dateYear+"-"+this.state.dateMon,
            onPickerConfirm: data => {
                this.setState({
                    dateYear:data[0].substr(0,4),
                    dateMon:data[1].substr(0,data[1].indexOf('月'))<10?"0"+data[1].substr(0,data[1].indexOf('月')):data[1].substr(0,data[1].indexOf('月'))
                })
                this.fetchData(1);
                //确定选择
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {//选择状态
                console.log(data);
            }
        });
        Picker.show();
    }

    render(){
        if (!this.state.loaded && !this.state.error) {
            return <LoginView/>
        } else if (this.state.error) {
            //请求失败view
            return <ErrorView/>
        }
        return (
            <View>
                <View style={[styles.Item,styles.total]} >
                    <View style={styles.ItemLeft}>
                        <Text style={styles.dateText}>{this.state.dateYear}-{this.state.dateMon}</Text>
                        <View style={{ flexDirection:'row',}}>
                            {
                                this.props.incomeExpensesType !=-1?(<Text style={{fontSize:13,marginRight:25}}>获得积分 + {this.state.scroeIn}</Text>):null
                            }
                            {
                                this.props.incomeExpensesType !=1?(<Text style={{fontSize:13}}>消费积分 - {this.state.scroeOut}</Text>):null
                            }
                        </View>
                    </View>
                    <TouchableOpacity onPress={()=>this._showPicker()}>
                        <Image style={{marginRight:5}} source={require('./../../../../images/rili.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:80}}>
                    <FlatList
                           data={this.state.dataArray}

                           //使用 ref 可以获取到相应的组件
                           //ref={(flatList) => this._flatList = flatList}
                           //ListHeaderComponent={this._header}//header头部组件

                           ListFooterComponent={this._renderFooter.bind(this)}

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
                           onEndReachedThreshold={1}
                           //当列表被滚动到距离内容最底部不足onEndReachedThreshold的距离时调用
                           onEndReached={this._onEndReached.bind(this)}

                           //下拉刷新
                           refreshing={this.state.refreshing}
                           onRefresh={() => this._onRefresh()}
                           //渲染列表数据
                           renderItem={({ item ,index}) => this._renderItem(item,index)}
                         />
                </View>
                <Toast
                      ref="toast"
                      style={{backgroundColor:'#7f7f7f'}}
                      position='top'
                      positionValue={200}
                      fadeInDuration={150}
                      fadeOutDuration={2000}
                      opacity={0.8}
                      textStyle={{color:'#fff'}}
                />
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
                   <Image source={require('./../../../../images/mine/wujifen.png')} />
                   <Text style={[{color:'#999',marginTop:25},SettingStyle.font14]}>没有相关积分</Text>
               </View>
          </View>
        );
    }

    _onRefresh=()=>{
        pageNo=1;
        if(!this.state.refreshing){
            this.fetchData(pageNo);
        }
    };


    _onEndReached(){
        //如果是正在加载中或没有更多数据了，则返回
        if(this.state.showFoot !=0 ){
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
            <View style={styles.Item} key={index}>
                 <View style={styles.ItemLeft}>
                      <Text style={styles.dateText}>{value.createTime}</Text>
                      <Text style={{fontSize:14,marginRight:25}}>{value.name}</Text>
                 </View>
                 <Text style={[SettingStyle.font14,value.incomeExpensesType==1?styles.orange:null]}> {value.incomeExpensesType==1?<Text style={styles.orange}>+</Text>:<Text>-</Text>} {value.curScroe}</Text>
            </View>
        );
    }

}
