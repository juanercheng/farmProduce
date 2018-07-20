/**
 * Created by juaner by 17-12-25
 */
import React from 'react';
import Dimensions from 'Dimensions';

const Util = {
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  rootPath:'http://114.215.84.189:8888/exiaodao/api/',
  // Path:'http://39.104.116.24:8080/farmproduct/api/',
  Path:'http://192.168.0.250:8982/farmproduct/api/',
  //   Path:'http://47.100.34.60/farmproduct/api/',
  imgPath:'http://114.215.84.189:8888/exiaodao',
};
export default Util;
