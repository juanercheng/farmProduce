/**
 * Created by yangHL on 2018/3/20.
 */
import {StyleSheet} from 'react-native';
import Util from './../../js/util';
import HomeStyle from "../home/HomeStyle";

const classifyStyle = StyleSheet.create({
    //classify主页面
    header:{
        backgroundColor:"#ffffff",
        height:44,
    },
    input:{
        backgroundColor:"#f0f1f2",
        height:30,
        borderRadius:15
    },
    //classify组件
    content:{
        flexDirection:'row',
        justifyContent: 'space-between',
        height:'100%'
    },
    left:{
        flex:2.7,
        borderRightWidth:1,borderRightColor:'#e6e6e6',
        height:'100%'
    },
    right:{
        flex:7,
    },
    leftContent:{
        height:50,
        backgroundColor:"#f2f4f7",
        flexDirection:'row',
        alignItems:"center",
        borderWidth:1,
        borderTopWidth:0,
        borderColor:'#e6e6e6'
    },
    leftContentText:{
        color:"#000000",
        textAlign:'center',
        width:'100%',
        fontSize:13,
    },
    rightSort:{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems:"center",
        height:44,
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    SortText:{
        fontSize:13
    },
    commodity:{
        height:90,
        backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderBottomColor:"#e6e6e6",
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    commodityImage:{
        width:70,
        height:70,
        borderWidth:1,
        borderColor:"#e6e6e6",
        borderRadius:5,
        marginLeft:'3%'
    },
    commodityRight:{
        marginLeft:'5%',
        marginRight:'35%'
    },
    commodityPrice:{
        flexDirection:'row',
        justifyContent:'space-between',
        // justifyContent: 'space-between',
        marginTop:16,
        height:16,
        alignItems:'center'
    },
    commodityPriceText:{
        marginLeft:7,
        marginRight:8,
        fontSize:12,
        borderWidth:1,
        borderColor:"red",
        color:'red',
        borderRadius:2,
        paddingLeft:1,
        paddingRight:1,
        width:28
    },
    tabsClick:{
        height:42,
        flexDirection:'row',
        justifyContent: 'space-around',
        backgroundColor:"#ffffff",
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6'
    },
    tabsView:{
        margin:"auto",
        width:"20%",
        display:"flex",
        height:42,
    },
    tabsText:{
        height:42,
        lineHeight:35,
        textAlign:'center',
        color:'#999999',
        // borderBottomWidth:3,
        // borderBottomColor:'#20a200'
    },
    comprehensiveSort:{
        fontSize: 13,
        color: '#000000'
    }
})
export default classifyStyle;