/*
 * storage.js
 * ----
 * 저장소를 다루는 코드.
 * 
 */

function save(data) {
    /* 작성 상태 저장 */
    var ts = new Date().getTime();
    var ts_list = localStorage.getItem('ts_list');
    if (ts_list == null) {
        ts_list = [ts];
    } else {
        ts_list = JSON.parse(ts_list);
        ts_list.push(ts);
        ts_list = ts_list.slice(-500,); // 저장내역 500개만 저장.
    }
    localStorage.setItem('ts_list', JSON.stringify(ts_list));
    localStorage.setItem(ts, JSON.stringify(data));
    return true;
}

function load() {
    /* 저장된 작성상태 불러오기 */
    var ts_list = localStorage.getItem('ts_list');
    if (ts_list == null) {
        return
    }
    ts_list = JSON.parse(ts_list);
    var data = ts_list.map(ts => {
        var data = localStorage.getItem(ts);
        return JSON.parse(data);
    })
    
    return data;
}
