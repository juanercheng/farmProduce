import {StyleSheet} from 'react-native';
import Util from './../../../js/util';

const AddressStyle = StyleSheet.create({
    addressContentActive:{
       flexDirection:'row',
       alignItems:'center',
    },
    addressContent:{
       flexDirection:'row',
       backgroundColor:'#fff',
       alignItems:'center',
       justifyContent:'space-between',
       width:'100%',
       paddingTop:15,
       paddingLeft:14,
       paddingRight:15,
    },
    addressCheckImg:{
       justifyContent:'center',
    },
    addressCheckImgR:{
       borderLeftWidth:1,
       borderLeftColor:'#ddd',
       paddingLeft:0,
    },
    addressCenter:{
        width:'100%'
    },
    addressCenters:{
        width:'100%',
        paddingLeft:5
    },
    AddAddressBox:{
        backgroundColor:'#fff',
        marginTop:10,
        height:Util.height
    },
    addItem:{
       flexDirection:'row',
       justifyContent:'center',
       alignItems:'center',
       borderBottomColor:'#ddd',
       borderBottomWidth:1
    },
    addInput:{
        flex:4,
        fontSize:12
    },
    label:{
        flex:1,
        fontSize:14,
        marginLeft:15,
        color:'#666'
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        marginBottom:5,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75
    },

    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,

    },
});
export default AddressStyle;