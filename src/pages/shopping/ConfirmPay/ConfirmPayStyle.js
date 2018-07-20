/**
 * Created by Zero on 2018/3/23
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const ConfirmPayStyle = StyleSheet.create({
    payTop:{
        backgroundColor:"#20a200",
        paddingTop:"10%",
        paddingBottom:"5%"
    },
    payTypeWrap:{
        paddingTop:25,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,
    },
    payTypeList:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingRight:10,
        paddingLeft:10,
        marginBottom:20,
    },
    popupWrap:{
        position:"relative",

    },
    popupBtnWrap:{
        width:"100%",
        position:"absolute",
        bottom:0,
        flexDirection:"row",
        justifyContent:"space-between",
        borderTopWidth:1,
        borderTopColor:"#b2b2b6",
        height:45,
    },
    popupBtn:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"

    },
    popupBtnActive:{
        backgroundColor:"#20a200"
    },

});
export default ConfirmPayStyle;