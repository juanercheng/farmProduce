 /**
  * Created by yangHL on 2018/6/15.
  */
 import React, {PureComponent} from 'react';
 import { Button } from 'native-base';
 import {Alert, StyleSheet, StatusBar, Modal, TouchableOpacity, View, Text, Image} from 'react-native';
 import QRCodeScanner from 'react-native-qrcode-scanner';
 import Util from './../../../js/util'
// import SettingStyle from "../../../../js/SettingStyle";
 import Icon from 'react-native-vector-icons/Ionicons';

 export default class QRcode extends PureComponent {

    static navigationOptions = ({navigation}) => ({
         headerTitle: ("扫描二维码"),
         headerStyle: {
             backgroundColor: "#000",
             elevation: 0
         },
         headerTitleStyle: {
             color: "#fff",
             alignSelf: 'center'
         },
         headerTintColor: "#000",
         tabBarVisible: false,
         headerLeft:(
                     <Button transparent style={styles.Back} onPress={()=>navigation.state.params.navigatePressBack()}>
                         <Image style={styles.headerBack} source={require('./../../../../images/header/fanhui.png')} />
                     </Button>
                 ),
                 headerRight: (
                     <View>
                         <Text>

                         </Text>
                     </View>
                 )
     })

     constructor(props) {
         super(props);
         this.state = {
             visible: false
         };
     }
    componentDidMount() {
        this.props.navigation.setParams({navigatePressBack:this.goBack});
    }
     componentWillReceiveProps(nextProps) {

         let {show} = nextProps;
         show !== this.state.visible && this.setState({visible: show});
     }
    goBack = () => {
        const { goBack,navigate } = this.props.navigation;
        goBack ()
    };
     _onSuccess = (event) => {
         if (!event.data) return;
         let execStr = /goods-(\d+)/g.exec(event.data);
         if (!execStr || execStr.length < 2) {
             alert('二维码没有包含商品ID标识，请重新扫描！');
             return;
         }
         let _id = execStr[1];
         this.setState({visible: false}, () => {
             this.props.onClosed();
             this.props.nav.navigate('GoodsDetail', {goods_id: _id});
         });
     };

     _closeModal = () => {
         this.setState({visible: false}, this.props.onClosed);
     };

     render() {
         let {visible} = this.state;
         return (
             <Modal
                 animationType="slide"
                 visible={visible}
                 transparent={true}
                 onRequestClose={() => {
                 }}
                 {...this.props}
             >
                 <StatusBar barStyle='light-content'/>
                 <View style={styles.container}>
                     <View style={styles.header}>
                         <TouchableOpacity style={styles.back} onPress={this._closeModal}>
                             <Icon name="ios-arrow-back-outline" color="#FFFFFF" size={30}/>
                         </TouchableOpacity>
                         <View style={styles.title}>
                             <Text style={styles.title_text}>扫一扫</Text>
                         </View>
                         <TouchableOpacity style={styles.back}>

                         </TouchableOpacity>
                     </View>
                     <View style={styles.qr_view}>
                         <QRCodeScanner
                             onRead={this._onSuccess}
                             cameraStyle={styles.camera_style}
                             showMarker={true}
                             fadeIn={false}
                         />
                     </View>
                     <View style={styles.mask_view}>
                         <View style={styles.mask_view_top}/>
                         <Text style={styles.tip}>对准二维码 / 条形码到框内即可扫描</Text>
                         <View style={styles.mask_view_content}>
                             <View style={styles.mask_view_left}/>
                             <View style={styles.mask_view_center}>
                                 <Icon style={[styles.qr_arrow, styles.qr_arrow_1]} name="ios-arrow-up-outline"/>
                                 <Icon style={[styles.qr_arrow, styles.qr_arrow_2]} name="ios-arrow-up-outline"/>
                                 <Icon style={[styles.qr_arrow, styles.qr_arrow_3]} name="ios-arrow-up-outline"/>
                                 <Icon style={[styles.qr_arrow, styles.qr_arrow_4]} name="ios-arrow-up-outline"/>
                             </View>
                             <View style={styles.mask_view_left}/>
                         </View>
                         <View style={styles.mask_view_top}/>
                     </View>
                 </View>
             </Modal>
         );
     }
 }

 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#000000'
     },
     header: {
         position: 'absolute',
         zIndex: 3,
         top: 0,
         left: 0,
         flexDirection: 'row',
         justifyContent: 'space-between',
         width: Util.size.width,
         height: 50,
         paddingTop: 20
     },
     headerBack:{
         width:11,
         height:19,
         marginLeft:15
       },
     back: {
         width: 44,
         height: 44,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor:'#dddddd'
     },
     Back:{
           alignItems:'center',
           alignSelf:'center'
       },
     title: {
         justifyContent: 'center',
         alignItems: 'center',
         width: Util.size.width - 88,
         height: 44
     },
     title_text: {
         color: '#FFFFFF',
         backgroundColor:'#dddddd'
     },
     qr_view: {
         width: Util.size.width,
         height: Util.size.height,
         zIndex: 1
     },
     camera_style: {
         width: Util.size.width,
         height: Util.size.height
     },
     mask_view: {
         alignItems: 'center',
         position: 'absolute',
         zIndex: 2,
         top: 0,
         left: 0,
         width: Util.size.width,
         height: Util.size.height
     },
     mask_view_top: {
         width: Util.size.width,
         height: (Util.size.height - 250) / 2,
         backgroundColor: 'rgba(0,0,0,.4)'
     },
     tip: {
         position: 'absolute',
         top: (Util.size.height - 250) / 2 - 30,
         zIndex: 3,
         color: '#FFFFFF',
         backgroundColor: '#dddddd'
     },
     mask_view_content: {
         flexDirection: 'row',
         width: Util.size.width,
         height: 250
     },
     mask_view_left: {
         width: (Util.size.width - 250) / 2,
         height: 250,
         backgroundColor: 'rgba(0,0,0,.4)'
     },
     mask_view_center: {
         width: 250,
         height: 250
     },
     qr_arrow: {
         position: 'absolute',
         zIndex: 3,
         color: '#FFFFFF',
         fontSize: 45,
         backgroundColor: '#dddddd'
     },
     qr_arrow_1: {
         top: -17.5,
         left: -7,
         transform: [{rotate: "-45deg"}]
     },
     qr_arrow_2: {
         top: -17.5,
         right: -7,
         transform: [{rotate: "45deg"}]
     },
     qr_arrow_3: {
         bottom: -17.5,
         left: -7,
         transform: [{rotate: "-135deg"}]
     },
     qr_arrow_4: {
         bottom: -17.5,
         right: -7,
         transform: [{rotate: "135deg"}]
     }
 });