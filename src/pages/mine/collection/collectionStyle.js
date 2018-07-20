/**
 * Created by juaner on 2018/3/23.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const collectionStyle = StyleSheet.create({
    header:{
        width:Util.size.width,
        // width:'100%',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    list:{
        height:112,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        backgroundColor:"#fff",
        flexDirection: 'row',
        alignItems:'center',
        width:'100%'
    },
    listLeft:{
        marginLeft:15,
        width:92,
        height:92,
        borderRadius:5,
        borderWidth:1,
        width:'26%',
        borderColor:"#e6e6e6"
    },
    listRight:{
        height:92,
        marginLeft:15,
        width:'61%',
        justifyContent:'space-between',
    },
    price:{
        flexDirection: 'row',
//        width:'70%',
        justifyContent:'space-between'
    },
    SoldOut:{
        color:'#fff',
        backgroundColor:'rgba(39,20,12,.5)',
        position:'absolute',
        left:16,
        borderBottomRightRadius:5,
        borderBottomLeftRadius:5,
        width:92,
        textAlign:'center',
        bottom:10,
        zIndex:999,
        width:'25.8%'
    }
});
export default collectionStyle;