import Storage from 'web-storage-cache'
const localStorage = new Storage()


export function setLocalStorage(key, value) {
    return localStorage.set(key, value)
}

export function getLocalStorage(key) {
    return localStorage.get(key);
}

export function removeLocalStorage(key) {
    return localStorage.delete(key);
}

export function clearLocalStorage() {
    return localStorage.clear()
}

export function setCurrentIndex(value) {
    let p = getLocalStorage(`page-info`);
    if (!p) p = {}
    p['currentIndex'] = value;
    setLocalStorage(`page-info`, p)
}

export function getCurrentIndex() {
    let p = getLocalStorage(`page-info`);
    if (p) {
        return p['currentIndex']
    } else {
        return null
    }
}



export function setDarkMode(value) {
    let p = getLocalStorage(`page-info`);
    if (!p) p = {}
    p['darkmode'] = value;
    setLocalStorage(`page-info`, p)
}

export function getDarkMode() {
    let p = getLocalStorage(`page-info`);
    if (p) {
        return p['darkmode']
    } else {
        return null
    }
}


export function getLocale(){
    // 获取本地语言
    let lang = getLocalStorage(`locale-info`);
    return lang
}

export function saveLocale(lang){
    // 设置本地语言
    setLocalStorage(`locale-info`, lang)
}




export function saveIfViewVisible(value) {
    let p = getLocalStorage(`page-info`);
    if (!p) p = {}
    p['ifViewVisible'] = value;
    setLocalStorage(`page-info`, p)
}

export function getIfViewVisible() {
    let p = getLocalStorage(`page-info`);
    if (p) {
        return p['ifViewVisible']
    } else {
        return null
    }
}
