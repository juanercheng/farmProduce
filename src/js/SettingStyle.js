/**
 * Created by ChengJuan by 18-03-15
 */
import {StyleSheet} from 'react-native';
import Util from './util';


const SettingStyle = StyleSheet.create({
  headerIcon:{
    width:10
  },
  headerBack:{
    width:11,
    height:19,
    marginLeft:15
  },
  arrowIcon:{
     width:8,
     height:10,
  },
  radioIcon:{
     width:18,
     height:18,
  },
  font14:{
    fontSize:14,
  },
  fontRed:{
    color:'#f23030'
  },
  font12:{
    fontSize:12,
  },
  font13:{
    fontSize:13,
  },
  font16:{
    fontSize:16,
  },
  font18:{
    fontSize:18,
  },
  font20:{
    fontSize:20,
  },
  emptyWrap:{
      flexDirection:"column",
      alignItems:"center",
      backgroundColor:"#fff",
      flex:1,
      paddingTop:20,
  },
  emptyImg:{
      width:"55%",
      height:"35%"
  },
  colorWhite:{
      color:"#fff",
  },
  textCenter:{
      textAlign: "center"
  },
  headerText:{
      color:'#000',
      fontSize:18,
      marginTop:10
  },
  Back:{
      alignItems:'center',
      alignSelf:'center'
  }
});

export default SettingStyle;
