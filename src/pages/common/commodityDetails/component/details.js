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
    WebView,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './style'
import px2dp from './../../../../js/px2dp'

export default class details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: null,
            comment:[]
        }
    }



    render() {
        let details = this.props.details;
        details = '<div style="padding: 10; display: flex; justify-content: space-between; align-item: center;"><div><span style="margin-left: 10px;height: 30px; vertical-align: top; line-height: 36px;">hello</span></div><span style="line-height: 36px;">how are you</span></div><div style="margin-left: 30px; padding-bottom: 10px; border-bottom: 1px solid #ededed;">time</div>'
        console.log(details);
        return (
            <View >

            </View>
        )
    }
}