/**
 * Created by yangHL on 2018/3/26.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';
import px2dp from './../../../js/px2dp'

const storeStyle = StyleSheet.create({
    head:{
        width: 100,
        height: 100,
        position:'absolute',
        zIndex:999,
        bottom:-50,
        left:Util.size.width/2 - 50,
        borderWidth:1,
        borderColor:'#e6e6e6'
    },
    title:{
        backgroundColor:'#ffffff',
        paddingTop:65,
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:20,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    titleName:{
        alignItems:'center'
    },
    line:{
        height:10,
        backgroundColor:'#f0f2f5',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
    },
    contact:{
        backgroundColor:'#fff',
        paddingTop:15,
        paddingLeft:16,
        paddingRight:16,
        paddingBottom:20,
    },
    contactTitle:{
        color:'#999999',
        fontSize:13
    },
    contactName:{
        marginTop:12,
        flexDirection:'row',
        alignItems:'center'
    },

    contactNameText:{
        fontSize:13,
        // marginLeft:10
    }
});
export default storeStyle;