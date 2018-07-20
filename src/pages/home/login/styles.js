/**
 * Created by yangHL on 2018/3/16.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';
import px2dp from './../../../js/px2dp'

const LoginStyle = StyleSheet.create({
    Container:{
        backgroundColor:'#ffffff'
    },
    title: {
        marginTop: 40,
        margin: 'auto',
    },
    titleText:{
        textAlign:'center',
        fontWeight:'bold'
    },
    input:{
        marginTop:'10%',
        marginLeft:px2dp(20),
        marginRight:px2dp(20)
    },
    imageLogin:{
        width:22,
        height:18,
        borderRightColor:'#e5e5e5',
        borderRightWidth:1,
        flexDirection:'row',
        alignItems:"center"
    },
    inputBottom:{
        borderBottomWidth:1,
        borderBottomColor:'#dcdcdc'
    },
    jump:{
        marginTop:px2dp(10),
        flexDirection: "row",
        justifyContent:'space-between',
        marginLeft:px2dp(25),
        marginRight:px2dp(25),
    },
    loginButton:{

        marginLeft:px2dp(20),
        marginRight:px2dp(20)
    },
    other:{
        marginTop:'10%',
        marginLeft:px2dp(20),
        marginRight:px2dp(20),
        flexDirection: "row",
        justifyContent:'space-around',
        alignItems:'center'
    },
    otherButton:{
        height:80,
        width:px2dp(80),
        backgroundColor:"#ddd",
        borderRadius:px2dp(40),
        alignItems:'center'
    },
    otherText:{
        // alignItems:'center',
        // textAlign:'center'
        lineHeight:50
    },
    forgetInput:{
        marginTop:10,
        marginLeft:px2dp(20),
        marginRight:px2dp(20)
    },
    titleOther:{
        marginTop:40,
        marginBottom:40,
        marginLeft:px2dp(20)
    },
    titleName:{
        fontSize:20,
        fontWeight:'bold'
    }
});
export default LoginStyle;