/**
 * Created by Zero on 2018/3/21
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const ConfirmOrderStyle = StyleSheet.create({
    addressWrap:{
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"#f0f2f5"
    },

    muchGoodsWrap:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:"#f9f9f9",
        alignItems:"center"

    },
    muchGoodsImgWrap:{
        flexDirection:"row",
        justifyContent:"flex-start",
        width:"90%"
    },
    muchGoodsImg:{
        marginRight:10,
        width:65,
        height:65,
        borderColor:"#dcdcdc",
        borderWidth:1,
        borderRadius:3,
    }

});
export default ConfirmOrderStyle;