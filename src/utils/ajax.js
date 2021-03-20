export function ajax (method, url, cb) {
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