import {StyleSheet} from 'react-native';
import Util from './../../js/util';

const HomeStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
    SwiperContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        width: Util.size.width,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    wrapperImage: {
        width: Util.size.width,
        flex: 1
    },
    line: {
        height: 10,
        backgroundColor: '#f2f4f7'
    },
    column: {
        backgroundColor: '#fff',
    },
    columnOne: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 16,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    columnTwo: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    columnLeft: {
        flex: 5,
        borderRightWidth: 1,
        borderRightColor: '#e6e6e6',
        paddingLeft: 15,
    },
    columnRight: {
        flex: 5,
    },
    columnRightOne: {
        marginRight: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc'
    },
    columnRightTwo: {
        marginRight: 15,
    },
    promotion: {
        backgroundColor: '#fff',
    },
    promotionOne: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingLeft: 15,
        paddingBottom: 16,
        paddingRight: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        justifyContent: 'space-between',
    },
    promotionTwo: {
        flexDirection: 'row',

    },
    promotionOneA: {
        borderBottomWidth: 1,
        borderBottomColor: '#dcdcdc',
        // flex:5,
        width: Util.size.width / 2,
        paddingBottom: 11,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 13,
        borderRightWidth: 1,
        borderRightColor: '#e6e6e6'
    },
    promotionOneB: {
        width: Util.size.width / 2,
        paddingBottom: 11,
        paddingRight: 10,
        paddingTop: 10,
        paddingLeft: 13,
    },
    price: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    priceOne: {
        color: '#999999',
        fontSize: 10,
        textDecorationLine: 'line-through',
        marginLeft: 5
    },
    explosion:{
        backgroundColor:'#fff',
        paddingBottom:15
    },
    explosionOne:{
        paddingTop:22,
        paddingBottom:15,
        paddingLeft:15,
        paddingRight:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    explosionTwo:{
        flexDirection: 'row',
    },
    explosionType:{
        marginLeft:5,
        borderWidth:1,
        borderColor:'#e6e6e6',
        paddingTop:5,
        paddingBottom:7,
        paddingLeft:5,
        paddingRight:5
    },
    explosionPrice:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    newsNum:{
        position:'absolute',
        top:0,
        right:'25%',
        width:8,
        height:8
    }

});
export default HomeStyle;