/**
 * Created by Zero on 2018/3/16
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const ShopCarStyle = StyleSheet.create({
    goodsListWrap:{
        backgroundColor:"#fff",
        marginBottom:10,
    },
    storesRadioWrap:{
        marginRight:10,


    },
    goodsRadioWrap:{
        marginRight:10,

    },
    storesWrap:{
        backgroundColor:"#fff",
        paddingLeft:15,
        height:45,
        flexDirection: 'row',
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#dadada"
    },
    storesTitleWrap:{
        flexDirection: 'row',
        alignItems:"center",



    },
    storesTitle:{
        marginRight:10,
        fontSize:14,
        marginLeft:10,
    },

    goodsWrap:{
        flexDirection: 'row',
        backgroundColor:"#fff",
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth:1,
        borderBottomColor:"#dadada",
        alignItems:"center"

    },
    goodsTitleWrap:{
        width:"68%",

    },
    goodsImgWrap:{
        width:"25%",
        paddingTop:10,
        paddingBottom:10,

    },
    goodsTitle:{
        width:"100%",
        color:"#333",
        fontSize:14,
    },
    goodsImg:{
        width:80,
        height:80,
        borderRadius:3,
    },
    storesIcon:{
        width:13,
        height:13,
        marginRight:10,
    },
    moneyWrap:{
        flexDirection: 'row',
        justifyContent:"space-between"
    },
    goodsColorText:{
        color:"#999",
        fontSize:12,
        marginTop:3,
        marginBottom:5,
        height:18,
    },
    moneyDis:{
        color:"#ff4e3c",
        fontSize:16,
    },
    moneyOr:{
        fontSize:12,
        color:"#999",
        textDecorationLine:'line-through',
        marginTop:2,
        marginLeft:5,
    },
    goodsNum:{
        fontSize:12,
        color:"#666",
    },
    moneyWrapRight:{
        flexDirection: 'row',
        flex:1,
        justifyContent:"flex-end"
    },
    reduceNum:{
        width:20,
        height:20,
        backgroundColor:"#dcdcdc",
        borderRadius:3,
    },
    numTextWrap:{
        width:50,
        height:20,

    },
    numText:{
        textAlign:"center",
        fontSize:14,
    },

    selNumText:{
        padding:0,
        width:"100%",
        height:"100%",
        lineHeight:20,
        textAlign:"center",
        fontSize:14,
        borderWidth:0
    },
    //管理购物车样式
    editGoodsColorWrap:{
        width:"100%",
        height:20,
        backgroundColor:"#f0f2f5",
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius:3,
        paddingLeft:5,
        paddingRight:5,
        marginBottom:5,
    },
    editgoodsColorText:{
        color:"#999",
        fontSize:12,
    },
    // 底部tab
    footer:{
        flexDirection: 'row',
        backgroundColor:"#fff",
        height:40,

    },
    allBtn:{
        width:"20%",
        flexDirection : 'row',
        alignItems : 'center',
        paddingLeft:10,


    },
    // allWrap:{
    //     width:"50%",
    //     paddingLeft:10,
    // },
    allWrap:{
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:"5%",
    },
    goBtnWrap:{
        width:"30%",
        height:40,
        flexDirection : 'row',
        alignItems:"center",
        // backgroundColor:"red"
    },
    goBtnd:{
        width:"100%",
    },
    goBtn:{
        width:"25%",
        flexDirection : 'row',
        alignItems:"center",
    },
    goText:{
        color:"#fff",
        textAlign:"center",
        width:"100%",
    },
    list:{
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingLeft:15,
        paddingRight:15,
        borderTopColor:"#e6e6e6",
        borderTopWidth:1,
        height:40,
        alignItems:"center",
        backgroundColor:"#fff"
    },

});
export default ShopCarStyle;