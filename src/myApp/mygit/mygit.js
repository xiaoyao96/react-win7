import React  from 'react'
import style from './mygit.scss';
function Mygit(){
    return (
        <div className={style.content}>
            <div className={style.img}></div>
            <p className={style.name}>姚逍</p>
            <p className={style.user}>yx675258207</p>
            <a href='https://github.com/yx675258207' target="_blank" rel="noopener noreferrer" className={style.btn}>进入我的Github</a>
        </div>
    )
}
export default Mygit