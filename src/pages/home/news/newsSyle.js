/**
 * Created by yangHL on 2018/3/28.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
const newsStyle=StyleSheet.create({
    news:{
        backgroundColor:'#fff',
        marginLeft:15,
        marginRight:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:'#e6e6e6'
    },
    newOne:{
        marginLeft:16,
        marginRight:16,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        paddingBottom:15
    },
    top:{
        marginTop:16,
        fontSize:13
    },
    date:{
        marginTop:10,
        fontSize:12,
        color:'#999'
    },
    content:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    newsDetails:{
        marginLeft:16,
        paddingTop:10,
        paddingBottom:14,
        fontSize:12
    },
    newsNum:{
        position:'absolute',
        top:0,
        right:'25%',
        width:8,
        height:8
    },
    containers: {
        flex: 1,
        flexDirection: 'column',
        paddingRight:30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#f0f2f5',
    },
    msg: {
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth:6,
        borderTopWidth:6,
        borderTopColor: '#fff',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    newsNum:{
        position:'absolute',
        top:'20%',
        right:'2%',
        width:8,
        height:8
    },
    tabsText:{
        fontSize:14,
        paddingTop:10,
        paddingBottom:10,
    },
    activeTextStyle:{
        fontSize:14,
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth:4,
        borderBottomColor:'#23a300'
    }
})
export default newsStyle