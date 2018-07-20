/**
 * Created by yangHL on 2018/3/27.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';
import px2dp from './../../../js/px2dp'

const productCodeStyle = StyleSheet.create({
    allContent:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#e6e6e6',
        borderRadius:5,
        marginTop:45,
        marginLeft:15,
        marginRight:15,
        alignItems:'center',
    },
    head:{
        width:100,
        height:100,
        position:'absolute',
        zIndex:9999,
        top:20,
        borderRadius:2,
        borderWidth:1,
        borderColor:'#e6e6e6',
    },
    code:{
        width:150,
        height:150,
        borderWidth:1,
        borderColor:'#e6e6e6',
        borderRadius:5,
        marginTop:28
    },
    button:{
        marginTop:50,
        height:32,
        width:px2dp(165),
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20
    }
});
export default productCodeStyle;