/**
 * Created by yangHL on 2018/3/26.
 */
import {StyleSheet} from 'react-native';
import Util from './../../../../js/util';
import px2dp from './../../../../js/px2dp'

const style = StyleSheet.create({
    comment:{
        flexDirection:"row",
        justifyContent:'space-between',
        paddingTop:15,
        paddingBottom:10,
        borderBottomWidth:1,
        borderBottomColor:'#e6e6e6',
        alignItems:'center',
        paddingRight:15,
        marginLeft:15
    },
    allNum:{
        flexDirection:"row",
        alignItems:'center'
    },
    allText:{
        marginLeft:8,
        fontSize:13
    },
    commentContent:{
        padding:15,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    commentUser:{
        flexDirection:"row",
        alignItems:'center'
    },
    commentStart:{
        marginLeft:16
    },
    userName:{
        fontSize:13
    },
    userStar:{
        marginTop: 5,
        flexDirection:"row",
    },
    commentTime:{
        flexDirection:"row",
    },
    commentBotton:{
        marginTop:15,
        height:29,
        width:'33%',
        backgroundColor:'#ffffff',
        borderWidth:1,
        borderColor:'#cccccc'
    },
    commentBottonText:{
        color:'#000000'
    },
    details:{
        backgroundColor:'#ffffff',
        flex: 1,
        paddingRight:16,
        paddingLeft:16
    },
    detailsTitle:{
        marginTop:20,
        marginBottom:26,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center'
    },
    detailsText:{
        marginTop:25,
    },
    detailsTextImg:{
        marginLeft:10,
        marginRight:10
    }
});
export default style;