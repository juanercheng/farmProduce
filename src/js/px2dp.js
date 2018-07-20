/**
 * Created by yangHL on 2018/3/16.
 */
import {Dimensions} from 'react-native'

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const basePx = 375;

export default function px2dp(px) {
    return px * deviceWidth / basePx
}