/**
 * Created by juaner on 2018/3/26.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const IntegralStyle = StyleSheet.create({
    headerBox:{
        backgroundColor:'#20a200',
        flexDirection:'row',
        paddingLeft:15,
        paddingRight:15,
        paddingBottom:22
    },
    headerCenter:{
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
    },
    write:{
        color:'#fff',
    },
    tab:{
        backgroundColor:"#fff",
        shadowOffset: {width: 0, height: 0},
        shadowOpacity:0,
        elevation:0,
        borderWidth:0,
        shadowRadius: 0,
        paddingBottom:0
    },
    total:{
        backgroundColor:'#f0f2f5',
        position:'absolute',
        width:'100%',
        top:0,
        left:0,
    },
    Item:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        paddingBottom:10,
        marginBottom:20,
    },
    ItemLeft:{
        flexDirection:'column',
    },
    dateText:{
        color:'#999',
        fontSize:13,
        marginBottom:8
    },
    orange:{
        color:'#fa6d3c'
    }
});
export default IntegralStyle;