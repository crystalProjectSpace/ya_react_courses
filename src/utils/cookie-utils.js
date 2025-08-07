function getCookieData() {
    return decodeURIComponent(document.cookie).split(/;s*/).filter(Boolean)
}

function saveCookieArr(arr) {
    const cookieStr = encodeURIComponent(arr.join(';'))
    document.cookie = cookieStr
}

export function setCookieItem(key, value) {
    const rawCookies = getCookieData()
    const cookieItemIndex = rawCookies.findIndex(item => item.split('=')[0] === key)
    if (cookieItemIndex === -1) {
        rawCookies.push(`${key}=${value}`)
    } else {
        rawCookies[cookieItemIndex] = `${key}=${value}`
    }

    saveCookieArr(rawCookies)
}

export function getCookieItem(key) {
    const rawCookies = getCookieData()
    const cookieItem = rawCookies.find(item => item.split('=')[0] === key)
    return cookieItem ? cookieItem.split('=')[1] : null
}

export function clearCookieItem(key) {
    const rawCookies = getCookieData()
    const filteredCookies = rawCookies.filter(item => item.split('=')[0] !== key)
    saveCookieArr(filteredCookies)
}
