import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base'
import {ScrollView,StyleSheet,View,Image,TextInput,TouchableOpacity,TouchableHighlight,FlatList} from 'react-native';
import styles from './../recommend/RecomStyle';
import Picker from 'react-native-picker';
import TimeArray from './Commission/TimeArray';
export default class IntegralList extends Component{
    constructor(pops){
        super(pops);
        this._date=new Date();
        let _dateYear=this._date.getFullYear();
        let _dateMon=this._date.getMonth()+1;
        _dateMon=_dateMon<10?"0"+_dateMon:_dateMon;
        this.state={
            dateYear:_dateYear,
            dateMon:_dateMon,
            data:null,
            loaded:false,
            url:this.props.data.url,
            dataName:this.props.data.dataName,
        }
        this.fetchData=this.fetchData.bind(this);
    }
    componentDidMount(){
        this.fetchData(this.state.url);
    }
    fetchData(url){
        fetch(url,{
            method:"post",
            headers:{
                "Content-type":"application:/x-www-form-urlencoded:charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((responseJson)=>{
                console.log(responseJson.object);
                let _data=responseJson.object;
                let i=0;
                let dataBlog=[];
                _data.map((item)=>{
                    dataBlog.push({
                        key:i,
                        value:item
                    });
                    i++;
                })
                this.setState({
                    data:dataBlog,
                    loaded:true,
                })
                dataBlog=null;
                _data=null;
                console.log(this.state.data);
            })
    }
    _showPicker(){
        let options = TimeArray;
        console.log(Picker);
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
                this.fetchData(this.state.url);
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
    _renderListView(item){
        return (
            <View style={styles.listRowStyle}>
                <Text style={styles.listRowDateStyle}>2018-03-01</Text>
                <View style={styles.listRowConStyle}>
                    <Text style={styles.leftKeyText} numberOfLines={2}>{this.state.dataName}</Text>
                    <View style={styles.rightValView}>
                        <Text style={{fontSize:10,color:item.value.money-6<0?'#000':'#fa6d3c',}}>{item.value.money-6>0?'+'+item.value.money:item.value.money-6}000</Text>
                    </View>
                </View>
            </View>
        )
    }
    renderLoadingView(){
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }
    render(){
        if(!this.state.loaded){
            return this.renderLoadingView();
        }
        return (
            <Container>
                <View style={styles.contentTitle}>
                    <View style={{flex:1,flexDirection:'column',justifyContent:'space-around',padding:5,}}>
                        <Text style={{fontSize:10,color:'#999'}}>
                            {this.state.dateYear}-{this.state.dateMon}
                        </Text>
                        <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                            <Text style={{flex:2,fontSize:12,color:'#000'}}>
                                返佣积分 +200 &nbsp;&nbsp;订单金额 10000.89元
                            </Text>
                            <TouchableHighlight onPress={()=>this._showPicker()}>
                                <Image style={{width:18,height:16,marginRight:5}} source={require('./../../../images/recommend/laydate.png')}/>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={styles.contentList}>
                    <FlatList
                        data={this.state.data}
                        renderItem={({item})=>this._renderListView(item)}
                    />
                </View>
            </Container>
        )
    }
}

