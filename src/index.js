// import React,{Component} from 'react';
// import ReactDOM from 'react-dom';
//
// class Uuu extends Component{
//     render() {
//         return(
//             <ul className='list'>
//                 <li className='item' key='item1'>a</li>
//                 <li className='item' key='item2'>bx</li>
//                 <li className='item' key='item3'>c</li>
//             </ul>
//         )
//     }
// }
//
// console.log(<Uuu />);
// ReactDOM.render(
//     <Uuu />,
//     document.getElementById('root')
// );

// import {createElement} from 'react';
// import ReactDOM from 'react-dom';
// let uuu=document.createElement('ul');
// let ttt=document.createTextNode('去你大爷的');
//
// for (const uuuKey in props) {
//     if(uuuKey==='className'){
//         // 设置class
//     }else if(uuuKey==='style'){
//     //    设置css
//     }else if(uuuKey==='value') {
//
//     }
// }
// uuu.setAttribute()
// function createElement(type,props,...children){
//     console.log(children);
// }
// createElement('ul',{},'a','b','c')
//
// document.querySelector('')
// ['a','b','c']
// ['a1','b','c']
// [].foforEach(item=>{
//     do
// }
// let vDom1 = createElement(
//     'ul',
//     {className: 'list', style: {color: 'tomato'}},
//
//     [
//         createElement('li', {className: 'item', key: 'item1'}, ['a1']),
//         createElement('li', {className: 'item', key: 'item2'}, ['b']),
//         createElement('li', {className: 'item', key: 'item3'}, ['c']),
//     ],
//     createElement('li', {className: 'item', key: 'item4', style: {color: 'YELLOW'}}, ['d']),
//     // '去你大爷的'
// )
// //
// console.log(vDom1);
// // //
// // // dom diff
// //
// ReactDOM.render(
//     vDom1,
//     document.getElementById('root')
// );

// import {createElement, render, renderDom} from './element'
// import diff from './diff'
// import patch from './patch'
// //
// let vDom1 = createElement('ul', {class: 'list'}, [
//     createElement('li', {class: 'item'}, ['a']),
//     createElement('li', {class: 'item'}, ['b']),
//     createElement('li', {class: 'item'}, ['c']),
// ])
//
// let vDom2 = createElement('ul', {class: 'list-group'}, [
//     createElement('li', {class: 'item'}, ['z']),
//     // createElement('li', {class: 'item'}, [createElement('h1', {class: 'p-item'}, [666])]),
//     createElement('li', {class: 'item'}, ['b']),
//     createElement('p', {class: 'item'}, ['3']),
//     // createElement('li', {class: 'item'}, ['3']),
// ])
//
// // console.log(vDom1);
// // console.log(vDom2);
// //
// let patches = diff(vDom1, vDom2)
// // console.log(vDom1);
//
// let ele = render(vDom1);
// // console.log(ele);
// //
// renderDom(ele, document.querySelector('#root'))
// // patch(ele,patches)
// // //
// // // console.log(vDom1);
// console.log(patches);





// console.time('js');
// const num2 = 1000;
//
// for (let i = 0; i < num2; i++) {
//     let a = i * i * i;
//     let b = a * Math.random();
//     let c = b / Math.random();
// }
// console.timeEnd('js');
//
//
//

console.time('dom');
const num1 = 1000;
let ul = document.createElement('ul');
for (let i = 0; i < num1; i++) {
  let li = document.createElement('li');
  li.textContent = `${Math.random()}`;
  ul.appendChild(li);
}
document.body.appendChild(ul);
console.timeEnd('dom');


console.time('dom-Fragment');

let ul1 = document.createElement('ul');
var df = document.createDocumentFragment();
for (let i = 0; i < num1; i++) {
    let li = document.createElement('li');
    li.textContent = `${Math.random()}`;
    df.appendChild(li);
}
ul1.appendChild(df);
document.body.appendChild(ul1);
console.timeEnd('dom-Fragment');

console.time('dom-string');
let ul2 = document.createElement('ul');
let ulStr=''
for (let i = 0; i < num1; i++) {
    let liStr = `<li>${Math.random()}</li>`
    ulStr+=liStr
}
ul2.innerHTML=ulStr
document.body.appendChild(ul2);
console.timeEnd('dom-string');
