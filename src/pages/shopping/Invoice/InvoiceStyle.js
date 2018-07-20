/**
 * Created by Zero on 2018/3/22
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const InvoiceStyle = StyleSheet.create({
    InvoiceWrap:{
        paddingLeft:15,
        backgroundColor:"#fff",
        borderBottomWidth:1,
        borderBottomColor:"#e6e6e6",
        paddingTop:15,
        paddingBottom:15,
        marginBottom:10,
    },
    InvoiceTop:{
        flexDirection: 'row',
    },
    InvoiceTextWrap:{
        paddingLeft:8,
        paddingRight:8,
        paddingTop:5,
        paddingBottom:5,
        borderColor:"#b3b3b3",
        borderWidth:1,
        marginRight:15,
    },
    InvoiceTextActiveWrap:{
        borderColor:"#20a200",
    },
    textGray:{
        color:"#b3b3b3",
    },
    textActive:{
        color:"#20a200",
    },
    InvoiceTitle:{
        borderBottomColor:"#b3b3b3",
        borderBottomWidth:1,
        paddingBottom:5,
    },
    InvoiceUnitWrap:{
        flexDirection: 'row',
        paddingTop:10,
    },
    radioWrap:{
        flexDirection: 'row',
        marginRight:"15%",
        alignItems:"center"
    },
    InvoiceInputWrap:{
        marginRight:15,
        backgroundColor:"#f0f2f5",
        height:34,
        marginTop:10,
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems:"center",
        paddingRight:10,
        paddingLeft:5,
        borderRadius:2,
    },
    InvoiceInput:{
        width:"90%",
        height:"100%",
        padding:0,
    },
    vatName:{
        color:"#b3b3b3"
    },
    vatWrap:{
        flexDirection: 'row',
        height:30,
        alignItems:"center",
    }

});
export default InvoiceStyle;