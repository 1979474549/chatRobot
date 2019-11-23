init();
function init () {
    let btn = document.getElementsByClassName('subBtn')[0];
    let inp = document.getElementsByClassName('input')[0];
    let val = null;
    inp.oninput = function (e) {
        val = e.target.value;
    }

    inp.onkeydown = function (e) {
        if(e.key === 'Enter') {
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
}
function ajax (method, url, cb) {
    let xhr = null;
    if(window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = ActiveXObject('Microsoft.XMLHTTP');
    }
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            cb(xhr.responseText);
        }
    }
    xhr.open(method, url, true);
    xhr.send();
}
function send (val) {
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






