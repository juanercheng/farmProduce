/**
 * Created by Zero on 2018/3/29
 */
import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const SearchStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#ffffff",
        height: 44,
    },
    input: {
        backgroundColor: "#f0f1f2",
        borderRadius: 15,
        height:30,
        paddingTop:0,
        paddingBottom:0,
        width:"85%"
    },
    searchWrap:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:20,
    },
    searchListBox:{
        flexDirection:"row",
        flexWrap:"wrap"
    },
    textBox:{
        marginTop:10,
        backgroundColor:"#f0f1f2",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:3,
        paddingBottom:3,
        borderRadius:15,
        marginRight:5,
    },
    labelWrap:{
        flexDirection:"row",
        marginTop:5,
        marginBottom:6,
    },
    labelGreen:{
        borderWidth:1,
        borderColor:"#22a500",
        color:"#22a500",
        fontSize:14,
        marginRight:10,
        paddingLeft:3,
        paddingRight:3,
        borderRadius:4,
    },
    labelRed:{
        borderWidth:1,
        borderColor:"#ff9401",
        color:"#ff9401",
        fontSize:14,
        paddingLeft:3,
        paddingRight:3,
        borderRadius:3,
    }


});
export default SearchStyle;