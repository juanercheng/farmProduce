/**
 * Created by Zero on 2018/3/23
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';
const CouponStyle = StyleSheet.create({
    couponWrap:{
        width:"100%",
        marginTop:15,
        paddingLeft:15,
        paddingRight:15,
    },
    couponList:{
        width:"100%",
        height:80,
        marginBottom:10,
    },
    couponListWrap:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-around",
        height:"100%"
    },
    couponLeftWrap:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
    },
    couponBg:{
        width:"100%",
        height:"100%",
    },
    moneyWrap:{
        flexDirection:"row",
        width:"100%",
        marginTop:-5,
    },
    couponRightWrap:{
        flexDirection:"column",
        height:"100%",
        justifyContent:"center",
        paddingLeft:10,
        width:"65%"

    },
    couponUsedRightWrap:{
        paddingRight:5,
        // backgroundColor:"red"
    },
    couponDateWrap:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-around",
        marginTop:7,
    },
    couponUsedDateWrap:{
        justifyContent:"flex-start",
    },
    couponTitle:{
        width:"100%",
    },
    useBtn:{
        borderWidth:1,
        borderColor:"#23a300",
        borderRadius:2,
        marginLeft:3,
        // padding:3,
    }

});
export default CouponStyle;