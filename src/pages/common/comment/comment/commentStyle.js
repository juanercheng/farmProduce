/**
 * Created by yangHL on 2018/3/28.
 */
import React from 'react';
import {StyleSheet} from 'react-native';
const commentStyle=StyleSheet.create({
    commentList:{
        paddingTop:15,
        paddingRight:15,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    commentOne:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'flex-start',
        paddingLeft:15
    },
    commentOneLeft:{
        flexDirection:'row',
        alignItems:'center',

    },
    user:{
        marginLeft:16,
    },
    userName:{
        fontSize:13
    },
    userStar:{
        marginTop:5,
        flexDirection:'row',
    },
    commentOneRight:{
        flexDirection:'row',
    },
    commentContent:{
        fontSize:13,
        marginTop:15,
        paddingLeft:15
    },
    imgesAll:{
        marginTop:6,
        flexDirection:'row',
        flexWrap:'wrap',
        paddingLeft:10
    },
    imagesSingle:{
        // flex:3
        marginLeft:5,
        marginTop:5,
    },
    commentTwo:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:10,
        alignItems:'center',
        paddingLeft:15
    },
    Fabulous:{
        flexDirection:'row',
    },
    commentDetails:{
        marginLeft:30
    }
})
export default commentStyle