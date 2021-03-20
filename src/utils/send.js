import {ajax} from './ajax.js';
export function send (val) {
    console.log(val);
    let chatBox = document.getElementsByClassName('chatBox')[0];
    let content = document.getElementsByClassName('content')[0];
    let inp = document.getElementsByClassName('input')[0];
    if(val === '' || val === undefined || val === null) {
        return;
    }
    let p = document.createElement('span');
    p.innerHTML = '我：' + val;
    p.className = 'me';
    chatBox.appendChild(p);
    inp.value = '';
    ajax('get', 'http://127.0.0.1:12142/query?text=' + val, function (data) {

        let tulin = document.createElement('span');
        let hidden = document.getElementsByClassName('hidden')[0];
        content.scrollTop = content.scrollHeight;
        // hidden.scrollIntoView(false);
        tulin.className = 'tulin'
        tulin.innerHTML = "图灵：" + data;
        chatBox.appendChild(tulin);
        var utterThis = new window.SpeechSynthesisUtterance(data);
        window.speechSynthesis.speak(utterThis);
    })
}