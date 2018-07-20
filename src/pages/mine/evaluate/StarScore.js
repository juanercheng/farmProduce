/**
 * Created by juaner by 18-03-28
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
    ListView,
    TouchableHighlight,
}from 'react-native';

import SettingStyle from './../../../js/SettingStyle';
import Util from './../../../js/util';
import styles from './WriteStyle'


const Url= Util.rootPath + 'institution/findInstitutionById?id=46'

export  default class Star extends Component{

    constructor(props,context){
        super(props, context);
        this.state = {
            totalScore: 5, // 总分值
            currentScore: null, // 分值
        };
    }

    componentDidMount(){
    }


    render() {
        let rowData = this.state.data;

        return (
            <View>
                    {this.renderBody()}
            </View>
        );
    }

    renderBody() {
        let images = [];
        for (var i = 1; i <= this.state.totalScore; i++) {
                let currentCount = i;
                images.push(
                    <TouchableOpacity onPress={(i) => {this._score(currentCount)}} key={"i" + i}>
                        <Image style={styles.star}  source={require("./../../../../images/mine/star2.png")} />
                        {this._renderYellowStart(i)}
                    </TouchableOpacity>
                );
        }
        return images;
    }

    _renderYellowStart(count) {
        if (count <= this.state.currentScore) {
            return (
                <Image source={require('./../../../../images/mine/star2.png')} style={styles.star}/>
            );
        }
    }

    _score(i) {
        this.setState({
            currentScore: i
        });
        this.props.selectIndex(i);
        console.log(i)
    }

}
