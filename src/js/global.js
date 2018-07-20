/**
 * Created by yangHL on 2018/4/12.
 */


import React from 'react';

let global = {
    login:{
        token:'ac91a4a5-15be-4adf-acbc-57a39ee15dd4',
        userId:1,
        mobile:null
    },
    home:{
        shopId:1,//店铺id
        comment:0,//评论数目
        locationCity:null,//定位
        province:null,//点击省份
        city:null
    },
    classify:{
        id :0,
        sortID :0,
        categoryId:0,
        pageSize:1
    },
    shop:{

        totalMoney:0,
        shopCarIds:[], //购物车选中的id
        ticketType:0, //发票类型
    }
};

export default global;