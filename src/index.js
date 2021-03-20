import {send} from './utils/send.js';
import './index.css';
let btn = document.getElementsByClassName('subBtn')[0];
let inp = document.getElementsByClassName('input')[0];
let val = null;
inp.oninput = function (e) {
    val = e.target.value;
}
inp.onkeydown = function (e) {
    if (e.key === 'Enter') {
        console.log(val);
        send(val);
    } else {
        return;
    }
};
btn.onclick = function () {
    send(val);
    val = null;
}