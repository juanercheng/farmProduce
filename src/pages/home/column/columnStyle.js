/**
 * Created by yangHL on 2018/5/29.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';
import px2dp from './../../../js/px2dp'

const bastNewStyle = StyleSheet.create({
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
    promotionOneA: {
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        width: Util.size.width / 2,
        paddingBottom: 11,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 13,
        borderRightWidth: 1,
        borderRightColor: '#e6e6e6'
    },
    price: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 44,
    },
    input: {
        backgroundColor: "#f0f1f2",
        // height: 35,
        borderRadius: 15,
        width:"60%"
    },
});
export default bastNewStyle;
