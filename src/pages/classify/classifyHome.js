/**
 * Created by yangHL on 2018/3/20.
 */
import React, {Component} from 'react';
import {
    Container,
    Header,
    Left,
    Right,
    Button,
    Footer,
    FooterTab,
    Title,
    Text,
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
import styles from './classifyStyle'
import Choice from './classifyComponent/choice'
import http from "../../js/http";
import LoginView from './../common/LoginView'
import global from "../../js/global";
import { Tabs,Toast,WhiteSpace, WingBlank } from 'antd-mobile';
// import { Tabs } from 'antd-mobile';

export default class classifyHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            id: 0,
            firstList: null,//一级分类
            secondModel:null,
            secondModelContent:null,
            loade1:true,
            loade2:true,
            loade3:true,
            list:null,
            first:true,
            second:true,
            shop:[],
            price:false
        };
        this.alwaysShowToast = () => {
            Toast.loading('加载中...', 0, () => {
                console.log('加载完成!!!');
            });
        };
    }
    componentDidMount() {
        //分类接口
        this.classifyFetchData();
        //排序列表
        // this.sortFetchData()
    }
    componentDidUpdate(){
        console.log(this.state.secondModelContent);
    }
    //排序接口
    sortFetchData = (params) =>{
        let that = this;
        http.getNoTokenData("producte/list",params,
            function(res){
                console.log(res);
                Toast.hide();
                if (res.code == 0){
                    that.setState({
                        shop:res.object,
                    })
                }else{
                    console.log(res.msg)
                }
            })
    };
    //分类接口
    classifyFetchData = () =>{
        let that = this;
        http.getNoTokenData("producte/category/list",'',
            function(res){
                console.log(res);
                if (res.code == 0){
                    let list = [];
                    res.object.firstList.map((value)=>{
                        list.push({title:value.categoryName})
                    });
                    that.setState({
                        loade1: false,
                        list:list,
                        firstList:res.object.firstList,
                        secondModel:res.object.secondModel,
                    })
                }else{
                    console.log(res.msg)
                }
            })
    };
    //商品列表
    shopFetchData = (index,pageSize) =>{
        console.log(index);

        let params = {
            categoryId:index,
            shopId:global.home.shopId,
            pageCurrent:global.classify.pageSize,
            pageSize:global.classify.pageSize * 10
        };
        console.log(params);
        let that = this;
        http.getNoTokenData("producte/list",params,
            function(res){
                Toast.hide();
                console.log(res);
                if (res.code == 0){
                    if (res.object == ''){
                        console.log('没有数据了')
                    }
                    // let shop = that.state.shop.push(res.object);
                    that.setState({
                        loade2: false,
                        shop:res.object
                    })
                }else{
                    console.log(res.msg)
                }
            })
    };
    //tab选择种类
    _typeChoice(tab,index) {
        this.alwaysShowToast();
        console.log(index);
        this.setState({
            id:index
        });
        global.classify.sortID = 0;
        global.classify.id = 0;
        console.log(this.state.secondModel,this.state.firstList);
        let secondModel = this.state.secondModel;
        let categoryId = this.state.firstList[index].categoryId;
        for(let i in secondModel) {
            console.log(secondModel,categoryId)
            if(i == categoryId){
                let data = secondModel[i];
                this.setState({secondModelContent:data,id:index});
                global.classify.categoryId = data[0].categoryId;
                console.log(global.classify.categoryId);
                this.shopFetchData(data[0].categoryId);
            }
        }
    }
    //跳转到商品详情
    _commodity(name,index,productType){
        console.log(index);
        const navigation = this.props.navigation;
        navigation.navigate(name,{
            productId:index,
            productType:productType
        });
    }
    //二级分类
    _typeShop(categoryId,index){
        this.alwaysShowToast();
        if (index === 'first'){
            global.classify.pageSize++
        }
        console.log(categoryId);
        global.classify.categoryId = categoryId;
        this.shopFetchData(categoryId,index);
    }
    //商品排序
    _sortList(index){
        this.alwaysShowToast();
        console.log(index);
        let data = null;
        if(index==0){
            console.log('综合排序');
            data = {
                categoryId:global.classify.categoryId,
                sort:'default',
                shopId:global.home.shopId
            }
        }
        if(index==1){
            console.log('销量排序');
            data = {
                categoryId:global.classify.categoryId,
                sort:'sales',
                shopId:global.home.shopId
            }
        }
        if(index==2 && this.state.price){
            console.log('正序');
            data = {
                categoryId:global.classify.categoryId,
                sort:'price_asc',
                shopId:global.home.shopId
            }
            this.setState({
                price:!this.state.price
            })
        }
        if(index==2 && !this.state.price){
            console.log('倒序');
            data = {
                categoryId:global.classify.categoryId,
                sort:'price_desc',
                shopId:global.home.shopId
            }
            this.setState({
                price:!this.state.price
            })
        }
        this.sortFetchData(data)
    }
    classifyRender() {
        let type = this.state.firstList;
        let secondModelContent = this.state.secondModelContent;
        let shopList = this.state.shop;
        const tabs = this.state.list;
        const style = {
            backgroundColor:'#20a200',
        };
        return (
            <Container>
                <Header searchBar rounded style={styles.header}>
                    <Item style={styles.input}>
                        <Image source={require('./../../../images/sousuo.png')}
                               style={{marginLeft: "3%"}}/>
                        <Input placeholder="搜索关键字"/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Tabs
                    tabs={tabs}
                    initialPage={0}
                    tabBarPosition="top"
                    tabBarActiveTextColor='#20a200'
                    tabBarInactiveTextColor='#000'
                    tabBarUnderlineStyle={style}
                    onChange={(tab,index) => this._typeChoice(tab,index)}
                >
                    <Choice style={{marginBottom:40}}
                            secondModel={secondModelContent}
                            shopList={shopList}
                            _commodityDetails={(name,index,productType)=>{this._commodity(name,index,productType)}}
                            _typeChoice={(categoryId,index)=>{this._typeShop(categoryId,index)}}
                            _sort={(tab)=>{this._sortList(tab)}}
                            _hello={()=>this._helloWorld()}
                    />
                </Tabs>
                {/*<View style={styles.tabsClick}>*/}
                    {/*{*/}
                        {/*type.map((value, index) => {*/}
                            {/*console.log(value,index);*/}
                            {/*return (*/}
                                {/*index === this.state.id ?*/}
                                    {/*<TouchableOpacity style={styles.tabsView} key={index}*/}
                                                      {/*onPress={() => this._typeChoice(index)}>*/}
                                        {/*<Text style={[styles.tabsText, {*/}
                                            {/*color:'#000',*/}
                                            {/*borderBottomWidth: 3,*/}
                                            {/*borderBottomColor: '#20a200'*/}
                                        {/*}]}>{value.categoryName}</Text>*/}
                                    {/*</TouchableOpacity> :*/}
                                    {/*<TouchableOpacity style={styles.tabsView} key={index}*/}
                                                      {/*onPress={() => this._typeChoice(index)}>*/}
                                        {/*<Text style={styles.tabsText}>{value.categoryName}</Text>*/}
                                    {/*</TouchableOpacity>*/}

                            {/*)*/}
                        {/*})*/}
                    {/*}*/}
                {/*</View>*/}
                {/*<Choice style={{marginBottom:40}}*/}
                        {/*secondModel={secondModelContent}*/}
                        {/*shopList={shopList}*/}
                        {/*_commodityDetails={(name,index)=>{this._commodity(name,index)}}*/}
                        {/*_typeChoice={(categoryId,index)=>{this._typeShop(categoryId,index)}}*/}
                        {/*_sort={(index)=>{this._sortList(index)}}*/}
                {/*/>*/}
            </Container>
        );
    }
    _helloWorld(){
        console.log('this is world')
    }
    render(){
        if(this.state.loade1){
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }else if(this.state.loade2){
            if(this.state.first){
                let categoryId = this.state.firstList[0].categoryId;
                let secondModel = this.state.secondModel;
                for(let i in secondModel) {
                    if(i == categoryId){
                        let data = secondModel[i];
                        global.classify.categoryId = data[0].categoryId;
                        this.shopFetchData(data[0].categoryId);
                        this.state.secondModelContent = data;
                        this.state.first = false;
                    }
                }

            }
            return <Container style={{backgroundColor:'#fff'}}><LoginView/></Container>
        }else{
            return this.classifyRender()
        }
    }
}