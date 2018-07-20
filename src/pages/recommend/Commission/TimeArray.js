import React,{Component} from 'react';
let TimeArray_1=[];
let TimeArray_2=[];
let DateNow=new Date();
let YearNum=10;
let DateYear=DateNow.getFullYear();
console.log(DateYear);
for(let i=0;i<YearNum;i++){
    TimeArray_1.push(DateYear-i+'年');
}
for(let j=0;j<12;j++){
    TimeArray_2.push(j+1+"月");
}
const TimeArray=[TimeArray_1,TimeArray_2];
export default TimeArray;