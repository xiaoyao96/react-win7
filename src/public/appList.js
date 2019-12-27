import text_edit from "../imgs/text_edit.png";
import recycle from "../imgs/recycle.png";
import github from "../imgs/github.png";
import pc from "../imgs/PC.png";
import Mygit from "../myApp/mygit/mygit";
import Computer from "../myApp/computer/computer";
const Applist = [
  {
    appId: Math.random().toString(),
    name: "我的电脑",
    type: "component",
    component: Computer,
    img: pc,
    size: {
      w: 500,
      h: 800
    }
  },
  {
    appId: Math.random().toString(),
    name: "笔记本",
    type: "txt",
    content: "本项目React重构的windows 7桌面系统。",
    img: text_edit
  },
  {
    appId: Math.random().toString(),
    type: "txt",
    name: "回收站",
    content: "开发中..",
    img: recycle
  },
  {
    appId: Math.random().toString(),
    name: "wxMiniStore",
    type: "html",
    url: "#/ministore",
    img: github
  },
  {
    appId: Math.random().toString(),
    name: "我的git",
    type: "component",
    component: Mygit,
    img: github,
    size: {
      w: 500,
      h: 800
    }
  },
  {
    appId: Math.random().toString(),
    name: "泡泡堂",
    type: "html",
    url: "http://121.41.109.185:3000/",
    img: require('../imgs/friend_01.png'),
    size: {
      w: 800,
      h: 630
    }
  }
];

export default Applist.map(app => Object.freeze(app));
