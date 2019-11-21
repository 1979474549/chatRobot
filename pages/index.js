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

let btn = document.getElementsByClassName('subBtn')[0];
window.onkeydown = function (e) {
    if(e.key === 'Enter') {
        send();
    } else {
        return;
    }
}
btn.onclick = send;
function send () {
    let inp = document.getElementsByClassName('input')[0];
    let content = document.getElementsByClassName('content')[0];
    if(inp.value.trim() === '') {
        return;
    }
    let p = document.createElement('p');
    p.innerHTML = '我：' + inp.value;
    content.appendChild(p);
    inp.value = '';
    ajax('get', 'http://127.0.0.1:12306/query?text=' + inp.value, function (data) {
        let tulin = document.createElement('p');
        tulin.innerHTML = "图灵：" + data;
        content.appendChild(tulin);
        var utterThis = new window.SpeechSynthesisUtterance(data);
        window.speechSynthesis.speak(utterThis);
    })
}





