import '../css/style.scss'
export default class Barrage {
  private el: string = "body";
  private info: Array<any> = []; //显示文字
  private defaultHeader: string = "";
  private url: string = "";
  private close: boolean = false;
  private speed: number = 10;
  private color: string = "#ffff";
  private backColor: string = "rgba(204, 204, 204, 0.5)";
  private height: string = "40px";
  private fontSize: string = "20px";
  private parentName: string = "barrage";
  private mainDom: Element;
  constructor(options: any) {
    for (const [option, value] of Object.entries(options)) {
      if (value !== "" && (this as any)[option] !== undefined) {
        if (option === "info") {
          //this.info.push(value);
        } else (this as any)[option] = value;
      } else {
        throw new Error("传入参数为空或错误");
      }
    }
    firstBegin.apply(this);
  }
  start(message: string, options: any) {
    if (message) {
      this.info.push(message);
    }else{
      console.warn('message is necessary,you must set message on function start');
      return
    }
    if (this.info.length > 0) {
      createElementGo.call(this, options);
    }
  }
  /**
   * 获取插入的dom
   */
  _getElDom() {
    let dom = document.querySelector(this.el);
    if (!dom) {
      throw new Error(`'${this.el}'is not a element`);
    }
    this.mainDom = dom;
  }
}
/******************** 私有函数 ***********************/
/**
 * 初始化页面结构
 */
function firstBegin() {
  this._getElDom();
  let main = this.mainDom;
  main.setAttribute("style", `overflow:hidden`);
  //this.animatStyle()
  let mainChild = document.getElementById(this.parentName);
  if (!mainChild) {
    mainChild = document.createElement("div");
    mainChild.setAttribute("id", this.parentName);
    mainChild.setAttribute(
      "style",
      `position:absolute;width:100%;height:100%;`
    );
    main.appendChild(mainChild);
  } else {
    this.parentName += 1;
    firstBegin.apply(this);
  }
}
/**
 * 创建弹幕结构
 */
function createElementGo(options:any={}) {
  let {headImg=this.defaultHeader,url=this.url,speed=this.speed} = options 
  let now=0 //当前已过的时间 
  let mainChild = document.getElementById(this.parentName);
  let myDiv = document.createElement("div");
  let top = this.mainDom.clientWidth * Math.random();
  const clientWidth = this.mainDom.clientWidth-400; //获取容器宽度
  const styles = `
      height: ${this.height};
      background: ${this.backColor};        
      line-height: ${this.height};        
      font-size: ${this.fontSize};
      color:${this.color};        
      // left:-200px;
      top:${top + 10}px; 
      transition:transform ${speed}s linear 0s;
      transform:translateX(${clientWidth}px);
      `;

  // myDiv.setAttribute('class','move-'+_speed)
  //let text=document.createTextNode(this.info.shift())

  myDiv.setAttribute("class", "barrage");
  myDiv.addEventListener('mouseover',handEvent);
  myDiv.addEventListener('mouseout',outEvent)
  mainChild.appendChild(myDiv);
  //加settimeout处理闪进的情况
  setTimeout(() => {
    if(headImg){
      setHeader(myDiv, headImg);
    }
    setText(myDiv, this.info.shift(),url);
    myDiv.setAttribute("style", styles);
  }, 1000);

  //去掉移过的dom
  let removeTimmer=setTimeout(() => {
    clearInterval(timeGo)
    mainChild.removeChild(myDiv);
  }, (speed +1) * 1000);

  //计时
  let timeGo=setInterval(() => {
    now++
  }, 1000);

  function handEvent(e:any){
    const dom=e.currentTarget
    const computedStyle = document.defaultView.getComputedStyle( dom, null );
    //dom.style.width = computedStyle.getPropertyValue( "width" );
    let left=computedStyle.getPropertyValue('transform').replace('matrix','').slice(1,-1).split(',')[4]
    dom.style.transform=`translateX(${left}px)`
    clearTimeout(removeTimmer)
    clearInterval(timeGo)
  }
  function outEvent(e:any){
    const dom=e.currentTarget
    dom.style.transition=`transform ${speed-now}s linear 0s`;
    dom.style.transform=`translateX(${clientWidth}px)`
    timeGo=setInterval(()=>{
      now++
    },1000)
    removeTimmer=setTimeout(() => {
      clearInterval(timeGo)
      //mainChild.removeChild(myDiv);
    }, (speed -now +1) * 1000);
    // const computedStyle = document.defaultView.getComputedStyle( dom, null );
    // console.log(computedStyle.getPropertyValue('transition-duration'))
  }
}

/**
 * 插入头像
 * @param mainDom
 * @param src
 */
function setHeader(mainDom: HTMLDivElement, src: string) {
  let childDom = document.createElement("img");
  childDom.setAttribute("class", "header");
  childDom.setAttribute("src", src);
  mainDom.appendChild(childDom);
}
/**
 * 插入message
 * @param mainDom
 * @param info
 */
function setText(mainDom: HTMLDivElement, info: string,url:string) {
  let childDom = document.createElement("a");
  childDom.setAttribute("class", "text");
  if(url){
    childDom.setAttribute('href',url)
    childDom.setAttribute('target','_blank')
  }
  let text = document.createTextNode(info);
  childDom.appendChild(text);
  mainDom.appendChild(childDom);
}



/**********************废弃 */

function animatStyle() {
  const clientWidth = this.mainDom.clientWidth;
  const animations = `
  @keyframes mymove {
    from {
      left: -200px;
    }
    to {
      left: ${clientWidth}px;
    }
  }`;
  let style = document.createElement("style");
  style.innerHTML = animations;
  document.querySelector("head").appendChild(style);
  // setTimeout(() => {
  //   document.querySelector('head').removeChild(style);
  // }, _speed * 1000);
}

/**
 * 获取右边的宽度
 * @param element
 */
function getElementLeft(element: any) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
