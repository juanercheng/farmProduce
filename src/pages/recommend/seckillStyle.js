/**
 * Created by yangHL on 2018/3/23.
 */
import {StyleSheet} from 'react-native';
import Util from './../../js/util';

const seckillStyle = StyleSheet.create({
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
        // justifyContent: 'space-between',
        alignItems:'center',
    },
    listLeft:{
        marginLeft:16,
        width:92,
        height:92,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#e6e6e6",
    },
    listRight:{
        height:92,
        marginLeft:15,
        justifyContent:'center',
        width:'60%'
        // marginRight:'35%'
    },
    red:{
        flexDirection: 'row',
        height:18,
        backgroundColor:"#d50301",
        position:'absolute',
        bottom:0,
        width:'100%',
        alignItems:'center',
        paddingLeft:3,
        paddingRight:3
        // justifyContent:'space-around'
    },
    redText:{
        width:12,
        height:12,
        alignItems:'center',
        justifyContent:'center',
        // lineHeight:12,
        textAlign:'center',
        backgroundColor:'#fff',
        color:'#d50301',
        fontSize:10,
        borderRadius:1
    },
    price:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:3,
        alignItems:'flex-end',
    },
    progress:{
        marginTop: 13,
        height: 13,
        width: '50%',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'red',
        alignItems: 'center',
        borderRadius:2
    },
    percent:{
        position:'absolute',
        left:'40%',
        color:'#fff',
        fontSize:10
    }
});
export default seckillStyle;