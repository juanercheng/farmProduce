import React from 'react';
import {StyleSheet} from 'react-native';
const RecomStyle=StyleSheet.create({
    headerTitle:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#20a200',
        paddingBottom:20
    },
    centerNav:{
        flexDirection: 'row',
        borderBottomColor:'#ddd',
        borderBottomWidth:1
    },
    contentMain:{
        flex:6,
        justifyContent:'flex-start',
    },
    contentTitle:{
        paddingLeft:15,
        paddingRight:15,
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        backgroundColor:'#f0f2f5'
    },
    contentList:{
        flex:6,
        flexDirection:'column',
        justifyContent:'flex-start',
        alignItems:'stretch',
        backgroundColor:'#fff'
    },
    listRowStyle:{
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        padding:5,
    },
    listRowDateStyle:{
        flex:1,
        left:15,
        fontSize:10,
        color:'#999'
    },
    listRowConStyle:{
        paddingLeft:15,
        paddingRight:15,
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row'
    },
    rightValView:{
        flex:1.2,
        paddingLeft:5,
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'flex-end'
    },
    leftKeyText:{
        flex:2,
        fontSize:12,
        color:'#000'
    }
})
export default RecomStyle