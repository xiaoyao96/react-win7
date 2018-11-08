import text_edit from '../imgs/text_edit.png'
import recycle from '../imgs/recycle.png'
import github from '../imgs/github.png'
import pc from '../imgs/PC.png'
import Mygit from '../myApp/mygit/mygit'
import Computer from '../myApp/computer/computer'
const Applist = [
    {
        "appId":"5",
        "name": "我的电脑",
        "type" : "component",
        "component": Computer,
        "img" : pc
    },
    {
        "appId":"2",
        "name" : "笔记本",
        "type" : "txt",
        "content" : "本项目React重构的windows 7桌面系统。",
        "img" : text_edit
    },
    {
        "appId":"1",
        "type" : "txt",
        "name": "回收站",
        "content": "开发中..",
        "img" : recycle
    },
    {
        "appId":"3",
        "name": "wxMiniStore",
        "type" : "html",
        "url": "https://blog.csdn.net/qq_35173602/article/details/82349742",
        "img" : github
    },
    {
        "appId":"4",
        "name": "我的git",
        "type" : "component",
        "component": Mygit,
        "img" : github
    }
]

export default Applist.map(app => Object.freeze(app))