import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Home from './src/pages/navigation/Home';
import Mine from './src/pages/navigation/Mine';
import Shopping from './src/pages/navigation/Shopping';
import Recommend from './src/pages/navigation/Recommend';
import Classify from './src/pages/navigation/Classify';

class TabBarItem extends Component {

    render() {
        return(
            <Image source={ this.props.focused ? this.props.selectedImage : this.props.normalImage }
            />
        )
    }
}
const Tab = TabNavigator(
    {
        Home:{
            screen:Home,
            navigationOptions:{
                tabBarLabel:'首页',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/weidianjishouye.png')}
                        selectedImage={require('./images/shouye.png')}
                    />
                ),
            },
        },
        Classify:{
            screen:Classify,
            navigationOptions:{
                tabBarLabel:'分类',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/fenleia.png')}
                        selectedImage={require('./images/fenlei.png')}
                    />
                ),
            },
        },
        Recommend:{
            screen:Recommend,
            navigationOptions:{
                tabBarLabel:'秒杀',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/miaosha.png')}
                        selectedImage={require('./images/tuijian.png')}
                    />
                )
            },
        },
        Shopping:{
            screen:Shopping,
            navigationOptions:{
                tabBarLabel:'购物车',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/gouwuche.png')}
                        selectedImage={require('./images/gouwuchea.png')}
                    />
                )
            },
        },

        Mine:{
            screen:Mine,
            navigationOptions:{
                tabBarLabel:'我的',
                tabBarIcon:({focused,tintColor}) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./images/gerenzhongxin.png')}
                        selectedImage={require('./images/gerenzhongxina.png')}
                    />
                )
            },
        },
    },
    {
        tabBarComponent:TabBarBottom,
        tabBarPosition:'bottom',
        swipeEnabled:false,
        animationEnabled:false,
        lazy:true,
        tabBarOptions:{
            activeTintColor:'#000',
            inactiveTintColor:'#000',
            style:{backgroundColor:'#ffffff', overflow:"hidden"},
            labelStyle: {
                fontSize: 10, // 文字大小
            },
        }

    }

);

AppRegistry.registerComponent('farmProduce', () => Tab);
