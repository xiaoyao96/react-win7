import marked from 'marked';
import hljs from 'highlight.js';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import md from '../../public/test.md';
import style from './mymd.scss';

function Mymd () {
    const [text, setText] = useState('');
    Axios.get(md).then(res => {
        setText(marked(res.data));
    })
    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    })
    return (
        <div className={style.md} dangerouslySetInnerHTML={{ __html: text }}></div>
    )
}

export default function(){
    return (
        <div style={{ position: 'absolute', zIndex: 1, backgroundColor: '#fff' }}>
            <Mymd />
        </div>
    )
}