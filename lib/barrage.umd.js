!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{constructor(e){this.el="body",this.info=[],this.defaultHeader="",this.url="",this.close=!1,this.speed=10,this.color="#ffff",this.backColor="rgba(204, 204, 204, 0.5)",this.height="40px",this.fontSize="20px",this.parentName="barrage";for(const[t,n]of Object.entries(e)){if(""===n||void 0===this[t])throw new Error("传入参数为空或错误");"info"===t||(this[t]=n)}(function e(){this._getElDom();let t=this.mainDom;t.setAttribute("style","overflow:hidden");let n=document.getElementById(this.parentName);n?(this.parentName+=1,e.apply(this)):((n=document.createElement("div")).setAttribute("id",this.parentName),n.setAttribute("style","position:absolute;width:100%;height:100%;"),t.appendChild(n))}).apply(this)}start(e,t){e?(this.info.push(e),this.info.length>0&&function(e={}){let{headImg:t=this.defaultHeader,url:n=this.url,speed:r=this.speed}=e,i=0,o=document.getElementById(this.parentName),s=document.createElement("div"),a=this.mainDom.clientWidth*Math.random();const l=this.mainDom.clientWidth,u=`\n      height: ${this.height};\n      background: ${this.backColor};        \n      line-height: ${this.height};        \n      font-size: ${this.fontSize};\n      color:${this.color};        \n      // left:-200px;\n      top:${a+10}px; \n      transition:transform ${r}s linear 0s;\n      transform:translateX(${l}px);\n      `;s.setAttribute("class","barrage"),s.addEventListener("mouseover",function(e){const t=e.currentTarget;let n=document.defaultView.getComputedStyle(t,null).getPropertyValue("transform").replace("matrix","").slice(1,-1).split(",")[4];t.style.transform=`translateX(${n}px)`,clearTimeout(c),clearInterval(f)}),s.addEventListener("mouseout",function(e){const t=e.currentTarget;t.style.transition=`transform ${r-i}s linear 0s`,t.style.transform=`translateX(${l}px)`,f=setInterval(()=>{i++},1e3),c=setTimeout(()=>{clearInterval(f)},1e3*(r-i+1))}),o.appendChild(s),setTimeout(()=>{t&&function(e,t){let n=document.createElement("img");n.setAttribute("class","header"),n.setAttribute("src",t),e.appendChild(n)}(s,t),function(e,t,n){let r=document.createElement("a");r.setAttribute("class","text"),n&&(r.setAttribute("href",n),r.setAttribute("target","_blank"));let i=document.createTextNode(t);r.appendChild(i),e.appendChild(r)}(s,this.info.shift(),n),s.setAttribute("style",u)},1e3);let c=setTimeout(()=>{clearInterval(f),o.removeChild(s)},1e3*(r+1)),f=setInterval(()=>{i++},1e3)}.call(this,t)):console.warn("message is necessary,you must set message on function start")}_getElDom(){let e=document.querySelector(this.el);if(!e)throw new Error(`'${this.el}'is not a element`);this.mainDom=e}}}])});