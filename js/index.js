// 获取dom
let doms = {
  butt1: {
    dom: document.getElementById('frame1'),
    isOpen: true, //是否打开关闭弹窗
  },
  butt2: {
    dom: document.getElementById('frame2'),
    isOpen: false,
  },
  butt3: {
    dom: document.getElementById('frame3'),
    isOpen: false,
  },
  butt4: {
    dom: document.getElementById('frame4'),
    isOpen: false,
  },
};
let box = {
  dom: document.querySelector('.container'),
  time: document.querySelector('.time'),
  butt: document.querySelector('.butt'),
  month: document.querySelector('.month'),
  hore: document.querySelector('.hore'),
  second: document.querySelector('.second'),
  isOpen: false,
};
let sucess = document.querySelector('.success');
let fail = document.querySelector('.fail');
let time = 5; //秒数
let isprize = false;
/**
 * 随机函数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let prinDom = document.querySelector('.prin');
let prinYear = document.querySelector('.prin-year'); //打印的年
let prinHour = document.querySelector('.prin-hour'); //打印的时间
/**
 * 处理打印
 */
function handePrint() {
  sucess.style.display = 'block';
  let year = getnowDate('.').split('.');
  let hour = getHour().split(':');
  let endHour = hour[0] + ':' + hour[1];
  let endYear = year[2] + '.' + year[1] + '.' + year[0];
  prinYear.innerHTML = endYear;
  prinHour.innerHTML = endHour;
  setTimeout(() => {
    prinDom.style.display = 'block';
    bdhtml = window.document.body.innerHTML;
    sprnstr = '<!--startprint-->';
    eprnstr = '<!--endprint-->';
    prnhtml = bdhtml.substr(bdhtml.indexOf(sprnstr) + 17);
    prnhtml = prnhtml.substring(0, prnhtml.indexOf(eprnstr));
    window.document.body.innerHTML = prnhtml;
    window.print();
    location.reload();
  }, 2000);
}

/**
 * 获取年月日时间
 */
function getnowDate(str) {
  const date = new Date();
  return (
    date.getFullYear() +
    str +
    (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    str +
    (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
  );
}
/**
 * 获取时分
 */
function getHour() {
  var date = new Date();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? '0' + d : d;
  var h = date.getHours();
  h = h < 10 ? '0' + h : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? '0' + minute : minute;
  var s = date.getSeconds();
  s = s < 10 ? '0' + s : s;
  return h + ':' + minute + ':' + s;
}
let respOne = getRandom(1, 10); //随机的一个数字
/**
 * 处理倒计时点击
 */
function handeTimeClick() {
  box.butt.addEventListener('click', () => {
    if (time === 0) {
      return;
    }
    let resp = getRandom(1, 10);
    if (resp === respOne) {
      isprize = true;
    }
  });
}
let audio = document.createElement('audio'); //音频
audio.src = '/finish/audio/audio.mp3';
/**
 * 处理倒计时
 */
function handeTime() {
  audio.play();
  updateTime();
  handeTimeClick();
  box.second.innerHTML = ':0' + time;
  let temp = setInterval(() => {
    box.second.innerHTML = ':0' + time;
    if (time <= 0) {
      audio.pause();
      box.dom.style.display = 'none';
      if (isprize) {
        //成功
        handePrint();
      } else {
        fail.style.display = 'block';
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
      clearTimeout(temp);
      return;
    }
    updateTime();

    time--;
  }, 1000);
}
/**
 * 处理游戏时间是否显示
 */
function handeBox() {
  if (!box.isOpen) {
    box.dom.style.display = 'none';
  } else {
    box.dom.style.display = 'block';
  }
}
/**
 * 更新时间
 */
function updateTime() {
  const temp = getnowDate('-');
  box.month.innerHTML = temp;
  // let time = getHour().split(':');
  // box.hore.innerHTML = time[0] + ':' + time[1];
  // box.second.innerHTML = ':' + time[2];
}
/**
 * 处理弹出框
 */
function Popup() {
  let isOpen = true; //打开box
  for (const item in doms) {
    if (!doms[item].isOpen) {
      doms[item].dom.style.display = 'none';
    } else {
      //有一个是打开
      doms[item].dom.style.display = 'block';
      isOpen = false;
    }
  }
  if (isOpen) {
    handeTime();
  }
  box.isOpen = isOpen;
}
/**
 *  添加确认事件
 */
function addButtClick() {
  let index = 1;
  for (const key in doms) {
    doms[key].dom.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        doms['butt' + index].isOpen = false;
        if (index === 4) {
          Popup();
          handeBox();
          return;
        }
        index++;
        doms['butt' + index].isOpen = true;
        Popup();
      }
    });
  }
}
// 主函数
function main() {
  // updateTime(); //更新时间
  Popup(); //弹框是否打开
  handeBox(); //处理游戏时间是否显示
  addButtClick(); //添加确认事件
}
main();
