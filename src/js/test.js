import React from 'react';
import { View, Text, ScrollView,WebView } from 'react-native';
import { Tabs } from 'antd-mobile';
import styles from "../pages/common/commodityDetails/component/style";

export default class BasicTabsExample extends React.Component {
    render() {
        let details = '<div style="padding: 10; display: flex; justify-content: space-between; align-item: center;"><div><span style="margin-left: 10px;height: 30px; vertical-align: top; line-height: 36px;">hello</span></div><span style="line-height: 36px;">how are you</span></div><div style="margin-left: 30px; padding-bottom: 10px; border-bottom: 1px solid #ededed;">time</div>'
        console.log(details);
        return (
            <View style={{flex: 1,
                backgroundColor: '#fff'}}>
                <WebView
                    // style={{
                    //     backgroundColor: BGWASH,
                    //     height: 100,
                    // }}
                    ref='webview'
                    automaticallyAdjustContentInsets={false}
                    // style={styles.webView}
                    source={{html: details, baseUrl: 'https://baidu.com'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={() => true}
                    onNavigationStateChange={this.onNavigationStateChange}
                    startInLoadingState={true}
                    scalesPageToFit={true}
                />
            </View>


        )
    }

}