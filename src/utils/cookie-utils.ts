function getCookieData() {
    return decodeURIComponent(document.cookie).split(/;s*/).filter(Boolean)
}

function saveCookieArr(arr: Array<string>) {
    const cookieStr = encodeURIComponent(arr.join(';'))
    document.cookie = cookieStr
}

export function setCookieItem(key: string, value: string | number) {
    const rawCookies = getCookieData()
    const cookieItemIndex = rawCookies.findIndex(item => item.split('=')[0] === key)
    if (cookieItemIndex === -1) {
        rawCookies.push(`${key}=${value}`)
    } else {
        rawCookies[cookieItemIndex] = `${key}=${value}`
    }

    saveCookieArr(rawCookies)
}

export function getCookieItem(key: string) {
    const rawCookies = getCookieData()
    const cookieItem = rawCookies.find(item => item.split('=')[0] === key)
    return cookieItem ? cookieItem.split('=')[1] : null
}

export function clearCookieItem(key: string) {
    const rawCookies = getCookieData()
    const filteredCookies = rawCookies.filter(item => item.split('=')[0] !== key)
    saveCookieArr(filteredCookies)
}
