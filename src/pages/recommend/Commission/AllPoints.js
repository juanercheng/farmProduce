import React, { Component } from 'react';
import {Container, Header, Left, Body, Right, Button, Footer, FooterTab,Title, Text ,Icon,Item,Input} from 'native-base'
import Util from './../../../js/util';
import IntegralList from './../IntegralList';
var url=Util.imgPath+"/api/lotteryRule/findLotteryRuleList";
export default class AllPoints extends Component{
    constructor (props){
        super(props);
        this.state={
            dataName:'当天积分动向明细',
            url:url
        };
    }
    render(){
        return (
            <Container>
                <IntegralList data={this.state} navigation={this.props.navigation}/>
            </Container>
        )
    }
}