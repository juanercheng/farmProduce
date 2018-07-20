/**
 * Created by yangHL on 2018/3/29.
 */
import React, {Component} from 'react';
import {Button ,Container} from 'native-base';
import {
    View, Image, TouchableOpacity, Modal, Text, ListView, Platform,Dimensions,StyleSheet,Alert
} from 'react-native';
import _ from 'lodash';
import SettingStyle from "../../../js/SettingStyle";
import http from "../../../js/http";
import LoginView from './../../common/LoginView'
import global from "../../../js/global";
const {width,height} = Dimensions.get('window');
const SECTIONHEIGHT = 44,ROWHEIGHT = 40;
let letters = _
    .range('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)
    .map(n => String.fromCharCode(n).substr(0))
_.pull(letters,'O','V')//去掉o和V,这两个下面没有城市
let city=[]//城市的数组
var totalheight=[];//每个字母对应的城市和字母的总高度
var that = null;


export default class locationProvince extends Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: (global.home.city),
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
    })

    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.state={
            letters:[],
            loade:true,
            cityName:'当前城市',
            dataSource:new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
        }
        that = this
    }
    componentWillMount () {}
    componentDidMount () {
        this.props.navigation.setParams({navigatePressBack:this.goBack});
        this.setState({
            cityName:this.props.navigation.state.params.cityName
        })
        let that = this;
        http.getNoTokenData("cfg/areaProvinceList",'',
            function(res){
                console.log(res);
                if (res.code == 0){
                    that.setState({
                        province:res.object
                    });
                    let data = res.object;
                    //把省份放到对应的字母中
                    for(let j = 0;j<letters.length;j++){
                        let each =[];
                        for(let i = 0;i<data.length;i++){
                            if(letters[j] == data[i].provincePinyin.substr(0,1).toUpperCase() ){
                                each.push(data[i].provinceName);
                            }
                        }
                        let _city={};
                        _city.index = letters[j];
                        _city.name = each;
                        city.push(_city);
                    }
                    var dataBlob = {};
                    var sectionIDs = [];
                    var rowIDs = [];
                    //去掉没有省份的字母
                    for(let k = 0;k<city.length;k++){
                        if(city[k].name.length == 0){
                            city.splice(k,1)
                        }
                        for(let i = 0;i<city.length;i++){
                            if(city[i].name.length == 0){
                                city.splice(i,1)
                            }
                        }
                    }
                    //去掉右边字母
                    city.map((value,index)=>{
                        for(let m = 0;m<letters.length;m++){
                            if(letters[m] == value.index){
                                that.state.letters.push(letters[m])
                            }
                        }
                    });
                    for(let ii = 0;ii<city.length;ii++){
                        var sectionName = 'Section ' + ii;
                        sectionIDs.push(sectionName);
                        dataBlob[sectionName] = that.state.letters[ii];
                        rowIDs[ii] = [];
                        for(let j = 0;j<city[ii].name.length;j++){
                            var rowName = ii + '-' + j;
                            rowIDs[ii].push(rowName);
                            dataBlob[rowName] = city[ii].name[j]
                        }
                        //计算每个字母和下面城市的总高度，递增放到数组中
                        var eachheight = SECTIONHEIGHT+ROWHEIGHT*city[ii].name.length;
                        totalheight.push(eachheight)
                    }
                    letters = that.state.letters
                    that.setState({
                        dataSource:that.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                        loade:false
                    })
                }else{
                    console.log(res.msg)
                }
            })
    }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation
        goBack ()
    }
    renderRow(rowData,rowId){
        return (
            <TouchableOpacity
                key={rowId}
                style={{height:ROWHEIGHT,justifyContent:'center',borderBottomColor:'#faf0e6',
                    borderBottomWidth:0.5}}
                // onPress={()=>{that.changedata(rowData)}}
                onPress={()=>that._location(rowData)}>
                <View style={styles.rowdata}><Text style={styles.rowdatatext}>{rowData}</Text></View>

            </TouchableOpacity>
        )
    }
    //首字母
    renderSectionHeader = (sectionData, sectionID) => {
        return (
            <View style={{height:SECTIONHEIGHT,justifyContent:'center',paddingLeft:15,backgroundColor:'#f0f2f5'}}>
                <Text  style={{color:'#999999'}}>
                    {sectionData}
                </Text>
            </View>
        )
    }
    // render ringht index Letters
    renderLetters(letter, index) {
        return (
            <TouchableOpacity key={index} activeOpacity={0.6} onPress={()=>{this.scrollTo(index)}}>
                <View style={styles.letter}>
                    <Text style={styles.letterText}>{letter}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //定位
    _location(rowData){
        let province = this.state.province;
        let provinceId = null;
        province.map((value,index)=>{
            if(value.provinceName == rowData){
                provinceId = value.provinceId
            }
        })
        console.log(provinceId);
        const navigation = this.props.navigation;
        navigation.navigate('locationCity',{provinceId:provinceId,provinceName:rowData});
    }

    //touch right indexLetters, scroll the left
    scrollTo=(index)=>{
        let position=0;
        for(let i = 0;i<index;i++){
            position += totalheight[i]
        }
        this._listView.scrollTo({
            y:position
        })
    }

    render(){
        if (this.state.loade){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }
        return this._render()
    }

    _render() {
        return (
            <View style={{height: Dimensions.get('window').height,paddingBottom:80}}>
                <View style={{backgroundColor:'#f0f2f5'}}>
                    <Text style={{color:"#999999",paddingTop:15,paddingBottom:10,paddingLeft:15,fontSize:13}}>定位城市</Text>
                </View>
                <View style={{backgroundColor:'#ffffff',paddingTop:15,paddingBottom:10,
                    paddingLeft:15,flexDirection:'row',alignItems:'center',
                    borderBottomWidth:1,borderBottomColor:'#e6e6e6'}}>
                    <Image source={require('./../../../../images/weizhi.png')}
                           />
                    <Text style={{color:"#000",marginLeft:6}}>{this.state.cityName}</Text>
                </View>
                <ListView
                    contentContainerStyle={styles.contentContainer}
                    ref={listView => this._listView = listView}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    enableEmptySections={true}
                    initialListSize={500}
                />
                <View style={styles.letters}>
                    {letters.map((letter, index) => this.renderLetters(letter, index))}
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    contentContainer: {
        width: width,
        backgroundColor: 'white',
        marginBottom:100
    },
    letters: {
        position: 'absolute',
        height: height,
        top: -30,
        bottom: 0,
        right: 10,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    letter: {
        height: 18,
        width: width*3/50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    letterText: {
        textAlign: 'center',
        fontSize: 10,
        color:'rgb(40,169,185)'
    },
    rowdata:{
        paddingLeft:15,
        marginTop:10,
        justifyContent:'center',
        marginBottom:10
    },
    rowdatatext:{
        color:'gray',
    }
})